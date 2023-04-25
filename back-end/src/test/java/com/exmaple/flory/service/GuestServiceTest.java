package com.exmaple.flory.service;

import com.exmaple.flory.dto.guest.GuestRequestDto;
import com.exmaple.flory.dto.guest.GuestResponseDto;
import com.exmaple.flory.entity.Garden;
import com.exmaple.flory.entity.Guest;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.repository.GardenRepository;
import com.exmaple.flory.repository.GuestRepository;
import com.exmaple.flory.repository.MemberRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
public class GuestServiceTest {

    GuestService guestService;

    @MockBean
    GuestRepository guestRepository;

    @MockBean
    MemberRepository memberRepository;

    @MockBean
    GardenRepository gardenRepository;

    @BeforeEach
    public void setUp() {
        guestService = new GuestService(guestRepository,
                memberRepository,
                gardenRepository);
    }

    @DisplayName("방명록 추가 테스트")
    @Test
    public void GuestInsertTest() {

        Member member = Member.builder()
                .userId(1L)
                .email("test")
                .password("1234")
                .build();

        Garden garden = Garden.builder()
                .id(1L)
                .member(member)
                .type(0)
                .build();

        GuestRequestDto requestDto = GuestRequestDto.builder()
                .gardenId(1L)
                .color("yello")
                .build();

        when(memberRepository.findById(any())).thenReturn(Optional.of(member));
        when(gardenRepository.findById(any())).thenReturn(Optional.of(garden));
        when(guestRepository.save(any())).thenReturn(requestDto.toEntity());

        GuestResponseDto result = guestService.insert(requestDto);

        assertThat(result.getColor()).isEqualTo(requestDto.getColor());
        assertThat(result.getGardenId()).isEqualTo(requestDto.getGardenId());
    }

