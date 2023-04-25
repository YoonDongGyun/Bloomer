package com.exmaple.flory.dto.guest;

import com.exmaple.flory.entity.Guest;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GuestRequestDto {

    private Long gardenId;
    private Long userId;
    private String contents;
    private Long bookId;
    private String color;

    public Guest toEntity() {
        return Guest.builder()
                .content(contents)
                .color(color)
                .build();
    }
}
