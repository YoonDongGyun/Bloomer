package com.exmaple.flory.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "team")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Team extends BaseTime{

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId;

    @Column(name = "name", length = 30, nullable = false)
    private String name;

    @Column(name = "info", length = 100)
    private String info;

    @Column(name = "open", columnDefinition = "TINYINT", nullable = false)
    private Boolean open;

    @Builder.Default
    @JsonIgnore
    @OneToMany(mappedBy = "tid", cascade = CascadeType.ALL) //읽기만 가능하다.
    private List<UserTeam> userTeamList = new ArrayList<>();

    public Team updateTeam(String name, String info, Boolean open) {
        this.name = name;
        this.info = info;
        this.open = open;
        return this;
    }

}
