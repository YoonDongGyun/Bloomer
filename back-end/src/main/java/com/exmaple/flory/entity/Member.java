package com.exmaple.flory.entity;

import com.exmaple.flory.dto.member.MemberMusicUpdateDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "member")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member extends BaseTime {

    @Id
    @Column(name = "user_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(name = "nickname", length = 20, nullable = false)
    private String nickname;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "img")
    private String img;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="refresh_token")
    private String refreshToken;

    @Column(name = "classic")
    private Boolean classic;
    @Column(name="jazz")
    private Boolean jazz;

    @Column(name="pop")
    private Boolean pop;

    @Column(name="reggae")
    private Boolean reggae;

    @Column(name="hiphop")
    private Boolean hiphop;

    @Column(name="rnb")
    private Boolean rnb;

    @Column(name="electronic")
    private Boolean electronic;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    //외래키 참조
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<Garden> gardenList = new ArrayList<>();

    @OneToMany(mappedBy = "uid", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @Builder.Default
    private List<UserTeam> userTeamList = new ArrayList<>();

    public Member updateToken(String refreshToken) {
        this.refreshToken = refreshToken;
        return this;
    }

    public Member updateMember(String nickname){ //, String password, PasswordEncoder passwordEncoder
        this.nickname = nickname;
//        this.password = passwordEncoder.encode(password);
        return this;
    }

    public Member updateImg(String img){
        this.img = img;
        return this;
    }

    public Member updatePassword(String password, PasswordEncoder passwordEncoder){
        this.password = passwordEncoder.encode(password);
        return this;
    }

    public void updateMusic(MemberMusicUpdateDto memberMusicUpdateDto) {

        this.pop = memberMusicUpdateDto.getPop();
        this.classic = memberMusicUpdateDto.getClassic();
        this.jazz = memberMusicUpdateDto.getJazz();
        this.reggae = memberMusicUpdateDto.getReggae();
        this.rnb = memberMusicUpdateDto.getRnb();
        this.electronic = memberMusicUpdateDto.getElectronic();
        this.hiphop = memberMusicUpdateDto.getHiphop();
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Comment> commentList;
}