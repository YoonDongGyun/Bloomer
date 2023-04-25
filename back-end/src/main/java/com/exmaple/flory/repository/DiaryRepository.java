package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository <Diary, Long>, QDiaryRepository{

    @Query(value = "select * from diary where gid=:gardenId and yearweek(created_time,1) = yearweek(now());", nativeQuery = true)
    List<Diary> findDiaryInWeek(@Param("gardenId") Long gardenId);

    @Query(value = "select * from diary where gid=:gardenId and year(created_time) = year(now()) and month(created_time) = month(now());", nativeQuery = true)
    List<Diary> findDiaryInMonth(@Param("gardenId") Long gardenId);

    @Query(value = "select * from diary where gid=:gardenId and yearweek(created_time,1) = yearweek(DATE_SUB(now(),INTERVAL 7 DAY));", nativeQuery = true)
    List<Diary> findDiaryInLastWeek(@Param("gardenId") Long gardenId);

}
