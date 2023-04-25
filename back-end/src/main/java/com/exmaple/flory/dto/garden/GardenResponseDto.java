package com.exmaple.flory.dto.garden;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class GardenResponseDto {

    private Long userId;
    private String nickname;
    private Long gardenId;
    private String musicTitle; //노래 제목
    private LocalDateTime deadline;
    private String img;
    private int type;
}
