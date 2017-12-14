-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: localhost    Database: introdbmp
-- ------------------------------------------------------
-- Server version	5.7.20-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name_first` varchar(45) NOT NULL,
  `name_last` varchar(45) NOT NULL,
  `name_midd` varchar(45) DEFAULT NULL,
  `gender` int(1) NOT NULL,
  `nationality` varchar(45) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(45) NOT NULL,
  `contact0_area_code` varchar(45) NOT NULL,
  `contact0_num` varchar(45) NOT NULL,
  `contact1_area_code` varchar(45) DEFAULT NULL,
  `contact1_num` varchar(45) DEFAULT NULL,
  `passport_num` varchar(45) NOT NULL,
  `passport_country_of_issue` varchar(45) NOT NULL,
  `passport_exp_date` date NOT NULL,
  `card_num` varchar(45) NOT NULL,
  `card_val_num` varchar(45) NOT NULL,
  `card_exp` date NOT NULL,
  `card_name_first` varchar(45) NOT NULL,
  `card_name_last` varchar(45) NOT NULL,
  `card_address` varchar(90) NOT NULL,
  `card_zip` varchar(45) NOT NULL,
  `card_city` varchar(45) NOT NULL,
  `card_country` varchar(45) NOT NULL,
  `card_region` varchar(45) NOT NULL,
  `card_email` varchar(45) NOT NULL,
  `card_area_code` varchar(45) NOT NULL,
  `card_contact_num` varchar(45) NOT NULL,
  `create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='payment[0 = credit card, 1 = paypal]\n';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'Joseph','Joestar','Jojo',0,'Fantasy Person','1996-05-06','joseph_joestar@dlsu.edu.ph','+63','123-45-67','+63','123-45-67','123','Fantasy World','2020-05-06','123','123','9999-12-01','Joseph','Joestar','123 Street, Fantasy City','123','Fantasy City','Fantasy Country','Fantasy State','joseph_joestar@dlsu.edu.ph','+63','123-45-67','2017-12-14 17:30:31'),(2,'Jonathan','Joestar','Jojo',0,'Fantasy Person','1996-12-13','jonathan_joestar@dlsu.edu.ph','+63','123-45-67','+63','123-45-67','123','Fantasy Country','2019-05-06','123','123','9999-12-01','Jonathan','Joestar','123 Street, Fantasy City','123','Fantasy City','Fantasy Country','Fantasy State','jonathan_joestar@dlsu.edu.ph','+63','123-45-67','2017-12-14 17:36:27'),(3,'Josuke','Higashikata','Jojo',0,'Fantasy Person','1995-05-06','josuke_higashikata@dlsu.edu.ph','+63','123-45-67','+63','123-45-67','123','Fantasy Country','2019-12-20','123','123','9999-12-01','Josuke','Higashikata','123 Street, Fantasy City','123','Fantasy City','Fantasy Country','Fantasy State','josuke_higashikata@dlsu.edu.ph','+63','123-45-67','2017-12-14 17:41:00'),(4,'Dio','Brando','Jojo',0,'Fantasy Person','1994-05-06','dio_brando@dlsu.edu.ph','+63','123-45-67','+63','123-45-67','123','ZA WARUDO','2019-12-31','123','123','9999-12-01','Dio','Brando','123 Street, Fantasy City','123','Fantasy City','ZA WARUDO','Fantasy State','dio_brando@dlsu.edu.ph','+63','123-45-67','2017-12-14 17:48:12'),(5,'Gordon','Ramsay','James',0,'Scotish','1966-11-08','gordon_ramsay@dlsu.edu.ph','+63','123-45-67','+63','123-45-67','123','Scotland','2020-12-12','123','123','9999-12-01','Gordon','Ramsay','123 Street, Somewhere in Scotland, I don\'t know man','123','One of Scotland\'s Cities','Scotland','One of Scotland\'s States','gordon_ramsay@dlsu.edu.ph','+63','123-45-67','2017-12-14 17:52:36');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `flight_id` int(10) NOT NULL,
  `account_id` int(10) DEFAULT NULL,
  `seat` varchar(4) NOT NULL,
  `bag_meal_auth` int(1) NOT NULL DEFAULT '0',
  `cost` float NOT NULL,
  `cost_tax` float NOT NULL,
  `cost_flight_charge` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='!flight_id_return ? one-way : round-trip/multi-city\n\nbag_meal_auth[0 = fly, 1 = fly+bag, 2 = fly+bag+meal]';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (0000000001,1,1,'A1',1,10500,550,1000),(0000000002,1,2,'B1',1,10500,550,1000),(0000000003,1,2,'B2',1,10500,550,1000),(0000000004,1,2,'B3',1,10500,550,1000),(0000000005,2,2,'A1',2,11500,500,1000),(0000000006,2,2,'A2',2,11500,500,1000),(0000000007,2,2,'A3',2,11500,500,1000),(0000000008,2,3,'A5',2,11500,500,1000),(0000000009,2,3,'B6',2,11500,500,1000),(0000000010,2,3,'A6',2,11500,500,1000),(0000000011,2,3,'B5',2,11500,500,1000),(0000000012,2,3,'A4',2,11500,500,1000),(0000000013,2,3,'B4',2,11500,500,1000),(0000000014,5,3,'A6',2,11400,530,1000),(0000000015,5,3,'A5',2,11400,530,1000),(0000000016,5,3,'A4',2,11400,530,1000),(0000000017,5,3,'B4',2,11400,530,1000),(0000000018,5,3,'B5',2,11400,530,1000),(0000000019,5,3,'B6',2,11400,530,1000),(0000000020,3,4,'A1',1,9500,400,1000),(0000000021,3,4,'A2',1,9500,400,1000),(0000000022,5,5,'A1',2,11400,530,1000),(0000000023,5,5,'A2',2,11400,530,1000),(0000000024,5,5,'A3',2,11400,530,1000);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credential`
--

DROP TABLE IF EXISTS `credential`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credential` (
  `account_id` int(10) NOT NULL,
  `password` varchar(16) NOT NULL,
  `last_log` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credential`
--

LOCK TABLES `credential` WRITE;
/*!40000 ALTER TABLE `credential` DISABLE KEYS */;
INSERT INTO `credential` VALUES (1,'123123','2017-12-14 17:30:49','2017-12-14 17:30:49'),(2,'123123','2017-12-14 17:36:39','2017-12-14 17:36:39'),(3,'123123','2017-12-14 17:41:16','2017-12-14 17:41:15'),(4,'123123','2017-12-14 17:48:23','2017-12-14 17:48:23'),(5,'123123','2017-12-14 17:52:49','2017-12-14 17:52:49');
/*!40000 ALTER TABLE `credential` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight`
--

DROP TABLE IF EXISTS `flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flight` (
  `id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `from` varchar(45) NOT NULL,
  `to` varchar(45) NOT NULL,
  `depart` datetime NOT NULL,
  `fare_seat` float NOT NULL,
  `fare_baggage` float DEFAULT NULL,
  `fare_meal` float DEFAULT NULL,
  `tax` float NOT NULL,
  `flight_charge` float NOT NULL,
  `create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='fare:\n	null = not available.\n	meal needs baggage to be available.\n	seat is always available, otherwise flight should not be created.\n\n*total passenger is taken from ''book'' table.\n*max passenger does not necessarily need to be the same as ''aircraft'' capacity.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight`
--

LOCK TABLES `flight` WRITE;
/*!40000 ALTER TABLE `flight` DISABLE KEYS */;
INSERT INTO `flight` VALUES (0000000001,'Manila','Singapore','2018-12-13 07:30:00',9500,10500,11000,550,1000,'2017-12-13 18:15:38'),(0000000002,'Singapore','Manila','2018-12-15 15:30:00',9000,10000,11500,500,1000,'2017-12-13 18:15:38'),(0000000003,'Singapore','Beijing','2018-12-18 12:30:00',8000,9500,10000,400,1000,'2017-12-13 18:15:38'),(0000000004,'Beijing','Manila','2018-12-16 11:30:00',9400,10200,10700,540,1000,'2017-12-13 18:15:38'),(0000000005,'Manila','Hong Kong','2018-12-20 07:45:00',9300,10900,11400,530,1000,'2017-12-13 18:15:38');
/*!40000 ALTER TABLE `flight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `record` (
  `create` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `scope_from` date NOT NULL,
  `scope_to` date NOT NULL,
  `acc_new` int(11) NOT NULL,
  `acc_reg` int(11) NOT NULL,
  `acc_act` int(11) NOT NULL,
  `acc_all` int(11) NOT NULL,
  `fli_new` int(11) NOT NULL,
  `fli_act` int(11) NOT NULL,
  `fli_all` int(11) NOT NULL,
  `visited` varchar(45) NOT NULL,
  `immigrant` varchar(45) NOT NULL,
  `income` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record`
--

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;
INSERT INTO `record` VALUES ('2017-12-14 17:53:08','2017-05-06','2018-05-06',5,5,5,5,5,4,5,'Manila','Singapore',0),('2017-12-14 17:53:25','2017-03-07','2017-12-13',0,0,0,0,0,0,0,'None','None',0),('2017-12-14 17:54:14','2017-01-05','2017-12-14',0,0,0,0,5,4,5,'Manila','Singapore',0),('2017-12-14 17:54:42','2017-12-31','2018-12-31',0,0,0,5,0,0,5,'None','None',303370),('2017-12-14 17:55:08','2018-12-01','2018-12-17',0,0,0,5,0,0,5,'None','None',165200),('2017-12-14 17:55:28','2018-12-17','2018-12-20',0,0,0,5,0,0,5,'None','None',21800);
/*!40000 ALTER TABLE `record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-14 18:33:55
