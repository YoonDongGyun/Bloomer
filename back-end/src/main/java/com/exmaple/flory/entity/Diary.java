package com.exmaple.flory.entity;

import com.exmaple.flory.dto.diary.DiaryDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name="diary")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@DynamicUpdate //Update 시에 변경된 필드만 대응
@Slf4j
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "img_src")
    private String imgSrc;

    @Column(name = "lat")
    private double lat;

    @Column(name = "lng")
    private double lng;

    @Column(name = "public_status")
    private String publicStatus;

    @Column(name = "x")
    private String x;

    @Column(name = "y")
    private String y;

    @Column(name = "z")
    private String z;

    @Column(name = "address")
    private String address;

    @Column(name = "created_time")
    @CreationTimestamp
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdTime;

    @JoinColumn(name = "mid")
    @ManyToOne
    private Music music;

    @JoinColumn(name = "gid")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne
    private Garden garden;

    @JoinColumn(name = "fid")
    @ManyToOne
    private Flower flower;

    @JsonIgnore
    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL)
    List<Comment> commentList;

    public DiaryDto toDto() {
        return DiaryDto.builder()
                .id(id).content(content).imgSrc(imgSrc).lat(lat).lng(lng).publicStatus(publicStatus).x(x).y(y).z(z).createdTime(createdTime)
                .musicTitle(music.getTitle()).garden(garden.toDiaryDto()).address(address).build();
    }
}
