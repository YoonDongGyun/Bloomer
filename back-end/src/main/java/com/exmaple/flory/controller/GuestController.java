package com.exmaple.flory.controller;

import com.amazonaws.Response;
import com.exmaple.flory.dto.guest.GuestRequestDto;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.response.ErrorResponse;
import com.exmaple.flory.response.SuccessResponse;
import com.exmaple.flory.service.GuestService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@AllArgsConstructor
@RequestMapping("/api/guest")
@RestController
public class GuestController {

    private final GuestService guestService;

    @PostMapping
    public ResponseEntity<?> insertGuestBook(@RequestBody GuestRequestDto guestRequestDto) {

        log.info("insert guest book 호출");

        try {
            return new ResponseEntity<>(new SuccessResponse(guestService.insert(guestRequestDto)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.NO_USER), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{book_id}")
    public ResponseEntity<?> getDetailGuest(@PathVariable Long book_id) {
        log.info("방명록 detail 호출");

        try {
            return new ResponseEntity<>(new SuccessResponse(guestService.getDetail(book_id)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.NO_GUEST), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateGuest(@RequestBody GuestRequestDto guestRequestDto) {

        log.info("방명록 수정");

        try {
            return new ResponseEntity<>(new SuccessResponse(guestService.update(guestRequestDto)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.NO_GUEST), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{book_id}")
    public ResponseEntity<?> deleteGuest(@PathVariable Long book_id) {
        log.info("방명록 삭제");

        try {
            guestService.delete(book_id);
            String success = "삭제 성공";
            return new ResponseEntity<>(new SuccessResponse(success), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.NO_USER), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/garden/{garden_id}")
    public ResponseEntity<?> getGuestList(@PathVariable Long garden_id) {

        try {
            return new ResponseEntity<>(new SuccessResponse(guestService.getGuestList(garden_id)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.NO_GUEST), HttpStatus.NOT_FOUND);
        }
    }
}
