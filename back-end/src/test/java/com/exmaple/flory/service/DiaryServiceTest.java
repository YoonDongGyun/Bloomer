package com.exmaple.flory.service;

import com.exmaple.flory.dto.comment.CommentResponseDto;
import com.exmaple.flory.dto.diary.DiaryDayDto;
import com.exmaple.flory.dto.diary.DiaryDto;
import com.exmaple.flory.dto.diary.DiaryRequestDto;
import com.exmaple.flory.dto.diary.DiaryTeamDto;
import com.exmaple.flory.dto.emotion.FlowerEmotionDataDto;
import com.exmaple.flory.dto.flower.FlowerEmotionDto;
import com.exmaple.flory.dto.team.TeamIdListDto;
import com.exmaple.flory.entity.*;
import com.exmaple.flory.repository.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
@ExtendWith(SpringExtension.class)
public class DiaryServiceTest {

    @InjectMocks
    DiaryService diaryService;

    @Mock
    CommentService commentService;

    @Mock
    DiaryRepository diaryRepository;

    @Mock
    CommentRepository commentRepository;

    @Mock
    GardenRepository gardenRepository;

    @Mock
    FlowerRepository flowerRepository;

    @Mock
    EmotionRepository emotionRepository;

    @Mock
    MemberRepository memberRepository;

    @Mock
    DiaryTeamRepository diaryTeamRepository;

    @Mock
    UserTeamRepository userTeamRepository;

    @Mock
    MusicRepository musicRepository;

    @Mock
    TeamRepository teamRepository;

    private final Member member = Member
            .builder()
            .userId(1L)
            .email("ssafy@naver.com")
            .password("1234")
            .nickname("abcd")
            .build();

    private final Music music = Music.builder()
            .id(1L).title("title").build();

    private final Garden garden = Garden
            .builder()
            .id(1L)
            .member(member)
            .music(music)
            .build();

    private final Emotion emotion = Emotion.builder()
            .id(1L).largeCategory("기쁨").build();

    private final Flower flower = Flower.builder()
            .id(1L).name("flower").language("language").smallCategory("기쁨").emotion(emotion).build();

    private final FlowerEmotionDto flowerEmotionDto = FlowerEmotionDto.builder()
            .fid(1L).eid(1L).largeCategory(emotion.getLargeCategory()).smallCategory(flower.getSmallCategory()).flowerName(flower.getName()).language(flower.getLanguage()).build();

    private final DiaryDto diaryDto = DiaryDto.builder()
            .id(1L).content("content").imgSrc("imgSrc").lat(10.0).lng(10.0).publicStatus("전체공개").x("x").y("y").z("z")
            .garden(garden.toDiaryDto()).flowerEmotion(flowerEmotionDto).musicTitle("title").createdTime(new Date()).build();

    private final DiaryRequestDto diaryRequestDto = DiaryRequestDto.builder()
            .id(1L).content("content").lat(10.0).lng(10.0).publicStatus("그룹공개").x("x").y("y").z("z")
            .fid(1L).gid(1L).musicTitle("title").build();

    private final Comment comment = Comment.builder()
            .id(1L).diary(diaryDto.toEntity()).member(member).content("content").build();

    private final Team team = Team.builder()
            .teamId(1L).name("name").info("info").open(true).build();

