package org.georchestra.photooblique.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class URLConverter implements AttributeConverter<String, String> {

	//TODO set in config file
    private static final String PATH = "https://cadastrapp-qualif.asogfi.fr/photos/";


    @Override
    public String convertToEntityAttribute(String dbData) {
      
    	return PATH + dbData;
    }


	@Override
	public String convertToDatabaseColumn(String arg0) {
		// Not needed, this app only reads from database, no write and no convertion 
		return null;
	}
}