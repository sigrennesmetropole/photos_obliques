package org.georchestra.photooblique.service.helper;


import java.io.IOException;
import java.net.MalformedURLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.georchestra.photooblique.repository.PORepository;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



@Component
public class CommuneHelper extends ParentHelper{
	
	@Autowired
	PORepository poRepository;
	
	final static Logger logger = LoggerFactory.getLogger(CommuneHelper.class);

	public Map<String, Object> getCommunes(List<String> ids, int startPeriod, int endPeriod) {
		
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> communesMap = new HashMap<String, Object>();
		
		Object[] communeArray = null;
		
		// get Commune code_insee list
		List<String> codeCommunes  = null;

		if (startPeriod == 0 && endPeriod == 0) {
			codeCommunes = poRepository.selectDistinctCommune();
		} else if (endPeriod == 0) {
			codeCommunes = poRepository.selectDistinctCommuneByYearGreaterThan(startPeriod);
		} else {
			codeCommunes = poRepository.selectDistinctCommuneByYearBetween(startPeriod, endPeriod);
		}
				
		// Add name for each code commune
		Map<String,String> communes;
		try {
			communes = CommunesList.getInstance().getCommunes();
		
			if(communes != null && !communes.isEmpty()){
				// For each commune found add label if exist, do not add it otherwise
				for (String code : codeCommunes){
					
					if(!StringUtils.isBlank(code)){
						// if contains |
						if (code.indexOf('|') != -1){
							String[] codes = code.split(Pattern.quote("|"));

							for( String newCode : codes){
								logger.debug("Code commune : " + newCode);
								if(newCode.length()>4 && communes.get(newCode) != null){
									communesMap.put(newCode, communes.get(newCode));
								}
							}
						}else{
							if(code.length()>4 && communes.get(code) != null){
								communesMap.put(code, communes.get(code));
							}
						}
					}
				}
			}
			
			// Filter on given commune ids
			if(!CollectionUtils.isEmpty(ids)){

				Map<String, Object> communesMapTemp = new HashMap<String, Object>();
				for(String id:ids){
					if(StringUtils.isNotEmpty(id)){
						logger.debug("Filter on : " + id);
						communesMapTemp.put(id, communesMap.get(id));
					}
				}
				if(communesMapTemp.size()>0){
					communesMap = communesMapTemp;	
				}				
			}
			
			// Convert Map to Array to fit with ExtJs LoveCombo Store
			communeArray = communesMap.entrySet().toArray(); 

			result.put("succes", true);
			result.put("communes", communeArray);
		} catch (MalformedURLException e) {
			result.put("succes", false);
			result.put("error", e.getMessage());
			logger.error(e.getMessage());
		} catch (IOException e) {
			result.put("succes", false);
			result.put("error",  e.getMessage());
			logger.error(e.getMessage());
		} catch (ParseException e) {
			result.put("succes", false);
			result.put("error", e.getMessage());
			logger.error(e.getMessage());
		}
			
		return result;
	}
	
	
    
}