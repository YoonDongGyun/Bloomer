package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Member;
import com.exmaple.flory.entity.Team;
import com.exmaple.flory.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {
    List<UserTeam> findAllByUidAndStatus(Member uid, int status); // List를 Optional로 예외처리 X
    List<UserTeam> findAllByTidAndStatus(Team tid, int status);
//    List<UserTeam> findAllByUid(Member uid);
    Optional<UserTeam> findByUidAndTid(Member uid, Team tid);
    boolean existsByUidAndTid(Member uid, Team tid);
}
