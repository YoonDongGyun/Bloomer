package com.exmaple.flory.entity;

import com.exmaple.flory.dto.garden.GardenDiaryDto;
import com.exmaple.flory.dto.garden.GardenInsertResponseDto;
import com.exmaple.flory.dto.garden.GardenResponseDto;
import com.exmaple.flory.dto.member.MemberResponseDto;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "garden")
@Entity
public class Garden extends BaseTime {

    @Id
    @Column(name = "id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "deadline")
    private LocalDateTime deadLine;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="uid")
    private Member member;

    @ManyToOne
    @JoinColumn(name="mid")
    private Music music;

    @Column(name = "img")
    private String img;

    @Column(name = "type")
    private int type;

    //�ܷ�Ű ����
    @OneToMany(mappedBy = "garden", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<Diary> diaryList = new ArrayList<>();

    public GardenResponseDto toResponseDto() {
        GardenResponseDto res = GardenResponseDto
                .builder()
                .userId(member.getUserId())
                .type(type)
                .deadline(deadLine)
                .nickname(member.getNickname())
                .img(img)
                .gardenId(id)
                .build();

        if(music == null) {
            res.setMusicTitle("");
        }

        else {
            res.setMusicTitle(music.getTitle());
        }

        return res;
    }

    public GardenInsertResponseDto toInsertResponseDto() {
        return GardenInsertResponseDto
                .builder()
                .userId(member.getUserId())
                .nickname(member.getNickname())
                .gardenId(id)
                .deadline(deadLine)
                .type(type)
                .img(img)
                .build();
    }

    public GardenDiaryDto toDiaryDto(){
        if(music==null){
            return GardenDiaryDto.builder()
                    .id(id).deadLine(deadLine).member(MemberResponseDto.of(member)).build();
        }

        else{
            return GardenDiaryDto.builder()
                    .id(id).deadLine(deadLine).member(MemberResponseDto.of(member)).musicTitle(music.getTitle()).build();
        }

    }
}
