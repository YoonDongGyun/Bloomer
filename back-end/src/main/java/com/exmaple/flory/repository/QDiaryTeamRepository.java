package com.exmaple.flory.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QDiaryTeamRepository {
    List<Long> getGroup(Long diaryId);

    void deleteByDid(Long diaryId);

    List<Long> getDiaryByTid(Long teamId);
}
