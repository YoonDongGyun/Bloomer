package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Flower;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

import static com.exmaple.flory.entity.QFlower.flower;

public class QFlowerRepositoryImpl implements QFlowerRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public QFlowerRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Long> getEmotionKey(Long flowerId) {
        return jpaQueryFactory
                .select(flower.emotion.id)
                .from(flower)
                .where(flower.id.eq(flowerId))
                .fetch();
    }

    @Override
    public List<Flower> getFlowers(String emotion) {
        return jpaQueryFactory
                .selectFrom(flower)
                .where(flower.emotion.largeCategory.eq(emotion))
                .fetch();
    }
}
