package com.exmaple.flory.controller;

import com.exmaple.flory.dto.comment.CommentDto;
import com.exmaple.flory.dto.comment.CommentResponseDto;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.response.ErrorResponse;
import com.exmaple.flory.response.SuccessResponse;
import com.exmaple.flory.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comment")
@Slf4j
public class CommentController {
    @Autowired
    CommentService commentService;

    @GetMapping("/{diaryId}")
    public ResponseEntity<?> getCommentList(@PathVariable Long diaryId){
        try{
            List<CommentResponseDto> comments = commentService.getCommentList(diaryId);
            return new ResponseEntity(new SuccessResponse(comments), HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateComment(@RequestBody Map<String,String> updateInfo){
        try {
            CommentResponseDto updatedComment = commentService.updateComment(updateInfo);
            return new ResponseEntity(new SuccessResponse(updatedComment),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<?> insertComment(@RequestBody CommentDto commentDto){
        try{
            CommentResponseDto insert = commentService.insertComment(commentDto);
            return new ResponseEntity(new SuccessResponse(insert),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId){
        try {
            int result = commentService.deleteComment(commentId);

            if(result==0) throw new CustomException(ErrorCode.NO_DIARY);
            return new ResponseEntity(new SuccessResponse("삭제가 완료되었습니다."),HttpStatus.OK);
        } catch (CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        }catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
