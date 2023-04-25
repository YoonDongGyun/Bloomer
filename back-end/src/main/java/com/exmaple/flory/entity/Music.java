package com.exmaple.flory.entity;

import com.exmaple.flory.dto.music.MusicDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "music")
public class Music{

    @Id
    @Column(name="id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title",nullable = false)
    private String title;

    @OneToMany(mappedBy = "music")
    @JsonIgnore
    private List<Diary> diaryList;

    public MusicDto toDto(){
        return MusicDto.builder()
                .id(id).title(title).build();
    }
}
