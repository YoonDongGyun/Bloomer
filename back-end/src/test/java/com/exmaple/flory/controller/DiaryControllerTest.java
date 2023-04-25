package com.exmaple.flory.controller;

import com.exmaple.flory.dto.diary.DiaryDayDto;
import com.exmaple.flory.dto.diary.DiaryDto;
import com.exmaple.flory.dto.diary.UpdateDiariesDto;
import com.exmaple.flory.dto.emotion.FlowerEmotionDataDto;
import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.dto.team.TeamIdListDto;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.response.ErrorResponse;
import com.exmaple.flory.response.SuccessResponse;
import com.exmaple.flory.service.DiaryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import java.nio.charset.StandardCharsets;
import java.util.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(controllers = DiaryController.class)
@WithMockUser
@MockBean(JpaMetamodelMappingContext.class)
public class DiaryControllerTest {

    @MockBean
    private DiaryService diaryService;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    private final DiaryDto diaryDto = DiaryDto.builder()
            .id(1L).content("content").imgSrc("imgSrc").lat(10).lng(10).publicStatus("전체공개").x("x").y("y").z("z")
            .build();


    @DisplayName("일기 등록 테스트")
    @Test
    public void insertDiaryTest() throws Exception {
        when(diaryService.insertDiary(any(),any())).thenReturn(diaryDto);
        String json = new ObjectMapper().writeValueAsString(diaryDto.toEntity());
        MockMultipartFile file = new MockMultipartFile("diary", "diary", "application/json", json.getBytes(StandardCharsets.UTF_8));

        mockMvc.perform(multipart(HttpMethod.POST,"/api/diary")
                        .file(file).with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @DisplayName("일기 등록 커스텀 오류 테스트")
    @Test
    public void insertDiaryCustomExceptionTest() throws Exception{
        when(diaryService.insertDiary(any(),any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        String json = new ObjectMapper().writeValueAsString(diaryDto.toEntity());
        MockMultipartFile file = new MockMultipartFile("diary", "diary", "application/json", json.getBytes(StandardCharsets.UTF_8));

        mockMvc.perform(multipart(HttpMethod.POST,"/api/diary")
                        .file(file).with(csrf()))
                .andExpect(status().isInternalServerError())
                .andDo(print());

    }

    @DisplayName("일기 등록 오류 테스트")
    @Test
    public void insertDiaryExceptionTest() throws Exception{
        when(diaryService.insertDiary(any(),any())).thenThrow(new RuntimeException());

        String json = new ObjectMapper().writeValueAsString(diaryDto.toEntity());
        MockMultipartFile file = new MockMultipartFile("diary", "diary", "application/json", json.getBytes(StandardCharsets.UTF_8));


        mockMvc.perform(multipart(HttpMethod.POST,"/api/diary")
                        .file(file).with(csrf()))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("일기내용 상세 가져오기 테스트")
    @Test
    public void getDiaryTest() throws Exception{
        when(diaryService.getDiary(any())).thenReturn(diaryDto);

        mockMvc.perform(get("/api/diary/{diaryId}",1))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("일기내용 상세 가져오기 custom 오류 테스트")
    @Test
    public void getDiaryCustomExceptionTest() throws Exception{
        when(diaryService.getDiary(any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        mockMvc.perform(get("/api/diary/{diaryId}",1))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("일기내용 상세 가져오기 오류 테스트")
    @Test
    public void getDiaryExceptionTest() throws Exception{
        when(diaryService.getDiary(any())).thenThrow(new RuntimeException());

        mockMvc.perform(get("/api/diary/{diaryId}",1))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("일기내용 삭제 테스트")
    @Test
    public void deleteDiaryTest() throws Exception{
        when(diaryService.deleteDiary(any())).thenReturn(1);

        mockMvc.perform(delete("/api/diary/{diaryId}",1).with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("일기내용 삭제 custom 오류 테스트")
    @Test
    public void deleteDiaryCustomExceptionTest() throws Exception{
        when(diaryService.deleteDiary(any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        mockMvc.perform(delete("/api/diary/{diaryId}",1).with(csrf()))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("일기내용 삭제 오류 테스트")
    @Test
    public void deleteDiaryExceptionTest() throws Exception{
        when(diaryService.deleteDiary(any())).thenThrow(new RuntimeException());

        mockMvc.perform(delete("/api/diary/{diaryId}",1).with(csrf()))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("일기 수정하기 테스트")
    @Test
    public void updateDiaryTest() throws Exception{
        when(diaryService.updateDiary(any())).thenReturn(diaryDto);

        mockMvc.perform(put("/api/diary").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(diaryDto.toEntity())))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @DisplayName("일기 수정하기 custom 오류 테스트")
    @Test
    public void updateDiaryCustomExceptionTest() throws Exception{
        when(diaryService.updateDiary(any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        mockMvc.perform(put("/api/diary").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(diaryDto.toEntity())))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("일기 수정하기 오류 테스트")
    @Test
    public void updateDiaryExceptionTest() throws Exception{
        when(diaryService.updateDiary(any())).thenThrow(new RuntimeException());

        mockMvc.perform(put("/api/diary").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(diaryDto.toEntity())))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("해당 정원의 일기 목록 조회 테스트")
    @Test
    public void getDiaryByGardenTest() throws Exception{
        List<DiaryDto> diaryDtoList = new ArrayList<>();

        diaryDtoList.add(diaryDto);

        when(diaryService.getDiaryListByGarden(any(),any())).thenReturn(diaryDtoList);

        mockMvc.perform(get("/api/diary/list/{gardenId}/{requestId}",1,1))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("해당 정원의 일기 목록 조회 custom 오류 테스트")
    @Test
    public void getDiaryByGardenCustomExceptionTest() throws Exception{
        when(diaryService.getDiaryListByGarden(any(),any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        mockMvc.perform(get("/api/diary/list/{gardenId}/{requestId}",1,1))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("해당 정원의 일기 목록 조회 오류 테스트")
    @Test
    public void getDiaryByGardenExceptionTest() throws Exception{
        when(diaryService.getDiaryListByGarden(any(),any())).thenThrow(new RuntimeException());

        mockMvc.perform(get("/api/diary/list/{gardenId}/{requestId}",1,1))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("유저의 일기 목록 조회 테스트")
    @Test
    public void getDiaryByUserTest() throws Exception{
        List<DiaryDto> diaryDtoList = new ArrayList<>();

        diaryDtoList.add(diaryDto);

        when(diaryService.getDiaryListByUser(any(),any())).thenReturn(diaryDtoList);

        mockMvc.perform(get("/api/diary/diary-list/{userId}/{requestId}",1,1))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("유저의 일기 목록 조회 custom 오류 테스트")
    @Test
    public void getDiaryByUserCustomExceptionTest() throws Exception{
        when(diaryService.getDiaryListByUser(any(),any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        mockMvc.perform(get("/api/diary/diary-list/{userId}/{requestId}",1,1))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("유저의 일기 목록 조회 오류 테스트")
    @Test
    public void getDiaryByUserExceptionTest() throws Exception{
        when(diaryService.getDiaryListByUser(any(),any())).thenThrow(new RuntimeException());

        mockMvc.perform(get("/api/diary/diary-list/{userId}/{requestId}",1,1))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("지도 범위 내의 일기 목록 조회 테스트")
    @Test
    public void getDiaryInMapTest() throws Exception{
        List<DiaryDto> diaryDtoList = new ArrayList<>();
        Map<String,String> info = new HashMap<>();

        diaryDtoList.add(diaryDto);

        info.put("lat1","1");
        info.put("lng1","1");
        info.put("lat2","1");
        info.put("lng2","1");

        when(diaryService.getDiaryListInMap(any())).thenReturn(diaryDtoList);

        mockMvc.perform(post("/api/diary/map").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(info)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("지도 범위 내의 일기 목록 조회 custom 오류 테스트")
    @Test
    public void getDiaryInMapCustomExceptionTest() throws Exception{
        Map<String,String> info = new HashMap<>();

        info.put("lat1","1");
        info.put("lng1","1");
        info.put("lat2","1");
        info.put("lng2","1");
        info.put("requestId","1");

        when(diaryService.getDiaryListInMap(any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        mockMvc.perform(post("/api/diary/map").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(info)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("지도 범위 내의 일기 목록 조회 오류 테스트")
    @Test
    public void getDiaryInMapExceptionTest() throws Exception{
        Map<String,String> info = new HashMap<>();

        info.put("lat1","1");
        info.put("lng1","1");
        info.put("lat2","1");
        info.put("lng2","1");
        info.put("requestId","1");

        when(diaryService.getDiaryListInMap(any())).thenThrow(new RuntimeException());

        mockMvc.perform(post("/api/diary/map").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(info)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("좌표값으로 일기 조회 테스트")
    @Test
    public void getDiaryByLocationTest() throws Exception{
        when(diaryService.getDiaryByLocation(any())).thenReturn(diaryDto);
        Map<String,String> info = new HashMap<>();

        info.put("gardenId","1");
        info.put("x","10");
        info.put("y","10");
        info.put("z","10");

        mockMvc.perform(post("/api/diary/location").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(info)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("좌표값으로 일기 조회 custom 오류 테스트")
    @Test
    public void getDiaryByLocationCustomExceptionTest() throws Exception{
        when(diaryService.getDiaryByLocation(any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        Map<String,String> info = new HashMap<>();

        info.put("gardenId","1");
        info.put("x","10");
        info.put("y","10");
        info.put("z","10");

        mockMvc.perform(post("/api/diary/location").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(info)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("좌표값으로 일기 조회 오류 테스트")
    @Test
    public void getDiaryByLocationExceptionTest() throws Exception{
        when(diaryService.getDiaryByLocation(any())).thenThrow(new RuntimeException());

        Map<String,String> info = new HashMap<>();

        info.put("gardenId","1");
        info.put("x","10");
        info.put("y","10");
        info.put("z","10");

        mockMvc.perform(post("/api/diary/location").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(info)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("유저의 연 월 일기 조회")
    @Test
    public void getDiaryInMonthTest() throws Exception{
        List<DiaryDayDto> diaryDayDtoList = new ArrayList<>();
        List<DiaryDto> diaryDtoList = new ArrayList<>();

        diaryDtoList.add(diaryDto);
        DiaryDayDto diaryDayDto = DiaryDayDto.builder()
                .day("1").diaryList(diaryDtoList).build();

        diaryDayDtoList.add(diaryDayDto);

        when(diaryService.getDiaryInMonth(any(),any(),any())).thenReturn(diaryDayDtoList);

        mockMvc.perform(get("/api/diary?id={id}&year={year}&month={month}",1L,"2023","3"))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("유저의 연 월 일기 조회 오류")
    @Test
    public void getDiaryInMonthExceptionTest() throws Exception{
        when(diaryService.getDiaryInMonth(any(),any(),any())).thenThrow(new RuntimeException());

        mockMvc.perform(get("/api/diary?id={id}&year={year}&month={month}",1L,"2023","3"))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("정원의 꽃들 위치 조정 테스트")
    @Test
    public void updateDiariesLocationTest() throws Exception{
        List<DiaryDto> diaryDtoList = new ArrayList<>();


        diaryDtoList.add(diaryDto);
        UpdateDiariesDto updateDiariesDto = UpdateDiariesDto.builder()
                .updateDiaries(diaryDtoList).build();

        when(diaryService.updateDiaryLocation(any())).thenReturn(diaryDtoList);

        mockMvc.perform(put("/api/diary/location").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(updateDiariesDto)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("정원의 꽃들 위치 조정 custom 오류 테스트")
    @Test
    public void updateDiariesLocationCustomExceptionTest() throws Exception{
        List<DiaryDto> diaryDtoList = new ArrayList<>();

        diaryDtoList.add(diaryDto);
        UpdateDiariesDto updateDiariesDto = UpdateDiariesDto.builder()
                .updateDiaries(diaryDtoList).build();

        when(diaryService.updateDiaryLocation(any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        mockMvc.perform(put("/api/diary/location").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(updateDiariesDto)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("정원의 꽃들 위치 조정 오류 테스트")
    @Test
    public void updateDiariesLocationExceptionTest() throws Exception{
        List<DiaryDto> diaryDtoList = new ArrayList<>();

        diaryDtoList.add(diaryDto);
        UpdateDiariesDto updateDiariesDto = UpdateDiariesDto.builder()
                .updateDiaries(diaryDtoList).build();

        when(diaryService.updateDiaryLocation(any())).thenThrow(new RuntimeException());

        mockMvc.perform(put("/api/diary/location").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(updateDiariesDto)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("감정 분석 및 꽃 목록 가져오기 테스트")
    @Test
    public void getEmotionFlowerDataTest() throws Exception{
        FlowerEmotionDataDto flowerEmotionDataDto = FlowerEmotionDataDto.builder()
                .flowers(null).emotions(null).build();
        Map<String,String> data = new HashMap<>();
        data.put("text","안녕하세요");

        when(diaryService.getFlowerEmotionData(any())).thenReturn(flowerEmotionDataDto);

        mockMvc.perform(post("/api/diary/emotion").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(data)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("감정 분석 및 꽃 목록 가져오기 오류 테스트")
    @Test
    public void getEmotionFlowerDataExceptionTest() throws Exception{
        Map<String,String> data = new HashMap<>();
        data.put("text","안녕하세요");

        when(diaryService.getFlowerEmotionData(any())).thenThrow(new RuntimeException());

        mockMvc.perform(post("/api/diary/emotion").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(data)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("최신순으로 전체공개 일기 목록 가져오기 테스트")
    @Test
    public void getPublicDiaryListTest() throws Exception {
        List<DiaryDto> diaryDtoList = new ArrayList<>();

        diaryDtoList.add(diaryDto);
        when(diaryService.getPublicDiaryList()).thenReturn(diaryDtoList);

        mockMvc.perform(get("/api/diary/list/all"))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("최신순으로 전체공개 일기 목록 가져오기 오류 테스트")
    @Test
    public void getPublicDiaryListExceptionTest() throws Exception {
        when(diaryService.getPublicDiaryList()).thenThrow(new RuntimeException());

        mockMvc.perform(get("/api/diary/list/all"))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("지난주 대비 감정 통계 테스트")
    @Test
    public void getEmotionsInWeekTest() throws Exception {
        Map<String,Integer> result = new LinkedHashMap<>();
        result.put("기쁨",1);

        when(diaryService.getEmotionsInWeek(any())).thenReturn(result);

        mockMvc.perform(get("/api/diary/statistics/week/{userId}",1L))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("지난주 대비 감정 통계 테스트")
    @Test
    public void getEmotionsInWeekExceptionTest() throws Exception {
        when(diaryService.getEmotionsInWeek(any())).thenThrow(new RuntimeException());

        mockMvc.perform(get("/api/diary/statistics/week/{userId}",1L))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("그룹 일기 목록 조회 테스트")
    @Test
    public void getDiaryMemberTest() throws Exception{
        TeamIdListDto teamIdListDto = TeamIdListDto.builder()
                .teamIdList(new ArrayList<>()).build();

        List<DiaryDto> diaries = new ArrayList<>();

        diaries.add(diaryDto);

        when(diaryService.getDiaryListInTeam(any())).thenReturn(diaries);

        mockMvc.perform(post("/api/diary/list/team").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(teamIdListDto)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("그룹 일기 목록 조회 custom 오류 테스트")
    @Test
    public void getDiaryMemberCustomExceptionTest() throws Exception{
        TeamIdListDto teamIdListDto = TeamIdListDto.builder()
                .teamIdList(new ArrayList<>()).build();

        List<DiaryDto> diaries = new ArrayList<>();

        diaries.add(diaryDto);

        when(diaryService.getDiaryListInTeam(any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        mockMvc.perform(post("/api/diary/list/team").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(teamIdListDto)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("그룹 일기 목록 조회 오류 테스트")
    @Test
    public void getDiaryMemberExceptionTest() throws Exception{
        TeamIdListDto teamIdListDto = TeamIdListDto.builder()
                .teamIdList(new ArrayList<>()).build();

        List<DiaryDto> diaries = new ArrayList<>();

        diaries.add(diaryDto);

        when(diaryService.getDiaryListInTeam(any())).thenThrow(new RuntimeException());

        mockMvc.perform(post("/api/diary/list/team").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(teamIdListDto)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("이번달 감정 통계 테스트")
    @Test
    public void getEmotionsInMonthTest() throws Exception {
        Map<String,Integer> result = new LinkedHashMap<>();
        result.put("기쁨",1);

        when(diaryService.getEmotionsInMonth(any())).thenReturn(result);

        mockMvc.perform(get("/api/diary/statistics/month/{userId}",1L))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("이번달 감정 통계 테스트")
    @Test
    public void getEmotionsInMonthExceptionTest() throws Exception {
        when(diaryService.getEmotionsInMonth(any())).thenThrow(new RuntimeException());

        mockMvc.perform(get("/api/diary/statistics/month/{userId}",1L))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("wordCloud 테스트")
    @Test
    public void getWordCloud() throws Exception{
        Map<String,Integer> words = new HashMap<>();
        words.put("퇴근이다",1);

        when(diaryService.getWordCloud(any())).thenReturn(words);
        MvcResult mvcResult = mockMvc.perform(get("/api/diary/statistics/wordcloud/{userId}",1L))
                .andExpect(status().isOk())
                .andReturn();
    }

    @DisplayName("wordCloud 테스트")
    @Test
    public void getWordCloudException() throws Exception{
        Map<String,Integer> words = new HashMap<>();
        words.put("퇴근이다",1);

        when(diaryService.getWordCloud(any())).thenThrow(new CustomException(ErrorCode.NO_USER));
        mockMvc.perform(get("/api/diary/statistics/wordcloud/{userId}",1L))
                .andExpect(status().isNotFound())
                .andReturn();
    }
}
