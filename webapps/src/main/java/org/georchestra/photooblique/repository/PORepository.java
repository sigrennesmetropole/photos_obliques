package org.georchestra.photooblique.repository;


import java.util.List;

import org.georchestra.photooblique.model.PhotoOblique;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 
 * @author gfi
 * 
 * Repository to get PhotoOblique from database
 *
 */
public interface PORepository
    extends JpaRepository<PhotoOblique, Long>
{
    
	List<PhotoOblique> findByAnnee(int year);
	
	List<PhotoOblique> findByAnneeGreaterThan(int minYear);
    
    
}