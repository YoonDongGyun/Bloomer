package com.exmaple.flory.service;

import com.exmaple.flory.dto.member.*;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.jwt.TokenProvider;
import com.exmaple.flory.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

//@SpringBootTest
@ExtendWith(SpringExtension.class)
class AuthServiceTest {

    @Mock
    private AuthenticationManagerBuilder authenticationManagerBuilder;

    @InjectMocks
    AuthService authService;

    @Mock
    private MemberRepository memberRepository;

    @Spy
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenProvider tokenProvider;

    @BeforeEach
    void beforeEach() {
//        authenticationManagerBuilder = new AuthenticationManagerBuilder(new ObjectPostProcessor<Object>() {
//            @Override
//            public <O> O postProcess(O object) {
//                return null;
//            }
//        });
        authService = new AuthService(authenticationManagerBuilder,
                memberRepository,
                passwordEncoder,
                tokenProvider);
    }

    @DisplayName("회원가입")
    @Test
    void signup() {
        //given
        SignUpRequestDto signUpRequestDto = SignUpRequestDto.builder()
                .nickname("nickname").password("password").email("email").build();

        Member member = signUpRequestDto.toMember(passwordEncoder);

        when(memberRepository.existsByEmail(any())).thenReturn(false);
        when(memberRepository.save(any())).thenReturn(member);

        //when
        MemberResponseDto result = authService.signup(signUpRequestDto);

        //then
        assertThat(result.getEmail()).isEqualTo(signUpRequestDto.getEmail());

    }

//    @DisplayName("로그인")
//    @Test
//    void login() {
//        //given
//        LoginDto loginDto = LoginDto.builder()
//                .email("email").password("password").build();
//
//        Member member = Member.builder()
//                .nickname("nickname").password(passwordEncoder.encode("password")) .img("img").email("email") .refreshToken("token").build();
//
//        TokenDto tokenDto = TokenDto.builder()
//                .grantType("grandType").accessToken("accessToken").refreshToken("refreshToken").accessTokenExpiresIn(10000L).build();
//
//        Authentication authentication = loginDto.toAuthentication();
//
//        when(authenticationManagerBuilder.getObject().authenticate(any())).thenReturn(authentication);
//        when(tokenProvider.createTokenDto(any())).thenReturn(tokenDto);
//
//        when(memberRepository.findByEmail(any())).thenReturn(Optional.ofNullable(member));
//        member.updateToken("newToken");
//        when(memberRepository.save(any())).thenReturn(member);
//
//        //when
//        TokenDto result = authService.login(loginDto);
//
//        //then
//        assertThat(result.getRefreshToken()).isEqualTo(member.getRefreshToken());
//    }

    @Test
    void reissue() {
        TokenRequestDto tokenRequestDto = TokenRequestDto.builder()
                .accessToken("accessToken").refreshToken("refreshToken").build();

        Member member = Member.builder()
                .userId(1L) .nickname("nickname").password(passwordEncoder.encode("password")) .img("img").email("email") .refreshToken("token").build();

        TokenDto tokenDto = TokenDto.builder()
                        .grantType("grandType").accessToken("newAccessToken").refreshToken("refreshToken").accessTokenExpiresIn(10000L).build();
        when(tokenProvider.validateToken(any())).thenReturn(true);
        when(tokenProvider.getAuthentication(any())).thenReturn(new UsernamePasswordAuthenticationToken(1, "accessToken"));
        when(memberRepository.findById(any())).thenReturn(Optional.ofNullable(member));
        when(tokenProvider.createTokenDto(any())).thenReturn(tokenDto);

        member.updateToken(tokenDto.getRefreshToken());
        when(memberRepository.save(any())).thenReturn(member);

        //when
        TokenDto result = authService.reissue(tokenRequestDto);

        //then
        assertThat(result.getRefreshToken()).isEqualTo(member.getRefreshToken());
    }

    @DisplayName("이메일 중복 확인")
    @Test
    void checkEmail() {
        //given
        String email = "email";

        when(memberRepository.existsByEmail(any())).thenReturn(false);

        boolean result = authService.checkEmail(email);

        assertThat(result).isFalse();
    }
}