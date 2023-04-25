package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Comment;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QCommentRepository{
    List<Comment> findByDid(Long did);
}
