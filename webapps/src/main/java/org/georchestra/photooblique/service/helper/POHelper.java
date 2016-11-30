package org.georchestra.photooblique.service.helper;


import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.georchestra.photooblique.exception.CityCodeFormatException;
import org.georchestra.photooblique.exception.InputAttributException;
import org.georchestra.photooblique.model.PhotoOblique;
import org.georchestra.photooblique.repository.PORepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class POHelper extends ParentHelper{
	
	@Autowired
	PORepository poRepository;
	
	final static Logger logger = LoggerFactory.getLogger(POHelper.class);

	public List<PhotoOblique> getPOList(int startPeriod, int endPeriod, String owner, List<String> cities) throws InputAttributException, CityCodeFormatException {
		
		List<PhotoOblique> photosList = new ArrayList<PhotoOblique>();
		
		if(cities.isEmpty() && startPeriod ==0 && endPeriod ==0 && StringUtils.isBlank(owner)){
			throw new InputAttributException("Missing input argument");
		}else if(cities.isEmpty() && endPeriod == 0 && StringUtils.isBlank(owner)){
			logger.debug("Search by start period");
			photosList = poRepository.findByYearGreaterThan(startPeriod);
		}else if (cities.isEmpty() && StringUtils.isBlank(owner)){
			logger.debug("Search by period");
			photosList = poRepository.findByYearBetween(startPeriod, endPeriod);		
		}else if (cities.isEmpty() && endPeriod != 0) {
			logger.debug("Search by period and owner");
			photosList = poRepository.findByYearBetweenAndOwner(startPeriod, endPeriod, owner);
		}else if (startPeriod ==0 && endPeriod ==0 && StringUtils.isBlank(owner)) {
			logger.debug("Search by towns");
			photosList = poRepository.findByTownsContains(createCities(cities));
		}else if (endPeriod ==0 && StringUtils.isBlank(owner)) {
			logger.debug("Search by start period and towns");
			photosList = poRepository.findByYearGreaterThanAndTownsContains(startPeriod, createCities(cities));
		}else if (StringUtils.isBlank(owner)) {
			logger.debug("Search by period and towns");
			photosList = poRepository.findByYearBetweenAndTownsContains(startPeriod, endPeriod, createCities(cities));
		}else if (startPeriod ==0 && endPeriod ==0) {
			logger.debug("Search by owner and towns");
			photosList = poRepository.findByOwnerAndTownsContains(owner, createCities(cities));
		}else if (cities.isEmpty() && startPeriod ==0 && endPeriod ==0 ) {
			logger.debug("Search by owner");
			photosList = poRepository.findByOwner(owner);
		}else{
			logger.debug("Search with all params");
			photosList = poRepository.findByYearBetweenAndOwnerAndTownsContains(startPeriod, endPeriod, owner, createCities(cities));
		}
		
		return photosList;
	}



	
	
    
}