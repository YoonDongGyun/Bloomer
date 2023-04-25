package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Flower;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QFlowerRepository {
    List<Long> getEmotionKey(Long flowerId);

    List<Flower> getFlowers(String emotion);
}
