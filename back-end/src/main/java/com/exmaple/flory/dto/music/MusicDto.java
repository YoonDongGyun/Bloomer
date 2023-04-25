package com.exmaple.flory.dto.music;

import com.exmaple.flory.entity.Music;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Slf4j
public class MusicDto {

    private Long id;

    private String title;

    public Music toEntity(){
        return Music.builder()
                .id(id).title(title).build();
    }
}
