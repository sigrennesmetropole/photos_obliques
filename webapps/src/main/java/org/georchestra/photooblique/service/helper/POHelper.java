package org.georchestra.photooblique.service.helper;


import java.util.ArrayList;
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

	public Map<String, Object> getPagedPOList(int startPeriod, int endPeriod, String owner, List<String> cities, int start, int limit) throws InputAttributException, CityCodeFormatException {
		
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
			if(cities.size()==1){
				photoPage = poRepository.findByTownsContains(cities.get(0), pageRequest); 
			}
			else{
				photoPage = poRepository.findByTownsSimilarTo(createCities(cities), pageRequest); 
			}		  
		}else if (endPeriod ==0 && StringUtils.isBlank(owner)) {
			logger.debug("Search by start period and towns");
			if(cities.size()==1){
				photoPage = poRepository.findByYearGreaterThanAndTownsContains(startPeriod, cities.get(0), pageRequest); 
			}
			else{
				photoPage = poRepository.findByYearGreaterThanAndTownsSimilarTo(startPeriod, createCities(cities), pageRequest); 
			}
			   
		}else if (StringUtils.isBlank(owner)) {
			logger.debug("Search by period and towns");
			if(cities.size()==1){
				photoPage = poRepository.findByYearBetweenAndTownsContains(startPeriod, endPeriod, cities.get(0), pageRequest);  
			}
			else{
				photoPage = poRepository.findByYearBetweenAndTownsSimilarTo(startPeriod, endPeriod, createCities(cities), pageRequest); 
			}
			   
		}else if (startPeriod ==0 && endPeriod ==0) {
			logger.debug("Search by owner and towns");
			if(cities.size()==1){
				photoPage = poRepository.findByOwnerAndTownsContains(owner, cities.get(0), pageRequest);  
			}
			else{
				photoPage = poRepository.findByOwnerAndTownsSimilarTo(owner, createCities(cities), pageRequest); 
			}		   
		}else if (cities.isEmpty() && startPeriod ==0 && endPeriod ==0 ) {
			logger.debug("Search by owner");
			photoPage = poRepository.findByOwner(owner, pageRequest);    
		}else{
			logger.debug("Search with all params");
			if(cities.size()==1){
				photoPage = poRepository.findByYearBetweenAndOwnerAndTownsContains(startPeriod, endPeriod, owner, cities.get(0), pageRequest);     
			}
			else{
				photoPage = poRepository.findByYearBetweenAndOwnerAndTownsSimilarTo(startPeriod, endPeriod, owner, createCities(cities), pageRequest);    
			}					
		}
		
		if(photoPage != null){
			resultat.put("results", photoPage.getTotalElements());
			resultat.put("rows", photoPage.getContent());	 
		}
		
		return resultat;
	}	
	
	/**
	 * 
	 * @param startPeriod
	 * @param endPeriod
	 * @param owner
	 * @param cities
	 * @return
	 * @throws InputAttributException
	 * @throws CityCodeFormatException
	 */
	public List<PhotoOblique> getPOList(int startPeriod, int endPeriod, String owner, List<String> cities) throws InputAttributException, CityCodeFormatException {

		List<PhotoOblique> photos = new ArrayList<PhotoOblique>();

		if (cities.isEmpty() && startPeriod == 0 && endPeriod == 0 && StringUtils.isBlank(owner)) {
			throw new InputAttributException("Missing input argument");
		} else if (cities.isEmpty() && endPeriod == 0 && StringUtils.isBlank(owner)) {
			logger.debug("Search by start period");
			photos = poRepository.findByYearGreaterThan(startPeriod - 1);
		} else if (cities.isEmpty() && StringUtils.isBlank(owner)) {
			logger.debug("Search by period");
			photos = poRepository.findByYearBetween(startPeriod, endPeriod);
		} else if (cities.isEmpty() && endPeriod != 0) {
			logger.debug("Search by period and owner");
			photos = poRepository.findByYearBetweenAndOwner(startPeriod, endPeriod, owner);
		} else if (startPeriod == 0 && endPeriod == 0 && StringUtils.isBlank(owner)) {
			logger.debug("Search by towns");
			if (cities.size() == 1) {
				photos = poRepository.findByTownsContains(cities.get(0));
			} else {
				photos = poRepository.findByTownsSimilarTo(createCities(cities));
			}
		} else if (endPeriod == 0 && StringUtils.isBlank(owner)) {
			logger.debug("Search by start period and towns");
			if (cities.size() == 1) {
				photos = poRepository.findByYearGreaterThanAndTownsContains(startPeriod, cities.get(0));
			} else {
				photos = poRepository.findByYearGreaterThanAndTownsSimilarTo(startPeriod, createCities(cities));
			}

		} else if (StringUtils.isBlank(owner)) {
			logger.debug("Search by period and towns");
			if (cities.size() == 1) {
				photos = poRepository.findByYearBetweenAndTownsContains(startPeriod, endPeriod, cities.get(0));
			} else {
				photos = poRepository.findByYearBetweenAndTownsSimilarTo(startPeriod, endPeriod, createCities(cities));
			}

		} else if (startPeriod == 0 && endPeriod == 0) {
			logger.debug("Search by owner and towns");
			if (cities.size() == 1) {
				photos = poRepository.findByOwnerAndTownsContains(owner, cities.get(0));
			} else {
				photos = poRepository.findByOwnerAndTownsSimilarTo(owner, createCities(cities));
			}
		} else if (cities.isEmpty() && startPeriod == 0 && endPeriod == 0) {
			logger.debug("Search by owner");
			photos = poRepository.findByOwner(owner);
		} else {
			logger.debug("Search with all params");
			if (cities.size() == 1) {
				photos = poRepository.findByYearBetweenAndOwnerAndTownsContains(startPeriod, endPeriod, owner,
						cities.get(0));
			} else {
				photos = poRepository.findByYearBetweenAndOwnerAndTownsSimilarTo(startPeriod, endPeriod, owner,
						createCities(cities));
			}
		}

		return photos;
	}
    
}