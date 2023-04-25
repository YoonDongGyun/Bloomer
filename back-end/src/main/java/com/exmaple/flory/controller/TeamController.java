package com.exmaple.flory.controller;

import com.exmaple.flory.dto.team.*;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.response.ErrorResponse;
import com.exmaple.flory.response.SuccessResponse;
import com.exmaple.flory.service.TeamService;
import com.exmaple.flory.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/team")
public class TeamController {
    private final TeamService teamService;

    @GetMapping("/{teamId}")
    public ResponseEntity<?> getTeam(@PathVariable Long teamId){
        try{
            TeamDto teamDto = teamService.getTeam(teamId);
            return new ResponseEntity<>(new SuccessResponse(teamDto), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all/search")
    public ResponseEntity<?> getAllTeamByKeyWord(@RequestParam(name = "keyword") String keyword){
        try{
            List<TeamDto> teamDto = teamService.getAllTeamByKeyWord(keyword, SecurityUtil.getCurrentMemberId());
            return new ResponseEntity<>(new SuccessResponse(teamDto), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTeam(){
        try{
            List<TeamDto> teamDto = teamService.getAllTeam(SecurityUtil.getCurrentMemberId());
            return new ResponseEntity<>(new SuccessResponse(teamDto), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            log.info("전체 목록 가져오기 : {}", e.getMessage());
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<?> insertTeam(@RequestBody TeamInsertRequestDto teamInsertRequestDto){
        try{
            TeamDto teamDto = teamService.insertTeam(teamInsertRequestDto);
            return new ResponseEntity<>(new SuccessResponse(teamDto), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<?> deleteTeam(@PathVariable Long teamId){
        try{
            teamService.deleteTeam(teamId);
            return new ResponseEntity<>(new SuccessResponse("그룹 삭제 되었습니다."),HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateTeam(@RequestBody TeamUpdateRequestDto teamUpdateRequestDto){
        try{
            TeamDto teamDto = teamService.updateTeam(teamUpdateRequestDto);
            return new ResponseEntity<>(new SuccessResponse(teamDto),HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/member")
    public ResponseEntity<?> getUserTeam(){
        try{
            // userId : SecurityUtil.getCurrentMemberId()
            List<TeamDto> teamDto = teamService.getUserTeam(SecurityUtil.getCurrentMemberId()); //속한 팀 목록 가져오기
            return new ResponseEntity<>(new SuccessResponse(teamDto), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/member")
    public ResponseEntity<?> insertTeamMember(@RequestBody TeamMemberDto teamMemberDto){ //그룹 가입 신청
        try{
            TeamDto teamDto = teamService.insertTeamMember(teamMemberDto);
            return new ResponseEntity<>(new SuccessResponse(teamDto), HttpStatus.OK);
        } catch(CustomException e){
            log.info(e.getMessage());
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/approve")
    public ResponseEntity<?> approveTeamMember(@RequestBody TeamApproveRequestDto teamApproveRequestDto){ //그룹 가입 신청 승인
        try{
            TeamDto teamDto = teamService.approveTeamMember(teamApproveRequestDto);
            return new ResponseEntity<>(new SuccessResponse(teamDto), HttpStatus.OK);
        } catch(CustomException e){
            log.info(e.getMessage());
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/member")
    public ResponseEntity<?> deleteTeamMember(@RequestParam Long teamId, @RequestParam Long userId){
        try{
            teamService.deleteTeamMember(teamId, userId);
            return new ResponseEntity<>(new SuccessResponse("해당 멤버가 삭제되었습니다."),HttpStatus.OK);
        } catch(CustomException e){
            log.info(e.getMessage());
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/sign/{teamId}")
    public ResponseEntity<?> signTeamMember(@PathVariable Long teamId){
        try{
            // userId : SecurityUtil.getCurrentMemberId()
            List<TeamMemberResponseDto> teamMemberDtoList = teamService.signTeamMember(teamId, SecurityUtil.getCurrentMemberId());
            return new ResponseEntity<>(new SuccessResponse(teamMemberDtoList), HttpStatus.OK);
        } catch(CustomException e){
            return new ResponseEntity<>(new ErrorResponse(e.getErrorCode().getHttpStatus(),e.getMessage()), e.getErrorCode().getHttpStatus());
        } catch (Exception e){
            return new ResponseEntity<>(new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
