package com.exmaple.flory.dto.team;

import com.exmaple.flory.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamInsertRequestDto {

    private String name; //그룹 이름
    private String info; //그룹 소개
    private Boolean open; //공개여부
//    private List<Long> participant; //그룹 참가자
    private Long hostId; //방장 아이디

    public Team toGroup() {
        return Team.builder()
                .name(name)
                .info(info)
                .open(open)
                .build();
    }
}
