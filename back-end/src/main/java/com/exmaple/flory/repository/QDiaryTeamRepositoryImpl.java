package com.exmaple.flory.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

import static com.exmaple.flory.entity.QDiaryTeam.diaryTeam;

public class QDiaryTeamRepositoryImpl implements QDiaryTeamRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public QDiaryTeamRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Long> getGroup(Long diaryId) {
        return jpaQueryFactory
                .select(diaryTeam.groupId)
                .from(diaryTeam)
                .where(diaryTeam.diaryId.eq(diaryId))
                .fetch();
    }

    @Override
    public void deleteByDid(Long diaryId) {
        jpaQueryFactory
                .delete(diaryTeam)
                .where(diaryTeam.diaryId.eq(diaryId))
                .execute();

    }

    @Override
    public List<Long> getDiaryByTid(Long teamId) {
        return jpaQueryFactory
                .select(diaryTeam.diaryId)
                .from(diaryTeam)
                .where(diaryTeam.groupId.eq(teamId))
                .fetch();
    }
}
