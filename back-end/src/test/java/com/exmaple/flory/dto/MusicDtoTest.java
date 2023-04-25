package com.exmaple.flory.dto;

import com.exmaple.flory.dto.music.MusicDto;
import com.exmaple.flory.entity.Music;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class MusicDtoTest {

    @DisplayName("toEntity 테스트")
    @Test
    public void MusicToEntityTest() {

        MusicDto musicDto = MusicDto
                .builder()
                .id(1L)
                .title("test")
                .build();

        Music music = musicDto.toEntity();

        assertThat(music).isNotNull();
    }

    @DisplayName("setter 테스트")
    @Test
    public void setterTest() {

        String test = "테스트";
        Long id = 1L;
        MusicDto musicDto = MusicDto.builder().build();

        musicDto.setTitle(test);
        musicDto.setId(id);
        assertThat(musicDto.getTitle()).isEqualTo(test);
        assertThat(musicDto.getId()).isEqualTo(id);
    }
}
