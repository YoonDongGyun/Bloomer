package com.exmaple.flory.service;

import com.exmaple.flory.dto.comment.CommentDto;
import com.exmaple.flory.dto.comment.CommentResponseDto;
import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.entity.Comment;
import com.exmaple.flory.entity.Diary;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.repository.CommentRepository;
import com.exmaple.flory.repository.DiaryRepository;
import com.exmaple.flory.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    DiaryRepository diaryRepository;

    @Autowired
    MemberRepository memberRepository;

    @Transactional
    public CommentResponseDto insertComment(CommentDto commentDto) {
        Optional<Diary> diary = diaryRepository.findById(commentDto.getDid());
        Optional<Member> member = memberRepository.findById(commentDto.getUid());

        if(diary.isEmpty()) throw new CustomException(ErrorCode.NO_DIARY);
        if(member.isEmpty()) throw new CustomException(ErrorCode.NO_USER);

        commentDto.setDiary(diary.get().toDto());
        Comment comment = commentDto.toEntity();
        comment.setMember(member.get());

        Comment result = commentRepository.save(comment);
        CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                .id(result.getId()).content(result.getContent()).member(MemberResponseDto.of(member.get()))
                .createdTime(result.getCreatedTime()).did(diary.get().getId()).build();

        return commentResponseDto;
    }

    public List<CommentResponseDto> getCommentList(Long diaryId) {
        List<Comment> commentList = commentRepository.findByDid(diaryId);
        List<CommentResponseDto> comments = new ArrayList<>();

        for(Comment comment: commentList){
            CommentDto commentDto = comment.toDto();
            Optional<Member> member = memberRepository.findById(commentDto.getUid());

            if(member.isEmpty()) throw new CustomException(ErrorCode.NO_USER);

            CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                    .id(commentDto.getId()).member(MemberResponseDto.of(member.get())).content(commentDto.getContent()).createdTime(commentDto.getCreatedTime())
                    .did(diaryId).build();

            comments.add(commentResponseDto);
        }

        return comments;
    }

    @Transactional
    public CommentResponseDto updateComment(Map<String,String> updateInfo){
        Long id =  Long.parseLong(updateInfo.get("id"));
        String content = updateInfo.get("content");

        Optional<Comment> comment = commentRepository.findById(id);

        if(comment.isEmpty()) throw new CustomException(ErrorCode.NO_COMMENT);
        CommentDto commentDto = comment.get().toDto();
        log.info("dto: {}",commentDto);
        Optional<Member> member = memberRepository.findById(commentDto.getUid());
        Optional<Diary> diary = diaryRepository.findById(commentDto.getDid());

        commentDto.setContent(content);

        if(member.isEmpty()) throw new CustomException(ErrorCode.NO_USER);
        if(diary.isEmpty()) throw new CustomException(ErrorCode.NO_DIARY);

        commentDto.setDiary(diary.get().toDto());

        Comment comment1 = commentDto.toEntity();
        comment1.setMember(member.get());

        Comment result = commentRepository.save(comment1);

        CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                .id(result.getId()).content(result.getContent()).member(MemberResponseDto.of(member.get()))
                .createdTime(result.getCreatedTime()).did(diary.get().getId()).build();

        return commentResponseDto;
    }

    @Transactional
    public int deleteComment(Long commentId){
        Optional<Comment> comment = commentRepository.findById(commentId);

        if(comment.isPresent()){
            commentRepository.delete(comment.get());
            return 1;
        }
        else {
            return 0;
        }
    }
}
