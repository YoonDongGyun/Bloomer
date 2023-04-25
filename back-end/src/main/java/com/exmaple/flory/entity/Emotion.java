package com.exmaple.flory.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "emotion")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Emotion {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "large_category")
    private String largeCategory;

    @JsonIgnore
    @OneToMany(mappedBy = "emotion", cascade = CascadeType.ALL)
    private List<Flower> flowerList;
}
