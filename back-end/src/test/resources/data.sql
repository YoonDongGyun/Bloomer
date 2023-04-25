--감정목록
CREATE TABLE IF NOT EXISTS `emotion` (
                                         `id` BIGINT NOT NULL,
                                         `large_category` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `music` (
                                       `id` BIGINT NOT NULL AUTO_INCREMENT,
                                       `title` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `flower` (
                                        `id` BIGINT NOT NULL,
                                        `language` VARCHAR(255) NULL DEFAULT NULL,
    `name` VARCHAR(255) NULL DEFAULT NULL,
    `small_category` VARCHAR(255) NULL DEFAULT NULL,
    `eid` BIGINT NULL DEFAULT NULL,
    PRIMARY KEY (`id`));

insert into emotion (id,large_category) values (1,'기쁨');
insert into emotion (id,large_category) values (2,'안정');
insert into emotion (id,large_category) values (3,'당황');
insert into emotion (id,large_category) values (4,'분노');
insert into emotion (id,large_category) values (5,'불안');
insert into emotion (id,large_category) values (6,'상처');
insert into emotion (id,large_category) values (7,'슬픔');

-- 꽃 목록
insert into flower (id,name,language,small_category,eid) values(1,'크로커스','믿는 기쁨','기쁨',1);
insert into flower (id,name,language,small_category,eid) values(2,'은방울꽃','행복의 방문','행복',1);
insert into flower (id,name,language,small_category,eid) values(3,'빨강 튤립','사랑의 고백','사랑',1);
insert into flower (id,name,language,small_category,eid) values(4,'칼랑코에','설렘','설렘',1);
insert into flower (id,name,language,small_category,eid) values(5,'분홍 장미','믿음, 감사','감사',1);
insert into flower (id,name,language,small_category,eid) values(6,'쑥국화','평화, 평온','평온',2);
insert into flower (id,name,language,small_category,eid) values(7,'뱀무','만족된 사랑','뿌듯',2);
insert into flower (id,name,language,small_category,eid) values(8,'잉글리쉬데이지','희망, 평화','희망',2);
insert into flower (id,name,language,small_category,eid) values(9,'함박꽃','수줍음, 부끄러움','부끄러움',3);
insert into flower (id,name,language,small_category,eid) values(10,'무스카리','실망, 실의','실망스러움',3);
insert into flower (id,name,language,small_category,eid) values(11,'흑종초','당황, 당혹, 난처','당황',3);
insert into flower (id,name,language,small_category,eid) values(12,'해당화','원망','화남',4);
insert into flower (id,name,language,small_category,eid) values(13,'봉선화','나를 건드리지 마세요','짜증',4);
insert into flower (id,name,language,small_category,eid) values(14,'노란 장미','질투','질투', 4);
insert into flower (id,name,language,small_category,eid) values(15,'풍접초','불안정','불안',5);
insert into flower (id,name,language,small_category,eid) values(16,'매발톱꽃','근심','걱정',5);
insert into flower (id,name,language,small_category,eid) values(17,'빨강 매발톱꽃','떨리고 불안함','떨림',5);
insert into flower (id,name,language,small_category,eid) values(18,'아네모네','고독, 배신, 덧없는 사랑','배신',6);
insert into flower (id,name,language,small_category,eid) values(19,'콜레우스','사랑의 절망','좌절',6);
insert into flower (id,name,language,small_category,eid) values(20,'시네라리아','마음의 과로움, 번민','괴로움',6);
insert into flower (id,name,language,small_category,eid) values(21,'알리움','무한한 슬픔','슬픔',7);
insert into flower (id,name,language,small_category,eid) values(22,'찔레꽃','고독한 삶','고독',7);
insert into flower (id,name,language,small_category,eid) values(23,'노란 카네이션','후회','후회',7);
insert into flower (id,name,language,small_category,eid) values(24,'층꽃나무','허무한 삶','허무',7);
insert into flower (id,name,language,small_category,eid) values(25,'제라늄','우울함','우울',7);

insert into music (id, title) values(1,'218-westernet-141021');
insert into music (id, title) values(2,'5-islamic-background-sounds-alfa-relaxing-music-126059');
insert into music (id, title) values(3,'80s-mystical-stranger-things-133254');
insert into music (id, title) values(4,'a-dark-night-141333');
insert into music (id, title) values(5,'a-jazz-piano-110481');
insert into music (id, title) values(6,'a-small-miracle-132333');
