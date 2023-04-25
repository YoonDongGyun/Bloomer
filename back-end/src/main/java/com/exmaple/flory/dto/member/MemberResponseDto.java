package com.exmaple.flory.dto.member;

import com.exmaple.flory.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private Long userId;
    private String nickname;
    private String img;
    private String email;

    public static MemberResponseDto of(Member member) {
        return new MemberResponseDto(member.getUserId(), member.getNickname(), member.getImg(), member.getEmail());
    }
}
