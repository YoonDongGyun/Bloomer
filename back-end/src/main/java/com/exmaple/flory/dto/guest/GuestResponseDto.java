package com.exmaple.flory.dto.guest;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GuestResponseDto {

    private Long gardenId;
    private String nickName;
    private String contents;
    private Long book_id;

    private String img;
    private Long userId;
    private String color;

    private LocalDateTime created_time;
}
