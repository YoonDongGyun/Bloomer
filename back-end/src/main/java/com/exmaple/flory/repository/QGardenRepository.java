package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Garden;

import java.util.List;
import java.util.Optional;

public interface QGardenRepository {

    public Optional<Garden> findByDate(Long user_id,Integer year,Integer month);
    public List<Garden> findAllByUserId(Long userId);
}
