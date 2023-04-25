package com.exmaple.flory.controller;

import com.exmaple.flory.dto.member.LoginDto;
import com.exmaple.flory.dto.member.MemberMusicUpdateDto;
import com.exmaple.flory.dto.member.MemberRequestDto;
import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.dto.team.TeamDto;
import com.exmaple.flory.entity.Authority;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.response.SuccessResponse;
import com.exmaple.flory.service.MemberService;
import com.exmaple.flory.util.SecurityUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.Collections;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = MemberController.class)
@WithMockUser(username = "1")
class MemberControllerTest {

    @MockBean
    private MemberService memberService;

    @Autowired
    private MockMvc mockMvc;

    private final MemberResponseDto memberResponseDto = MemberResponseDto.builder()
            .userId(1L).nickname("nickname").img("img").email("email").build();

    @DisplayName("회원 조회(토큰)")
    @Test
    void findMemberInfoById() throws Exception{
        //given
        when(memberService.findMemberInfoByUserId(any())).thenReturn(memberResponseDto);

        MvcResult mvcResult = mockMvc.perform(get("/api/user/me"))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        MemberResponseDto result = new ObjectMapper().convertValue(response.getResponse(), MemberResponseDto.class);

        assertThat(result.getEmail()).isEqualTo(memberResponseDto.getEmail());
    }

    @DisplayName("회원 조회(이메일)")
    @Test
    void findMemberInfoByEmail() throws Exception{
        //given
        when(memberService.findMemberInfoByEmail(any())).thenReturn(memberResponseDto);

        MvcResult mvcResult = mockMvc.perform(get("/api/user/{email}","email"))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        MemberResponseDto result = new ObjectMapper().convertValue(response.getResponse(), MemberResponseDto.class);

        assertThat(result.getEmail()).isEqualTo(memberResponseDto.getEmail());
    }

    @DisplayName("로그아웃")
    @Test
    void logout() throws Exception{
         mockMvc.perform(get("/api/user/logout"))
                .andExpect(status().isOk())
                .andReturn();
    }

    @DisplayName("회원 수정")
    @Test
    void updateMember() throws Exception{
        MemberRequestDto memberRequestDto = MemberRequestDto.builder()
                .nickname("name").email("email").build();

        when(memberService.updateMember(any(),any())).thenReturn(memberResponseDto);
        String json = new ObjectMapper().writeValueAsString(memberRequestDto);
        MockMultipartFile dto = new MockMultipartFile("memberRequestDto", "memberRequestDto", "application/json", json.getBytes(StandardCharsets.UTF_8));

        MvcResult mvcResult = mockMvc.perform(multipart(HttpMethod.PUT,"/api/user")
                        .file(dto).with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        MemberResponseDto result = new ObjectMapper().convertValue(response.getResponse(), MemberResponseDto.class);

        assertThat(result.getEmail()).isEqualTo(memberResponseDto.getEmail());
    }

    @DisplayName("회원 탈퇴")
    @Test
    void deleteMember() throws Exception{
        mockMvc.perform(delete("/api/user/{email}","email").with(csrf()))
                .andExpect(status().isOk())
                .andReturn();
    }
    
    @DisplayName("소셜로그인 회원가입시 음악 기록")
    @Test
    void updateMemberMusicInfo() throws Exception{
        MemberMusicUpdateDto memberMusicUpdateDto = MemberMusicUpdateDto.builder()
                .userId(1L).classic(true).jazz(true).pop(true).reggae(true).rnb(true).electronic(true).build();

        mockMvc.perform(put("/api/user/social").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(memberMusicUpdateDto)))
                .andExpect(status().isOk())
                .andReturn();
    }

