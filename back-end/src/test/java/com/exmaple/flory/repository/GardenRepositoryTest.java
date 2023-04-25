package com.exmaple.flory.repository;

import com.exmaple.flory.config.TestConfig;
import com.exmaple.flory.entity.Garden;
import com.exmaple.flory.entity.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest
//@Import(TestConfig.class)
@TestPropertySource("classpath:application-test.properties")
//@EnableJpaAuditing
public class GardenRepositoryTest {

    @Autowired
    private GardenRepository gardenRepository;

    @Autowired
    private MemberRepository memberRepository;

    @DisplayName("garden 레포지토리에 저장하기")
    @Test
    public void GardenRepositorySaveTest() {

        Member member = Member
                .builder()
                .email("cksgnlcjswoo@naver.ocm")
                .password("1234")
                .nickname("abcd")
                .build();

        Garden garden = Garden
                .builder()
                .member(member)
                .build();

        memberRepository.save(member);
        Garden result = gardenRepository.save(garden);

        assertThat(result.getMember().getUserId()).isEqualTo(member.getUserId());
        assertThat(result.getMember().getEmail()).isEqualTo(member.getEmail());
    }

    @DisplayName("garden by month 테스트")
    @Test
    public void getGardenByMonthTest() {

        Garden garden = Garden
                .builder()
                .build();

        Member member = Member.builder()
                .email("cksgnlcjswo@naver.com")
                .nickname("abcd")
                .password("1234")
                .build();

        Member info = memberRepository.save(member);

        garden.setMember(member);
        gardenRepository.save(garden);

        int month = LocalDateTime.now().getMonthValue();
        int year = LocalDateTime.now().getYear();


        Optional<Garden> result = gardenRepository.findByDate(info.getUserId(),year,month);

        assertThat(result.get().getDeadLine()).isEqualTo(garden.getDeadLine());
    }

    @DisplayName("유저의 모든 정원 가져오기")
    @Test
    public void getAllGardenByUserId() {
        Member member = Member
                .builder()
                .email("cksgnlcjswoo@naver.ocm")
                .password("1234")
                .nickname("abcd")
                .build();

        Garden garden1 = Garden
                .builder()
                .member(member)
                .build();

        Garden garden2 = Garden
                .builder()
                .member(member)
                .build();

        Garden garden3 = Garden
                .builder()
                .member(member)
                .build();

        Member memberEntity = memberRepository.save(member);
        gardenRepository.save(garden1);
        gardenRepository.save(garden2);
        gardenRepository.save(garden3);

        List<Garden> result = gardenRepository.findAllByUserId(memberEntity.getUserId());

        assertThat(result.size()).isEqualTo(3);
    }

    @DisplayName("날짜로 정원가져오기 테스트")
    @Test
    public void findByDateTest() {

        Member member = Member
                .builder()
                .email("cksgnlcjswoo@naver.ocm")
                .password("1234")
                .nickname("abcd")
                .build();

        Garden garden = Garden.builder()
                .member(member)
                .type(1)
                .build();

        Member res = memberRepository.save(member);
        gardenRepository.save(garden);

        LocalDateTime today = LocalDateTime.now();
        int month = today.getMonthValue();
        int year = today.getYear();

        Optional<Garden> result = gardenRepository.findByDate(res.getUserId()
                ,year
                ,month);

        Garden ret = result.get();

        assertThat(ret).isNotNull();
        assertThat(ret.getType()).isEqualTo(garden.getType());
    }

    @DisplayName("유저가 만든 정원 시간 오름차순")
    @Test
    public void findAllByUserIdTest() {

        Member member = Member
                .builder()
                .email("cksgnlcjswoo@naver.ocm")
                .password("1234")
                .nickname("abcd")
                .build();

        Garden garden1 = Garden.builder()
                .member(member)
                .type(1)
                .build();

        Garden garden2 = Garden.builder()
                .member(member)
                .type(1)
                .build();

        Garden garden3 = Garden.builder()
                .member(member)
                .type(1)
                .build();

        Member res = memberRepository.save(member);
        gardenRepository.save(garden1);
        gardenRepository.save(garden2);
        gardenRepository.save(garden3);

        List<Garden> result = gardenRepository.findAllByUserId(res.getUserId());

        assertThat(result.size()).isEqualTo(3);
    }
}
