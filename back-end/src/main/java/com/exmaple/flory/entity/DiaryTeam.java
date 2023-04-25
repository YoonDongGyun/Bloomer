package com.exmaple.flory.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Entity(name = "diary_team")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Slf4j
public class DiaryTeam {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "did")
    private Long diaryId;

    @Column(name = "tid")
    private Long groupId;

}
