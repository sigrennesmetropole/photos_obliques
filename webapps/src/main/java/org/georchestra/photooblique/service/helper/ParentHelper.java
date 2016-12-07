package org.georchestra.photooblique.service.helper;

import java.util.List;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.apache.commons.lang.StringUtils;
import org.georchestra.photooblique.configuration.POPlaceHolder;
import org.georchestra.photooblique.exception.CityCodeFormatException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


/**
 * 
 * @author gfi
 *
 */
public class ParentHelper {
	
	
	final static Logger logger = LoggerFactory.getLogger(ParentHelper.class);

	private static final String TOWNS_SEPARATOR = "|";
	
	private static final int MAX_RESULTS = Integer.parseInt(POPlaceHolder.getProperty("max.result.number"));
	
	@Resource(name = "dbDataSource")
	protected DataSource dataSource;
	
	protected String databaseSchema;
	
	
	/**
	 * 
	 */
	public ParentHelper() {
		super();
		this.databaseSchema = POPlaceHolder.getProperty("schema.name");
		
	}
	
	/**
	 * Cities code are store with | in database
	 * 
	 * @param cities List 
	 * 
	 * @return all city code separated by a |
	 */
	public String createCities(List<String> cities) throws CityCodeFormatException{
		
		logger.debug("Create cities String");
		
		StringBuilder citiesSB = new StringBuilder();
		
		if(!StringUtils.isBlank(cities.get(0))) {
		
			if(cities.get(0).length() != 5 && cities.get(0).lastIndexOf(TOWNS_SEPARATOR) == -1){
				throw new CityCodeFormatException(cities.get(0));
			}
			citiesSB.append(cities.get(0));
		}
			
		//TODO check witch rules create |
		if (cities.size()>1){
	
			for (int i = 1; i < cities.size(); i++) {
				
				if(!StringUtils.isBlank(cities.get(0))) {
					if (cities.get(i).length() != 5){
						throw new CityCodeFormatException(cities.get(i));
					}
					
					citiesSB.append('|');
					citiesSB.append(cities.get(i));
				}
			}
		}
		
		logger.debug("Cities String : " + citiesSB.toString());
		return citiesSB.toString();
	}
	
	
	/**
	 * Create pageable request for JPA repositorie
	 * 
	 * @param startElement
	 * @param limit
	 * @return
	 */
	public Pageable createPageRequest(int startElement, int limit){
		
		logger.debug("Create page request with params : startElement = "+ startElement + " & limit = "+ limit);
		Pageable pageRequest = null;
		
		if (limit <= 0 || limit >= MAX_RESULTS){
			limit = MAX_RESULTS;
		}
		
		if(limit > 0){
			//convert start to page using limit
			
			int pageNumber = startElement / limit;
			logger.debug("Page request pageNumber - " + pageNumber);
			pageRequest = new PageRequest(pageNumber, limit);
			
			logger.debug("Page request information - " + pageRequest.getPageNumber() + " " + pageRequest.getPageSize());
		}
		
		
		return pageRequest;
	}
		
	
}