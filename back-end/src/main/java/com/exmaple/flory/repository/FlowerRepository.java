package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Flower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlowerRepository extends JpaRepository<Flower, Long>,QFlowerRepository {

}
