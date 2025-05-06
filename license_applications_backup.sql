-- MySQL dump 10.13  Distrib 9.3.0, for macos14.7 (x86_64)
--
-- Host: localhost    Database: licensing_portal
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `license_applications`
--

DROP TABLE IF EXISTS `license_applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `license_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `license_type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'draft',
  `application_date` datetime NOT NULL,
  `review_date` datetime DEFAULT NULL,
  `documents` json NOT NULL,
  `notes` text,
  `personal_info` json NOT NULL,
  `education` json NOT NULL,
  `review_notes` json NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `application_number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `application_number` (`application_number`),
  UNIQUE KEY `application_number_2` (`application_number`),
  UNIQUE KEY `application_number_3` (`application_number`),
  UNIQUE KEY `application_number_4` (`application_number`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `license_applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `license_applications`
--

LOCK TABLES `license_applications` WRITE;
/*!40000 ALTER TABLE `license_applications` DISABLE KEYS */;
INSERT INTO `license_applications` VALUES (1,2,'PE001','submitted','2025-05-03 21:52:09',NULL,'[]',NULL,'{\"ssn\": \"\", \"city\": \"\", \"email\": \"default@example.com\", \"phone\": \"0000000000\", \"state\": \"\", \"gender\": \"prefer_not_to_say\", \"address\": \"\", \"zipCode\": \"\", \"lastName\": \"\", \"firstName\": \"\", \"citizenship\": \"not_specified\", \"dateOfBirth\": \"2025-05-03T21:52:09.753Z\", \"immigrationNumber\": \"\", \"immigrationStatus\": \"not_applicable\"}','[{\"gpa\": 0, \"field\": \"\", \"major\": \"\", \"minor\": \"\", \"degree\": \"\", \"honors\": \"\", \"thesis\": \"\", \"credits\": 0, \"institution\": \"\", \"graduationYear\": 0}]','[]','2025-05-03 21:52:09','2025-05-03 21:52:09',''),(2,2,'PE001','submitted','2025-05-03 22:06:11',NULL,'[]',NULL,'{\"ssn\": \"\", \"city\": \"\", \"email\": \"default@example.com\", \"phone\": \"0000000000\", \"state\": \"\", \"gender\": \"prefer_not_to_say\", \"address\": \"\", \"zipCode\": \"\", \"lastName\": \"\", \"firstName\": \"\", \"citizenship\": \"not_specified\", \"dateOfBirth\": \"2025-05-03T22:06:10.990Z\", \"immigrationNumber\": \"\", \"immigrationStatus\": \"not_applicable\"}','[{\"gpa\": 0, \"field\": \"\", \"major\": \"\", \"minor\": \"\", \"degree\": \"\", \"honors\": \"\", \"thesis\": \"\", \"credits\": 0, \"institution\": \"\", \"graduationYear\": 0}]','[]','2025-05-03 22:06:11','2025-05-03 22:06:11','APP-1746309971039-2397'),(3,2,'PE001','submitted','2025-05-03 22:06:51',NULL,'[]',NULL,'{\"ssn\": \"Veniam soluta rerum\", \"city\": \"Incidunt proident \", \"email\": \"saqidoly@mailinator.com\", \"phone\": \"+1 (606) 308-6093\", \"state\": \"Vero voluptatem ut v\", \"gender\": \"prefer_not_to_say\", \"address\": \"Id rerum vero delen\", \"zipCode\": \"61677\", \"lastName\": \"Campbell\", \"firstName\": \"Harriet\", \"citizenship\": \"not_specified\", \"dateOfBirth\": \"2025-05-03T22:06:51.366Z\", \"immigrationNumber\": \"255\", \"immigrationStatus\": \"not_applicable\"}','[{\"gpa\": 0, \"field\": \"Alias illo rerum lab\", \"major\": \"Odit eligendi anim q\", \"minor\": \"Omnis ut itaque nequ\", \"degree\": \"Consequatur molestia\", \"honors\": \"Quod saepe eum ut qu\", \"thesis\": \"Sint sint rerum volu\", \"credits\": 21, \"institution\": \"Dolor vel nulla odio\", \"graduationYear\": 1992}]','[]','2025-05-03 22:06:51','2025-05-03 22:06:51','APP-1746310011429-9403');
/*!40000 ALTER TABLE `license_applications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-04  3:45:32