    @DisplayName("방명록 추가 멤버 에러 테스트")
    @Test
    public void GuestInsertErrorTest() {

        Member member = Member.builder()
                .userId(1L)
                .email("test")
                .password("1234")
                .build();

        Garden garden = Garden.builder()
                .id(1L)
                .member(member)
                .type(0)
                .build();

        GuestRequestDto requestDto = GuestRequestDto.builder()
                .gardenId(1L)
                .color("yello")
                .build();

        when(memberRepository.findById(any())).thenReturn(Optional.of(member));
        when(gardenRepository.findById(any())).thenReturn(Optional.of(garden));
        when(guestRepository.save(any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        Throwable exception = Assertions.assertThrows(
                CustomException.class,
                () -> guestService.insert(requestDto));

        Assertions.assertEquals("서버 내부 에러",exception.getMessage());
    }

    @DisplayName("방명록 디테일 테스트")
    @Test
    public void getDetailTest() {

        Member member = Member.builder()
                .nickname("hi")
                .email("he@.com")
                .userId(1L)
                .build();

        Garden garden = Garden.builder()
                .id(1L)
                .build();

        Guest guest = Guest.builder()
                .id(1L)
                .content("반가워용")
                .garden(garden)
                .member(member)
                .color("yello")
                .build();


        when(guestRepository.findById(any())).thenReturn(Optional.of(guest));

        GuestResponseDto guestResponseDto = guestService.getDetail(guest.getId());

        assertThat(guestResponseDto.getColor()).isEqualTo(guest.getColor());
        assertThat(guestResponseDto.getContents()).isEqualTo(guest.getContent());
        assertThat(guestResponseDto.getUserId()).isEqualTo(member.getUserId());
    }

    @DisplayName("방명록 디테일 에러 테스트")
    @Test
    public void getDetailErrorTest() {

        Member member = Member.builder()
                .nickname("hi")
                .email("he@.com")
                .userId(1L)
                .build();

        Garden garden = Garden.builder()
                .id(1L)
                .build();

        Guest guest = Guest.builder()
                .id(1L)
                .content("반가워용")
                .garden(garden)
                .member(member)
                .color("yello")
                .build();


        when(guestRepository.findById(any())).thenThrow(new CustomException(ErrorCode.NO_GUEST));

        Throwable exception = Assertions.assertThrows(
                CustomException.class,
                () -> guestService.getDetail(guest.getId()));

        Assertions.assertEquals("없는 방명록 입니다.",exception.getMessage());
    }

    @DisplayName("방명록 업데이트 테스트")
    @Test
    public void updateTest() {

        Member member = Member.builder()
                .nickname("hi")
                .email("he@.com")
                .userId(1L)
                .build();

        Garden garden = Garden.builder()
                .id(1L)
                .build();

        Guest guest = Guest.builder()
                .id(1L)
                .content("반가워용")
                .garden(garden)
                .member(member)
                .color("yello")
                .build();

        GuestRequestDto guestRequestDto = GuestRequestDto.builder()
                .color(guest.getColor())
                .gardenId(garden.getId())
                .contents(guest.getContent())
                .build();

        when(guestRepository.findById(any())).thenReturn(Optional.of(guest));
        when(guestRepository.save(any())).thenReturn(guest);

        GuestResponseDto result = guestService.update(guestRequestDto);

        assertThat(result.getUserId()).isEqualTo(member.getUserId());
        assertThat(result.getContents()).isEqualTo(guest.getContent());
        assertThat(result.getColor()).isEqualTo(guest.getColor());
    }

    @DisplayName("방명록 업데이트 에러 테스트")
    @Test
    public void getUpdateErrorTest() {

        Member member = Member.builder()
                .nickname("hi")
                .email("he@.com")
                .userId(1L)
                .build();

        Garden garden = Garden.builder()
                .id(1L)
                .build();

        Guest guest = Guest.builder()
                .id(1L)
                .content("반가워용")
                .garden(garden)
                .member(member)
                .color("yello")
                .build();

        GuestRequestDto guestRequestDto = GuestRequestDto.builder()
                .color(guest.getColor())
                .gardenId(garden.getId())
                .contents(guest.getContent())
                .build();


        when(guestRepository.findById(any())).thenThrow(new CustomException(ErrorCode.NO_GUEST));

        Throwable exception = Assertions.assertThrows(
                CustomException.class,
                () -> guestService.update(guestRequestDto));

        Assertions.assertEquals("없는 방명록 입니다.",exception.getMessage());
    }

    @DisplayName("방명록 삭제 테스트")
    @Test
    public void DeleteTest() {

        Guest guest = Guest.builder()
                .id(1L)
                .color("yellow")
                .content("hi")
                .build();

        when(guestRepository.findById(any())).thenReturn(Optional.of(guest));

        guestService.delete(guest.getId());

        assertThatCode(() -> guestRepository.delete(any())).doesNotThrowAnyException();
    }

    @DisplayName("방명록 삭제에러 테스트")
    @Test
    public void DeleteErrorTest() {

        Guest guest = Guest.builder()
                .id(1L)
                .color("yellow")
                .content("hi")
                .build();

        when(guestRepository.findById(any())).thenThrow(new CustomException(ErrorCode.NO_GUEST));

        Throwable exception = Assertions.assertThrows(
                CustomException.class,
                () -> guestService.delete(guest.getId()));

        Assertions.assertEquals("없는 방명록 입니다.",exception.getMessage());
    }

    @DisplayName("방명록 ㅁ고록 테스트")
    @Test
    public void getGuestListTest() {

        Member member = Member.builder()
                .userId(1L)
                .email("cks")
                .nickname("hhhh")
                .build();

        Garden garden = Garden.builder()
                .id(1L)
                .type(1)
                .build();

        Guest guest1 = Guest.builder()
                .id(1L)
                .member(member)
                .garden(garden)
                .color("yellow")
                .content("hi")
                .build();

        Guest guest2 = Guest.builder()
                .id(2L)
                .member(member)
                .garden(garden)
                .color("red")
                .content("no")
                .build();

        Guest guest3 = Guest.builder()
                .id(3L)
                .color("pink")
                .garden(garden)
                .member(member)
                .content("hello wolrd")
                .build();

        List<Guest> ret = new ArrayList<>();

        ret.add(guest1); ret.add(guest2); ret.add(guest3);

        when(guestRepository.getAllGuestByGardenId(member.getUserId())).thenReturn(ret);

        List<GuestResponseDto> result = guestService.getGuestList(member.getUserId());

        assertThat(result.size()).isEqualTo(ret.size());
    }
}
