package com.exmaple.flory.service;

import com.exmaple.flory.dto.comment.CommentDto;
import com.exmaple.flory.dto.comment.CommentResponseDto;
import com.exmaple.flory.dto.diary.DiaryDayDto;
import com.exmaple.flory.dto.diary.DiaryDto;
import com.exmaple.flory.dto.diary.DiaryRequestDto;
import com.exmaple.flory.dto.emotion.EmotionDataDto;
import com.exmaple.flory.dto.emotion.FlowerEmotionDataDto;
import com.exmaple.flory.dto.flower.FlowerEmotionDto;
import com.exmaple.flory.dto.member.MemberResponseDto;
import com.exmaple.flory.dto.team.TeamDto;
import com.exmaple.flory.dto.team.TeamIdListDto;
import com.exmaple.flory.dto.team.TeamMemberInfoDto;
import com.exmaple.flory.entity.*;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Slf4j
public class DiaryService {

    @Autowired
    private S3Uploader s3Uploader;

    @Autowired
    private MusicRepository musicRepository;
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private DiaryTeamRepository diaryTeamRepository;
    @Autowired
    private EmotionRepository emotionRepository;
    @Autowired
    private FlowerRepository flowerRepository;
    @Autowired
    private GardenRepository gardenRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserTeamRepository userTeamRepository;

    @Transactional
    public DiaryDto insertDiary(DiaryRequestDto diaryRequestDto, Optional<MultipartFile> multipartFile) throws IOException {
        Diary diary = diaryRequestDto.toEntity();

        Optional<Garden> garden = gardenRepository.findById(diaryRequestDto.getGid());
        Optional<Flower> flower = flowerRepository.findById(diaryRequestDto.getFid());
        Optional<Music> music = Optional.ofNullable(musicRepository.findByTitle(diaryRequestDto.getMusicTitle()));

        if(garden.isEmpty()) throw new CustomException(ErrorCode.INVALID_GARDEN);
        if(flower.isEmpty()) throw new CustomException(ErrorCode.NO_FLOWER);
        if(music.isEmpty()) throw new CustomException(ErrorCode.NO_MUSIC);

        Flower flowerData = flower.get();

        diary.setGarden(garden.get());
        diary.setFlower(flowerData);
        diary.setMusic(music.get());

        if(!multipartFile.isEmpty()){
            String uploadImg = s3Uploader.upload(multipartFile.get());
            diary.setImgSrc(uploadImg);
        }

        DiaryDto result = diaryRepository.save(diary).toDto();
        result.setFlowerEmotion(getFlowerEmotion(flowerData));

        if(diaryRequestDto.getPublicStatus().equals("그룹공개")){
            List<Long> groups = diaryRequestDto.getGroupList();

            for(int i=0;i<groups.size();i++){
                DiaryTeam diaryTeam = DiaryTeam.builder()
                        .groupId(groups.get(i)).diaryId(result.getId()).build();
                diaryTeamRepository.save(diaryTeam);
            }

            List<Team> groupList = new ArrayList<>();
            List<TeamDto> groupResult = new ArrayList<>();

            for(Long id: diaryRequestDto.getGroupList()){
                Optional<Team> team = teamRepository.findById(id);

                if(team.isEmpty()) throw new CustomException(ErrorCode.INVALID_TEAM);

                groupList.add(team.get());
            }

            for(Team team: groupList){
                groupResult.add(TeamDto.of(team));
            }

            result.setGroupList(groupResult);
        }

        return result;
    }

    public DiaryDto getDiary(Long diaryId){
        Optional<Diary> diary = diaryRepository.findById(diaryId);

        if(diary.isEmpty()){
            throw new CustomException(ErrorCode.NO_DIARY);
        }

        DiaryDto result = diary.get().toDto();
        result.setFlowerEmotion(getFlowerEmotion(diary.get().getFlower()));
        result.setCommentList(getCommentList(result));

        if(result.getPublicStatus().equals("그룹공개")){
            setGroupList(result);
        }

        return result;
    }

    @Transactional
    public int deleteDiary(Long diary_id){
        Optional<Diary> diary = diaryRepository.findById(diary_id);

        if(diary.isPresent()){
            diaryRepository.delete(diary.get());
            return 1;
        }
        else{
            throw new CustomException(ErrorCode.NO_DIARY);
        }
    }