    private final UserTeam userTeam = UserTeam.builder()
            .userTeamId(1L).tid(team).uid(member).status(1).manager(0).build();
    @DisplayName("일기 등록하기 테스트")
    @Test
    public void insertDiaryTest() throws Exception{
        List<Long> info = new ArrayList<>();
        info.add(emotion.getId());
        Diary diary = diaryDto.toEntity();
        diary.setGarden(garden);
        diary.setMusic(music);

        when(diaryRepository.save(any())).thenReturn(diary);
        when(gardenRepository.findById(any())).thenReturn(Optional.ofNullable(garden));
        when(flowerRepository.findById(any())).thenReturn(Optional.ofNullable(flower));
        when(flowerRepository.getEmotionKey(any())).thenReturn(info);
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));
        when(musicRepository.findByTitle(any())).thenReturn(music);

        DiaryRequestDto diaryRequestDto = DiaryRequestDto.builder()
                .content(diaryDto.getContent()).x(diaryDto.getX()).y(diaryDto.getY()).z(diaryDto.getZ()).publicStatus("전체공개").build();

        DiaryDto result = diaryService.insertDiary(diaryRequestDto,Optional.ofNullable(null));

        assertEquals(diaryDto.getContent(),result.getContent());
    }

    @DisplayName("일기 그룹공개 등록하기 테스트")
    @Test
    public void insertDiaryMemberTest() throws Exception{
        List<Long> info = new ArrayList<>();
        info.add(emotion.getId());
        diaryRequestDto.setGroupList(info);
        DiaryTeamDto diaryTeamDto = DiaryTeamDto.builder()
                .diaryId(1L).groupId(1L).build();

        Diary diary = diaryRequestDto.toEntity();
        diary.setGarden(garden);
        diary.setMusic(music);

        when(diaryRepository.save(any())).thenReturn(diary);
        when(gardenRepository.findById(any())).thenReturn(Optional.ofNullable(garden));
        when(flowerRepository.findById(any())).thenReturn(Optional.ofNullable(flower));
        when(flowerRepository.getEmotionKey(any())).thenReturn(info);
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));
        when(musicRepository.findByTitle(any())).thenReturn(music);
        when(teamRepository.findById(any())).thenReturn(Optional.of(team));
        when(diaryTeamRepository.save(any())).thenReturn(diaryTeamDto.toEntity());

        DiaryDto result = diaryService.insertDiary(diaryRequestDto,Optional.ofNullable(null));

        assertEquals(diaryDto.getContent(),result.getContent());
    }

    @DisplayName("일기 상세내용 가져오기 테스트")
    @Test
    public void getDiaryTest(){
        List<Long> info = new ArrayList<>();
        info.add(emotion.getId());

        Diary diary = diaryDto.toEntity();
        diary.setFlower(flower);
        diary.setGarden(garden);
        diary.setMusic(music);

        when(diaryRepository.findById(any())).thenReturn(Optional.of(diary));
        when(flowerRepository.findById(any())).thenReturn(Optional.ofNullable(flower));
        when(flowerRepository.getEmotionKey(any())).thenReturn(info);
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));

        DiaryDto result = diaryService.getDiary(diaryDto.getId());

        assertEquals(diaryDto.getContent(),result.getContent());
    }

    @DisplayName("일기 삭제하기 테스트")
    @Test
    public void deleteDiaryTest(){
        when(diaryRepository.findById(any())).thenReturn(Optional.ofNullable(diaryDto.toEntity()));

        int result = diaryService.deleteDiary(diaryDto.getId());

        assertEquals(1,result);
    }

    @DisplayName("일기 수정하기 테스트")
    @Test
    public void updateDiaryTest(){
        DiaryRequestDto diaryRequestDto = DiaryRequestDto.builder()
                .publicStatus("전체공개").address("address").content(diaryDto.getContent()).x(diaryDto.getX()).y(diaryDto.getY()).z(diaryDto.getZ()).musicTitle("title").build();
        List<Long> emotions = new ArrayList<>();
        emotions.add(emotion.getId());

        Diary diary = diaryDto.toEntity();
        diary.setGarden(garden);
        diary.setMusic(music);

        when(diaryRepository.findById(any())).thenReturn(Optional.of(diary));
        when(diaryRepository.save(any())).thenReturn(diary);
        when(gardenRepository.findById(any())).thenReturn(Optional.ofNullable(garden));
        when(flowerRepository.findById(any())).thenReturn(Optional.ofNullable(flower));
        when(flowerRepository.getEmotionKey(any())).thenReturn(emotions);
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));
        when(musicRepository.findByTitle(any())).thenReturn(music);

        DiaryDto result = diaryService.updateDiary(diaryRequestDto);

        assertEquals(diaryDto.getContent(),result.getContent());
    }

    @DisplayName("그룹 공개 일기 수정하기 테스트")
    @Test
    public void updateMemberDiaryTest(){
        List<Long> groupList = new ArrayList<>();
        groupList.add(1L);

        DiaryRequestDto diaryRequestDto = DiaryRequestDto.builder()
                .publicStatus("그룹공개").address("address").content(diaryDto.getContent()).musicTitle("title").x(diaryDto.getX()).y(diaryDto.getY()).z(diaryDto.getZ()).groupList(groupList).build();
        List<Long> emotions = new ArrayList<>();
        emotions.add(emotion.getId());

        Diary diary = diaryDto.toEntity();
        diary.setGarden(garden);
        diary.setMusic(music);

        when(diaryRepository.findById(any())).thenReturn(Optional.of(diary));
        when(diaryRepository.save(any())).thenReturn(diary);
        when(gardenRepository.findById(any())).thenReturn(Optional.ofNullable(garden));
        when(flowerRepository.findById(any())).thenReturn(Optional.ofNullable(flower));
        when(flowerRepository.getEmotionKey(any())).thenReturn(emotions);
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));
        when(musicRepository.findByTitle(any())).thenReturn(music);

        DiaryDto result = diaryService.updateDiary(diaryRequestDto);

        assertEquals(diaryDto.getContent(),result.getContent());
    }

    @DisplayName("해당 정원의 일기 목록 조회 테스트")
    @Test
    public void getDiaryByGardenTest(){
        List<Diary> diaryList = new ArrayList<>();
        List<Long> info = new ArrayList<>();
        info.add(emotion.getId());

        Diary diary = diaryDto.toEntity();
        diary.setFlower(flower);
        diary.setGarden(garden);
        diary.setMusic(music);
        diaryList.add(diary);

        when(diaryRepository.findById(any())).thenReturn(Optional.of(diary));
        when(flowerRepository.findById(any())).thenReturn(Optional.ofNullable(flower));
        when(flowerRepository.getEmotionKey(any())).thenReturn(info);
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));
        when(diaryRepository.findByGardenId(any())).thenReturn(diaryList);
        when(gardenRepository.findById(any())).thenReturn(Optional.ofNullable(garden));

        List<DiaryDto> result = diaryService.getDiaryListByGarden(1L,1L);

        assertEquals(result.size(),diaryList.size());
    }

    @DisplayName("유저의 일기 목록 조회 테스트")
    @Test
    public void getDiaryByMemberTest(){
        List<Diary> diaryDtoList = new ArrayList<>();
        List<Long> emotions = new ArrayList<>();

        emotions.add(1L);

        Diary diary = diaryDto.toEntity();
        diary.setFlower(flower);
        diary.setGarden(garden);
        diary.setMusic(music);

        diaryDtoList.add(diary);
        when(diaryRepository.findByMemberId(any())).thenReturn(diaryDtoList);
        when(flowerRepository.getEmotionKey(any())).thenReturn(emotions);
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));

        List<DiaryDto> result = diaryService.getDiaryListByUser(1L,1L);

        assertEquals(result.size(),diaryDtoList.size());
    }

    @DisplayName("지도 범위 내의 일기 목록 조회 테스트")
    @Test
    public void getDiaryInMapTest(){
        List<Diary> diaries = new ArrayList<>();
        Map<String,String> info = new HashMap<>();
        List<Long> emotions = new ArrayList<>();
        Diary diary = diaryDto.toEntity();
        garden.setMember(member);
        diary.setGarden(garden);
        diary.setFlower(flower);
        diary.setMusic(music);

        info.put("lat1","11");
        info.put("lng1","1");
        info.put("lat2","1");
        info.put("lng2","11");
        info.put("requestId","1");

        diaries.add(diary);
        emotions.add(1L);

        when(diaryRepository.findDiaryInMap(anyDouble(),anyDouble(),anyDouble(),anyDouble())).thenReturn(diaries);
        when(flowerRepository.getEmotionKey(any())).thenReturn(emotions);
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));

        List<DiaryDto> result = diaryService.getDiaryListInMap(info);

        assertEquals(diaries.size(),result.size());
    }

    @DisplayName("지도 범위 내의 일기 목록 조회 테스트")
    @Test
    public void getDiaryInMapIdTest(){
        List<Diary> diaries = new ArrayList<>();
        Map<String,String> info = new HashMap<>();
        List<Long> emotions = new ArrayList<>();
        Diary diary = diaryDto.toEntity();
        garden.setMember(member);
        diary.setGarden(garden);
        diary.setFlower(flower);
        diary.setMusic(music);

        info.put("lat1","11");
        info.put("lng1","1");
        info.put("lat2","1");
        info.put("lng2","11");
        info.put("requestId","2");

        diaries.add(diary);
        emotions.add(1L);

        when(diaryRepository.findDiaryInMap(anyDouble(),anyDouble(),anyDouble(),anyDouble())).thenReturn(diaries);
        when(flowerRepository.getEmotionKey(any())).thenReturn(emotions);
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));

        List<DiaryDto> result = diaryService.getDiaryListInMap(info);

        assertEquals(diaries.size(),result.size());
    }

    @DisplayName("지도 범위 내의 그룹공개 일기 목록 조회 테스트")
    @Test
    public void getDiaryInMapMemberTest(){
        List<Diary> diaries = new ArrayList<>();
        Map<String,String> info = new HashMap<>();
        List<Long> emotions = new ArrayList<>();
        Diary diary = diaryDto.toEntity();
        garden.setMember(member);
        diary.setGarden(garden);
        diary.setFlower(flower);
        diary.setMusic(music);

        diary.setPublicStatus("그룹공개");

        info.put("lat1","11");
        info.put("lng1","1");
        info.put("lat2","1");
        info.put("lng2","11");
        info.put("requestId","2");

        diaries.add(diary);
        emotions.add(1L);

        when(diaryRepository.findDiaryInMap(anyDouble(),anyDouble(),anyDouble(),anyDouble())).thenReturn(diaries);
        when(flowerRepository.getEmotionKey(any())).thenReturn(emotions);
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));

        List<Long> groupList = new ArrayList<>();
        groupList.add(1L);

        List<UserTeam> userTeams = new ArrayList<>();
        userTeams.add(userTeam);

        when(diaryTeamRepository.getGroup(any())).thenReturn(groupList);
        when(memberRepository.findById(any())).thenReturn(Optional.ofNullable(member));
        when(userTeamRepository.findAllByUidAndStatus(any(),eq(1))).thenReturn(userTeams);

        List<DiaryDto> result = diaryService.getDiaryListInMap(info);

        assertEquals(diaries.size(),result.size());
    }

    @DisplayName("좌표값으로 일기 조회 테스트")
    @Test
    public void getDiaryByLocationTest(){
        Diary diary = diaryDto.toEntity();
        diary.setFlower(flower);
        garden.setMember(member);
        diary.setGarden(garden);
        diary.setMusic(music);

        List<Long> emotionList = new ArrayList<>();
        emotionList.add(1L);

        when(diaryRepository.findByXAndYAndZInGarden(any(),any(),any(),any())).thenReturn(diary);
        when(commentService.getCommentList(any())).thenReturn(new ArrayList<>());
        when(flowerRepository.getEmotionKey(any())).thenReturn(emotionList);
        when(emotionRepository.findById(any())).thenReturn(Optional.ofNullable(emotion));


        Map<String,String> info = new HashMap<>();

        info.put("gardenId","1");
        info.put("x","10");
        info.put("y","10");
        info.put("z","10");

        DiaryDto result = diaryService.getDiaryByLocation(info);

        assertEquals(diaryDto.getContent(),result.getContent());
    }

    @DisplayName("정원의 꽃들 위치 조정 테스트")
    @Test
    public void updateDiariesLocationTest(){
        List<DiaryDto> diaries = new ArrayList<>();
        Diary diary = diaryDto.toEntity();
        diary.setGarden(garden);
        diary.setMusic(music);

        diaries.add(diaryDto);

        when(diaryRepository.findById(any())).thenReturn(Optional.of(diary));
        when(diaryRepository.save(any())).thenReturn(diary);
        when(gardenRepository.findById(any())).thenReturn(Optional.ofNullable(garden));
        when(flowerRepository.findById(any())).thenReturn(Optional.ofNullable(flower));
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));
        when(musicRepository.findByTitle(any())).thenReturn(music);

        List<DiaryDto> result = diaryService.updateDiaryLocation(diaries);

        assertEquals(diaries.size(),result.size());
    }

    @DisplayName("그룹에 속한 일기 목록 가져오기 테스트")
    @Test
    public void getDiaryListInTeamTest(){
        List<Long> idList = new ArrayList<>();
        List<Diary> diaries = new ArrayList<>();
        List<UserTeam> userTeams = new ArrayList<>();
        Diary diary = diaryDto.toEntity();

        userTeams.add(userTeam);
        diary.setGarden(garden);
        diary.setFlower(flower);
        diary.setMusic(music);

        idList.add(1L);
        diaries.add(diary);
        Team team1 = Team.builder()
                .teamId(1L).open(true).info("info").userTeamList(userTeams).name("name").build();
        TeamIdListDto teamIdListDto = TeamIdListDto.builder()
                .teamIdList(idList).build();

        when(teamRepository.findById(any())).thenReturn(Optional.of(team1));
        when(diaryRepository.findPublicByMemberId(any())).thenReturn(diaries);
        when(diaryTeamRepository.getDiaryByTid(any())).thenReturn(idList);
        when(diaryRepository.findById(any())).thenReturn(Optional.of(diary));
        when(flowerRepository.getEmotionKey(any())).thenReturn(idList);
        when(emotionRepository.findById(any())).thenReturn(Optional.ofNullable(emotion));

        List<DiaryDto> diaryDtoList = diaryService.getDiaryListInTeam(teamIdListDto);

        assertEquals(diaryDtoList.size(),diaries.size()+1);
    }

    @DisplayName("댓글 목록 가져오기 테스트")
    @Test
    public void getCommentListTest(){
        List<Comment> comments = new ArrayList<>();
        Diary diary = diaryDto.toEntity();

        diary.setGarden(garden);
        diary.setMusic(music);
        comment.setDiary(diary);

        comments.add(comment);
        when(commentRepository.findByDid(any())).thenReturn(comments);
        when(memberRepository.findById(any())).thenReturn(Optional.ofNullable(member));

        List<CommentResponseDto> commentList = diaryService.getCommentList(diaryDto);

        assertEquals(commentList.size(),comments.size());
    }

    @DisplayName("팀 소속 여부 확인 테스트")
    @Test
    public void isInTeamTest(){
        List<Long> groupList = new ArrayList<>();
        groupList.add(1L);

        List<UserTeam> userTeams = new ArrayList<>();
        userTeams.add(userTeam);

        when(diaryTeamRepository.getGroup(any())).thenReturn(groupList);
        when(memberRepository.findById(any())).thenReturn(Optional.ofNullable(member));
        when(userTeamRepository.findAllByUidAndStatus(any(),eq(1))).thenReturn(userTeams);

        boolean result = diaryService.isInTeam(1L,1L);

        assertTrue(result);
    }

    @DisplayName("사용자의 일기 목록 가져오기 테스트")
    @Test
    public void getDiaryListInUserTest(){
        List<Diary> diaries = new ArrayList<>();
        diaries.add(diaryDto.toEntity());

        when(diaryRepository.findPublicByMemberId(any())).thenReturn(diaries);
        when(diaryRepository.findTeamByMemberId(any())).thenReturn(diaries);

        List<Diary> result = diaryService.getDiaryListInUser(1L,2L);

        assertEquals(result.size(),diaries.size());
    }

    @DisplayName("사용자의 이번달 일기 목록 가져오기 테스트")
    @Test
    public void getDiaryInMonthTest() throws Exception {
        List<Diary> diaryList = new ArrayList<>();
        List<Long> emotionList = new ArrayList<>();
        emotionList.add(1L);

        Diary diary = diaryDto.toEntity();
        diary.setFlower(flower);
        garden.setMember(member);
        diary.setGarden(garden);
        diary.setMusic(music);

        diaryList.add(diary);
        diaryList.add(diary);

        when(diaryRepository.findDiaryInMonth(any(),any(),any())).thenReturn(diaryList);
        when(flowerRepository.getEmotionKey(any())).thenReturn(emotionList);
        when(emotionRepository.findById(any())).thenReturn(Optional.ofNullable(emotion));

        List<DiaryDayDto> diaryDayDtoList = diaryService.getDiaryInMonth(1L,"2023","3");
        List<DiaryDayDto> diaryDayDtoList1 = diaryService.getDiaryInMonth(1L,"2023","3");

        assertEquals(diaryList.size(),diaryDayDtoList.size()+diaryDayDtoList1.size());
    }

    @DisplayName("그룹 리스트 설정 테스트")
    @Test
    public void setGroupListTest(){
        List<Long> groupIdList = new ArrayList<>();
        List<Team> groupList = new ArrayList<>();
        DiaryDto result = diaryDto;

        groupIdList.add(1L);
        groupList.add(team);

        when(diaryTeamRepository.getGroup(any())).thenReturn(groupIdList);
        when(teamRepository.findById(any())).thenReturn(Optional.of(team));

        diaryService.setGroupList(result);

        assertEquals(result.getGroupList().size(),groupList.size());
    }

    @DisplayName("감정 분석 결과 및 꽃 목록 가져오기")
    @Test
    public void getFlowerEmotionDataTest(){
        Map<String, String> data = new HashMap<>();
        data.put("text","나는 기쁘다");
        List<Flower> flowers= new ArrayList<>();
        flowers.add(flower);

        when(flowerRepository.getFlowers(any())).thenReturn(flowers);

        FlowerEmotionDataDto result = diaryService.getFlowerEmotionData(data);

        assertNotEquals(result.getEmotions(),null);
        assertNotEquals(result.getFlowers(),null);
    }

    @DisplayName("최신순으로 전체공개 일기 목록 가져오기 테스트")
    @Test
    public void getPublicDiaryListTest(){
        List<Diary> diaries = new ArrayList<>();
        List<Long> info = new ArrayList<>();
        info.add(emotion.getId());

        Diary diary = diaryDto.toEntity();
        diary.setFlower(flower);
        diary.setGarden(garden);
        diary.setMusic(music);

        diaries.add(diary);

        when(diaryRepository.findAllPublic()).thenReturn(diaries);
        when(flowerRepository.getEmotionKey(any())).thenReturn(info);
        when(emotionRepository.findById(any())).thenReturn(Optional.of(emotion));

        List<DiaryDto> result = diaryService.getPublicDiaryList();

        assertEquals(result.size(),diaries.size());
    }

    @DisplayName("지난주 대비 감정 통계")
    @Test
    public void getEmotionsInWeekTest(){
        List<Diary> diaries = new ArrayList<>();
        List<Garden> gardenList = new ArrayList<>();

        Diary diary = diaryDto.toEntity();
        diary.setGarden(garden);
        diary.setFlower(flower);
        diary.setMusic(music);

        diaries.add(diary);
        gardenList.add(garden);

        when(gardenRepository.findAllByUserId(any())).thenReturn(gardenList);
        when(diaryRepository.findDiaryInWeek(any())).thenReturn(diaries);

        Map<String,Integer> result = diaryService.getEmotionsInWeek(1L);

        assertEquals(result.get("기쁨"),1);
    }

    @DisplayName("이번달 감정 통계")
    @Test
    public void getEmotionsInMonthTest(){
        List<Diary> diaries = new ArrayList<>();
        List<Garden> gardenList = new ArrayList<>();

        Diary diary = diaryDto.toEntity();
        diary.setGarden(garden);
        diary.setFlower(flower);
        diary.setMusic(music);

        diaries.add(diary);
        gardenList.add(garden);

        when(gardenRepository.findAllByUserId(any())).thenReturn(gardenList);
        when(diaryRepository.findDiaryInMonth(any())).thenReturn(diaries);

        Map<String,Integer> result = diaryService.getEmotionsInMonth(1L);

        assertEquals(result.get("기쁨"),1);
    }

    @DisplayName("wordCloud")
    @Test
    public void getWordCloud(){
        Member member = Member.builder()
                .userId(1L) .nickname("nickname").password("password") .img("img").email("email") .refreshToken("token").build();
        List<Diary> diaryList = new ArrayList<>();

        Diary diary = diaryDto.toEntity();
        diaryList.add(diary);

        when(memberRepository.findById(any())).thenReturn(Optional.ofNullable(member));
        when(diaryRepository.findByMemberId(any())).thenReturn(diaryList);

        Map<String,Integer> result = diaryService.getWordCloud(1L);

        assertEquals(result.get("content"),1);
    }
}