    @DisplayName("비밀번호 변경")
    @Test
    void updatePasswordException() throws Exception{
        LoginDto loginDto = LoginDto.builder()
                .email("email").password("password").build();

//        when(memberService.updatePassword(any())).thenReturn();

        mockMvc.perform(put("/api/user/pwd").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(loginDto)))
                .andExpect(status().isOk());
    }

    @Nested
    @DisplayName("MemberController ExceptionTest")
    class ExceptionTest {
        @DisplayName("회원 조회(토큰) 오류")
        @Test
        void findMemberInfoByIdException() throws Exception{
            //given
            doThrow(new CustomException(ErrorCode.NO_USER)).when(memberService).findMemberInfoByUserId(any());
            mockMvc.perform(get("/api/user/me"))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(memberService).findMemberInfoByUserId(any());
            mockMvc.perform(get("/api/user/me"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("회원 조회(이메일) 오류")
        @Test
        void findMemberInfoByEmailException() throws Exception{
            //given
            doThrow(new CustomException(ErrorCode.NO_USER)).when(memberService).findMemberInfoByEmail(any());

            mockMvc.perform(get("/api/user/{email}","email"))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(memberService).findMemberInfoByEmail(any());

            mockMvc.perform(get("/api/user/{email}","email"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("회원 탈퇴 오류")
        @Test
        void deleteMemberException() throws Exception{
            doThrow(new CustomException(ErrorCode.NO_USER)).when(memberService).deleteMember(any());

            mockMvc.perform(delete("/api/user/{email}","email").with(csrf()))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(memberService).deleteMember(any());

            mockMvc.perform(delete("/api/user/{email}","email").with(csrf()))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("로그아웃 오류")
        @Test
        void logout() throws Exception{
            doThrow(new CustomException(ErrorCode.NO_USER)).when(memberService).logout(any());
            mockMvc.perform(get("/api/user/logout"))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(memberService).logout(any());
            mockMvc.perform(get("/api/user/logout"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("회원 수정 오류")
        @Test
        void updateMemberException() throws Exception{
            MemberRequestDto memberRequestDto = MemberRequestDto.builder()
                    .nickname("name").email("email").build();

            doThrow(new CustomException(ErrorCode.NO_USER)).when(memberService).updateMember(any(),any());
            String json = new ObjectMapper().writeValueAsString(memberRequestDto);
            MockMultipartFile dto = new MockMultipartFile("memberRequestDto", "memberRequestDto", "application/json", json.getBytes(StandardCharsets.UTF_8));

            mockMvc.perform(multipart(HttpMethod.PUT,"/api/user")
                            .file(dto).with(csrf()))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(memberService).updateMember(any(),any());
            mockMvc.perform(multipart(HttpMethod.PUT,"/api/user")
                            .file(dto).with(csrf()))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("소셜로그인 회원가입시 음악 기록 오류")
        @Test
        void updateMemberMusicInfoException() throws Exception{
            MemberMusicUpdateDto memberMusicUpdateDto = MemberMusicUpdateDto.builder()
                    .userId(1L).classic(true).jazz(true).pop(true).reggae(true).rnb(true).electronic(true).build();

            doThrow(new CustomException(ErrorCode.NO_USER)).when(memberService).updateMusic(any());

            mockMvc.perform(put("/api/user/social").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(memberMusicUpdateDto)))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(memberService).updateMusic(any());

            mockMvc.perform(put("/api/user/social").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(memberMusicUpdateDto)))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("비밀번호 변경 오류")
        @Test
        void updatePasswordException() throws Exception{
            LoginDto loginDto = LoginDto.builder()
                    .email("email").password("password").build();

            doThrow(new CustomException(ErrorCode.NO_USER)).when(memberService).updatePassword(any());

            mockMvc.perform(put("/api/user/pwd").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(loginDto)))
                    .andExpect(status().isNotFound());

            doThrow(new RuntimeException()).when(memberService).updatePassword(any());

            mockMvc.perform(put("/api/user/pwd").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(loginDto)))
                    .andExpect(status().isInternalServerError());
        }
    }
}