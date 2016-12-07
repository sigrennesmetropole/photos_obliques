package org.georchestra.photooblique.service.helper;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.georchestra.photooblique.exception.CityCodeFormatException;
import org.georchestra.photooblique.exception.InputAttributException;
import org.georchestra.photooblique.model.PhotoOblique;
import org.georchestra.photooblique.repository.PORepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;


@Component
public class POHelper extends ParentHelper{
	
	@Autowired
	PORepository poRepository;
	
	final static Logger logger = LoggerFactory.getLogger(POHelper.class);

	public Map<String, Object> getPOList(int startPeriod, int endPeriod, String owner, List<String> cities, int start, int limit) throws InputAttributException, CityCodeFormatException {
		
		Map<String, Object> resultat = new HashMap<String, Object>();
		
		Page<PhotoOblique> photoPage = null;
		Pageable pageRequest = createPageRequest(start, limit);
		
		if(cities.isEmpty() && startPeriod ==0 && endPeriod ==0 && StringUtils.isBlank(owner)){
			throw new InputAttributException("Missing input argument");
		}else if(cities.isEmpty() && endPeriod == 0 && StringUtils.isBlank(owner)){
			logger.debug("Search by start period");
			photoPage = poRepository.findByYearGreaterThan(startPeriod -1, pageRequest);		 			 
		}else if (cities.isEmpty() && StringUtils.isBlank(owner)){
			logger.debug("Search by period");
			photoPage = poRepository.findByYearBetween(startPeriod, endPeriod, pageRequest);	    
		}else if (cities.isEmpty() && endPeriod != 0) {
			logger.debug("Search by period and owner");
			photoPage = poRepository.findByYearBetweenAndOwner(startPeriod, endPeriod, owner, pageRequest);    
		}else if (startPeriod ==0 && endPeriod ==0 && StringUtils.isBlank(owner)) {
			logger.debug("Search by towns");
			photoPage = poRepository.findByTownsContains(createCities(cities), pageRequest);   
		}else if (endPeriod ==0 && StringUtils.isBlank(owner)) {
			logger.debug("Search by start period and towns");
			photoPage = poRepository.findByYearGreaterThanAndTownsContains(startPeriod, createCities(cities), pageRequest);    
		}else if (StringUtils.isBlank(owner)) {
			logger.debug("Search by period and towns");
			photoPage = poRepository.findByYearBetweenAndTownsContains(startPeriod, endPeriod, createCities(cities), pageRequest);    
		}else if (startPeriod ==0 && endPeriod ==0) {
			logger.debug("Search by owner and towns");
			photoPage = poRepository.findByOwnerAndTownsContains(owner, createCities(cities), pageRequest);   
		}else if (cities.isEmpty() && startPeriod ==0 && endPeriod ==0 ) {
			logger.debug("Search by owner");
			photoPage = poRepository.findByOwner(owner, pageRequest);    
		}else{
			logger.debug("Search with all params");
			photoPage = poRepository.findByYearBetweenAndOwnerAndTownsContains(startPeriod, endPeriod, owner, createCities(cities), pageRequest);    
		}
		
		if(photoPage != null){
			resultat.put("results", photoPage.getTotalElements());
			resultat.put("rows", photoPage.getContent());	 
		}
		
		return resultat;
	}	
    
}