package com.exmaple.flory.repository;

import com.exmaple.flory.config.TestConfig;
import com.exmaple.flory.dto.diary.DiaryDto;
import com.exmaple.flory.entity.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
@ExtendWith(SpringExtension.class)
@DataJpaTest
@Import(TestConfig.class)
@TestPropertySource("classpath:application-test.properties")
public class CommentRepositoryTest {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    DiaryRepository diaryRepository;

    private final Member member = Member
            .builder()
            .email("ssafy@naver.com")
            .password("1234")
            .nickname("abcd")
            .build();

    private final Music music = Music.builder()
            .id(1L).title("title").build();

    private final Garden garden = Garden
            .builder()
            .member(member)
            .music(music)
            .build();

    private final Diary diary = Diary.builder()
            .content("content").imgSrc("imgSrc").lat(10).lng(10).publicStatus("전체공개").x("x").y("y").z("z").address("address")
            .garden(garden).build();

    private final Comment comment = Comment.builder()
            .id(1L).diary(diary).member(member).content("content").build();
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private GardenRepository gardenRepository;

    @DisplayName("댓글 등록하기 테스트")
    @Test
    public void insertCommentTest() throws Exception{
        memberRepository.save(member);
        gardenRepository.save(garden);
        diaryRepository.save(diary);
        Comment result = commentRepository.save(comment);

        Optional<Comment> comment = commentRepository.findById(result.getId());

        if(comment.isEmpty()) throw new Exception();

        assertEquals(result.getContent(),comment.get().getContent());
    }

    @DisplayName("댓글 삭제하기 테스트")
    @Test
    public void deleteCommentTest(){
        memberRepository.save(member);
        gardenRepository.save(garden);
        diaryRepository.save(diary);
        Comment comment1 = commentRepository.save(comment);

        commentRepository.delete(comment1);

        Optional<Comment> result = commentRepository.findById(1L);

        assertEquals(result,Optional.empty());
    }

    @DisplayName("일기에 해당하는 댓글 목록 가져오기 테스트")
    @Test
    public void getCommentInDiaryTest(){
        memberRepository.save(member);
        gardenRepository.save(garden);
        diaryRepository.save(diary);
        DiaryDto diaryDto = DiaryDto.builder()
                .id(1L).content("content").imgSrc("imgSrc").lat(10).lng(10).publicStatus("전체공개").x("x").y("y").z("z")
                .build();

        List<Comment> comments = new ArrayList<>();
        comments.add(comment);

        Diary diary = diaryRepository.save(diaryDto.toEntity());
        comment.setDiary(diary);
        commentRepository.save(comment);

        List<Comment> result = commentRepository.findByDid(diary.getId());

        assertEquals(comments.size(),result.size());
    }

}
