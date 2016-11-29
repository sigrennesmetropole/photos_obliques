package org.georchestra.photooblique.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;

import org.georchestra.photooblique.exception.CityCodeFormatException;
import org.georchestra.photooblique.model.PhotoOblique;
import org.georchestra.photooblique.repository.PORepository;
import org.georchestra.photooblique.service.helper.RechercheHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class POController {

	final static Logger logger = LoggerFactory.getLogger(POController.class);

	@Autowired
	RechercheHelper rechercheHelper;

	@Autowired
	PORepository poRepository;

	@Path("/getPhotoByAttribute/")
	@GET
	@Produces("application/json")
	public List<PhotoOblique> getPOList(@Context HttpHeaders headers, 
			@QueryParam("cities") List<String> cities,
			@QueryParam("startPeriod") int startPeriod, 
			@QueryParam("endPeriod") int endPeriod,
			@QueryParam("owner") String owner) {

		logger.debug("Search photo by attrribute");

		List<PhotoOblique> photoObliques = poRepository.findByAnneeBetweenAndOwnerAndTownsContains(startPeriod, endPeriod, owner, "");

		// Return value providers will convert to JSON
		return photoObliques;
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
		if (endPeriod < startPeriod) {
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