package com.exmaple.flory.repository;

import com.exmaple.flory.config.TestConfig;
import com.exmaple.flory.entity.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.hamcrest.Matchers.is;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Import(TestConfig.class)
@TestPropertySource("classpath:application-test.properties")
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @DisplayName("멤버 저장")
    @Test
    void save(){
        //given
        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();

        //when
        Member result = memberRepository.save(member);

        //then
        assertThat(result.getEmail()).isEqualTo(member.getEmail());
    }

    @DisplayName("이메일로 멤버 조회")
    @Test
    void findByEmail() {
        //given
        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();

        memberRepository.save(member);

        //when
        Member result = memberRepository.findByEmail("email")
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));

        //then
        assertThat(result.getEmail()).isEqualTo(member.getEmail());
    }

    @DisplayName("아이디로 멤버 조회")
    @Test
    void findById() {
        //given
        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();

        Member entity = memberRepository.save(member);

        //when
        Member result = memberRepository.findById(entity.getUserId())
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));

        //then
        assertThat(result.getEmail()).isEqualTo(member.getEmail());
    }

    @DisplayName("멤버 삭제")
    @Test
    void delete(){
        //given
        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();

        memberRepository.save(member);

        //when
        memberRepository.delete(member);
        Optional<Member> result = memberRepository.findById(1L);

        //then
        assertThat(result).isEqualTo(Optional.empty());
    }

    @DisplayName("이메일 존재 여부 확인")
    @Test
    void existsByEmail() {
        //given
        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();

        memberRepository.save(member);

        //when
        boolean result = memberRepository.existsByEmail("email");

        //then
        assertThat(result).isTrue();
    }

    @DisplayName("아이디 존재 여부 확인")
    @Test
    void existsById() {
        //given
        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();

        Member entity = memberRepository.save(member);

        //when
        boolean result = memberRepository.existsById(entity.getUserId());

        //then
        assertThat(result).isTrue();
    }

    @DisplayName("refreshToken으로 유저 정보 확인")
    @Test
    void findByRefreshToken(){
        //given
        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();

        Member entity = memberRepository.save(member);

        //when
        Member result = memberRepository.findByRefreshToken(entity.getRefreshToken())
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));

        //then
        assertThat(result.getEmail()).isEqualTo(member.getEmail());
    }
}