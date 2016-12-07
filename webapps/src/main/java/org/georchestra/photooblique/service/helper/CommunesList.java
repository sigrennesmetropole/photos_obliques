package org.georchestra.photooblique.service.helper;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.georchestra.photooblique.configuration.POPlaceHolder;
import org.georchestra.photooblique.service.ExportController;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CommunesList {

	final static Logger logger = LoggerFactory.getLogger(ExportController.class);
	
	 private Map<String,String> communes = new HashMap<String,String>();

	/** Constructeur privé */
	private CommunesList() {

		logger.debug("Intialize commune list");
		
		String url = POPlaceHolder.getProperty("commune.url");
		/*
		 * {"type":"FeatureCollection","totalFeatures":148,"features":[{"type":
		 * "Feature","id":null,"geometry":{"type":"MultiPolygon","coordinates":[
		 * [[[1369060.97,7213743.99],[1368940.85,7213794.64],[1368914.2,7213807.
		 * 64],[1368911.8759,7213809.0328],]]]},"geometry_name":"geom_poly","properties":{"code_insee":35254,"nom":
		 * "Saint-Aubin-du-Pavail","objectid":42,"commune_agglo":0,"x_centrbrg":
		 * 1367561,"y_centrbrg":7214472}},
		 */
		try {
			logger.debug("Call WFS Service");
			String communeGeoJson = IOUtils.toString(new URL(url));
			logger.debug("Create JsonObject");
			JSONObject communeJsonObject = (JSONObject) JSONValue.parseWithException(communeGeoJson);

			// get the data
			logger.debug("Get features list");
			JSONArray features = (JSONArray) communeJsonObject.get("features");

			// parse each feature
			for (int i = 0; i < features.size(); i++) {
				JSONObject firstCommune = (JSONObject) features.get(i);
				JSONObject communeProperties = (JSONObject) firstCommune.get("properties");
				Long code_insee = (Long) communeProperties.get("code_insee");
				String nom = (String) communeProperties.get("nom");
				logger.debug(" Code : " + code_insee + "-  nom : " + nom);
				
				communes.put((String) Long.toString(code_insee), nom);
			}

		} catch (IOException e) {
			logger.error("JSON not available " + e.getMessage());
		}
		catch (ParseException e) {
			logger.error("Parsin errors : " + e.getMessage());
		}
	}

	/** Singleton **/
	private static CommunesList INSTANCE = null;

	public static CommunesList getInstance() {
		if (INSTANCE == null) {
			synchronized (CommunesList.class) {
				if (INSTANCE == null) {
					INSTANCE = new CommunesList();
				}
			}
		}
		return INSTANCE;
	}
	
	/**
	 * 
	 * @return
	 */
	public Map<String,String> getCommunes(){
		return communes;
	}
}
