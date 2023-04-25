package com.exmaple.flory.controller;

import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.dto.team.*;
import com.exmaple.flory.entity.*;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.response.SuccessResponse;
import com.exmaple.flory.service.TeamService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = TeamController.class)
@WithMockUser(username = "1")
class TeamControllerTest {

    @MockBean
    private TeamService teamService;

    @Autowired
    private MockMvc mockMvc;

    private TeamDto changeTeamDtoList(Team team, Member member){
        List<TeamMemberInfoDto> memberList = new ArrayList<>();
        int status = -1; //신청도 안한 상태
        int manager = 1;
        Long managerId = 1L;

        for(UserTeam userTeam : team.getUserTeamList()){

            if(userTeam.getStatus() == 1){ // 승인된 사람들만
                memberList.add(TeamMemberInfoDto.of(userTeam.getUid()));
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

    @DisplayName("특정 팀 조회")
    @Test
    void getTeam() throws Exception{
        Team team = Team.builder()
                .teamId(1L).name("name").info("info").open(true).build();

        when(teamService.getTeam(any())).thenReturn(TeamDto.of(team));

        MvcResult mvcResult = mockMvc.perform(get("/api/team/{teamId}",1))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TeamDto teamDto = new ObjectMapper().convertValue(response.getResponse(), TeamDto.class);

        //then
        assertThat(teamDto.getName()).isEqualTo(TeamDto.of(team).getName());
    }

    @DisplayName("키워드로 전체 팀 조회")
    @Test
    void getAllTeamByKeyWord() throws Exception{
        //given
        Long userId = 1L;
        String keyword = "na";

        List<TeamDto> teamDtoList = new ArrayList<>();
        Team team = Team.builder()
                .teamId(1L).name("name").info("info").open(true).build();
        Member member = Member.builder()
                .userId(1L) .nickname("nickname").password("password") .img("img").email("email") .refreshToken("token").build();

        teamDtoList.add(changeTeamDtoList(team, member));

        when(teamService.getAllTeamByKeyWord(any(),any())).thenReturn(teamDtoList);

        MvcResult mvcResult = mockMvc.perform(get("/api/team/all/search").queryParam("keyword",keyword))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        List<TeamDto> teamDto = new ObjectMapper().convertValue(response.getResponse(), TypeFactory.defaultInstance().constructCollectionType(List.class, TeamDto.class));

        //then
        assertThat(teamDto.size()).isEqualTo(teamDtoList.size());
    }

    @DisplayName("전체 팀 조회")
    @Test
    void getAllTeam() throws Exception{
        //given
        Long userId = 1L;

        List<TeamDto> teamDtoList = new ArrayList<>();

        Team team = Team.builder()
                .teamId(1L).name("name").info("info").open(true).build();
        Member member = Member.builder()
                .userId(1L).nickname("nickname").password("password") .img("img").email("email") .refreshToken("token").build();
//        UserTeam userTeam = UserTeam.builder()
//                .userTeamId(1L).tid(team).uid(member).status(0).manager(1).build();

        teamDtoList.add(changeTeamDtoList(team, member));

        when(teamService.getAllTeam(any())).thenReturn(teamDtoList);

        MvcResult mvcResult = mockMvc.perform(get("/api/team/all"))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        List<TeamDto> teamDto = new ObjectMapper().convertValue(response.getResponse(), TypeFactory.defaultInstance().constructCollectionType(List.class, TeamDto.class));

        //then
        assertThat(teamDto.size()).isEqualTo(teamDtoList.size());
    }

    @DisplayName("팀 저장")
    @Test
    void insertTeam() throws Exception {
        TeamInsertRequestDto teamInsertRequestDto = TeamInsertRequestDto.builder()
                .name("name").info("info").open(true).hostId(1L).build();

        Team team = Team.builder()
                .teamId(1L).name("name").info("info").open(true).build();

        when(teamService.insertTeam(any())).thenReturn(TeamDto.of(team));

        MvcResult mvcResult = mockMvc.perform(post("/api/team").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(teamInsertRequestDto)))
                        .andExpect(status().isOk())
                        .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TeamDto teamDto = new ObjectMapper().convertValue(response.getResponse(), TeamDto.class);

        //then
        assertThat(teamDto.getName()).isEqualTo(TeamDto.of(team).getName());
    }

    @DisplayName("팀 삭제")
    @Test
    void deleteTeam() throws Exception {
        mockMvc.perform(delete("/api/team/{teamId}",1).with(csrf()))
                .andExpect(status().isOk())
                .andReturn();
    }

    @DisplayName("팀 정보 변경")
    @Test
    void updateTeam() throws Exception {
        TeamUpdateRequestDto teamUpdateRequestDto = TeamUpdateRequestDto.builder()
                .teamId(1L).name("rename").info("info").open(true).build();
        Team team = Team.builder()
                .teamId(1L).name("name").info("info").open(true).build();

        team.updateTeam(teamUpdateRequestDto.getName(),teamUpdateRequestDto.getInfo(),teamUpdateRequestDto.getOpen());

        when(teamService.updateTeam(any())).thenReturn(TeamDto.of(team));

        MvcResult mvcResult = mockMvc.perform(put("/api/team").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(teamUpdateRequestDto)))
                        .andExpect(status().isOk())
                        .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TeamDto teamDto = new ObjectMapper().convertValue(response.getResponse(), TeamDto.class);

        //then
        assertThat(teamDto.getName()).isEqualTo(TeamDto.of(team).getName());
        assertThat(teamDto.getOpen()).isEqualTo(TeamDto.of(team).getOpen());
    }

    @DisplayName("멤버가 속한 팀 가져오기")
    @Test
    void getUserTeam() throws Exception {
        List<TeamDto> teamDtoList = new ArrayList<>();
        Team team = Team.builder()
                .teamId(1L).name("name").info("info").open(true).build();
        teamDtoList.add(TeamDto.of(team));

        when(teamService.getUserTeam(anyLong())).thenReturn(teamDtoList);

        MvcResult mvcResult = mockMvc.perform(get("/api/team/member"))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        List<TeamDto> teamDto = new ObjectMapper().convertValue(response.getResponse(), TypeFactory.defaultInstance().constructCollectionType(List.class, TeamDto.class));

        //then
        assertThat(teamDto.size()).isEqualTo(teamDtoList.size());
    }

    @DisplayName("팀 가입 신청")
    @Test
    void insertTeamMember() throws Exception {
        TeamMemberDto teamMemberDto = TeamMemberDto.builder()
                .teamId(1L).userId(1L).build();

        Team team = Team.builder()
                .teamId(1L).name("name").info("info").open(true).build();

        when(teamService.insertTeamMember(any())).thenReturn(TeamDto.of(team));

        MvcResult mvcResult = mockMvc.perform(post("/api/team/member").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(teamMemberDto)))
                        .andExpect(status().isOk())
                        .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TeamDto teamDto = new ObjectMapper().convertValue(response.getResponse(), TeamDto.class);

        //then
        assertThat(teamDto.getName()).isEqualTo(TeamDto.of(team).getName());
    }

