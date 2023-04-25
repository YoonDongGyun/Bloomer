package com.exmaple.flory.dto.emotion;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Slf4j
public class EmotionDataDto implements Comparable<EmotionDataDto> {
    private String largeCategory;

    private double analysis;

    @Override
    public int compareTo(EmotionDataDto o) {
        return Double.compare(this.analysis,o.analysis)*-1;
    }
}