    @Transactional
    public DiaryDto updateDiary(DiaryRequestDto diaryDto){
        Optional<Diary> dir = diaryRepository.findById(diaryDto.getId());

        if(dir.isEmpty()) throw new CustomException(ErrorCode.NO_DIARY);

        Optional<Garden> garden = gardenRepository.findById(diaryDto.getGid());
        Optional<Flower> flower = flowerRepository.findById(diaryDto.getFid());
        Optional<Music> music = Optional.ofNullable(musicRepository.findByTitle(diaryDto.getMusicTitle()));

        if(garden.isEmpty()) throw new CustomException(ErrorCode.INVALID_GARDEN);
        if(flower.isEmpty()) throw new CustomException(ErrorCode.NO_FLOWER);
        if(music.isEmpty()) throw new CustomException(ErrorCode.NO_MUSIC);

        Diary diary = dir.get();

        setUpdateDiary(diaryDto,diary);

        diary.setGarden(garden.get());
        diary.setFlower(flower.get());
        diary.setMusic(music.get());

        if(diary.getPublicStatus().equals("그룹공개")){
            diaryTeamRepository.deleteByDid(diaryDto.getId());
            log.info("삭제");

            List<Long> groups = diaryDto.getGroupList();

            for(int i=0;i<groups.size();i++){
                log.info("{}",groups.get(i));
                DiaryTeam diaryTeam = DiaryTeam.builder()
                        .groupId(groups.get(i)).diaryId(diary.getId()).build();
                diaryTeamRepository.save(diaryTeam);
            }
        }

        DiaryDto result = diaryRepository.save(diary).toDto();
        log.info("update: {}",result);

        result.setCreatedTime(dir.get().getCreatedTime());
        result.setCommentList(getCommentList(result));
        result.setFlowerEmotion(getFlowerEmotion(flower.get()));
        setGroupList(result);

        return result;
    }

    public List<DiaryDto> getDiaryListByGarden(Long gardenId, Long requestId){

        Optional<Garden> garden = gardenRepository.findById(gardenId);
        List<Diary> diaryList;
        if(garden.isEmpty()) throw new CustomException(ErrorCode.INVALID_GARDEN);

        if(garden.get().getMember().getUserId().equals(requestId)){ //정원 생성자와 요청한 사람이 동일하다면
            diaryList = diaryRepository.findByGardenId(gardenId);//공개여부와 상관없이 정원의 모든 일기 목록 가져오기
        }
        else{ //정원 생성자와 요청한 사람이 다르다면
            diaryList = diaryRepository.findPublicByGardenId(gardenId);//먼저 전체공개로 설정한 일기 목록을 가져온다
            List<Diary> diaries = diaryRepository.findTeamByGardenId(gardenId);//그룹공개로 설정한 일기 목록을 우선 가져온다

            for(int i=0;i<diaries.size();i++){
                if(isInTeam(diaries.get(i).getId(),requestId)){ //요청한 사람이 그룹 내에 있는 사람이라면
                    diaryList.add(diaries.get(i));
                }
            }
        }

        List<DiaryDto> diaryDtoList = new ArrayList<>();

        for(int i=0;i<diaryList.size();i++){
            Diary diary = diaryList.get(i);

            DiaryDto diaryDto = diary.toDto();
            diaryDto.setFlowerEmotion(getFlowerEmotion(diary.getFlower()));
            diaryDto.setCommentList(getCommentList(diaryDto));
            setGroupList(diaryDto);

            if(diary.getPublicStatus().equals("그룹공개")){
                setGroupList(diaryDto);
            }

            diaryDtoList.add(diaryDto);
        }

        return diaryDtoList;
    }

    public List<DiaryDto> getDiaryListByUser(Long memberId, Long requestId){

        List<Diary> diaryList = getDiaryListInUser(memberId, requestId);
        List<DiaryDto> diaryDtoList = new ArrayList<>();

        for(int i=0;i<diaryList.size();i++){
            DiaryDto diaryDto = diaryList.get(i).toDto();
            diaryDto.setCommentList(getCommentList(diaryDto));
            diaryDto.setFlowerEmotion(getFlowerEmotion(diaryList.get(i).getFlower()));
            setGroupList(diaryDto);
            diaryDtoList.add(diaryDto);
        }

        return diaryDtoList;
    }

