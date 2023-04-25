//package com.exmaple.flory.jwt;
//
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.ArgumentCaptor;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.FilterChainProxy;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//
//import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
//import static io.jsonwebtoken.lang.Assert.isInstanceOf;
//import static org.junit.jupiter.api.Assertions.*;
//import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest
//class JwtSecurityConfigTest {
//
//    @Mock
//    private TokenProvider tokenProvider;
//
//    @Test
//    void configure() throws Exception {
//        // given
//        JwtSecurityConfig jwtSecurityConfig = new JwtSecurityConfig(tokenProvider);
//        HttpSecurity httpSecurity = Mockito.mock(HttpSecurity.class);
//        ArgumentCaptor<JwtFilter> filterCaptor = ArgumentCaptor.forClass(JwtFilter.class);
//
//        // when
//        jwtSecurityConfig.configure(httpSecurity);
//
//        // then
//        JwtFilter filter = filterCaptor.getValue();
//        assertThat(filter).isNotNull();
//    }
//}