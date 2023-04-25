package com.exmaple.flory.controller;

import com.exmaple.flory.dto.comment.CommentResponseDto;
import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.entity.Comment;
import com.exmaple.flory.entity.Diary;
import com.exmaple.flory.entity.Garden;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.service.CommentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = CommentController.class)
@WithMockUser
@MockBean(JpaMetamodelMappingContext.class)
public class CommentControllerTest {

    @MockBean
    private CommentService commentService;

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    private final Member member = Member
            .builder()
            .userId(1L)
            .email("ssafy@naver.com")
            .password("1234")
            .nickname("abcd")
            .build();

    private final Garden garden = Garden
            .builder()
            .id(1L)
            .member(member)
            .build();

    private final Diary diary = Diary.builder()
            .id(1L).content("content").x("10").y("10").z("10").imgSrc("img").publicStatus("전체공개").address("address").garden(garden).build();


    private final Comment comment = Comment.builder()
            .id(1L).content("content").member(member).diary(diary).build();

    private final CommentResponseDto commentResponseDto = CommentResponseDto.builder()
            .id(1L).did(1L).content("content").member(MemberResponseDto.of(member)).build();

    @DisplayName("일기에 해당하는 댓글 목록 가져오기 테스트")
    @Test
    public void getCommentList() throws Exception{
        List<CommentResponseDto> comments = new ArrayList<>();
        CommentResponseDto commentResponseDto = CommentResponseDto.builder().id(1L).content("content").build();
        comments.add(commentResponseDto);

        when(commentService.getCommentList(any())).thenReturn(comments);

        mockMvc.perform(get("/api/comment/{diaryId}",1))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("일기에 해당하는 댓글 목록 가져오기 오류 테스트")
    @Test
    public void getCommentExceptionList() throws Exception{

        when(commentService.getCommentList(any())).thenThrow(new RuntimeException());

        mockMvc.perform(get("/api/comment/{diaryId}",1))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("일기에 해당하는 댓글 목록 가져오기 custom 오류 테스트")
    @Test
    public void getCommentCustomExceptionList() throws Exception{
        when(commentService.getCommentList(any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        mockMvc.perform(get("/api/comment/{diaryId}",1))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("댓글 수정 테스트")
    @Test
    public void updateCommentTest() throws Exception{
        Comment comment1 = Comment.builder()
                .id(1L).content("content").build();

        when(commentService.updateComment(any())).thenReturn(commentResponseDto);

        mockMvc.perform(put("/api/comment").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(comment1)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("댓글 수정 custom 오류 테스트")
    @Test
    public void updateCommentCustomExceptionTest() throws Exception{
        Comment comment1 = Comment.builder()
                .id(1L).content("content").build();

        when(commentService.updateComment(any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        mockMvc.perform(put("/api/comment").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(comment1)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("댓글 수정 오류 테스트")
    @Test
    public void updateCommentExceptionTest() throws Exception{
        Comment comment1 = Comment.builder()
                .id(1L).content("content").build();

        when(commentService.updateComment(any())).thenThrow(new RuntimeException());

        mockMvc.perform(put("/api/comment").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(comment1)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("댓글 생성 테스트")
    @Test
    public void insertCommentTest() throws Exception{
        when(commentService.insertComment(any())).thenReturn(commentResponseDto);

        mockMvc.perform(post("/api/comment").with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(comment)))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("댓글 생성 custom 오류 테스트")
    @Test
    public void insertCommentCustomExceptionTest() throws Exception{
        when(commentService.insertComment(any())).thenThrow(new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        mockMvc.perform(post("/api/comment").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(comment)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }

    @DisplayName("댓글 생성 오류 테스트")
    @Test
    public void insertCommentExceptionTest() throws Exception{
        when(commentService.insertComment(any())).thenThrow(new RuntimeException());

        mockMvc.perform(post("/api/comment").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(comment)))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }
    @DisplayName("댓글 삭제 테스트")
    @Test
    public void deleteCommentTest() throws Exception{
        when(commentService.deleteComment(any())).thenReturn(1);

        mockMvc.perform(delete("/api/comment/{commentId}",1).with(csrf()))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @DisplayName("댓글 삭제 custom 오류 테스트")
    @Test
    public void deleteCommentCustomExceptionTest() throws Exception{
        when(commentService.deleteComment(any())).thenReturn(0);

        mockMvc.perform(delete("/api/comment/{commentId}",1).with(csrf()))
                .andExpect(status().isNotFound())
                .andDo(print());
    }

    @DisplayName("댓글 삭제 오류 테스트")
    @Test
    public void deleteCommentExceptionTest() throws Exception{
        when(commentService.deleteComment(any())).thenThrow(new RuntimeException());

        mockMvc.perform(delete("/api/comment/{commentId}",1).with(csrf()))
                .andExpect(status().isInternalServerError())
                .andDo(print());
    }
}
