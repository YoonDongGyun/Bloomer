package com.exmaple.flory.service;

import com.exmaple.flory.dto.member.LoginDto;
import com.exmaple.flory.dto.member.MemberMusicUpdateDto;
import com.exmaple.flory.dto.member.MemberRequestDto;
import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class MemberServiceTest {

    @InjectMocks
    private MemberService memberService;

    @Mock
    private MemberRepository memberRepository;

    @Spy //Mock하지 않은 메소드 => 실제 메소드 동작
    private PasswordEncoder passwordEncoder;

    @Mock
    private S3Uploader s3Uploader;

    private final MemberResponseDto memberResponseDto = MemberResponseDto.builder().
            userId(1L).nickname("nickname").img("img").email("email").build();

    @BeforeEach
    void setUp() {
    }

    @DisplayName("회원 조회(토큰)")
    @Test
    void findMemberInfoByUserId() {
        //given
        Long userId = 1L;
        Member member = Member.builder()
                .userId(1L) .nickname("nickname").password(passwordEncoder.encode("password")) .img("img").email("email") .refreshToken("token").build();

        when(memberRepository.findById(anyLong())).thenReturn(Optional.ofNullable(member)); //mocking

        //when
        MemberResponseDto result = memberService.findMemberInfoByUserId(userId);

        //then
        assertEquals(result.getEmail(),memberResponseDto.getEmail());
    }

    @DisplayName("회원 조회(이메일)")
    @Test
    void findMemberInfoByEmail() {
        //given
        String email = "email";
        Member member = Member.builder()
                .userId(1L) .nickname("nickname").password(passwordEncoder.encode("password")) .img("img").email("email") .refreshToken("token").build();

        when(memberRepository.findByEmail(any())).thenReturn(Optional.ofNullable(member));

        //when
        MemberResponseDto result = memberService.findMemberInfoByEmail(email);

        //then
        assertEquals(result.getEmail(),memberResponseDto.getEmail());
    }

    @DisplayName("로그아웃")
    @Test
    void logout() {
        //given
        Long userId = 1L;
        Member member = Member.builder()
                .userId(1L) .nickname("nickname").password(passwordEncoder.encode("password")) .img("img").email("email") .refreshToken("token").build();

        when(memberRepository.findById(anyLong())).thenReturn(Optional.ofNullable(member));

        member.updateToken(null);
//        when(memberRepository.save(any())).thenReturn(member);

        //when
        memberService.logout(userId);

        //then
        verify(memberRepository, times(1)).findById(anyLong());
        verify(memberRepository, times(1)).save(any());
    }

    @DisplayName("회원 정보 수정")
    @Test
    void updateMember() throws IOException {
        //given
        MemberRequestDto memberRequestDto = MemberRequestDto.builder()
                .nickname("rename").email("email").build();

        String fileName = "test";
        String contentType = "PNG";
        String filePath = "src/test/resources/img/test.PNG";
        MockMultipartFile mockMultipartFile = getMockMultipartFile(fileName, contentType, filePath);

        Member member = Member.builder()
                .userId(1L) .nickname("nickname").password(passwordEncoder.encode("password")) .img("img").email("email") .refreshToken("token").build();

        MemberResponseDto responseDto = MemberResponseDto.builder().
                userId(1L).nickname("rename").img("img").email("email").build();

        when(memberRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(member));
        when(s3Uploader.upload(any())).thenReturn(mockMultipartFile.getName());
        member.updateImg(mockMultipartFile.getName());
        member.updateMember(memberRequestDto.getNickname());
        when(memberRepository.save(any())).thenReturn(member);

        //when
        MemberResponseDto result = memberService.updateMember(memberRequestDto,mockMultipartFile);

        //then
        assertEquals(result.getNickname(),responseDto.getNickname());

        //when
        MemberResponseDto result2 = memberService.updateMember(memberRequestDto,null);
        assertEquals(result2.getNickname(),responseDto.getNickname());
    }
    private MockMultipartFile getMockMultipartFile(String fileName, String contentType, String path) throws IOException {
        FileInputStream fileInputStream = new FileInputStream(new File(path));
        return new MockMultipartFile(fileName, fileName + "." + contentType, contentType, fileInputStream);
    }

    @DisplayName("회원 탈퇴")
    @Test
    void deleteMember() {
        //given
        String email = "email";

        Member member = Member.builder()
                .userId(1L) .nickname("nickname").password(passwordEncoder.encode("password")) .img("img").email("email") .refreshToken("token").build();

        when(memberRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(member));

        //when
        memberService.deleteMember(email);

        //then
        verify(memberRepository, times(1)).findByEmail(anyString());
        verify(memberRepository, times(1)).delete(any());
    }

    @DisplayName("음악 변경")
    @Test
    void updateMusic(){
        MemberMusicUpdateDto memberMusicUpdateDto = MemberMusicUpdateDto.builder()
                .userId(1L).classic(true).jazz(true).pop(true).reggae(true).rnb(true).electronic(true).build();
        Member member = Member.builder()
                .userId(1L) .nickname("nickname").password(passwordEncoder.encode("password")) .img("img").email("email") .refreshToken("token").build();

        when(memberRepository.findById(any())).thenReturn(Optional.ofNullable(member));
        member.updateMusic(memberMusicUpdateDto);
        when(memberRepository.save(any())).thenReturn(member);

        memberService.updateMusic(memberMusicUpdateDto);

        verify(memberRepository, times(1)).findById(any());
        verify(memberRepository, times(1)).save(any());
    }

    @DisplayName("비밀번호 변경")
    @Test
    void updatePassword(){
        LoginDto loginDto = LoginDto.builder()
                .email("email").password("1234").build();

        Member member = Member.builder()
                .userId(1L) .nickname("nickname").password(passwordEncoder.encode("password")) .img("img").email("email") .refreshToken("token").build();

        when(memberRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(member));

        member.updatePassword(loginDto.getPassword(), passwordEncoder);
        when(memberRepository.save(any())).thenReturn(member);

        //when
        memberService.updatePassword(loginDto);

        //then
        verify(memberRepository, times(1)).findByEmail(anyString());
        verify(memberRepository, times(1)).save(any());
    }
}