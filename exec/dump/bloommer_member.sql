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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `authority` varchar(255) DEFAULT NULL,
  `classic` bit(1) DEFAULT NULL,
  `electronic` bit(1) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `hiphop` bit(1) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `jazz` bit(1) DEFAULT NULL,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pop` bit(1) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `reggae` bit(1) DEFAULT NULL,
  `rnb` bit(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'2023-04-06 17:24:04.957071','2023-04-06 17:24:15.749182','ROLE_USER',_binary '\0',_binary '','aa@naver.com',_binary '\0','1',_binary '\0','aaa','$2a$10$TR7.v1p79gjw5hKQ9KcXuO6VATpuNFTbbm1TDhhGCNn96ET9nXEea',_binary '\0','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODEzNzQyNTV9.--_shNusDAKIkXsvusQL97riClyI_gQVvK-9IO9_aWoY5RSd2M27yHMGIXyqEZb269q8Wch-_JEAnegC5mAxkg',_binary '\0',_binary '\0'),(2,'2023-04-06 17:34:41.899140','2023-04-06 17:50:57.999582','ROLE_USER',_binary '\0',_binary '\0','cksgnlcjswo@gmail.com',_binary '','1',_binary '\0','KARIN kim','$2a$10$2CLaU.2Vr9YBkIXMCGpoKe3p9I.aVRykau9W.pOfG9sPln/YlBj56',_binary '',NULL,_binary '\0',_binary ''),(4,'2023-04-06 17:38:36.408693','2023-04-07 02:17:23.504278','ROLE_USER',_binary '\0',_binary '','donggyun@naver.com',_binary '\0','1',_binary '\0','윤동균','$2a$10$/SIX6.DmGG2fatfwMz59FecrHVrGhic/PZgjd1.cERNl1NgfikMVq',_binary '',NULL,_binary '\0',_binary '\0'),(5,'2023-04-06 17:40:25.332390','2023-04-06 21:41:05.665791','ROLE_USER',_binary '\0',_binary '','yoon@naver.com',_binary '\0','1',_binary '\0','윤동균','$2a$10$mmi/mjOTrRjWHS6n9MYIbO9toB3JyydCDQNx8ITIwwYw/NvWep5Li',_binary '',NULL,_binary '\0',_binary '\0'),(6,'2023-04-06 17:52:38.026753','2023-04-07 02:24:40.695758','ROLE_USER',_binary '',_binary '\0','wjddnjs0528@naver.com',_binary '\0','76b5f99414a04db49e16294c43cfab80.png',_binary '\0','개굴개굴','$2a$10$ZenigJDQA0Il7rHGxWplMurGXwBl9cQABSA8isRhU6AtJYaW/5svm',_binary '','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODEzNzU5NjJ9.yh492L4NKAFHLJRQynARlPJ3QRE7uIIYtFRX13Qis7Xj3lUX3JCvgUoX9JbgJyLEkv3YrhG7oArr-MGzQSZqcw',_binary '\0',_binary '\0'),(7,'2023-04-06 17:52:42.851246','2023-04-07 02:42:32.933768','ROLE_USER',_binary '\0',_binary '\0','pjw2369@naver.com',_binary '','1bf74586ba1c4291b3f5373b92913c1f.png',_binary '','박중원','$2a$10$07OMfHWVHIbfi0PuqxSoDecvR1kNgUCGj4yHN3UKh5bUnixBH7BLy',_binary '','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODE0MDc3NTJ9.1HrP4nmiqbTuMo2Zsitoa8GNtigYohcujK_Fg-u0IIkmktdRf2BdKN2rWS5ih4Sd0Weayq0xW3Bn6OOshzWRIw',_binary '\0',_binary '\0'),(9,'2023-04-06 19:54:59.831209','2023-04-06 19:55:09.986696','ROLE_USER',_binary '\0',_binary '','seoda0000@gmail.com',_binary '\0','1',_binary '\0','Dakyung Seo','$2a$10$e83h0QvoxLFaPl20QmI5n.Ov8LwfDOq1we7DZkE4XusSTYhsRjXce',_binary '','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODEzODMzMDl9.jQY0ucZ-lFTt1VC9APfH7L4D27GY27HN19ksizI8Lf-grPwW6JRIR86BZgF1dweq4j1f46VkefiCD_067NPF2g',_binary '\0',_binary '\0'),(11,'2023-04-06 19:58:54.927123','2023-04-06 19:58:54.927123','ROLE_USER',_binary '',_binary '\0','test@test.com',_binary '\0','1',_binary '','뚜벅초','$2a$10$BYQlUpCBUct2eoD4cMPG8O8Vi4Cs/Rf.o/9Jnc/OOd/6jpQ5bp2hO',_binary '\0',NULL,_binary '\0',_binary ''),(12,'2023-04-06 20:02:28.803093','2023-04-06 21:52:30.620386','ROLE_USER',_binary '',_binary '\0','test2@test.com',_binary '\0','1',_binary '','테스트','$2a$10$65LVUVS2zSghMZLPxkJJCuE1G90czBaxWKknVr8i57a7cjnxO5WNi',_binary '\0',NULL,_binary '\0',_binary ''),(13,'2023-04-06 20:06:16.757978','2023-04-06 20:07:35.290180','ROLE_USER',_binary '',_binary '\0','rkddmscks46@naver.com',_binary '\0','1',_binary '','이지수','$2a$10$pNeToNZpcIovMnzKYTZFw.K4xbGjo/pWtYtoiSuvrLeDX9KnyX55S',_binary '\0',NULL,_binary '\0',_binary ''),(15,'2023-04-06 21:59:15.178057','2023-04-06 23:33:04.955905','ROLE_USER',_binary '\0',_binary '\0','test@test',_binary '\0','1',_binary '\0','test','$2a$10$o7AKnCK4l5VGTQctd/S9O.D/J2n4s24LrDelfp0DJkmeI4HrYcTH.',_binary '\0',NULL,_binary '\0',_binary ''),(16,'2023-04-06 22:10:17.910213','2023-04-06 22:10:24.713823','ROLE_USER',_binary '',_binary '\0','ahk0702@naver.com',_binary '\0','1',_binary '','안희경','$2a$10$EOA9VSLE9.sjH/CzAa3BqefZTRtUrM0FcHXcW3RReCcUNTutAg7GG',_binary '','eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODEzOTE0MjR9.Rze7XagAFgBd5z0XKFERTd_LMobX6146fi1MjPcFaLMZz0nDr54IvAEElqxmvNZiCS-o7VvSlgBVaCQmlg4ZFg',_binary '\0',_binary '\0'),(17,'2023-04-07 00:52:34.090620','2023-04-07 01:01:10.161718','ROLE_USER',_binary '',_binary '\0','ssafy2@naver.com',_binary '','1',_binary '\0','ssafy','$2a$10$dwyAyaiKpX0xHBX0h1JCPup4JP4oPCeNQJUc/XhBgPpdUxE3xM.8y',_binary '',NULL,_binary '\0',_binary '\0'),(18,'2023-04-07 01:42:24.725373','2023-04-07 01:47:38.172331','ROLE_USER',_binary '',_binary '','bohodays0316@gmail.com',_binary '\0','1',_binary '\0','박중원','$2a$10$t89vaR3rS3PvvNZQQWRHW.knCiZg0GbTSZ3ioEekzs0ktd0jV0BAy',_binary '',NULL,_binary '\0',_binary '\0'),(19,'2023-04-07 01:52:02.809867','2023-04-07 02:09:18.881555','ROLE_USER',_binary '',_binary '\0','once@naver.com',_binary '\0','1',_binary '','once','$2a$10$PDJirJ1WmuW5OeZQOtDcA.sGq2fyIJzmgmH0XZdfLXtJhnc7icN6G',_binary '\0',NULL,_binary '\0',_binary ''),(20,'2023-04-07 01:54:34.151123','2023-04-07 01:57:56.629842','ROLE_USER',_binary '',_binary '\0','oncepjw2147@gmail.com',_binary '\0','1',_binary '','첫새싹','$2a$10$apHuRf0Lkd/57CHRE59/beTBYFn/Ky588F6yZLTDRLbF35Mb5dMwu',_binary '\0',NULL,_binary '\0',_binary '');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07  3:19:15
