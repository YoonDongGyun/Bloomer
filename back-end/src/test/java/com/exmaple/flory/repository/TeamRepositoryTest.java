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
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Import(TestConfig.class)
@TestPropertySource("classpath:application-test.properties")
class TeamRepositoryTest {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    UserTeamRepository userTeamRepository;

    @Autowired
    MemberRepository memberRepository;

    @DisplayName("팀 저장")
    @Test
    void save(){
        //given
        Team team = Team.builder()
                .teamId(1L).name("name").info("info").open(true).build();

        //when
        Team result = teamRepository.save(team);

        //then
        assertThat(result.getName()).isEqualTo(team.getName());
    }

    @DisplayName("팀 조회")
    @Test
    void findById(){
        //given
        Team team = Team.builder()
                .name("name").info("info").open(true).build();
        Team entity = teamRepository.save(team);

        //when
        Team result = teamRepository.findById(entity.getTeamId())
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_TEAM));

        //then
        assertThat(result.getName()).isEqualTo(team.getName());

    }

    @DisplayName("팀 삭제")
    @Test
    void delete(){
        //given
        Team team = Team.builder()
                .name("name").info("info").open(true).build();
        Team entity = teamRepository.save(team);

        //when
        teamRepository.delete(team);
        Optional<Team> result = teamRepository.findById(entity.getTeamId());

        //then
        assertThat(result).isEqualTo(Optional.empty());
    }

    @DisplayName("팀 전체 조회")
    @Test
    void getAllTeam(){
        //given
        Long userId = 1L;
        Team team = Team.builder()
                .name("name").info("info").open(true).build();
        Team team2 = Team.builder()
                .name("name2").info("info2").open(true).build();

        teamRepository.save(team);
        teamRepository.save(team2);

        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();
        Member member2 = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();
        memberRepository.save(member);
        memberRepository.save(member2);

        UserTeam userTeam = UserTeam.builder()
                .tid(team).uid(member).status(1).manager(0).build();
        UserTeam userTeam2 = UserTeam.builder()
                .tid(team2).uid(member2).status(1).manager(0).build();
        UserTeam userTeam3 = UserTeam.builder()
                .tid(team2).uid(member).status(0).manager(1).build();
        userTeamRepository.save(userTeam);
        userTeamRepository.save(userTeam2);
        userTeamRepository.save(userTeam3);

        //when
        List<Team> result = teamRepository.getAllTeam(userId);

        //then
        assertThat(result.size()).isEqualTo(2);
    }

    @DisplayName("키워드로 전체 팀 조회")
    @Test
    void getAllTeamByKeyWord(){
        //given
        String keyword = "na";
        Long userId = 1L;
        Team team = Team.builder()
                .name("name").info("info").open(true).build();
        Team team2 = Team.builder()
                .name("name2").info("info2").open(true).build();

        teamRepository.save(team);
        teamRepository.save(team2);

        Member member = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();
        Member member2 = Member.builder()
                .nickname("nickname").password("password").img("img").email("email") .refreshToken("token").build();
        memberRepository.save(member);
        memberRepository.save(member2);

        UserTeam userTeam = UserTeam.builder()
                .tid(team).uid(member).status(1).manager(0).build();
        UserTeam userTeam2 = UserTeam.builder()
                .tid(team2).uid(member2).status(1).manager(0).build();
        UserTeam userTeam3 = UserTeam.builder()
                .tid(team2).uid(member).status(0).manager(1).build();
        userTeamRepository.save(userTeam);
        userTeamRepository.save(userTeam2);
        userTeamRepository.save(userTeam3);

        //when
        List<Team> result = teamRepository.getAllTeamByKeyWord(keyword, userId);

        //then
        assertThat(result.size()).isEqualTo(2);
    }

}