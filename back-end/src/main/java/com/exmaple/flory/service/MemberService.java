package com.exmaple.flory.service;

import com.exmaple.flory.dto.member.LoginDto;
import com.exmaple.flory.dto.member.MemberMusicUpdateDto;
import com.exmaple.flory.dto.member.MemberRequestDto;
import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final S3Uploader s3Uploader;

    @Transactional(readOnly = true)
    public MemberResponseDto findMemberInfoByUserId(Long userId) {
        return memberRepository.findById(userId)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
    }

    @Transactional(readOnly = true)
    public MemberResponseDto findMemberInfoByEmail(String email) {
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
    }

    @Transactional
    public void logout(Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
        member.updateToken(null);
        memberRepository.save(member); //토큰 제거
    }

    @Transactional
    public MemberResponseDto updateMember(MemberRequestDto memberRequestDto, MultipartFile multipartFile) throws IOException {
        Member member = memberRepository.findByEmail(memberRequestDto.getEmail())
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        if(multipartFile !=null) {
            String storedFileName = s3Uploader.upload(multipartFile);
            member.updateImg(storedFileName);
        }else{
            member.updateImg(memberRequestDto.getImg());
        }

        member.updateMember(memberRequestDto.getNickname());
        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public void deleteMember(String email){
        memberRepository.delete(
                memberRepository.findByEmail(email).orElseThrow(() -> new CustomException(ErrorCode.NO_USER))
        );
    }

    public void updateMusic(MemberMusicUpdateDto memberMusicUpdateDto) {

        Member member = memberRepository.findById(memberMusicUpdateDto.getUserId()).get();

        if(member == null) throw new CustomException(ErrorCode.NO_USER);

        member.updateMusic(memberMusicUpdateDto);
        memberRepository.save(member);
    }

    @Transactional
    public void updatePassword(LoginDto loginDto){
        Member member = memberRepository.findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));

        member.updatePassword(loginDto.getPassword(), passwordEncoder);
        memberRepository.save(member);
    }
}
