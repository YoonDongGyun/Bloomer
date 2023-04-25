package com.exmaple.flory.dto.diary;

import com.exmaple.flory.dto.comment.CommentResponseDto;
import com.exmaple.flory.dto.flower.FlowerEmotionDto;
import com.exmaple.flory.dto.garden.GardenDiaryDto;
import com.exmaple.flory.dto.team.TeamDto;
import com.exmaple.flory.entity.Diary;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Slf4j
public class DiaryDto implements Comparable<DiaryDto>{
    private Long id;

    private String content;

    private String imgSrc;

    private double lat;

    private double lng;

    private String publicStatus;

    private String x;

    private String y;

    private String z;

    private String address;

    private Date createdTime;

    private GardenDiaryDto garden;

    private FlowerEmotionDto flowerEmotion;

    private List<TeamDto> groupList;

    private String musicTitle;

    private List<CommentResponseDto> commentList;

    public Diary toEntity(){
        return Diary.builder()
                .id(id).content(content).imgSrc(imgSrc).lat(lat).lng(lng).publicStatus(publicStatus).x(x).y(y).z(z).createdTime(createdTime)
                .address(address).build();
    }

    @Override
    public int compareTo(DiaryDto o) {
        return o.createdTime.compareTo(this.createdTime);
    }
}
