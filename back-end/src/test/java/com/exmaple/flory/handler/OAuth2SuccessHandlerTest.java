package com.exmaple.flory.handler;

import com.exmaple.flory.dto.member.TokenDto;
import com.exmaple.flory.dto.oauth.OAuthAttributes;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.jwt.TokenProvider;
import com.exmaple.flory.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;


import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

//@ExtendWith(SpringExtension.class)
//public class OAuth2SuccessHandlerTest {
//
//    Oauth2SuccessHandler handler;
//
//    @MockBean
//    private TokenProvider jwtTokenProvider;
//
//    @MockBean
//    private MemberRepository memberRepository;
//
//    @MockBean
//    private AuthenticationManagerBuilder authenticationManagerBuilder;
//
//    @MockBean
//    private AuthenticationManager authenticationManager;
//
//    @BeforeEach
//    void setUp() {
//        handler = new Oauth2SuccessHandler(jwtTokenProvider,
//                memberRepository,
//                authenticationManagerBuilder);
//    }
//
//    @DisplayName("소셜로그인 성공 후 리다이렉션 테스트")
//    @Test
//    public void googleSocialLoginTest() throws Exception {
//
//        MockHttpServletRequest request = new MockHttpServletRequest();
//        MockHttpServletResponse response = new MockHttpServletResponse();
//
//        OAuthAttributes oAuthAttributes = OAuthAttributes
//                .builder()
//                .email("tmp@naver.com")
//                .name("testUser")
//                .build();
//
//        TokenDto tokenDto = TokenDto.builder()
//                .accessToken("access")
//                .refreshToken("refresh")
//                .build();
//
//        Member member = Member.builder()
//                .userId(1L)
//                .email(oAuthAttributes.getEmail())
//                .build();
//
//        when(memberRepository.findByEmail(any())).thenReturn(Optional.of(member));
//        when(jwtTokenProvider.createTokenDto(any())).thenReturn(tokenDto);
//        when(authenticationManagerBuilder.getObject()).thenReturn(authenticationManager);
//        when(authenticationManager.authenticate(any())).thenReturn(oAuthAttributes);
//
//        handler.onAuthenticationSuccess(request,response,oAuthAttributes);
//        assertThat(response.getRedirectedUrl()).isNotNull();
//    }
//}