    public List<DiaryDto> getDiaryListInMap(Map<String, String> info){
        double lat1 = Double.parseDouble(info.get("lat1"));
        double lng1 = Double.parseDouble(info.get("lng1"));
        double lat2 = Double.parseDouble(info.get("lat2"));
        double lng2 = Double.parseDouble(info.get("lng2"));
        Long requestId = Long.parseLong(info.get("requestId"));

        List<Diary> diaryList = diaryRepository.findDiaryInMap(lat1,lng1,lat2,lng2);
        List<DiaryDto> result= new ArrayList<>();

        for(Diary diary: diaryList){
            if(diary.getGarden().getMember().getUserId().equals(requestId)){
                DiaryDto diaryDto = diary.toDto();

                diaryDto.setFlowerEmotion(getFlowerEmotion(diary.getFlower()));
                setGroupList(diaryDto);
                diaryDto.setCommentList(getCommentList(diaryDto));
                result.add(diaryDto);
            }

            else{
                if(diary.getPublicStatus().equals("전체공개")){
                    DiaryDto diaryDto = diary.toDto();

                    diaryDto.setFlowerEmotion(getFlowerEmotion(diary.getFlower()));
                    diaryDto.setCommentList(getCommentList(diaryDto));
                    setGroupList(diaryDto);

                    result.add(diaryDto);
                }
                else if(diary.getPublicStatus().equals("그룹공개")){
                    if(isInTeam(diary.getId(),requestId)){
                        DiaryDto diaryDto = diary.toDto();

                        diaryDto.setFlowerEmotion(getFlowerEmotion(diary.getFlower()));
                        setGroupList(diaryDto);
                        diaryDto.setCommentList(getCommentList(diaryDto));

                        result.add(diaryDto);
                    }
                }
            }
        }

        return result;
    }

    public DiaryDto getDiaryByLocation(Map<String, String> info){
        Long gardenId = Long.parseLong(info.get("gardenId"));
        String x = info.get("x");
        String y = info.get("y");
        String z = info.get("z");

        Diary diary = diaryRepository.findByXAndYAndZInGarden(gardenId, x,y,z);

        if(diary!=null){
            DiaryDto diaryDto = diary.toDto();
            List<CommentResponseDto> comments = commentService.getCommentList(diaryDto.getId());

            diaryDto.setCommentList(comments);
            diaryDto.setFlowerEmotion(getFlowerEmotion(diary.getFlower()));
            setGroupList(diaryDto);

            return diaryDto;
        }

        return null;
    }

    public List<DiaryDayDto> getDiaryInMonth(Long memberId, String year, String month) throws Exception{
        List<DiaryDayDto> diaryDayDtoList = new ArrayList<>();

        String first = year.concat("-"+month+"-01 00:00:00");
        String last;
        switch (month){
            case "1":
            case "3":
            case "5":
            case "7":
            case "8":
            case "10":
            case "12":
                last = year.concat("-"+month+"-31 23:59:59");
                break;
            case "2":
                last = year.concat("-"+month+"-28 23:59:59");
                break;
            default:
                last = year.concat("-"+month+"-30 23:59:59");
                break;
        }

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Date firstDay = formatter.parse(first);
        Date lastDay = formatter.parse(last);

        List<Diary> diaryList = diaryRepository.findDiaryInMonth(memberId, firstDay,lastDay);

        for(Diary diary : diaryList){
            Date createdTime = diary.getCreatedTime();
            boolean flag = true;

            String day = formatter.format(createdTime);
            day = day.substring(8,10);

            for(DiaryDayDto diaryDayDto: diaryDayDtoList){
                if(diaryDayDto.getDay().equals(day)){
                    flag = false;
                    List<DiaryDto> diaries = diaryDayDto.getDiaryList();
                    DiaryDto diaryDto = diary.toDto();
                    diaryDto.setCommentList(getCommentList(diaryDto));
                    diaryDto.setFlowerEmotion(getFlowerEmotion(diary.getFlower()));
                    setGroupList(diaryDto);
                    diaries.add(diaryDto);

                    diaryDayDto.setDiaryList(diaries);
                    break;
                }
            }

            if(flag){
                List<DiaryDto> diaryList1 = new ArrayList<>();
                DiaryDto diaryDto = diary.toDto();
                diaryDto.setCommentList(getCommentList(diaryDto));
                diaryDto.setFlowerEmotion(getFlowerEmotion(diary.getFlower()));
                setGroupList(diaryDto);
                diaryList1.add(diaryDto);
                DiaryDayDto data = DiaryDayDto.builder()
                        .day(day).diaryList(diaryList1).build();

                diaryDayDtoList.add(data);
            }
        }

        return diaryDayDtoList;
    }

