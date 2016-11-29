package org.georchestra.photooblique.repository;


import java.util.List;

import org.georchestra.photooblique.model.PhotoOblique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

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
	
	List<PhotoOblique> findByAnneeBetween(int minYear, int maxYear);
	
	List<PhotoOblique> findByAnneeBetweenAndOwner(int minYear, int maxYear, String owner);
	
	List<PhotoOblique> findByAnneeBetweenAndOwnerAndTownsContains(int minYear, int maxYear, String owner, String citie);
	
	@Query("select distinct annee from PhotoOblique order by annee")
	List<Integer> selectDistinctYear();
	
	@Query("select distinct annee from PhotoOblique where commune= ?1 order by annee")
	List<Integer> selectDistinctYearByCities(String cities);
	
	@Query("select distinct owner from PhotoOblique order by owner")
	List<String> selectDistinctOwners();
	
	@Query("select distinct owner from PhotoOblique where annee > ?1 order by owner")
	List<String> selectDistinctOwnersAnneeGreaterThan(int annee);

	@Query("select distinct owner from PhotoOblique where annee between ?1 and ?2 order by owner")
	List<String> selectDistinctOwnersAnneeBetween(int startPeriod, int endPeriod);

	@Query("select distinct owner from PhotoOblique where annee between ?1 and ?2 and commune= ?3 order by owner")
	List<String> selectDistinctOwnersAnneeBetweenAndCities(int startPeriod, int endPeriod, String cities);
	
	@Query("select distinct owner from PhotoOblique where commune= ?1 order by owner")
	List<String> selectDistinctOwnersByCities(String createCities);

	@Query("select distinct owner from PhotoOblique where annee > ?1 and commune= ?2 order by owner")
	List<String> selectDistinctOwnersAnneeGreaterThanAndCities(int startPeriod, String createCities);
}