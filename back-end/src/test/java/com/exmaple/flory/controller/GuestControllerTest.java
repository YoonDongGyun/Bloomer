package com.exmaple.flory.controller;

import com.exmaple.flory.dto.guest.GuestRequestDto;
import com.exmaple.flory.dto.guest.GuestResponseDto;
import com.exmaple.flory.entity.Garden;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.service.GuestService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.contains;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser
@WebMvcTest(controllers = GuestController.class)
public class GuestControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GuestService guestService;

    @DisplayName("방명록 추가 테스트")
    @Test
    public void InsertGuestBookTest() throws Exception {

        GuestRequestDto guestRequestDto = GuestRequestDto
                .builder()
                .color("yellow")
                .contents("방명록입니다.")
                .gardenId(1L)
                .build();

        GuestResponseDto guestResponseDto = GuestResponseDto
                .builder()
                .gardenId(1L)
                .contents("방명록")
                .build();

        when(guestService.insert(any())).thenReturn(guestResponseDto);

        mockMvc.perform(post("/api/guest")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(guestRequestDto)))
                .andExpect(jsonPath("$.response.gardenId").value(guestResponseDto.getGardenId()));
    }

    @DisplayName("방명록 추가 에러 테스트")
    @Test
    public void InsertGuestBookErrorTest() throws Exception {

        GuestRequestDto guestRequestDto = GuestRequestDto
                .builder()
                .color("yellow")
                .contents("방명록입니다.")
                .gardenId(1L)
                .build();

        when(guestService.insert(any())).thenThrow(new CustomException(ErrorCode.NO_USER));

        mockMvc.perform(post("/api/guest")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(guestRequestDto)))
                .andExpect(status().isNotFound());
    }

    @DisplayName("방명록 디테일 테스트")
    @Test
    public void getDetailGuest() throws Exception{

        GuestResponseDto response = GuestResponseDto
                .builder()
                .contents("방명록입니다.")
                .color("노란색")
                .build();

        when(guestService.getDetail(any())).thenReturn(response);

        mockMvc.perform(get("/api/guest/{user_id}",1L))
                .andExpect(jsonPath("$.response.contents").value(response.getContents()));
    }

    @DisplayName("방명록 디테일 에러 테스트")
    @Test
    public void getDetailErrorGuest() throws Exception{

        when(guestService.getDetail(any())).thenThrow(new CustomException(ErrorCode.NO_GUEST));

        mockMvc.perform(get("/api/guest/{user_id}",1L))
                .andExpect(status().isNotFound());
    }

    @DisplayName("방명록 수정 테스트")
    @Test
    public void InsertGuestBookUpdateTest() throws Exception {

        GuestRequestDto guestRequestDto = GuestRequestDto
                .builder()
                .color("yellow")
                .contents("방명록입니다.")
                .gardenId(1L)
                .build();

        GuestResponseDto response = GuestResponseDto
                .builder()
                .contents("방명록입니다.")
                .color("노란색")
                .build();

        when(guestService.update(any())).thenReturn(response);

        mockMvc.perform(post("/api/guest")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(guestRequestDto)))
                .andExpect(status().isOk());
    }

    @DisplayName("방명록 수정 에러 테스트")
    @Test
    public void InsertGuestBookUpdateErrorTest() throws Exception {

        GuestRequestDto guestRequestDto = GuestRequestDto
                .builder()
                .color("yellow")
                .contents("방명록입니다.")
                .gardenId(1L)
                .build();

        when(guestService.update(any())).thenThrow(new CustomException(ErrorCode.NO_GUEST));

        mockMvc.perform(put("/api/guest")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(guestRequestDto)))
                .andExpect(status().isNotFound());
    }

    @DisplayName("방명록 삭제 테스트")
    @Test
    public void InsertGuestBookDeleteTest() throws Exception {

        mockMvc.perform(delete("/api/guest/{book_id}",1)
                        .with(csrf()))
                .andExpect(status().isOk());

        verify(guestService, times(1)).delete(1L);
    }

    @DisplayName("방명록 삭제 에러 테스트")
    @Test
    public void InsertGuestBookDeleteErrorTest() throws Exception {

        doThrow(new CustomException(ErrorCode.NO_GUEST)).when(guestService)
                        .delete(any());

        mockMvc.perform(delete("/api/guest/{book_id}",1)
                        .with(csrf()))
                .andExpect(status().isNotFound());
    }

    @DisplayName("방명록 목록 가져오기")
    @Test
    public void getGuestList() throws Exception {

        GuestResponseDto response1 = GuestResponseDto
                .builder()
                .contents("방명록입니다.")
                .color("노란색")
                .build();

        GuestResponseDto response2 = GuestResponseDto
                .builder()
                .contents("방명록입니다.")
                .color("노란색")
                .build();

        List<GuestResponseDto> result = new ArrayList<>();
        result.add(response1);
        result.add(response2);

        when(guestService.getGuestList(any())).thenReturn(result);

        mockMvc.perform(get("/api/guest/garden/{garden_id}",1))
                .andExpect(jsonPath("$.response" ,hasSize(result.size())));
    }
}
