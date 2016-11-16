package org.georchestra.photooblique.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="photooblique_emprise")
public class ProprietairePO implements Serializable{
	
		
	/**
	 * 
	 */
	private static final long serialVersionUID = 2310335809821323213L;
	
	@Id
	@Column(name="proprio")
	private String owner;
		
	public ProprietairePO(){}

	
	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}


}