package org.georchestra.photooblique.repository;


import java.util.List;

import org.georchestra.photooblique.model.ProprietairePO;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 
 * @author gfi
 * 
 * Repository to get ProprietairePO from database
 *
 */
public interface ProprietaireRepository
    extends JpaRepository<ProprietairePO, Long>
{
    
    
}