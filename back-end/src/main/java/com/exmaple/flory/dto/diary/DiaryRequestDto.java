package com.exmaple.flory.dto.diary;

import com.exmaple.flory.entity.Diary;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Slf4j
public class DiaryRequestDto {

    private Long id;

    private Long gid;

    private Long fid;

    private String content;

    private double lat;

    private double lng;

    private String publicStatus;

    private String musicTitle;

    private List<Long> groupList;

    private String x;

    private String y;

    private String z;

    private String address;

    public Diary toEntity(){
        return Diary.builder()
                .id(id).content(content).lat(lat).lng(lng).publicStatus(publicStatus).x(x).y(y).z(z).address(address).build();
    }
}
