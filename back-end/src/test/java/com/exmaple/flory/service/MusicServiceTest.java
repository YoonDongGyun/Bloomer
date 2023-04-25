package com.exmaple.flory.service;

import com.exmaple.flory.dto.music.MusicRecommendResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@ExtendWith(SpringExtension.class)
public class MusicServiceTest {

    MusicService musicService;
    RestTemplate restTemplate;
    MockRestServiceServer mockServer;

    @BeforeEach
    public void setUp() {
        musicService = new MusicService();
        restTemplate = new RestTemplate();
        mockServer = MockRestServiceServer.createServer(restTemplate);
    }

    @DisplayName("음악 추천 서비스 테스트")
    @Test
    public void recommendMusicTest() throws Exception{

        List<MusicRecommendResponseDto> result = musicService.recommendMusic(0,2L);
        // Then
        assertThat(result.size()).isEqualTo(5);
        mockServer.verify();
    }
}
