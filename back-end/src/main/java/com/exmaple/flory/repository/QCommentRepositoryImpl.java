package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Comment;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.util.List;

import static com.exmaple.flory.entity.QComment.comment;

public class QCommentRepositoryImpl implements QCommentRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public QCommentRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Comment> findByDid(Long did) {
        return jpaQueryFactory
                .selectFrom(comment)
                .where(comment.diary.id.eq(did)).fetch();
    }
}
