package com.exmaple.flory.dto.flower;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Slf4j
public class FlowerEmotionDto {
    private Long fid;

    private Long eid;

    private String flowerName;

    private String language;

    private String largeCategory;

    private String smallCategory;
}
