package org.georchestra.photooblique.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.Table;

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
	
	//@Column(name="shape")
	//private Geometry geometry;
	
	@Column(name="objectid")
	private int objectid;
	
	@Column(name="taille_fichier")
	private Integer size;
	
	public PhotoOblique(){
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

	/**
	 * Size is store as octet in database, MegaOctet are require
	 * 
	 * @return int size of the pictures in Mo
	 */
	public Integer getSize() {
		if(size != null && size != 0){
			size = size/1000000;
		}
		return size;
	}


}