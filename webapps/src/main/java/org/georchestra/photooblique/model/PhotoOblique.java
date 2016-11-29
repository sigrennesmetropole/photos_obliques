package org.georchestra.photooblique.model;

import java.io.Serializable;
import java.math.BigDecimal;
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
	private int annee;
	
	@Column(name="date_")
	private Date date;
	
	@Column(name="heure")
	private String hours;
	
	@Column(name="comment")
	private String comment;
	
	@Column(name="angle_deg")
	private BigDecimal angleDeg;
	
	@Column(name="angle_grd")
	private BigDecimal angleGrd;
	
	@Column(name="id_archiv")
	private String idArchiv;
	
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
	
	public PhotoOblique(){}

	public String getPhotoId() {
		return photoId;
	}

	public void setPhotoId(String photoId) {
		this.photoId = photoId;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getHours() {
		return hours;
	}

	public void setHours(String hours) {
		this.hours = hours;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public BigDecimal getAngleDeg() {
		return angleDeg;
	}

	public void setAngleDeg(BigDecimal angleDeg) {
		this.angleDeg = angleDeg;
	}

	public BigDecimal getAngleGrd() {
		return angleGrd;
	}

	public void setAngleGrd(BigDecimal angleGrd) {
		this.angleGrd = angleGrd;
	}

	public String getIdArchiv() {
		return idArchiv;
	}

	public void setIdArchiv(String idArchiv) {
		this.idArchiv = idArchiv;
	}

	public String getOrigin() {
		return origin;
	}

	public void setOrigin(String origin) {
		this.origin = origin;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwners(String owners) {
		this.owner = owners;
	}

	public int getDownloadable() {
		return downloadable;
	}

	public void setDownloadable(int downloadable) {
		this.downloadable = downloadable;
	}

	public String getGeneralCondition() {
		return generalCondition;
	}

	public void setGeneralCondition(String generalCondition) {
		this.generalCondition = generalCondition;
	}

	public String getTowns() {
		return towns;
	}

	public void setTowns(String towns) {
		this.towns = towns;
	}

	public int getObjectid() {
		return objectid;
	}

	public void setObjectid(int objectid) {
		this.objectid = objectid;
	}


}