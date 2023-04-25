package com.exmaple.flory.repository;

import com.exmaple.flory.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.*;

import static com.exmaple.flory.entity.QTeam.team;
import static com.exmaple.flory.entity.QUserTeam.userTeam;


public class QTeamRepositoryImpl implements QTeamRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public QTeamRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Team> getAllTeam(Long userId) {

        return jpaQueryFactory
                .selectFrom(team).distinct()
                .leftJoin(userTeam)
                .on(team.teamId.eq(userTeam.tid.teamId))
                .where((userTeam.uid.userId.eq(userId)).or((userTeam.status.eq(1))))
                .fetchJoin()
                .fetch();
    }
    //select * from team left join user_team on team.id = user_team.tid where user_team.uid = 2 or user_team.status  = 1

    @Override
    public List<Team> getAllTeamByKeyWord(String keyword, Long userId){
        return jpaQueryFactory
                .selectFrom(team).distinct()
                .leftJoin(userTeam)
                .on(team.teamId.eq(userTeam.tid.teamId))
                .where(((userTeam.uid.userId.eq(userId)).or((userTeam.status.eq(1)))).and((team.name.contains(keyword)).or((team.info.contains(keyword)))))
                .fetchJoin()
                .fetch();
    }
}
