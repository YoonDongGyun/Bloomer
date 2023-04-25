package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MusicRepository extends JpaRepository<Music,Long>,QMusicRepository {
}