    @Transactional
    public List<DiaryDto> updateDiaryLocation(List<DiaryDto> diaries){
        List<DiaryDto> result = new ArrayList<>();

        for(DiaryDto diaryDto: diaries){
            Diary diary = diaryDto.toEntity();

            Optional<Garden> garden = gardenRepository.findById(diaryDto.getGarden().getId());
            Optional<Emotion> emotion = emotionRepository.findById(diaryDto.getFlowerEmotion().getEid());
            Optional<Music> music = Optional.ofNullable(musicRepository.findByTitle(diaryDto.getMusicTitle()));

            if(emotion.isEmpty()) throw new CustomException(ErrorCode.NO_EMOTION);

            Flower flower = Flower.builder()
                    .id(diaryDto.getFlowerEmotion().getFid()).name(diaryDto.getFlowerEmotion().getFlowerName())
                    .smallCategory(diaryDto.getFlowerEmotion().getSmallCategory()).emotion(emotion.get()).language(diaryDto.getFlowerEmotion().getLanguage()).build();
            if(garden.isEmpty()) throw new CustomException(ErrorCode.INVALID_GARDEN);
            if(music.isEmpty()) throw new CustomException(ErrorCode.NO_MUSIC);

            diary.setGarden(garden.get());
            diary.setMusic(music.get());
            diary.setFlower(flower);

            DiaryDto diaryDto1 = diaryRepository.save(diary).toDto();

            diaryDto1.setGarden(diaryDto.getGarden());
            diaryDto1.setFlowerEmotion(diaryDto.getFlowerEmotion());
            diaryDto1.setGroupList(diaryDto.getGroupList());
            diaryDto1.setCommentList(diaryDto.getCommentList());

            result.add(diaryDto1);
        }

        return result;
    }

    public List<DiaryDto> getPublicDiaryList(){
        List<DiaryDto> result = new ArrayList<>();
        List<Diary> diaries = diaryRepository.findAllPublic();

        for(Diary diary:diaries){
            DiaryDto diaryDto = diary.toDto();

            diaryDto.setCommentList(getCommentList(diaryDto));
            diaryDto.setFlowerEmotion(getFlowerEmotion(diary.getFlower()));
            setGroupList(diaryDto);

            result.add(diaryDto);
        }

        return result;
    }

    public List<DiaryDto> getDiaryListInTeam(TeamIdListDto teamIdListDto){
       List<DiaryDto> result = new ArrayList<>();
       List<Long> idList = teamIdListDto.getTeamIdList();
       Set<Long> userIdSet = new LinkedHashSet<>();

       for(Long id: idList){
            Optional<Team> team = teamRepository.findById(id);

            if(team.isEmpty()) throw new CustomException(ErrorCode.INVALID_TEAM);

            TeamDto teamDto = TeamDto.of(team.get());

            for(TeamMemberInfoDto member: teamDto.getUserTeamList()){
                userIdSet.add(member.getUserId());
            }
       }

        for(Long uid: userIdSet){
            List<Diary> diaries = diaryRepository.findPublicByMemberId(uid);

            for(Diary diary: diaries){
                DiaryDto diaryDto = diary.toDto();

                diaryDto.setFlowerEmotion(getFlowerEmotion(diary.getFlower()));
                diaryDto.setCommentList(getCommentList(diaryDto));

                result.add(diaryDto);
            }
        }

        for(Long tid: idList){
            List<Long> diaryIdList = diaryTeamRepository.getDiaryByTid(tid);

            for(Long did:diaryIdList){
                Optional<Diary> diary = diaryRepository.findById(did);

                if(diary.isEmpty()) continue;

                DiaryDto diaryDto = diary.get().toDto();
                diaryDto.setFlowerEmotion(getFlowerEmotion(diary.get().getFlower()));
                diaryDto.setCommentList(getCommentList(diaryDto));
                setGroupList(diaryDto);

                result.add(diaryDto);
            }
        }

        Collections.sort(result);
        return result;
    }

