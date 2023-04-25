package com.exmaple.flory.dto.team;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Slf4j
public class TeamIdListDto {
    List<Long> teamIdList;
}
