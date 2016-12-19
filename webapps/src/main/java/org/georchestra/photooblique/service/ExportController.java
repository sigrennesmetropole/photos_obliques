package org.georchestra.photooblique.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.apache.commons.lang.StringUtils;
import org.georchestra.photooblique.configuration.POPlaceHolder;
import org.georchestra.photooblique.exception.CityCodeFormatException;
import org.georchestra.photooblique.exception.InputAttributException;
import org.georchestra.photooblique.model.PhotoOblique;
import org.georchestra.photooblique.repository.PORepository;
import org.georchestra.photooblique.service.helper.POHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

public class ExportController {

	@Autowired
	PORepository poRepository;
	
	@Autowired
	POHelper poHelper;

	final static Logger logger = LoggerFactory.getLogger(ExportController.class);

	private static final String MENTION_EXTENSION = ".txt";

	@Path("/createZip/")
	@GET
	@Produces("application/zip")
	public Response createZip(@Context HttpHeaders headers, @QueryParam("photoId") List<String> photosIds) {

		ResponseBuilder response = Response.noContent();

		logger.debug("Create Zip with given ids");

		// Return empty reponse if no input
		if (!photosIds.isEmpty()) {

			String zipTempFolder = POPlaceHolder.getProperty("temp.folder");
			String zipFileName = "zipTest.zip";
			String photoFolder = POPlaceHolder.getProperty("photo.folder");
			boolean atLeastOneFileAdded = false;

			List<PhotoOblique> photos = poRepository.findByPhotoIdIn(photosIds);

			byte[] buffer = new byte[1024];

			File finalZip = new File(zipTempFolder + zipFileName);
			finalZip.deleteOnExit();

			FileOutputStream StreamZip;
			try {
				StreamZip = new FileOutputStream(finalZip);

				// out put file
				ZipOutputStream out = new ZipOutputStream(StreamZip);

				for (PhotoOblique photo : photos) {

					logger.debug("Adding file  : " + photo.getFileName() + " to zip : " + zipFileName);

					try {
						
						// Add photo to zip
						File photoFile = new File(photoFolder + photo.getFileName());
						FileInputStream in = new FileInputStream(photoFile);
						
						out.putNextEntry(new ZipEntry(photoFile.getName()));

						int count;

						while ((count = in.read(buffer)) > 0) {
							out.write(buffer, 0, count);
						}

						out.closeEntry();
						in.close();
						
						// Add general use .txt to zip									
						// Only add entry if condition are not null
						if(!StringUtils.isBlank(photo.getGeneralCondition())){
							out.putNextEntry(new ZipEntry(photo.getPhotoId() + MENTION_EXTENSION));
							out.write(photo.getGeneralCondition().getBytes());
							out.closeEntry();
						}
						
						atLeastOneFileAdded = true;
					} catch (FileNotFoundException e) {
						logger.error("File not added to zip : " + e.getMessage());
					}catch (IOException e) {
						logger.error("Missing file : " + e.getMessage());
					}
				}

				out.close();

				// only send Zip if one file is in it
				if (atLeastOneFileAdded){
					response = Response.ok((Object) finalZip);
					response.header("Content-Disposition", "attachment; filename=" + finalZip.getName());
				}

			} catch (FileNotFoundException e) {
				logger.error("Zip not created : " + e.getMessage());
			} catch (IOException e) {
				logger.error("Zip buffer not available: " + e.getMessage());
			}
		}

		return response.build();
	}
	
	
	@Path("/createCSVById/")
	@GET
	@Produces("text/csv")
	public Response createCSV(@Context HttpHeaders headers, @QueryParam("photoId") List<String> photosIds) {

		ResponseBuilder response = Response.noContent();

		logger.info("Create CSV with given ids");

		// Return empty reponse if no input
		if (!photosIds.isEmpty()) {

			List<PhotoOblique> photos = poRepository.findByPhotoIdIn(photosIds);
			CsvMapper mapper = new CsvMapper();
			CsvSchema schema = mapper.schemaFor(PhotoOblique.class).withHeader();
			try {
				String csv = mapper.writer(schema).writeValueAsString(photos);
				response = Response.ok((String) csv);
				response.header("Content-Disposition", "attachment; filename=export.csv");
			} catch (JsonProcessingException e) {
				logger.error("Error while creatin CSV file : " + e.getMessage());
			}
		}
	    
	    return response.build();
	}
	
	@Path("/createCSVByAttribute/")
	@GET
	@Produces("text/csv")
	public Response createCSV(@Context HttpHeaders headers, 
			@QueryParam("cities") List<String> cities,
			@QueryParam("startPeriod")String StringStartPeriod, 
			@QueryParam("endPeriod") String StringEndPeriod,
			@QueryParam("owner") String owner) throws InputAttributException, CityCodeFormatException {

		ResponseBuilder response = Response.noContent();
		
		int startPeriod = convertToInt(StringStartPeriod);
		int endPeriod = convertToInt(StringEndPeriod);

		logger.info("Create CSV with given attributes");

		//TODO use helper
		List<PhotoOblique> photos = poHelper.getPOList(startPeriod, endPeriod, owner, cities);
		
		
		CsvMapper mapper = new CsvMapper();
		CsvSchema schema = mapper.schemaFor(PhotoOblique.class).withHeader();
		try {
			String csv = mapper.writer(schema).writeValueAsString(photos);
			response = Response.ok((String) csv);
			response.header("Content-Disposition", "attachment; filename=export.csv");
		} catch (JsonProcessingException e) {
			logger.error("Error while creatin CSV file : " + e.getMessage());
		}
			    
	    return response.build();
	}
	
	/**
	 * 
	 * @param stringToConvert
	 * @return
	 */
	private int convertToInt(String stringToConvert) {
		
		int i = 0;
		//Parse String to int to avoir numberformatexception
		if(stringToConvert != null && !stringToConvert.isEmpty()){
			i = Integer.parseInt(stringToConvert);
		}
		
		return i;
	}
}