    public List<CommentResponseDto> getCommentList(DiaryDto diaryDto){
        List<CommentResponseDto> comments = new ArrayList<>();
        List<Comment> commentList = commentRepository.findByDid(diaryDto.getId());

        for(int i=0;i<commentList.size();i++){
            CommentDto commentDto = commentList.get(i).toDto();
            Optional<Member> member = memberRepository.findById(commentDto.getUid());

            if(member.isEmpty()) throw new CustomException(ErrorCode.NO_USER);

            CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                    .id(commentDto.getId()).member(MemberResponseDto.of(member.get())).content(commentDto.getContent()).createdTime(commentDto.getCreatedTime()).build();

            comments.add(commentResponseDto);
        }

        return comments;
    }

    public FlowerEmotionDataDto getFlowerEmotionData(Map<String,String> data){
        List<EmotionDataDto> emotionData = new ArrayList<>();
        String[] emotions = {"기쁨","안정","당황","분노","불안","상처","슬픔"};

        RestTemplate restTemplate = new RestTemplate();
        String url = "https://j8a205.p.ssafy.io/domain/emotions/analysis/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(data, headers);

        Map<String,List<String>> resultData = restTemplate.exchange(
                url, HttpMethod.POST, entity ,new ParameterizedTypeReference<Map<String,List<String>>>() {}
        ).getBody();

        List<Double> percents = new ArrayList<>();

        for(String str: resultData.get("result")){
            percents.add(Double.parseDouble(str));
        }

        for(int i=0;i<percents.size();i++){
            EmotionDataDto emoData = EmotionDataDto.builder()
                    .largeCategory(emotions[i]).analysis(100*percents.get(i)).build();

            emotionData.add(emoData);
        }

        Collections.sort(emotionData);

        List<FlowerEmotionDto> flowerData = new ArrayList<>();

        List<Flower> flowers = flowerRepository.getFlowers(emotionData.get(0).getLargeCategory());

        for(Flower flower: flowers){
            FlowerEmotionDto flowerEmotionDto = FlowerEmotionDto.builder()
                    .fid(flower.getId()).largeCategory(emotionData.get(0).getLargeCategory()).eid(flower.getEmotion().getId())
                    .language(flower.getLanguage()).smallCategory(flower.getSmallCategory()).flowerName(flower.getName()).build();

            flowerData.add(flowerEmotionDto);
        }

        FlowerEmotionDataDto flowerEmotionDataDto = FlowerEmotionDataDto.builder()
                .flowers(flowerData).emotions(emotionData).build();

        return flowerEmotionDataDto;
    }

    public FlowerEmotionDto getFlowerEmotion(Flower flowerData){
        Long emotionId = flowerRepository.getEmotionKey(flowerData.getId()).get(0);

        Optional<Emotion> emotion = emotionRepository.findById(emotionId);

        if(emotion.isEmpty()) throw new CustomException(ErrorCode.NO_EMOTION);

        FlowerEmotionDto flowerEmotionDto = FlowerEmotionDto.builder()
                .fid(flowerData.getId()).eid(emotionId).flowerName(flowerData.getName()).language(flowerData.getLanguage())
                .largeCategory(emotion.get().getLargeCategory()).smallCategory(flowerData.getSmallCategory()).build();

        return flowerEmotionDto;
    }

    public Map<String,Integer> getEmotionsInWeek(Long userId){
        List<Garden> gardenList = gardenRepository.findAllByUserId(userId);
        Map<String,Integer> result = new LinkedHashMap<>();
        List<Diary> diaries_thisWeek = new ArrayList<>();
        List<Diary> diaries_lastWeek = new ArrayList<>();

        String[] emotions = {"기쁨","안정","당황","분노","불안","상처","슬픔"};
        int[] count_thisWeek = new int[emotions.length];
        int[] count_lastWeek = new int[emotions.length];

        for(Garden garden : gardenList){
            diaries_thisWeek.addAll(diaryRepository.findDiaryInWeek(garden.getId()));
            diaries_lastWeek.addAll(diaryRepository.findDiaryInLastWeek(garden.getId()));
        }

        for(Diary diary: diaries_thisWeek){
            Flower flower = diary.getFlower();
            count_thisWeek[flower.getEmotion().getId().intValue()-1]++;
        }

        for(Diary diary: diaries_lastWeek){
            Flower flower = diary.getFlower();
            count_lastWeek[flower.getEmotion().getId().intValue()-1]++;
        }

        for(int i=0;i<emotions.length;i++){
            result.put(emotions[i],count_thisWeek[i]-count_lastWeek[i]);
        }

        return result;
    }

