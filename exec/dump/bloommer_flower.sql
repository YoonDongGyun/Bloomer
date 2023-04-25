-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: j8a205.p.ssafy.io    Database: bloommer
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `flower`
--

DROP TABLE IF EXISTS `flower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flower` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `language` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `small_category` varchar(255) DEFAULT NULL,
  `eid` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9pru8iy9is2kjbtf1lv4tgret` (`eid`),
  CONSTRAINT `FK9pru8iy9is2kjbtf1lv4tgret` FOREIGN KEY (`eid`) REFERENCES `emotion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flower`
--

LOCK TABLES `flower` WRITE;
/*!40000 ALTER TABLE `flower` DISABLE KEYS */;
INSERT INTO `flower` VALUES (1,'믿는 기쁨','크로커스','기쁨',1),(2,'행복의 방문','은방울꽃','행복',1),(3,'사랑의 고백','빨강 튤립','사랑',1),(4,'설렘','칼랑코에','설렘',1),(5,'믿음, 감사','분홍 장미','감사',1),(6,'평화, 평온','쑥국화','평온',2),(7,'만족된 사랑','뱀무','뿌듯',2),(8,'희망, 평화','잉글리쉬데이지','희망',2),(9,'수줍음, 부끄러움','함박꽃','부끄러움',3),(10,'실망, 실의','무스카리','실망스러움',3),(11,'당황, 당혹, 난처','흑종초','당황',3),(12,'원망','해당화','화남',4),(13,'나를 건드리지 마세요','봉선화','짜증',4),(14,'질투','노란 장미','질투',4),(15,'불안정','풍접초','불안',5),(16,'근심','매발톱꽃','걱정',5),(17,'떨리고 불안함','빨강 매발톱꽃','떨림',5),(18,'고독, 배신, 덧없는 사랑','아네모네','배신',6),(19,'사랑의 절망','콜레우스','좌절',6),(20,'마음의 과로움, 번민','시네라리아','괴로움',6),(21,'무한한 슬픔','알리움','슬픔',7),(22,'고독한 삶','찔레꽃','고독',7),(23,'후회','노란 카네이션','후회',7),(24,'허무한 삶','층꽃나무','허무',7),(25,'우울함','제라늄','우울',7);
/*!40000 ALTER TABLE `flower` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07  3:19:19
