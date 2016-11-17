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
	
	@Path("/communes/")
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
    			@QueryParam("anneeDeb") int anneeDeb,
    			@QueryParam("anneeFin") int anneeFin){
    	
    	Map<String,Object> communes = communeHelper.getCommunes(anneeDeb, anneeFin);
    	
    	// Return value providers will convert to JSON
        return communes;
    }
    
}