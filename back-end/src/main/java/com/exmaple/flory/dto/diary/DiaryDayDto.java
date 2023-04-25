package com.exmaple.flory.dto.diary;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
@Slf4j
public class DiaryDayDto {
    private String day;

    private List<DiaryDto> diaryList;
}
