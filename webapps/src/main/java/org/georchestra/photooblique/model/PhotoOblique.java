package org.georchestra.cadastrapp.model.request;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.postgis.PGgeometry;

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
	private float angleDeg;
	
	@Column(name="angle_grd")
	private float angleGrd;
	
	@Column(name="id_archiv")
	private String idArchiv;
	
	@Column(name="presta")
	private String origin;
	
	@Column(name="proprio")
	private String owners;
	
	@Column(name="telecharg")
	private int downloadable;
	
	@Column(name="mention")
	private String generalCondition;
	
	// Towns are store in a single string separated with |
	@Column(name="commune")
	private String towns;
	
	@Column(name="shape")
	private PGgeometry geometry;
	
	@Column(name="objectid")
	private int objectid;
	
	public PhotoOblique(){}


}