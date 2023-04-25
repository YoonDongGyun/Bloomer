package com.exmaple.flory.entity;

import com.exmaple.flory.dto.guest.GuestResponseDto;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@Table(name = "guest_book")
@Entity
public class Guest extends BaseTime{

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String color;

    @JoinColumn(name = "uid")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne
    private Member member;

    @JoinColumn(name = "gid")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne
    private Garden garden;

    @Column
    private String content;

    public GuestResponseDto toResponseDto() {

        return GuestResponseDto.builder()
                .nickName(member.getNickname())
                .userId(member.getUserId())
                .gardenId(garden.getId())
                .color(color)
                .book_id(id)
                .img(member.getImg())
                .contents(content)
                .created_time(getCreatedDate())
                .build();
    }
}
