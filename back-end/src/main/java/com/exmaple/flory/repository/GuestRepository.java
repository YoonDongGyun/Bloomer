package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GuestRepository extends JpaRepository<Guest,Long>,QGuestRepository {

}
