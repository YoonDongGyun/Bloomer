package com.exmaple.flory.dto.team;

import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.entity.Diary;
import com.exmaple.flory.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeamMemberInfoDto {
    private Long userId;
    private String nickname;
    private String img;
    private String email;
    private Long flowerId;
    private Date lastTime;

    public static TeamMemberInfoDto of(Member member, Diary diary) {
        return new TeamMemberInfoDto(member.getUserId(), member.getNickname(),member.getImg(), member.getEmail(), diary.getFlower().getId(), diary.getCreatedTime());
    }
    public static TeamMemberInfoDto of(Member member) {
        return new TeamMemberInfoDto(member.getUserId(), member.getNickname(),member.getImg(), member.getEmail(), null, null);
    }
}
