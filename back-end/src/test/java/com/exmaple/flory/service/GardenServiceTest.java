package com.exmaple.flory.service;

import com.exmaple.flory.dto.garden.GardenInsertResponseDto;
import com.exmaple.flory.dto.garden.GardenRequestDto;
import com.exmaple.flory.dto.garden.GardenResponseDto;
import com.exmaple.flory.entity.Garden;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.entity.Music;
import com.exmaple.flory.repository.GardenRepository;
import com.exmaple.flory.repository.MemberRepository;
import com.exmaple.flory.repository.MusicRepository;
import org.aspectj.apache.bcel.classfile.Code;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class GardenServiceTest {

    @MockBean
    GardenRepository gardenRepository;

    @MockBean
    MemberRepository memberRepository;

    @MockBean
    MusicRepository musicRepository;

    GardenService gardenService;

    @BeforeEach
    public void setUp() {
        gardenService = new GardenService(gardenRepository,
                memberRepository,
                musicRepository);
    }

    @DisplayName("상세 정원정보 가져오기 테스트")
    @Test
    public void getDetailTest() {

        Member member = Member.builder()
                .userId(1L)
                .nickname("test")
                .build();

        Garden garden = Garden
                .builder()
                .id(1L)
                .img("test")
                .member(member)
                .type(1)
                .build();

        when(gardenRepository.findById(any())).thenReturn(Optional.of(garden));

        GardenResponseDto result = gardenService.getDetail(1L);

        assertThat(result.getImg()).isEqualTo(garden.getImg());
        assertThat(result.getType()).isEqualTo(garden.getType());
    }

    @DisplayName("정원 생성 로직")
    @Test
    public void gardenInsertTest() {

        Member member = Member.builder()
                .userId(1L)
                .nickname("test")
                .build();

        GardenRequestDto gardenRequestDto = GardenRequestDto.builder()
                        .userId(1L)
                        .type(1)
                        .img("test")
                        .build();

        LocalDateTime today = LocalDateTime.now();

        LocalDateTime nxtMonth = LocalDateTime.of(today.getYear(),
                today.getMonthValue()+1,
                1,
                0,
                0,
                0);

        LocalDateTime deadLine = nxtMonth.minusSeconds(1);

        when(memberRepository.findById(any())).thenReturn(Optional.of(member));

        GardenInsertResponseDto result = gardenService.insert(gardenRequestDto);

        assertThat(result.getNickname()).isEqualTo(member.getNickname());
        assertThat(result.getDeadline()).isEqualTo(deadLine);

    }

    @DisplayName("정원 업데이트 메소드")
    @Test
    public void updateGardenTesT() {

        Member member = Member.builder()
                .userId(1L)
                .nickname("test")
                .build();

        Garden garden = Garden
                .builder()
                .id(1L)
                .img("test")
                .member(member)
                .type(1)
                .build();

        Music music = Music.builder()
                .id(1L)
                .title("funny song")
                .build();

        Garden updated = Garden
                .builder()
                .id(1L)
                .img("test")
                .member(member)
                .type(1)
                .build();

        GardenRequestDto gardenRequestDto = GardenRequestDto
                .builder()
                .musicTitle(music.getTitle())
                .img("test img")
                .gardenId(1L)
                .build();

        updated.setMusic(music);

        when(musicRepository.findByTitle(any())).thenReturn(music);
        when(gardenRepository.findById(any())).thenReturn(Optional.of(garden));
        when(gardenRepository.save(any())).thenReturn(updated);

        GardenResponseDto result = gardenService.update(gardenRequestDto);

        assertThat(result.getNickname()).isEqualTo(member.getNickname());
        assertThat(result.getMusicTitle()).isEqualTo(music.getTitle());
        assertThat(result.getGardenId()).isEqualTo(garden.getId());
    }

    @DisplayName("정원 삭제 테스트")
    @Test
    public void deleteTest() {

        Garden garden = Garden
                .builder()
                .id(1L)
                .img("test")
                .type(1)
                .build();

        when(gardenRepository.findById(any())).thenReturn(Optional.of(garden));

        gardenService.delete(garden.getId());

        assertThatCode(() -> gardenRepository.deleteById(any())).doesNotThrowAnyException();
    }

    @DisplayName("연,월에 맞는 정원 반환받기")
    @Test
    public void getGardenByMonthTest() {

        LocalDateTime today = LocalDateTime.now();

        int month = today.getMonthValue();
        int year = today.getYear();

        Member member = Member.builder()
                .userId(1L)
                .nickname("test")
                .build();

        Garden garden = Garden
                .builder()
                .id(1L)
                .img("test")
                .member(member)
                .type(1)
                .build();

        when(gardenRepository.findByDate(any(),any(),any())).thenReturn(Optional.of(garden));

        GardenResponseDto result = gardenService.getGardenByMonth(1L,year,month);

        assertThat(result.getNickname()).isEqualTo(member.getNickname());
        assertThat(result.getType()).isEqualTo(garden.getType());
    }

    @DisplayName("유저의 모든 정원 가져오기")
    @Test
    public void getAllGardenByUserIdTest() {

        Member member = Member.builder()
                .userId(1L)
                .nickname("test")
                .build();

        Garden garden1 = Garden
                .builder()
                .id(1L)
                .img("test1")
                .member(member)
                .type(1)
                .build();

        Garden garden2 = Garden
                .builder()
                .id(2L)
                .img("test2")
                .member(member)
                .type(1)
                .build();

        List<Garden> list = new ArrayList<>();
        list.add(garden1); list.add(garden2);

        when(gardenRepository.findAllByUserId(any())).thenReturn(list);

        List<GardenResponseDto> result = gardenService.getAllGardenByUserId(1L);

        assertThat(result.size()).isEqualTo(list.size());
        assertThat(result.get(0).getImg()).isEqualTo(garden1.getImg());
    }
}
