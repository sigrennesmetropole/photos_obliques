package org.georchestra.photooblique.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;

import org.georchestra.photooblique.exception.CityCodeFormatException;
import org.georchestra.photooblique.exception.InputAttributException;
import org.georchestra.photooblique.service.helper.POHelper;
import org.georchestra.photooblique.service.helper.RechercheHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class POController {

	final static Logger logger = LoggerFactory.getLogger(POController.class);

	@Autowired
	RechercheHelper rechercheHelper;
	
	@Autowired
	POHelper poHelper;


	@Path("/getPhotoByAttribute/")
	@GET
	@Produces("application/json")
	public Map<String, Object> getPOList(@Context HttpHeaders headers, 
			@QueryParam("cities") List<String> cities,
			@QueryParam("startPeriod")String StringStartPeriod, 
			@QueryParam("endPeriod") String StringEndPeriod,
			@QueryParam("owner") String owner,
			@QueryParam("start") String StringPagingStart,
			@QueryParam("limit") String StringElementByPage) {

		logger.debug("Search photo by attribute");
		
		int startPeriod = convertToInt(StringStartPeriod);
		int endPeriod = convertToInt(StringEndPeriod);
		int pagingStart = convertToInt(StringPagingStart);
		int elementByPage = convertToInt(StringElementByPage);
		
		Map<String, Object> results = new HashMap<String, Object>();
		
		// Check if period is good
		if (endPeriod != 0 && endPeriod < startPeriod) {
			results.put("success", false);
			results.put("error", "endPeriod should be greater than startPeriod");
				
		} else {

			try {
				results = poHelper.getPagedPOList(startPeriod, endPeriod, owner, cities, pagingStart, elementByPage);		
				results.put("success", true);

			}// Thrown if city code is wrong
			catch (CityCodeFormatException e) {
				
				results.put("success", false);
				results.put("error", "City code format error - " + e.getMessage());
			}// Thrown if city code is wrong
			catch (InputAttributException e) {
				
				results.put("success", false);
				results.put("error", e.getMessage());
			}
		}

		// Return value providers will convert to JSON
		return results;
	}

	/**
	 * 
	 * @param stringToConvert
	 * @return
	 */
	private int convertToInt(String stringToConvert) {
		
		int i = 0;
		//Parse String to int to avoir numberformatexception
		if(stringToConvert != null && !stringToConvert.isEmpty()){
			i = Integer.parseInt(stringToConvert);
		}
		
		return i;
	}

	@Path("/getYearsList/")
	@GET
	@Produces("application/json")
	public Map<String, Object> getYearsList(@Context HttpHeaders headers, @QueryParam("cities") List<String> cities) {

		logger.debug("Search years list");

		Map<String, Object> results = new HashMap<String, Object>();

		List<Integer> yearsList;
		try {
			yearsList = rechercheHelper.getYears(cities);

			results.put("success", true);
			results.put("annees", yearsList);
		}
		// Thrown if city code is wrong
		catch (CityCodeFormatException e) {
			
			results.put("success", false);
			results.put("error", "City code format error - " + e.getMessage());
		}

		return results;
	}

	@Path("/getOwnersList/")
	@GET
	@Produces("application/json")
	public Map<String, Object> getOwnersList(@Context HttpHeaders headers, 
			@QueryParam("startPeriod") int startPeriod,
			@QueryParam("endPeriod") int endPeriod, 
			@QueryParam("cities") List<String> cities) {

		logger.debug("Search Owners list");

		Map<String, Object> results = new HashMap<String, Object>();

		// Check if period is good
		if (endPeriod != 0 && endPeriod < startPeriod) {
			results.put("success", false);
			results.put("error", "endPeriod should be greater than startPeriod");

		} else {

			List<String> ownersList;
			try {
				ownersList = rechercheHelper.getOwners(startPeriod, endPeriod, cities);
				
				results.put("success", true);
				results.put("owners", ownersList);
			}
			// Thrown if city code is wrong
			catch (CityCodeFormatException e) {
				
				results.put("success", false);
				results.put("error", "City code format error - " + e.getMessage());
			}
		}

		return results;
	}

}