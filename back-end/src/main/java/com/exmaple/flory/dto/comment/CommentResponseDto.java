package com.exmaple.flory.dto.comment;

import com.exmaple.flory.dto.member.MemberResponseDto;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;

@AllArgsConstructor
@Getter
@Setter
@Builder
@Slf4j
public class CommentResponseDto {

    private Long id;

    private Long did;

    private String content;

    private Date createdTime;

    private MemberResponseDto member;
}
