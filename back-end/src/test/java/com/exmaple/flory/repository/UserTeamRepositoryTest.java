package com.exmaple.flory.repository;

import com.exmaple.flory.config.TestConfig;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.entity.Team;
import com.exmaple.flory.entity.UserTeam;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Import(TestConfig.class)
@TestPropertySource("classpath:application-test.properties")
class UserTeamRepositoryTest {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    UserTeamRepository userTeamRepository;

    @Autowired
    MemberRepository memberRepository;

    @DisplayName("memberId와 status로 조회")
    @Test
    void findAllByUidAndStatus() {

        Team team = Team.builder()
                .name("name").info("info").open(true).build();

        teamRepository.save(team);

        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();
        memberRepository.save(member);

        UserTeam userTeam = UserTeam.builder()
                .tid(team).uid(member).status(1).manager(0).build();
        userTeamRepository.save(userTeam);

        //when
        List<UserTeam> result = userTeamRepository.findAllByUidAndStatus(member,1);

        //then
        assertThat(result.size()).isEqualTo(1);
    }

    @DisplayName("teamId와 status로 조회")
    @Test
    void findAllByTidAndStatus() {

        Team team = Team.builder()
                .name("name").info("info").open(true).build();

        teamRepository.save(team);

        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();
        memberRepository.save(member);

        UserTeam userTeam = UserTeam.builder()
                .tid(team).uid(member).status(0).manager(1).build();
        userTeamRepository.save(userTeam);

        //when
        List<UserTeam> result = userTeamRepository.findAllByTidAndStatus(team,1);

        //then
        assertThat(result.size()).isEqualTo(0);

    }

    @DisplayName("memberId와 teamId로 조회")
    @Test
    void findByUidAndTid() {
        Team team = Team.builder()
                .name("name").info("info").open(true).build();

        teamRepository.save(team);

        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();
        memberRepository.save(member);

        UserTeam userTeam = UserTeam.builder()
                .tid(team).uid(member).status(1).manager(0).build();
        userTeamRepository.save(userTeam);

        //when
        UserTeam result = userTeamRepository.findByUidAndTid(member, team)
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_APPROVE));

        //then
        assertThat(result.getStatus()).isEqualTo(1);
    }

    @DisplayName("존재 여부")
    @Test
    void existsByUidAndTid() {

        Team team = Team.builder()
                .name("name").info("info").open(true).build();

        teamRepository.save(team);

        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();
        memberRepository.save(member);

        UserTeam userTeam = UserTeam.builder()
                .tid(team).uid(member).status(1).manager(0).build();
        userTeamRepository.save(userTeam);

        Boolean result = userTeamRepository.existsByUidAndTid(member,team);

        assertThat(result).isTrue();

    }
}