package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Garden;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GardenRepository extends JpaRepository<Garden, Long>,QGardenRepository {
}
