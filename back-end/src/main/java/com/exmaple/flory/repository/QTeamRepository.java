package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Team;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QTeamRepository {
    public List<Team> getAllTeam(Long userId);
    public List<Team> getAllTeamByKeyWord(String keyword, Long userId);
}
