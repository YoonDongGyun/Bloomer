package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Guest;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

import static com.exmaple.flory.entity.QGuest.guest;

public class QGuestRepositoryImpl implements QGuestRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public QGuestRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }
    @Override
    public List<Guest> getAllGuestByGardenId(Long garden_id) {
        return jpaQueryFactory
                .selectFrom(guest)
                .where(guest.garden.id.eq(garden_id))
                .fetch();
    }
}