    @DisplayName("팀 가입 승인")
    @Test
    void approveTeamMember() throws Exception {
        TeamApproveRequestDto teamApproveRequestDto = TeamApproveRequestDto.builder()
                .teamId(1L).userId(1L).build();

        Team team = Team.builder()
                .teamId(1L).name("name").info("info").open(true).build();

        when(teamService.approveTeamMember(any())).thenReturn(TeamDto.of(team));

        MvcResult mvcResult = mockMvc.perform(put("/api/team/approve").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(teamApproveRequestDto)))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        TeamDto teamDto = new ObjectMapper().convertValue(response.getResponse(), TeamDto.class);

        //then
        assertThat(teamDto.getName()).isEqualTo(TeamDto.of(team).getName());
    }

    @DisplayName("팀 멤버 삭제")
    @Test
    void deleteTeamMember() throws Exception {
        Long teamId = 1L;
        Long userId = 1L;

        mockMvc.perform(delete("/api/team/member?teamId={teamId}&userId={userId}",teamId,userId).with(csrf()))
                        .andExpect(status().isOk())
                        .andReturn();
    }

    @DisplayName("팀 가입 승인")
    @Test
    void signTeamMember() throws Exception {
        Long teamId = 1L;

        Team team = Team.builder()
                .teamId(1L).name("name").info("info").open(true).build();
        Member member = Member.builder()
                .userId(1L).nickname("nickname").password("password") .img("img").email("email") .refreshToken("token").build();
        UserTeam userTeam = UserTeam.builder()
                .userTeamId(1L).tid(team).uid(member).status(0).manager(1).build();

        List<TeamMemberResponseDto> teamDtoList = new ArrayList<>();
        teamDtoList.add(TeamMemberResponseDto.of(userTeam));

        when(teamService.signTeamMember(anyLong(), anyLong())).thenReturn(teamDtoList);

        MvcResult mvcResult = mockMvc.perform(get("/api/team/sign/{teamId}",teamId))
                .andExpect(status().isOk())
                .andReturn();

        SuccessResponse response = new ObjectMapper().readValue(mvcResult.getResponse().getContentAsString(), SuccessResponse.class);
        List<TeamMemberResponseDto> teamDto = new ObjectMapper().convertValue(response.getResponse(), TypeFactory.defaultInstance().constructCollectionType(List.class, TeamMemberResponseDto.class));

        //then
        assertThat(teamDto.size()).isEqualTo(teamDtoList.size());
    }

    @Nested
    @DisplayName("TeamController ExceptionTest")
    class ExceptionTest {
        @DisplayName("팀 조회 오류")
        @Test
        void getTeamException() throws Exception{

            doThrow(new CustomException(ErrorCode.INVALID_TEAM)).when(teamService).getTeam(any());

            mockMvc.perform(get("/api/team/{teamId}",1))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(teamService).getTeam(any());

            mockMvc.perform(get("/api/team/{teamId}",1))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("키워드로 팀 조회 오류")
        @Test
        void getAllTeamByKeyWordException() throws Exception{
            Long userId = 1L;
            String keyword = "na";

            List<TeamDto> teamDtoList = new ArrayList<>();
            Team team = Team.builder()
                    .teamId(1L).name("name").info("info").open(true).build();
            Member member = Member.builder()
                    .userId(1L) .nickname("nickname").password("password") .img("img").email("email") .refreshToken("token").build();

            teamDtoList.add(changeTeamDtoList(team, member));

            doThrow(new CustomException(ErrorCode.NO_USER)).when(teamService).getAllTeamByKeyWord(any(),any());

            mockMvc.perform(get("/api/team/all/search").queryParam("keyword","na"))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(teamService).getAllTeamByKeyWord(any(),any());

            mockMvc.perform(get("/api/team/all/search").queryParam("keyword","na"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("전체 팀 조회 오류")
        @Test
        void getAllTeamException() throws Exception{
            //given
            Long userId = 1L;

            List<TeamDto> teamDtoList = new ArrayList<>();

            Team team = Team.builder()
                    .teamId(1L).name("name").info("info").open(true).build();
            Member member = Member.builder()
                    .userId(1L).nickname("nickname").password("password") .img("img").email("email") .refreshToken("token").build();
//        UserTeam userTeam = UserTeam.builder()
//                .userTeamId(1L).tid(team).uid(member).status(0).manager(1).build();

            teamDtoList.add(changeTeamDtoList(team, member));

            doThrow(new CustomException(ErrorCode.NO_USER)).when(teamService).getAllTeam(any());

            mockMvc.perform(get("/api/team/all"))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(teamService).getAllTeam(any());

            mockMvc.perform(get("/api/team/all"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("팀 저장 오류")
        @Test
        void insertTeamException() throws Exception {
            TeamInsertRequestDto teamInsertRequestDto = TeamInsertRequestDto.builder()
                    .name("name").info("info").open(true).hostId(1L).build();

            doThrow(new CustomException(ErrorCode.NO_USER)).when(teamService).insertTeam(any());

            mockMvc.perform(post("/api/team").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(teamInsertRequestDto)))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(teamService).insertTeam(any());

            mockMvc.perform(post("/api/team").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(teamInsertRequestDto)))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("팀 삭제 오류")
        @Test
        void deleteTeamException() throws Exception {
            doThrow(new CustomException(ErrorCode.INVALID_TEAM)).when(teamService).deleteTeam(any());

            mockMvc.perform(delete("/api/team/{teamId}",1).with(csrf()))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(teamService).deleteTeam(any());

            mockMvc.perform(delete("/api/team/{teamId}",1).with(csrf()))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }
        @DisplayName("팀 변경 오류")
        @Test
        void updateTeamException() throws Exception {
            TeamUpdateRequestDto teamUpdateRequestDto = TeamUpdateRequestDto.builder()
                    .teamId(1L).name("rename").info("info").open(true).build();
            Team team = Team.builder()
                    .teamId(1L).name("name").info("info").open(true).build();

            team.updateTeam("rename","info",false);

            doThrow(new CustomException(ErrorCode.INVALID_TEAM)).when(teamService).updateTeam(any());

            mockMvc.perform(put("/api/team").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(teamUpdateRequestDto)))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(teamService).updateTeam(any());

            mockMvc.perform(put("/api/team").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(teamUpdateRequestDto)))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("멤버가 속한 팀 가져오기 오류")
        @Test
        void getUserTeamException() throws Exception {
            List<TeamDto> teamDtoList = new ArrayList<>();
            Team team = Team.builder()
                    .teamId(1L).name("name").info("info").open(true).build();
            teamDtoList.add(TeamDto.of(team));

            doThrow(new CustomException(ErrorCode.NO_USER)).when(teamService).getUserTeam(any());

            mockMvc.perform(get("/api/team/member"))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(teamService).getUserTeam(any());

            mockMvc.perform(get("/api/team/member"))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("팀 가입 신청 오류")
        @Test
        void insertTeamMemberException() throws Exception {
            TeamMemberDto teamMemberDto = TeamMemberDto.builder()
                    .teamId(1L).userId(1L).build();

            doThrow(new CustomException(ErrorCode.INVALID_TEAM)).when(teamService).insertTeamMember(any());

            mockMvc.perform(post("/api/team/member").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(teamMemberDto)))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(teamService).insertTeamMember(any());

            mockMvc.perform(post("/api/team/member").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(teamMemberDto)))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("팀 가입 승인 오류")
        @Test
        void approveTeamMemberException() throws Exception {
            TeamApproveRequestDto teamApproveRequestDto = TeamApproveRequestDto.builder()
                    .teamId(1L).userId(1L).build();

            doThrow(new CustomException(ErrorCode.INVALID_TEAM)).when(teamService).approveTeamMember(any());

            mockMvc.perform(put("/api/team/approve").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(teamApproveRequestDto)))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(teamService).approveTeamMember(any());

            mockMvc.perform(put("/api/team/approve").with(csrf())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(new ObjectMapper().writeValueAsString(teamApproveRequestDto)))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("팀 멤버 삭제 오류")
        @Test
        void deleteTeamMemberException() throws Exception {
            Long teamId = 1L;
            Long userId = 1L;

            doThrow(new CustomException(ErrorCode.INVALID_TEAM)).when(teamService).deleteTeamMember(any(), any());

            mockMvc.perform(delete("/api/team/member?teamId={teamId}&userId={userId}",teamId,userId).with(csrf()))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(teamService).deleteTeamMember(any(), any());

            mockMvc.perform(delete("/api/team/member?teamId={teamId}&userId={userId}",teamId,userId).with(csrf()))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }

        @DisplayName("팀 가입 승인 오류")
        @Test
        void signTeamMemberException() throws Exception {
            Long teamId = 1L;

            doThrow(new CustomException(ErrorCode.INVALID_TEAM)).when(teamService).signTeamMember(anyLong(), anyLong());

            mockMvc.perform(get("/api/team/sign/{teamId}",teamId))
                    .andExpect(status().isNotFound())
                    .andReturn();

            doThrow(new RuntimeException()).when(teamService).signTeamMember(anyLong(), anyLong());

            mockMvc.perform(get("/api/team/sign/{teamId}",teamId))
                    .andExpect(status().isInternalServerError())
                    .andReturn();
        }
    }
}