package com.exmaple.flory.controller;

import com.exmaple.flory.dto.garden.GardenRequestDto;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.response.ErrorResponse;
import com.exmaple.flory.response.SuccessResponse;
import com.exmaple.flory.service.GardenService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@Slf4j
@AllArgsConstructor
@RequestMapping("/api/garden")
@RestController
public class GardenController {

    private final GardenService gardenService;

    @GetMapping("/{garden_id}")
    public ResponseEntity<?> getGardenDetail(@PathVariable Long garden_id) {

        log.info("GardenController - getDetail 호출");

        try {
            return new ResponseEntity<>(new SuccessResponse(gardenService.getDetail(garden_id)), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<?> insertGarden(@RequestBody GardenRequestDto gardenRequestDto) {
        log.info("gardenController - insert 호출");

        try {
            return new ResponseEntity<>(new SuccessResponse(gardenService.insert(gardenRequestDto)), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.NO_USER),HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateGarden(@RequestBody GardenRequestDto gardenRequestDto) {
        log.info("gardenController - update 호출");

        try {
            return new ResponseEntity<>(new SuccessResponse(gardenService.update(gardenRequestDto)),HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INVALID_GARDEN),HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{garden_id}")
    public ResponseEntity<?> deleteGarden(@PathVariable Long garden_id) {

        log.info("gardenController - delete 호출");

        try {
            gardenService.delete(garden_id);
            return new ResponseEntity<>(new SuccessResponse("삭제성공"),HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INVALID_GARDEN),HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{user_id}/date/{year}/{month}")
    public ResponseEntity<?> getGardenDetailByMonth(@PathVariable Long user_id,@PathVariable Integer year, @PathVariable Integer month) {
        log.info("GardenController - garden detail by month 호출");

        try {
            return new ResponseEntity<>(new SuccessResponse(gardenService.getGardenByMonth(user_id,year,month)), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INVALID_GARDEN),HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/list/{user_id}")
    public ResponseEntity<?> getAllGardenByUserId(@PathVariable Long user_id) {

        log.info("GardenController - get all garden by userId 호출");

        try {
            return new ResponseEntity<>(new SuccessResponse(gardenService.getAllGardenByUserId(user_id)), HttpStatus.OK);
        } catch(Exception e) {

            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INVALID_GARDEN),HttpStatus.NOT_FOUND);
        }
    }
}
