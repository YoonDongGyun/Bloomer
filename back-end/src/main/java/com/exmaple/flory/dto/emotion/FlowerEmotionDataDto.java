package com.exmaple.flory.dto.emotion;

import com.exmaple.flory.dto.flower.FlowerEmotionDto;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Slf4j
public class FlowerEmotionDataDto {
    List<FlowerEmotionDto> flowers;

    List<EmotionDataDto> emotions;
}
