package com.exmaple.flory.dto;

import com.exmaple.flory.dto.music.MusicRecommendResponseDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
public class MusicRecommendResponseDtoTest {

    @DisplayName("setter테스트")
    @Test
    public void setterTest() {

        String test = "테스트";

        MusicRecommendResponseDto musicRecommendResponseDto = MusicRecommendResponseDto
                .builder()
                .build();

                musicRecommendResponseDto.setTitle(test);

        assertThat(musicRecommendResponseDto.getTitle()).isEqualTo(test);
    }
}
