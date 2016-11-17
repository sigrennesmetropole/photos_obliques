package org.georchestra.photooblique.service.helper;


import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;



@Component
public class CommuneHelper extends ParentHelper{
	
	final static Logger logger = LoggerFactory.getLogger(CommuneHelper.class);

	public Map<String, Object> getCommunes(int anneeDeb, int anneeFin) {
		
		Map<String, Object> communes = new HashMap<String, Object>();
		
		//TODO only to test JSON
		communes.put("35000", "Rennes");

		return communes;
	}
	
	
    
}