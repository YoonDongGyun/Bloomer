package com.exmaple.flory.dto.garden;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class GardenInsertResponseDto {

    private Long userId;
    private String nickname;
    private Long gardenId;
    private LocalDateTime deadline;
    private String img;
    private int type;
}
