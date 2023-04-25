package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Garden;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

import static com.exmaple.flory.entity.QGarden.garden;
import static com.exmaple.flory.entity.QMember.member;

@Slf4j
public class QGardenRepositoryImpl implements QGardenRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public QGardenRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Optional<Garden> findByDate(Long user_id ,Integer year,Integer month) {

        return Optional.of(
                jpaQueryFactory
                        .selectFrom(garden)
                        .where(garden.createdDate.month().castToNum(Integer.class).eq(month)
                                .and(garden.createdDate.year().castToNum(Integer.class).eq(year))
                                .and(garden.member.userId.eq(user_id))
                        ).fetchOne());
    }

    //유저가 만든 정원을 시간 오름차순으로 반환
    @Override
    public List<Garden> findAllByUserId(Long userId) {
        return jpaQueryFactory
                .selectFrom(garden)
                .innerJoin(garden.member,member)
                .where(member.userId.eq(userId))
                .orderBy(garden.createdDate.asc())
                .fetch();
    }
}
