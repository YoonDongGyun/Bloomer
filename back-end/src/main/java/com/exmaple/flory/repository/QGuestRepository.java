package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Guest;

import java.util.List;

public interface QGuestRepository {

    List<Guest> getAllGuestByGardenId(Long book_id);
}
