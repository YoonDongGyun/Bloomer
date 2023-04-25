package com.exmaple.flory.dto.diary;

import com.exmaple.flory.entity.DiaryTeam;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Getter
@Builder
@Slf4j
public class DiaryTeamDto {
    private Long id;

    private Long diaryId;

    private Long groupId;

    public DiaryTeam toEntity(){
        return DiaryTeam.builder()
                .id(id).diaryId(diaryId).groupId(groupId).build();
    }
}
