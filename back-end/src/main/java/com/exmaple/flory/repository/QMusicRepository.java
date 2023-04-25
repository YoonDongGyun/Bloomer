package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Music;
import org.springframework.stereotype.Repository;

@Repository
public interface QMusicRepository {
    Music findByTitle(String title);
}
