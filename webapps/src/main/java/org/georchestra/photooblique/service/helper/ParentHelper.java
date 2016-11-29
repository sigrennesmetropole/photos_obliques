package org.georchestra.photooblique.service.helper;

import java.util.List;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.georchestra.photooblique.configuration.POPlaceHolder;
import org.georchestra.photooblique.exception.CityCodeFormatException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * 
 * @author gfi
 *
 */
public class ParentHelper {
	
	
	final static Logger logger = LoggerFactory.getLogger(ParentHelper.class);
	
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
		
		if (cities.get(0).length() != 5){
			throw new CityCodeFormatException(cities.get(0));
		}
		citiesSB.append(cities.get(0));
		
		//TODO check witch rules create |
		if (cities.size()>1){
	
			for (int i = 1; i < cities.size(); i++) {
				
				if (cities.get(i).length() != 5){
					throw new CityCodeFormatException(cities.get(i));
				}
				
				citiesSB.append('|');
				citiesSB.append(cities.get(i));
			}
		}
		
		logger.debug("Cities String : " + citiesSB.toString());
		return citiesSB.toString();
	}
		
	
}