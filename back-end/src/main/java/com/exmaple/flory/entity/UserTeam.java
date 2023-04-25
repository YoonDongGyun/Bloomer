package com.exmaple.flory.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "user_team")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserTeam {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userTeamId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="tid") //외래키
    private Team tid;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="uid")
    private Member uid;

    /**
     * status = 0 : 대기중
     * status = 1 : 승인
     */
    @Column(name = "status", nullable = false)
    private Integer status;

    @Column(name = "message", length = 100)
    private String message; //신청메시지

    /**
     * manager = 0 : 관리자
     * manager = 1 : 멤버
     */
    @Column(name = "manager", nullable = false)
    private Integer manager; //관리자

    public UserTeam updateUserTeam(int status) {
        this.status = status;
        return this;
    }
}
