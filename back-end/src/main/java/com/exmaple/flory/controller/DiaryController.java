package com.exmaple.flory.controller;

import com.exmaple.flory.dto.diary.DiaryDayDto;
import com.exmaple.flory.dto.diary.DiaryDto;
import com.exmaple.flory.dto.diary.DiaryRequestDto;
import com.exmaple.flory.dto.diary.UpdateDiariesDto;
import com.exmaple.flory.dto.emotion.FlowerEmotionDataDto;
import com.exmaple.flory.dto.team.TeamIdListDto;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.response.ErrorResponse;
import com.exmaple.flory.response.SuccessResponse;
import com.exmaple.flory.service.DiaryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/diary")
@Slf4j
public class DiaryController {
    @Autowired
    DiaryService diaryService;

    @PostMapping
    public ResponseEntity<?> insert(@RequestPart("diary") DiaryRequestDto diaryDto, @RequestPart(value = "imgSrc", required = false) final MultipartFile multipartFile){
        try{
            DiaryDto result = diaryService.insertDiary(diaryDto, Optional.ofNullable(multipartFile));
            return new ResponseEntity<>(new SuccessResponse(result), HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{diaryId}")
    public ResponseEntity<?> getDiary(@PathVariable Long diaryId){
        try{
            DiaryDto diaryDto = diaryService.getDiary(diaryId);

            return new ResponseEntity<>(new SuccessResponse(diaryDto),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{diaryId}")
    public ResponseEntity<?> deleteDiary(@PathVariable Long diaryId){
        try{
            int result = diaryService.deleteDiary(diaryId);

            if(result==1) return new ResponseEntity<>(new SuccessResponse("삭제가 완료되었습니다."),HttpStatus.OK);
            else throw new Exception();
        }catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateDiary(@RequestBody DiaryRequestDto diaryDto){
        try{
            DiaryDto result = diaryService.updateDiary(diaryDto);
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/list/{gardenId}/{requestId}")
    public ResponseEntity<?> getDiaryListGarden(@PathVariable Long gardenId, @PathVariable Long requestId){
        try{
            List<DiaryDto> result = diaryService.getDiaryListByGarden(gardenId, requestId);
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/diary-list/{memberId}/{requestId}")
    public ResponseEntity<?> getDiaryListUser(@PathVariable Long memberId, @PathVariable Long requestId){
        try{
            List<DiaryDto> result = diaryService.getDiaryListByUser(memberId, requestId);
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/map")
    public ResponseEntity<?> getDiaryListInMap(@RequestBody Map<String,String> mapInfo){
        try {
            List<DiaryDto> result = diaryService.getDiaryListInMap(mapInfo);
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/location")
    public ResponseEntity<?> getDiaryByLocation(@RequestBody Map<String,String> info){
        try{
            DiaryDto diaryDto = diaryService.getDiaryByLocation(info);
            return new ResponseEntity<>(new SuccessResponse(diaryDto),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> getDiaryInMonth(@RequestParam Long id, @RequestParam String year, @RequestParam String month){
        try{
            List<DiaryDayDto> result = diaryService.getDiaryInMonth(id,year,month);
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/location")
    public ResponseEntity<?> updateDiaryLocation(@RequestBody UpdateDiariesDto updateDiariesDto){
        try{
            List<DiaryDto> result = diaryService.updateDiaryLocation(updateDiariesDto.getUpdateDiaries());
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/emotion")
    public ResponseEntity<?> getEmotionData(@RequestBody Map<String,String> data){
        try{
            FlowerEmotionDataDto result = diaryService.getFlowerEmotionData(data);
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/list/all")
    public ResponseEntity<?> getPublicDiaryList(){
        try{
            List<DiaryDto> result = diaryService.getPublicDiaryList();
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/list/team")
    public ResponseEntity<?> getTeamDiaryList(@RequestBody TeamIdListDto teamIdListDto){
        try{
            List<DiaryDto> result = diaryService.getDiaryListInTeam(teamIdListDto);
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/statistics/week/{userId}")
    public ResponseEntity<?> getEmotionsInWeek(@PathVariable Long userId){
        try{
            Map<String,Integer> result = diaryService.getEmotionsInWeek(userId);
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/statistics/month/{userId}")
    public ResponseEntity<?> getEmotionsInMonth(@PathVariable Long userId){
        try{
            Map<String,Integer> result = diaryService.getEmotionsInMonth(userId);
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/statistics/wordcloud/{userId}")
    public ResponseEntity<?> getWordCloud(@PathVariable Long userId){
        try{
            Map<String,Integer> result = diaryService.getWordCloud(userId);
            return new ResponseEntity<>(new SuccessResponse(result),HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
