package com.exmaple.flory.service;

import com.exmaple.flory.dto.diary.DiaryDto;
import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.dto.team.*;
import com.exmaple.flory.entity.Diary;
import com.exmaple.flory.entity.Team;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.entity.UserTeam;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.repository.DiaryRepository;
import com.exmaple.flory.repository.TeamRepository;
import com.exmaple.flory.repository.MemberRepository;
import com.exmaple.flory.repository.UserTeamRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final UserTeamRepository userTeamRepository;
    private final DiaryRepository diaryRepository;

    private TeamDto changeTeamDtoList(Team team, Member member){
        List<TeamMemberInfoDto> memberList = new ArrayList<>();
        int status = -1; //신청도 안한 상태
        int manager = 1;
        Long managerId = 1L;

        for(UserTeam userTeam : team.getUserTeamList()){

            if(userTeam.getStatus() == 1){ // 승인된 사람들만
                List<Diary> diaryList = diaryRepository.findByMemberId(userTeam.getUid().getUserId());
                if(diaryList.size()!=0){
                    Diary diary = diaryList.get(0);
                    memberList.add(TeamMemberInfoDto.of(userTeam.getUid(), diary));
                }else{
                    memberList.add(TeamMemberInfoDto.of(userTeam.getUid()));
                }
            }

            if(userTeam.getUid().getUserId().equals(member.getUserId())) {
                status = userTeam.getStatus();
                manager = userTeam.getManager();
            }

            if(userTeam.getManager() == 0){
                managerId = userTeam.getUid().getUserId();
            }
        }
        return TeamDto.of(team, memberList, status, manager, managerId);
    }

    @Transactional(readOnly = true)
    public TeamDto getTeam(Long teamId) {
        return teamRepository.findById(teamId)
                .map(TeamDto::of)
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_TEAM));
    }

    @Transactional(readOnly = true)
    public List<TeamDto> getAllTeamByKeyWord(String keyword, Long userId){

        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        List<Team> teamList = teamRepository.getAllTeamByKeyWord(keyword, userId);
        List<TeamDto> teamDtoList = new ArrayList<>();
        for(Team team : teamList){
            teamDtoList.add(changeTeamDtoList(team, member));
        }

        return teamDtoList;
    }

    @Transactional(readOnly = true)
    public List<TeamDto> getAllTeam(Long userId){

        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        List<Team> teamList = teamRepository.getAllTeam(userId);
        System.out.println(teamList.size());
        List<TeamDto> teamDtoList = new ArrayList<>();

        for(Team team : teamList){
            teamDtoList.add(changeTeamDtoList(team, member));
        }

        return teamDtoList;
    }

    @Transactional
    public TeamDto insertTeam(TeamInsertRequestDto teamInsertRequestDto){

        Team team = teamRepository.save(teamInsertRequestDto.toGroup());
        List<TeamMemberInfoDto> memberList = new ArrayList<>();
        Member member = memberRepository.findById(teamInsertRequestDto.getHostId())
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        UserTeam userTeam = UserTeam.builder()
                .tid(team)
                .uid(member)
                .status(1)
                .manager(0) //관리자
                .build();

        userTeamRepository.save(userTeam);
        List<Diary> diaryList = diaryRepository.findByMemberId(userTeam.getUid().getUserId());
        if(diaryList.size()!=0){
            Diary diary = diaryList.get(0);
            memberList.add(TeamMemberInfoDto.of(userTeamRepository.save(userTeam).getUid(), diary));
        }else{
            memberList.add(TeamMemberInfoDto.of(userTeamRepository.save(userTeam).getUid()));
        }

//        return teamRepository.findById(team.getTeamId())
//                .map(TeamDto::of)
//                .orElseThrow(() -> new RuntimeException("해당 그룹 정보가 없습니다."));
        return TeamDto.toTeam(team,memberList);
    }

    @Transactional
    public void deleteTeam(Long teamId){
        teamRepository.delete(
                teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.INVALID_TEAM))
        );
    }

    @Transactional
    public TeamDto updateTeam(TeamUpdateRequestDto teamUpdateRequestDto){
        Team team = teamRepository.findById(teamUpdateRequestDto.getTeamId())
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_TEAM));

        team.updateTeam(teamUpdateRequestDto.getName(), teamUpdateRequestDto.getInfo(), teamUpdateRequestDto.getOpen());
        return TeamDto.of(teamRepository.save(team));
    }

    @Transactional(readOnly = true)
    public List<TeamDto> getUserTeam(Long userId){

        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        List<UserTeam> userTeamList = userTeamRepository.findAllByUidAndStatus(member, 1); //승인된 내용만 조회
        List<TeamDto> teamDtoList = new ArrayList<>();
        for(UserTeam userTeam : userTeamList){
            teamDtoList.add(changeTeamDtoList(userTeam.getTid(), member));
        }
        return teamDtoList;
    }

    @Transactional
    public TeamDto insertTeamMember(TeamMemberDto teamMemberDto){
        Team team = teamRepository.findById(teamMemberDto.getTeamId())
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_TEAM));

        Member member = memberRepository.findById(teamMemberDto.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        if(userTeamRepository.existsByUidAndTid(member,team)){
            throw new CustomException(ErrorCode.TEAM_DUPLICATION);
        }

        UserTeam userTeam = null;
        if(team.getOpen()){ //공개 그룹이면
            userTeam = UserTeam.builder()
                    .tid(team)
                    .uid(member)
                    .status(1) //자동 가입
                    .message(teamMemberDto.getMessage())
                    .manager(1) //멤버로
                    .build();
        }else{
            userTeam = UserTeam.builder()
                    .tid(team)
                    .uid(member)
                    .status(0) //가입 대기
                    .message(teamMemberDto.getMessage())
                    .manager(1) //멤버로
                    .build();
        }


        return changeTeamDtoList(userTeamRepository.save(userTeam).getTid(), member);
    }

    @Transactional
    public TeamDto approveTeamMember(TeamApproveRequestDto teamApproveRequestDto){
        Team team = teamRepository.findById(teamApproveRequestDto.getTeamId())
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_TEAM));

        Member member = memberRepository.findById(teamApproveRequestDto.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        UserTeam userTeam = userTeamRepository.findByUidAndTid(member, team)
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_APPROVE));

        userTeam.updateUserTeam(1); //가입 승인 상태로
        return changeTeamDtoList(userTeamRepository.save(userTeam).getTid(), member);
    }

    @Transactional
    public int deleteTeamMember(Long teamId, Long userId){
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_TEAM));

        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        UserTeam userTeam = userTeamRepository.findByUidAndTid(member, team)
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_APPROVE));

        if(userTeam.getManager() == 0) teamRepository.delete(team);
        userTeamRepository.deleteById(userTeam.getUserTeamId());

        return 1;
    }

    @Transactional(readOnly = true)
    public List<TeamMemberResponseDto> signTeamMember(Long teamId, Long userId){
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_TEAM));
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));
        //권한 확인
        UserTeam userTeam = userTeamRepository.findByUidAndTid(member, team)
                .orElseThrow(() -> new CustomException(ErrorCode.INVALID_APPROVE));

        if(userTeam.getManager() != 0){
            //관리자가 아니라면 권한이 없다.
            new CustomException(ErrorCode.INVALID_AUTHORITY);
        }

        List<UserTeam> userTeamList = userTeamRepository.findAllByTidAndStatus(team, 0);
        List<TeamMemberResponseDto> teamMemberResponseDtoList = new ArrayList<>();
        for(UserTeam ut : userTeamList){
            teamMemberResponseDtoList.add(TeamMemberResponseDto.of(ut));
        }

        return teamMemberResponseDtoList;
    }
}
