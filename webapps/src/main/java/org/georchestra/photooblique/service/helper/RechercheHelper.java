package org.georchestra.photooblique.service.helper;


import java.util.ArrayList;
import java.util.List;

import org.georchestra.photooblique.exception.CityCodeFormatException;
import org.georchestra.photooblique.repository.PORepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RechercheHelper extends ParentHelper{
	
	@Autowired
	PORepository poRepository;
	
	final static Logger logger = LoggerFactory.getLogger(RechercheHelper.class);

	/**
	 * 
	 * @param cities
	 * @return
	 * @throws CityCodeFormatException 
	 */
	public List<Integer> getYears(List<String> cities) throws CityCodeFormatException {
		
		List<Integer> yearsList = new ArrayList<Integer>();
		
		if(cities.isEmpty()){
			yearsList = poRepository.selectDistinctYear();
		}else if(cities.size()==1){
			yearsList = poRepository.selectDistinctYearByCities(cities.get(0));
		}else{
			yearsList = poRepository.selectDistinctYearByCitiesLikeAny(createCities(cities));
		}

		return yearsList;
	}


	/**
	 * 
	 * @param startPeriod optional - int only year on 4 chars
	 * @param endPeriod optional - int only year on 4 chars
	 * @param cities - List of city code on 5 char
	 * 
	 * @return
	 * @throws CityCodeFormatException 
	 */
	public List<String> getOwners(int startPeriod, int endPeriod, List<String> cities) throws CityCodeFormatException {
		
		logger.debug(" GetOwners params, startPeriod : "+ startPeriod + " - endPeriod " + endPeriod + " - cities " + cities);
		
		List<String> ownersList = new ArrayList<String>();
		
		if(cities.isEmpty() && startPeriod ==0 && endPeriod ==0){
			ownersList = poRepository.selectDistinctOwners();
		}else if(cities.isEmpty() && endPeriod == 0){
			ownersList = poRepository.selectDistinctOwnersByYearGreaterThan(startPeriod);
		}else if (cities.isEmpty()){
			ownersList = poRepository.selectDistinctOwnersByYearBetween(startPeriod, endPeriod);
		}else if (startPeriod ==0 && endPeriod ==0) {
			ownersList = poRepository.selectDistinctOwnersByCities(createCities(cities));
		}else if (endPeriod ==0) {
			ownersList = poRepository.selectDistinctOwnersByYearGreaterThanAndCities(startPeriod, createCities(cities));
		}else{
			ownersList = poRepository.selectDistinctOwnersByYearBetweenAndCities(startPeriod, endPeriod, createCities(cities));
		}
		
		return ownersList;
	}
	
    
}