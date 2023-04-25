package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Diary;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.List;

import static com.exmaple.flory.entity.QDiary.diary;
import static com.exmaple.flory.entity.QGarden.garden;
import static com.exmaple.flory.entity.QMember.member;


@Slf4j
public class QDiaryRepositoryImpl implements QDiaryRepository{

    private final JPAQueryFactory jpaQueryFactory;

    public QDiaryRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Diary> findByGardenId(Long gardenId) {
        return jpaQueryFactory
                .selectFrom(diary)
                .leftJoin(diary.garden, garden)
                .on(garden.id.eq(gardenId))
                .where(diary.garden.id.eq(gardenId))
                .fetch();
    }

    @Override
    public List<Diary> findByMemberId(Long memberId) {
        return jpaQueryFactory
                .selectFrom(diary)
                .where(diary.garden.id.in(
                        JPAExpressions
                                .select(garden.id)
                                .from(garden)
                                .where(garden.member.userId.eq(memberId))
                ))
                .orderBy(diary.createdTime.desc())
                .fetch();
    }

    @Override
    public List<Diary> findAllPublic() {
        return jpaQueryFactory
                .selectFrom(diary)
                .where(diary.publicStatus.eq("전체공개"))
                .orderBy(diary.createdTime.desc())
                .fetch();
    }

    @Override
    public List<Diary> findPublicByGardenId(Long gardenId) {
        return jpaQueryFactory
                .selectFrom(diary)
                .leftJoin(diary.garden, garden)
                .on(garden.id.eq(gardenId))
                .where(diary.publicStatus.eq("전체공개").and(diary.garden.id.eq(gardenId)))
                .fetch();
    }

    @Override
    public List<Diary> findTeamByGardenId(Long gardenId) {
        return jpaQueryFactory
                .selectFrom(diary)
                .leftJoin(diary.garden, garden)
                .on(garden.id.eq(gardenId))
                .where(diary.publicStatus.eq("그룹공개").and(diary.garden.id.eq(gardenId)))
                .fetch();
    }

    @Override
    public List<Diary> findPublicByMemberId(Long memberId) {
        return jpaQueryFactory
                .selectFrom(diary)
                .where(diary.garden.id.in(
                        JPAExpressions
                                .select(garden.id)
                                .from(garden)
                                .where(garden.member.userId.eq(memberId))
                ).and(diary.publicStatus.eq("전체공개")))
                .fetch();
    }

    @Override
    public List<Diary> findTeamByMemberId(Long memberId) {
        return jpaQueryFactory
                .selectFrom(diary)
                .leftJoin(diary.garden.member, member)
                .on(diary.garden.member.userId.eq(memberId))
                .where(diary.publicStatus.eq("그룹공개"))
                .fetch();
    }

    @Override
    public Diary findByXAndYAndZInGarden(Long gardenId, String x, String y, String z) {
        List<Diary> diaryList = jpaQueryFactory
                .selectFrom(diary)
                .leftJoin(diary.garden,garden)
                .on(diary.garden.id.eq(gardenId))
                .where(diary.x.eq(x).and(diary.y.eq(y)).and(diary.z.eq(z)))
                .fetch();
        if(diaryList.isEmpty()) return null;

        return diaryList.get(0);
    }

    @Override
    public List<Diary> findDiaryInMap(double lat1, double lng1, double lat2, double lng2) {

        return jpaQueryFactory
                .selectFrom(diary)
                .where(diary.lat.between(lat2,lat1).and(diary.lng.between(lng1,lng2)))
                .orderBy(diary.createdTime.desc())
                .fetch();
    }

    @Override
    public List<Diary> findDiaryInMonth(Long memberId, Date firstDay, Date lastDay) {
        return jpaQueryFactory
                .selectFrom(diary)
                .where(diary.garden.member.userId.eq(memberId). and(diary.createdTime.between(firstDay, lastDay)))
                .fetch();
    }


}
