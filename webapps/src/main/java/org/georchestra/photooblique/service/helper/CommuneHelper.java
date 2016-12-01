package org.georchestra.photooblique.service.helper;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.georchestra.photooblique.exception.InputAttributException;
import org.georchestra.photooblique.repository.PORepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



@Component
public class CommuneHelper extends ParentHelper{
	
	@Autowired
	PORepository poRepository;
	
	final static Logger logger = LoggerFactory.getLogger(CommuneHelper.class);

	public Map<String, Object> getCommunes(int startPeriod, int endPeriod) {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		// get Commune code_insee list
		List<String> codeCommunes  = null;
		
		if(startPeriod == 0 && endPeriod == 0){
			codeCommunes = poRepository.selectDistinctCommune();
		}else if (endPeriod == 0){
			codeCommunes = poRepository.selectDistinctCommuneByYearGreaterThan(startPeriod);
		}else{
			codeCommunes = poRepository.selectDistinctCommuneByYearBetween(startPeriod, endPeriod);
		}
		
		// Add name for each code commune
		Map communes = CommunesList.getInstance().getCommunes();
		
		if(communes != null && !communes.isEmpty()){
			// For each commune found add label if exist, code otherwise
			for (String code : codeCommunes){
				
				if(!StringUtils.isBlank(code)){
					// if contains |
					if (code.indexOf('|') != -1){
						String[] codes = code.split("|");
						
						for( String newCode : codes){
							result.put(newCode, (communes.get(newCode) != null) ? communes.get(newCode) : newCode);
						}
					}else{
						result.put(code, (communes.get(code) != null) ? communes.get(code) : code);
					}
				}
			}
		}
		
		return result;
	}
	
	
    
}