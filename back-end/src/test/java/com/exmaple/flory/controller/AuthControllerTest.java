package com.exmaple.flory.controller;

import com.exmaple.flory.dto.member.*;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.response.SuccessResponse;
import com.exmaple.flory.service.AuthService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthController.class)
@WithMockUser
class AuthControllerTest {

    @MockBean
    private AuthService authService;

    @Autowired
    private MockMvc mockMvc;

    @DisplayName("회원가입")
    @Test
    void signup() throws Exception{
        //given
        SignUpRequestDto signUpRequestDto = SignUpRequestDto.builder()
                .nickname("nickname").password("password").email("email").build();
        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
                        .userId(1L).nickname("nickname").img("img").email("email").build();

        when(authService.signup(any())).thenReturn(memberResponseDto);

        //when
        MvcResult mvcResult = mockMvc.perform(post("/api/user").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(signUpRequestDto)))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        MemberResponseDto result = new ObjectMapper().convertValue(response.getResponse(), MemberResponseDto.class);

        //then
        assertThat(result.getEmail()).isEqualTo(signUpRequestDto.getEmail());
    }

    @DisplayName("로그인")
    @Test
    void login() throws Exception{
        LoginDto loginDto = LoginDto.builder()
                .email("email").password("password").build();

        TokenDto tokenDto = TokenDto.builder()
                        .accessToken("accessToken").grantType("ROLE_USER").refreshToken("refreshToken").accessTokenExpiresIn(1000L).build();

        when(authService.login(any())).thenReturn(tokenDto);

        //when
        MvcResult mvcResult = mockMvc.perform(post("/api/user/login").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(loginDto)))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TokenDto result = new ObjectMapper().convertValue(response.getResponse(), TokenDto.class);

        //then
        assertThat(result.getRefreshToken()).isEqualTo(tokenDto.getRefreshToken());
    }

    @Test
    void reissue() throws Exception {
        TokenRequestDto tokenRequestDto = TokenRequestDto.builder()
                .accessToken("accessToken").refreshToken("refreshToken").build();

        TokenDto tokenDto = TokenDto.builder()
                .accessToken("accessToken").grantType("ROLE_USER").refreshToken("refreshToken").accessTokenExpiresIn(1000L).build();

        when(authService.reissue(any())).thenReturn(tokenDto);

        //when
        MvcResult mvcResult = mockMvc.perform(post("/api/user/access").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(tokenRequestDto)))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TokenDto result = new ObjectMapper().convertValue(response.getResponse(), TokenDto.class);

        //then
        assertThat(result.getRefreshToken()).isEqualTo(tokenRequestDto.getRefreshToken());
    }

    @Test
    void checkEmail() throws Exception {
        String email = "email";
        when(authService.checkEmail(any())).thenReturn(false);

        MvcResult mvcResult = mockMvc.perform(get("/api/user/check-email/{email}",email))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);

        //then
        assertThat(response.getResponse()).isEqualTo(false);
    }

    @Nested
    @DisplayName("AutoController ExceptionTest")
    class ExceptionTest{
        @DisplayName("회원가입 오류")
        @Test
        void signupException() throws Exception{
            //given
            SignUpRequestDto signUpRequestDto = SignUpRequestDto.builder()
                    .nickname("nickname").password("password").email("email").build();

            when(authService.signup(any())).thenThrow(new CustomException(ErrorCode.USER_DUPLICATION));

            //when
            mockMvc.perform(post("/api/user").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(signUpRequestDto)))
                    .andExpect(status().isConflict())
                    .andReturn();
        }

        @DisplayName("로그인 오류")
        @Test
        void loginException() throws Exception{
            LoginDto loginDto = LoginDto.builder()
                    .email("email").password("password").build();

            when(authService.login(any())).thenThrow(new CustomException(ErrorCode.NO_LOGIN));

            //when
            mockMvc.perform(post("/api/user/login").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(loginDto)))
                    .andExpect(status().isUnauthorized())
                    .andReturn();
        }

        @Test
        void reissueException() throws Exception {
            TokenRequestDto tokenRequestDto = TokenRequestDto.builder()
                    .accessToken("accessToken").refreshToken("refreshToken").build();

            when(authService.reissue(any())).thenThrow(new CustomException(ErrorCode.NO_LOGIN));

            //when
            mockMvc.perform(post("/api/user/access").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(tokenRequestDto)))
                    .andExpect(status().isUnauthorized())
                    .andReturn();
        }

        @Test
        void checkEmailException() throws Exception {
            String email = "email";
            when(authService.checkEmail(any())).thenThrow(new CustomException(ErrorCode.NO_LOGIN));

            mockMvc.perform(get("/api/user/check-email/{email}",email))
                    .andExpect(status().isUnauthorized())
                    .andReturn();
        }
    }
}