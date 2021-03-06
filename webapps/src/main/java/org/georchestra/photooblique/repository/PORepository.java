package org.georchestra.photooblique.repository;

import java.util.List;

import org.georchestra.photooblique.model.PhotoOblique;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	
	Page<PhotoOblique> findByYearGreaterThan(int year, Pageable pageable);
	
	List<PhotoOblique> findByYearBetween(int minYear, int maxYear);
	
	Page<PhotoOblique> findByYearBetween(int minYear, int maxYear, Pageable pageable);
	
	List<PhotoOblique> findByYearBetweenAndOwner(int minYear, int maxYear, String owner);
	
	Page<PhotoOblique> findByYearBetweenAndOwner(int minYear, int maxYear, String owner, Pageable pageable);
	
	List<PhotoOblique> findByYearBetweenAndOwnerAndTownsContains(int minYear, int maxYear, String owner, String citie);
	
	Page<PhotoOblique> findByYearBetweenAndOwnerAndTownsContains(int minYear, int maxYear, String owner, String cities, Pageable pageable);
	
	@Query("select p from PhotoOblique p where year between ?1 and ?2  and owner like %?3% and SIMILARTO(towns,?4)=1")
	List<PhotoOblique> findByYearBetweenAndOwnerAndTownsSimilarTo(int minYear, int maxYear, String owner, String cities);
	
	@Query("select p from PhotoOblique p where year between ?1 and ?2  and owner like %?3% and SIMILARTO(towns,?4)=1")
	Page<PhotoOblique> findByYearBetweenAndOwnerAndTownsSimilarTo(int minYear, int maxYear, String owner, String cities, Pageable pageable);
	
	List<PhotoOblique> findByTownsContains(String citie);
	
	Page<PhotoOblique> findByTownsContains(String citie, Pageable pageable);
	
	
	@Query("select p from PhotoOblique p where SIMILARTO(towns,?1)=1")
	List<PhotoOblique> findByTownsSimilarTo(String cities);
	
	@Query("select p from PhotoOblique p where SIMILARTO(towns,?1)=1")
	Page<PhotoOblique> findByTownsSimilarTo(String createCities, Pageable pageRequest);
		
	List<PhotoOblique> findByOwner(String owner);
	
	Page<PhotoOblique> findByOwner(String owner, Pageable pageable);
	
	List<PhotoOblique> findByYearGreaterThanAndTownsContains(int minYear, String citie);
	
	Page<PhotoOblique> findByYearGreaterThanAndTownsContains(int minYear, String citie, Pageable pageable);
	
	@Query("select p from PhotoOblique p where year > ?1 and SIMILARTO(towns,?2)=1")
	List<PhotoOblique> findByYearGreaterThanAndTownsSimilarTo(int minYear, String cities);
	
	@Query("select p from PhotoOblique p where year > ?1 and SIMILARTO(towns,?2)=1")
	Page<PhotoOblique> findByYearGreaterThanAndTownsSimilarTo(int startPeriod, String cities, Pageable pageable);
	
	List<PhotoOblique> findByYearBetweenAndTownsContains(int startPeriod, int endPeriod, String citie);
	
	Page<PhotoOblique> findByYearBetweenAndTownsContains(int startPeriod, int endPeriod, String citie, Pageable pageable);
	
	@Query("select p from PhotoOblique p where year between ?1 and ?2  and SIMILARTO(towns,?3)=1")
	List<PhotoOblique> findByYearBetweenAndTownsSimilarTo(int startPeriod, int endPeriod, String cities);
	
	@Query("select p from PhotoOblique p where year between ?1 and ?2  and SIMILARTO(towns,?3)=1")
	Page<PhotoOblique> findByYearBetweenAndTownsSimilarTo(int startPeriod, int endPeriod, String cities, Pageable pageable);

	List<PhotoOblique> findByOwnerAndTownsContains(String owner, String citie);
	
	Page<PhotoOblique> findByOwnerAndTownsContains(String owner, String citie, Pageable pageable);
	
	@Query("select p from PhotoOblique p where owner like %?1% and SIMILARTO(towns,?2)=1")
	List<PhotoOblique> findByOwnerAndTownsSimilarTo(String owner, String cities);
	
	@Query("select p from PhotoOblique p where owner like %?1% and SIMILARTO(towns,?2)=1")
	Page<PhotoOblique> findByOwnerAndTownsSimilarTo(String owner, String cities, Pageable pageable);
	
	List<PhotoOblique> findByPhotoIdIn(List<String> ids);
	
	Page<PhotoOblique> findByPhotoIdIn(List<String> ids, Pageable pageable);

	Page<PhotoOblique> findByPhotoIdInAndYearGreaterThan(List<String> ids, int i, Pageable pageRequest);

	Page<PhotoOblique> findByPhotoIdInAndYearBetween(List<String> ids, int startPeriod, int endPeriod, Pageable pageRequest);

	Page<PhotoOblique> findByPhotoIdInAndYearBetweenAndOwner(List<String> ids, int startPeriod, int endPeriod, String owner, Pageable pageRequest);

	Page<PhotoOblique> findByPhotoIdInAndTownsContains(List<String> ids, String string, Pageable pageRequest);

	@Query("select p from PhotoOblique p where photoId in ?1 and SIMILARTO(towns,?2)=1")
	Page<PhotoOblique> findByPhotoIdInAndTownsSimilarTo(List<String> ids, String createCities, Pageable pageRequest);

	Page<PhotoOblique> findByPhotoIdInAndYearGreaterThanAndTownsContains(List<String> ids, int startPeriod,	String string, Pageable pageRequest);

	@Query("select p from PhotoOblique p where photoId in ?1 and year > ?2 and SIMILARTO(towns,?3)=1")
	Page<PhotoOblique> findByPhotoIdInAndYearGreaterThanAndTownsSimilarTo(List<String> ids, int startPeriod, String createCities, Pageable pageRequest);

	Page<PhotoOblique> findByPhotoIdInAndYearBetweenAndTownsContains(List<String> ids, int startPeriod, int endPeriod, String string, Pageable pageRequest);

	@Query("select p from PhotoOblique p where photoId in ?1 and year between ?2 and ?3  and SIMILARTO(towns,?4)=1")
	Page<PhotoOblique> findByPhotoIdInAndYearBetweenAndTownsSimilarTo(List<String> ids, int startPeriod, int endPeriod,	String createCities, Pageable pageRequest);

	Page<PhotoOblique> findByPhotoIdInAndOwnerAndTownsContains(List<String> ids, String owner, String string, Pageable pageRequest);

	@Query("select p from PhotoOblique p where photoId in ?1 and owner like %?2% and SIMILARTO(towns,?3)=1")
	Page<PhotoOblique> findByPhotoIdInAndOwnerAndTownsSimilarTo(List<String> ids, String owner, String createCities, Pageable pageRequest);

	Page<PhotoOblique> findByPhotoIdInAndOwner(List<String> ids, String owner, Pageable pageRequest);

	Page<PhotoOblique> findByPhotoIdInAndYearBetweenAndOwnerAndTownsContains(List<String> ids, int startPeriod,	int endPeriod, String owner, String string, Pageable pageRequest);

	@Query("select p from PhotoOblique p where photoId in ?1 and year between ?2 and ?3  and owner like %?4% and SIMILARTO(towns,?5)=1")
	Page<PhotoOblique> findByPhotoIdInAndYearBetweenAndOwnerAndTownsSimilarTo(List<String> ids, int startPeriod, int endPeriod, String owner, String createCities, Pageable pageRequest);
	
	
	@Query("select distinct year from PhotoOblique order by year")
	List<Integer> selectDistinctYear();
	
	@Query("select distinct year from PhotoOblique where towns like %?1% order by year")
	List<Integer> selectDistinctYearByCities(String cities);
	
	@Query("select distinct year from PhotoOblique where SIMILARTO(towns,?1)=1 order by year")
	List<Integer> selectDistinctYearByCitiesLikeAny(String createCities);
	
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