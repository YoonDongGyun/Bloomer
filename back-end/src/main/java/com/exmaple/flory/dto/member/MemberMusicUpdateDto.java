package com.exmaple.flory.dto.member;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberMusicUpdateDto {

    private Long userId;
    private Boolean hiphop;
    private Boolean classic;
    private Boolean jazz;
    private Boolean pop;
    private Boolean reggae;
    private Boolean rnb;
    private Boolean electronic;
}
