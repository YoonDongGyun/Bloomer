package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Music;
import com.querydsl.jpa.impl.JPAQueryFactory;

import static com.exmaple.flory.entity.QMusic.music;

public class QMusicRepositoryImpl implements QMusicRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public QMusicRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Music findByTitle(String title) {
        return jpaQueryFactory
                .selectFrom(music)
                .where(music.title.eq(title))
                .fetchOne();
    }
}
