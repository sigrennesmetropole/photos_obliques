package org.georchestra.photooblique.service.helper;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.georchestra.photooblique.configuration.POPlaceHolder;
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
	
}