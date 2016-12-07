package org.georchestra.photooblique.service;

import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;

import org.georchestra.photooblique.service.helper.CommuneHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;



public class CommuneController {
	
	@Autowired
	CommuneHelper communeHelper;
	
	final static Logger logger = LoggerFactory.getLogger(CommuneController.class);
	
	@Path("/getCommunes/")
    @GET
    @Produces("application/json")
    /**
     *  /getCommune 
     *  
     *  Will return list of communes 
     *  
     * @param libcom, should be the n first characters of a libcom
     * 			n first characters are defined with the minNbCharForSearch from cadastrapp.properties
     * @param cgocommune, from n to six characters
     * 			cgocommune for Code Geographique Officile Commune
     * 			cgocommune = code departement + code arrondissement + code commune
     * 
     * @return JSON 
     * 
     * @throws SQLException
     */
    public Map<String,Object> getCommuneByDate(
    			@Context HttpHeaders headers,
    			@QueryParam("startPeriod") String stringStartPeriod,
    			@QueryParam("endPeriod") String stringEndPeriod){
    	
		int startPeriod = convertToInt(stringStartPeriod);
		int endPeriod = convertToInt(stringEndPeriod);
				
    	Map<String,Object> communes = communeHelper.getCommunes(startPeriod, endPeriod);
    	
    	// Return value providers will convert to JSON
        return communes;
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
    
}