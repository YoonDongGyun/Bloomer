package com.exmaple.flory.dto.team;

import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.entity.UserTeam;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeamMemberResponseDto {

    private Long teamId;
    private MemberResponseDto user;
    private String message;

    public static TeamMemberResponseDto of(UserTeam userTeam) {
        return new TeamMemberResponseDto(userTeam.getTid().getTeamId(),MemberResponseDto.of(userTeam.getUid()),userTeam.getMessage());
    }
}
