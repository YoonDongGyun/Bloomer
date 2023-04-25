package com.exmaple.flory.jwt;

import com.exmaple.flory.dto.member.TokenDto;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collection;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
class TokenProviderTest {

    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "Bearer"; //JWT 혹은 OAuth에 대한 토큰을 사용한다.
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24;
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // 7일
    private final Key secret = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    @InjectMocks
    private TokenProvider tokenProvider;

    @BeforeEach
    void setUp() throws Exception {
        String secretString = Base64.getEncoder().encodeToString(secret.getEncoded());
        this.tokenProvider = new TokenProvider(secretString);
        tokenProvider.afterPropertiesSet();
    }
    @Test
    void afterPropertiesSet() throws Exception {
//        tokenProvider.afterPropertiesSet();
//        assertNotNull(tokenProvider.key);
    }

    @DisplayName("토큰 생성 테스트")
    @Test
    void createTokenDto() {
        // given
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        Authentication authentication = new UsernamePasswordAuthenticationToken("user", "password", authorities);

        // when
        TokenDto tokenDto = tokenProvider.createTokenDto(authentication);

        // then
        assertThat("Bearer").isEqualTo(tokenDto.getGrantType());
//        assertThat(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRE_TIME).isEqualTo(tokenDto.getAccessTokenExpiresIn());
    }

    @Test
    void getAuthentication() {
        // given
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        Authentication authentication = new UsernamePasswordAuthenticationToken("user", "password", authorities);

        TokenDto tokenDto = tokenProvider.createTokenDto(authentication);
        String accessToken = tokenDto.getAccessToken();

        Authentication result = tokenProvider.getAuthentication(accessToken);

        assertThat(result).isInstanceOf(UsernamePasswordAuthenticationToken.class);
        assertThat(result.getCredentials()).isEqualTo(accessToken);
    }

//    @Test
//    void validateToken() {
//
//    }
//
//    @Test
//    void parseClaims(){
//
//    }
}