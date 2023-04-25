package com.exmaple.flory.service;

import com.exmaple.flory.dto.music.MusicRecommendResponseDto;
import com.exmaple.flory.entity.Music;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import net.minidev.json.JSONObject;
import org.json.JSONArray;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class MusicService {

    public List<MusicRecommendResponseDto> recommendMusic(Integer emotion,Long user_id) throws Exception {

        List<MusicRecommendResponseDto> ret = new ArrayList<>();

        RestTemplate restTemplate = new RestTemplate();
        StringBuilder url = new StringBuilder();
        url.append("https://j8a205.p.ssafy.io/")
                .append("domain/emotions/")
                .append(emotion+"/")
                .append("near-user/")
                .append(user_id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>("",headers);

        log.info("request domain");

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                url.toString(), HttpMethod.GET,entity, String.class);

        String responseBody = responseEntity.getBody();

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> responseMap = objectMapper.readValue(responseBody, new TypeReference<Map<String,Object>>() {});
        JSONArray resultArray = new JSONArray((String) responseMap.get("result"));

        for(int i=0;i < resultArray.length();++i) {
            ret.add(MusicRecommendResponseDto.builder().title(resultArray.getString(i)).build());
        }

        return ret;

    }
}
