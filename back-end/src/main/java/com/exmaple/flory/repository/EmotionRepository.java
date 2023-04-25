package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmotionRepository extends JpaRepository<Emotion,Long> {
}
