package org.georchestra.photooblique.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Converter;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.georchestra.photooblique.configuration.POPlaceHolder;
import org.georchestra.photooblique.converter.URLConverter;


@Entity
@Table(name="photooblique_emprise")
public class PhotoOblique implements Serializable{
	
	/**
	 * Generated serial ID
	 */
	private static final long serialVersionUID = 5439786730972374577L;
	

	@Id
	@Column(name="id")
	private String photoId;

	@Column(name="fichier")
	private String fileName;
	
	@Transient
	private String url;
	
	@Column(name="annee")
	private int year;
	
	@Column(name="date_")
	private Date date;
		
	@Column(name="comment")
	private String comment;
	
	@Column(name="presta")
	private String origin;
	
	@Column(name="proprio")
	private String owner;
	
	@Column(name="telecharg")
	private int downloadable;
	
	@Column(name="mention")
	private String generalCondition;
	
	// Towns are store in a single string separated with |
	@Column(name="commune")
	private String towns;
	
//	@Column(name="shape")
//	private byte[] geometry;
	
	@Column(name="objectid")
	private int objectid;
	
	
	public PhotoOblique(){
		this.url = POPlaceHolder.getProperty("photo.thumb.url");
	}

	public String getPhotoId() {
		return photoId;
	}

	public String getFileName() {
		return fileName;
	}

	public int getYear() {
		return year;
	}

	public Date getDate() {
		return date;
	}

	public String getComment() {
		return comment;
	}

	public String getOrigin() {
		return origin;
	}

	public String getOwner() {
		return owner;
	}

	public int getDownloadable() {
		return downloadable;
	}

	public String getGeneralCondition() {
		return generalCondition;
	}

	public String getTowns() {
		return towns;
	}

	public int getObjectid() {
		return objectid;
	}

	public String getUrl() {
		return url + fileName;
	}

}