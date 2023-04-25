package com.exmaple.flory.controller;

import com.exmaple.flory.dto.garden.GardenInsertResponseDto;
import com.exmaple.flory.dto.garden.GardenRequestDto;
import com.exmaple.flory.dto.garden.GardenResponseDto;
import com.exmaple.flory.entity.Garden;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.service.GardenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.bytebuddy.utility.dispatcher.JavaDispatcher;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser
@WebMvcTest(controllers = GardenController.class)
public class GardenControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    GardenService gardenService;

    @DisplayName("정원 디테일 가져오기 테스트")
    @Test
    public void getGardeDetailTest() throws Exception {

        GardenResponseDto gardenResponseDto = GardenResponseDto.builder()
                .gardenId(1L)
                .nickname("cksgnlcjswoo@naver.c")
                .build();

        when(gardenService.getDetail(any())).thenReturn(gardenResponseDto);

        mockMvc.perform(get("/api/garden/{user_id}",1))
                .andExpect(status().isOk());
    }

    @DisplayName("정원 디텡 ㄹ에러테스트")
    @Test
    public void getGardenDetailErrorTest() throws Exception {

        when(gardenService.getDetail(any())).thenThrow(new CustomException(ErrorCode.INVALID_GARDEN));

        mockMvc.perform(get("/api/garden/{user_id}",1))
                .andExpect(status().is5xxServerError());
    }

    @DisplayName("정원 추가 테스트")
    @Test
    public void gardenInsertTest() throws Exception {

        GardenRequestDto requestDto = GardenRequestDto
                .builder()
                .img("test 이미지")
                .userId(1L)
                .build();

        GardenInsertResponseDto gardenResponseDto = GardenInsertResponseDto
                .builder()
                .userId(1L)
                .nickname("hello world")
                .build();

        when(gardenService.insert(any())).thenReturn(gardenResponseDto);

        mockMvc.perform(post("/api/garden").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(requestDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response.userId").value(gardenResponseDto.getUserId()));
    }

    @DisplayName("정원 추가 에러 테스트")
    @Test
    public void InsertGardenErrorTest() throws Exception {

        GardenRequestDto requestDto = GardenRequestDto
                .builder()
                .img("test 이미지")
                .userId(1L)
                .build();

        when(gardenService.insert(any())).thenThrow(new CustomException(ErrorCode.NO_USER));

        mockMvc.perform(post("/api/garden").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(requestDto)))
                .andExpect(status().isNotFound());
    }

    @DisplayName("정원 수정 테스트")
    @Test
    public void UpdateGardenTest() throws Exception {

        GardenRequestDto requestDto = GardenRequestDto
                .builder()
                .img("test 이미지")
                .musicTitle("이것은 좋은 노래")
                .userId(1L)
                .build();

        GardenResponseDto gardenResponseDto = GardenResponseDto
                .builder()
                .userId(1L)
                .musicTitle(requestDto.getMusicTitle())
                .img(requestDto.getImg())
                .nickname("hello world")
                .build();

        when(gardenService.update(any())).thenReturn(gardenResponseDto);

        mockMvc.perform(put("/api/garden")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(requestDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response.musicTitle").value(gardenResponseDto.getMusicTitle()));
    }

    @DisplayName("정원 수정 에러 테스트")
    @Test
    public void UpdateGardenErrorTest() throws Exception {

        GardenRequestDto requestDto = GardenRequestDto
                .builder()
                .img("test 이미지")
                .musicTitle("이것은 좋은 노래")
                .userId(1L)
                .build();

        when(gardenService.update(any())).thenThrow(new CustomException(ErrorCode.INVALID_GARDEN));

        mockMvc.perform(put("/api/garden")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(requestDto)))
                .andExpect(status().isNotFound());
    }

    @DisplayName("가든 삭제 테스트")
    @Test
    public void DeleteGardenTest() throws Exception {

        GardenRequestDto requestDto = GardenRequestDto
                .builder()
                .img("test 이미지")
                .musicTitle("이것은 좋은 노래")
                .userId(1L)
                .build();

        mockMvc.perform(delete("/api/garden/{garden_id}",1L)
                        .with(csrf()))
                        .andExpect(status().isOk());
    }

    @DisplayName("정원 삭제 에러 테스트")
    @Test
    public void deleteGardenErrorTest() throws Exception {

        GardenRequestDto requestDto = GardenRequestDto
                .builder()
                .img("test 이미지")
                .musicTitle("이것은 좋은 노래")
                .userId(1L)
                .build();

        doThrow(new CustomException(ErrorCode.INVALID_GARDEN))
                .when(gardenService).delete(any());

        mockMvc.perform(delete("/api/garden/{garden_id}",1L)
                        .with(csrf()))
                .andExpect(status().isNotFound());
    }

    @DisplayName("연월에 따른 정원 정보 가져오기")
    @Test
    public void getGardenByMonthAndYear() throws Exception {

        LocalDateTime cur = LocalDateTime.now();
        int year = cur.getYear();
        int month = cur.getMonthValue();

        GardenResponseDto responseDto = GardenResponseDto
                .builder()
                .musicTitle("테스트 음악입니다")
                .nickname("cksgnlcjswoo")
                .build();

        when(gardenService.getGardenByMonth(any(),any(),any())).thenReturn(responseDto);

        StringBuilder url = new StringBuilder();
        url.append("/api/garden/user/1/date/")
                .append(year+"/")
                .append(month+"/");

        mockMvc.perform(get(url.toString()))
                .andExpect(status().isOk());

    }

    @DisplayName("연월에 따른 정원 정보 가져오기 에러테스트")
    @Test
    public void getGardenDetailByMonthErrorTest() throws Exception {
        LocalDateTime cur = LocalDateTime.now();
        int year = cur.getYear();
        int month = cur.getMonthValue();

        GardenResponseDto responseDto = GardenResponseDto
                .builder()
                .musicTitle("테스트 음악입니다")
                .nickname("cksgnlcjswoo")
                .build();

        when(gardenService.getGardenByMonth(any(),any(),any())).thenThrow(new CustomException(ErrorCode.INVALID_GARDEN));

        StringBuilder url = new StringBuilder();
        url.append("/api/garden/user/1/date/")
                .append(year+"/")
                .append(month+"/");

        mockMvc.perform(get(url.toString()))
                .andExpect(status().isNotFound());
    }

    @DisplayName("유저아이디로 모든 garden 가져오기")
    @Test
    public void getAllGardenByUserId() throws Exception {

        List<GardenResponseDto> responseDtoList = new ArrayList<>();

        responseDtoList.add(GardenResponseDto
                .builder()
                .gardenId(1L)
                .img("첫번째 이미지")
                .build());

        responseDtoList.add(GardenResponseDto
                .builder()
                .gardenId(2L)
                .img("두번째 이미지")
                .build());

        responseDtoList.add(GardenResponseDto
                .builder()
                .gardenId(3L)
                .img("첫번째 이미지")
                .build());

        when(gardenService.getAllGardenByUserId(any())).thenReturn(responseDtoList);

        mockMvc.perform(get("/api/garden/list/1"))
                .andExpect(jsonPath("$.response", hasSize(responseDtoList.size())));
    }

    @DisplayName("유저아이디로 모든 garden 가져오기 에러 테스트")
    @Test
    public void getAllGardenByUserIdErrorTest() throws Exception {

        when(gardenService.getAllGardenByUserId(any())).thenThrow(new CustomException(ErrorCode.INVALID_GARDEN));

        mockMvc.perform(get("/api/garden/list/1"))
                .andExpect(status().isNotFound());
    }

}
