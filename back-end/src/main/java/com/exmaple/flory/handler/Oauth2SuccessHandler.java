package com.exmaple.flory.handler;

import com.exmaple.flory.dto.member.TokenDto;
import com.exmaple.flory.dto.oauth.OAuthAttributes;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.jwt.TokenProvider;
import com.exmaple.flory.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class Oauth2SuccessHandler implements AuthenticationSuccessHandler {

    private final TokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    @Value("${social.login.redirectUrl}")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuthAttributes oAuthAttributes = (OAuthAttributes) authentication.getPrincipal();

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(oAuthAttributes.getEmail(),"1234");

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        Authentication auth = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        TokenDto tokenDto = jwtTokenProvider.createTokenDto(auth);

        log.info("social login user email: {} ",oAuthAttributes.getEmail());
        log.info("access token:: {} ",tokenDto.getAccessToken());
        log.info("refresh token: {}", tokenDto.getRefreshToken());

        Optional<Member> result = memberRepository.findByEmail(oAuthAttributes.getEmail());
        Member member = result.get();

        Long userId = member.getUserId();
        int newUser = 0;
        //새로 등록한 유저
        if(member.getPop() == null) {
            member.updateRefreshToken(tokenDto.getRefreshToken());
            newUser = 1;
        }
        memberRepository.save(member);

        StringBuilder sb = new StringBuilder();
        sb.append(redirectUrl).append("?refreshToken=")
                .append(tokenDto.getRefreshToken())
                .append("&&accessToken=")
                .append(tokenDto.getAccessToken())
                .append("&&userId=")
                .append(userId)
                .append("&&newUser=")
                .append(newUser);

        response.sendRedirect(sb.toString());



    }
}
