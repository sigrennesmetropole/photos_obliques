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
    
	List<PhotoOblique> findByYearGreaterThan(int year);
	
	List<PhotoOblique> findByYearBetween(int minYear, int maxYear);
	
	List<PhotoOblique> findByYearBetweenAndOwner(int minYear, int maxYear, String owner);
	
	List<PhotoOblique> findByYearBetweenAndOwnerAndTownsContains(int minYear, int maxYear, String owner, String cities);
	
	List<PhotoOblique> findByTownsContains(String cities);
	
	List<PhotoOblique> findByOwner(String owner);

	List<PhotoOblique> findByYearGreaterThanAndTownsContains(int minYear, String cities);
	
	List<PhotoOblique> findByYearBetweenAndTownsContains(int startPeriod, int endPeriod, String createCities);
	
	List<PhotoOblique> findByOwnerAndTownsContains(String owner, String cities);
	
	List<PhotoOblique> findByPhotoIdIn(List<String> ids);

	
	@Query("select distinct year from PhotoOblique order by year")
	List<Integer> selectDistinctYear();
	
	@Query("select distinct year from PhotoOblique where towns= ?1 order by year")
	List<Integer> selectDistinctYearByCities(String cities);
	
	@Query("select distinct owner from PhotoOblique order by owner")
	List<String> selectDistinctOwners();
	
	@Query("select distinct owner from PhotoOblique where year > ?1 order by owner")
	List<String> selectDistinctOwnersByYearGreaterThan(int annee);

	@Query("select distinct owner from PhotoOblique where year between ?1 and ?2 order by owner")
	List<String> selectDistinctOwnersByYearBetween(int startPeriod, int endPeriod);

	@Query("select distinct owner from PhotoOblique where year between ?1 and ?2 and towns= ?3 order by owner")
	List<String> selectDistinctOwnersByYearBetweenAndCities(int startPeriod, int endPeriod, String cities);
	
	@Query("select distinct owner from PhotoOblique where towns= ?1 order by owner")
	List<String> selectDistinctOwnersByCities(String createCities);

	@Query("select distinct owner from PhotoOblique where year > ?1 and towns= ?2 order by owner")
	List<String> selectDistinctOwnersByYearGreaterThanAndCities(int startPeriod, String createCities);

	@Query("select distinct towns from PhotoOblique where year between ?1 and ?2 order by towns")
	List<String> selectDistinctCommuneByYearBetween(int startPeriod, int endPeriod);

	@Query("select distinct towns from PhotoOblique order by towns")
	List<String> selectDistinctCommune();

	@Query("select distinct towns from PhotoOblique where year > ?1 order by towns")
	List<String> selectDistinctCommuneByYearGreaterThan(int startPeriod);


}