    public Map<String,Integer> getEmotionsInMonth(Long userId){
        List<Garden> gardenList = gardenRepository.findAllByUserId(userId);

        Map<String,Integer> result = new LinkedHashMap<>();
        List<Diary> diaries = new ArrayList<>();

        String[] emotions = {"기쁨","안정","당황","분노","불안","상처","슬픔"};
        int[] count = new int[emotions.length];

        for(Garden garden : gardenList){
            diaries.addAll(diaryRepository.findDiaryInMonth(garden.getId()));
        }

        for(Diary diary: diaries){
            Flower flower = diary.getFlower();
            count[flower.getEmotion().getId().intValue()-1]++;
        }

        for(int i=0;i<emotions.length;i++){
            result.put(emotions[i],count[i]);
        }

        return result;
    }


    public boolean isInTeam(Long diaryId, Long memberId){
        List<Long> groupList = diaryTeamRepository.getGroup(diaryId);
        Optional<Member> member = memberRepository.findById(memberId);
        if(member.isEmpty()) return false;

        List<UserTeam> teamList = userTeamRepository.findAllByUidAndStatus(member.get(), 1);

        for(int i=0;i<teamList.size();i++) {
            if(groupList.contains(teamList.get(i).getTid().getTeamId())){
                return true;
            }
        }

        return false;
    }

    public List<Diary> getDiaryListInUser(Long memberId, Long requestId){
        List<Diary> diaryList;

        if(memberId.equals(requestId)){
            return diaryRepository.findByMemberId(memberId);
        }
        else{
            diaryList = diaryRepository.findPublicByMemberId(memberId);
            List<Diary> diaries = diaryRepository.findTeamByMemberId(memberId);

            for(int i=0;i<diaries.size();i++){
                if(isInTeam(diaries.get(i).getId(),requestId)){ //요청한 사람이 그룹 내에 있는 사람이라면
                    diaryList.add(diaries.get(i));
                }
            }
        }

        return diaryList;
    }

    public void setGroupList(DiaryDto diaryDto){
        List<Long> groupIdList = diaryTeamRepository.getGroup(diaryDto.getId());

        List<Team> groupList = new ArrayList<>();
        List<TeamDto> groupResult = new ArrayList<>();

        for(Long id: groupIdList){
            Optional<Team> team = teamRepository.findById(id);

            if(team.isEmpty()) continue;

            groupList.add(team.get());
        }

        for(Team team: groupList){
            groupResult.add(TeamDto.of(team));
        }

        diaryDto.setGroupList(groupResult);
    }

    public void setUpdateDiary(DiaryRequestDto diaryRequestDto, Diary diary){
        diary.setPublicStatus(diaryRequestDto.getPublicStatus());
        diary.setX(diaryRequestDto.getX());
        diary.setY(diaryRequestDto.getY());
        diary.setZ(diaryRequestDto.getZ());
        diary.setLat(diaryRequestDto.getLat());
        diary.setLng(diaryRequestDto.getLng());
        diary.setContent(diaryRequestDto.getContent());
        diary.setAddress(diaryRequestDto.getAddress());
    }

    public Map<String,Integer> getWordCloud(Long userId){
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NO_USER));

        List<Diary> diaryList = diaryRepository.findByMemberId(userId);
        Map<String, Integer> result = new HashMap<>();
        String content ="";
        for(Diary diary: diaryList){
            content = diary.getContent();
            content = content.replaceAll("[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]", " "); //숫자 및 문자를 제외한 모든 특수 문자를 띄어쓰기로 변경
            content = content.toLowerCase(); //소문자로 변환

            String[] tmp = content.split(" ");

            for(String str: tmp){
                if(str.equals("")) continue;
                if(!result.containsKey(str)){
                    result.put(str, 1);
                }else{
                    result.put(str, result.get(str) + 1);
                }
            }
        }
        return result;
    }
}
