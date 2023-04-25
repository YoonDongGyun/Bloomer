package com.exmaple.flory.controller;

import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.response.ErrorResponse;
import com.exmaple.flory.response.SuccessResponse;
import com.exmaple.flory.service.MusicService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/music")
@RestController
public class MusicController {

    @Autowired
    private MusicService musicService;

    @GetMapping("/recommend/{emotion}/user/{user_id}")
    public ResponseEntity<?> musicRecommend(@PathVariable Integer emotion,@PathVariable Long user_id) {
        log.info("music recommend 컨트롤러 호출");

        try{
            return new ResponseEntity<>(new SuccessResponse(musicService.recommendMusic(emotion,user_id)), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INVALID_EMOTION), HttpStatus.NOT_FOUND);
        }
    }
}
