package com.exmaple.flory.dto.team;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamUpdateRequestDto {
    private Long teamId;
    private String name; //그룹 이름
    private String info; //소개말
    private Boolean open; //공개 여부

}
