package org.georchestra.photooblique.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;



public class CommuneController {
	
	@Autowired
	CommuneHelper communeHelper;
	
	final static Logger logger = LoggerFactory.getLogger(CommuneController.class);
	
	@Path("/getCommune/")
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
    public List<Map<String,Object>> getCommunesList(
    			@Context HttpHeaders headers,
    			@QueryParam("libcom") String libCom,
    			@QueryParam("cgocommune") String cgoCommune){
    	
    	List<Map<String,Object>> communes = new ArrayList<Map<String, Object>>();
        
    	
    	// Return value providers will convert to JSON
        return communes;
    }
    
}