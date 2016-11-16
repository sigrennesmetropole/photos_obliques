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

import org.georchestra.photooblique.model.PhotoOblique;
import org.georchestra.photooblique.repository.PORepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


public class POController {
	
	final static Logger logger = LoggerFactory.getLogger(POController.class);
	
	@Autowired
	PORepository poRepository;
	
	@Path("/getPhotoByAttribute/")
    @GET
    @Produces("application/json")
    public List<PhotoOblique> getPOList(
    			@Context HttpHeaders headers,
    			@QueryParam("city") String city,
    			@QueryParam("minyear") int minyear,
    			@QueryParam("maxyear") int maxyear,
    			@QueryParam("owner") String owner){
		
		logger.debug("Search photo by attrribute");
    	
    	List<PhotoOblique> photoObliques = poRepository.findByAnnee(minyear);
        
    	
    	
    	// Return value providers will convert to JSON
        return photoObliques;
    }
    
}