package com.exmaple.flory.dto.team;

import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.entity.Team;
import com.exmaple.flory.entity.UserTeam;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeamDto {
    private Long teamId;
    private String name; //그룹 이름
    private String info;
    private Boolean open;
    private List<TeamMemberInfoDto> userTeamList;
    private LocalDateTime createdDate;
    private Integer status;
    private Integer manager; //관리자
    private Long managerId;


    public static TeamDto of(Team team, List<TeamMemberInfoDto> memberList, Integer status, Integer manager, Long managerId ) {
        return new TeamDto(team.getTeamId(), team.getName(), team.getInfo(), team.getOpen(), memberList, team.getCreatedDate(), status, manager, managerId);
    }
    public static TeamDto of(Team team) {
        List<TeamMemberInfoDto> memberList = new ArrayList<>();
        Long managerId = 1L;

        for(UserTeam userTeam : team.getUserTeamList()){
            if(userTeam.getStatus() == 1){ // 승인된 사람들만
                memberList.add(TeamMemberInfoDto.of(userTeam.getUid()));
            }
            if(userTeam.getManager() == 0){
                managerId = userTeam.getUid().getUserId();
            }
        }
        return new TeamDto(team.getTeamId(), team.getName(), team.getInfo(), team.getOpen(), memberList, team.getCreatedDate(), 1, 0, managerId);
    }

    public static TeamDto toTeam(Team team, List<TeamMemberInfoDto> memberList){
        return new TeamDto(team.getTeamId(), team.getName(), team.getInfo(), team.getOpen(), memberList, team.getCreatedDate(),1, 0, memberList.get(0).getUserId());
    }

}
