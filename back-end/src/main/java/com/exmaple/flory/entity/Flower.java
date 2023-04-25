package com.exmaple.flory.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.List;

@Entity(name="flower")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Slf4j
public class Flower {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "language")
    private String language;

    @JoinColumn(name = "eid")
    @ManyToOne
    private Emotion emotion;

    @Column(name = "small_category")
    private String smallCategory;

    @JsonIgnore
    @OneToMany(mappedBy = "flower")
    private List<Diary> diaryList;
}
