-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: introdbmp
-- ------------------------------------------------------
-- Server version	5.7.19-log

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
-- Current Database: `introdbmp`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `introdbmp` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `introdbmp`;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gender` int(1) NOT NULL,
  `name_first` varchar(45) NOT NULL,
  `name_midd` varchar(45) DEFAULT NULL,
  `name_last` varchar(45) NOT NULL,
  `birthdate` date NOT NULL,
  `nationality` varchar(45) NOT NULL,
  `ofw_num` varchar(45) DEFAULT NULL,
  `passport_num` varchar(45) DEFAULT NULL,
  `passport_country_of_issue` varchar(45) DEFAULT NULL,
  `passport_exp_date` date DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `contact0_country_code` int(11) NOT NULL,
  `contact0_area_code` int(11) NOT NULL,
  `contact0_num` int(11) NOT NULL,
  `contact1_country_code` int(11) NOT NULL,
  `contact1_area_code` int(11) NOT NULL,
  `contact1_num` int(11) NOT NULL,
  `payment` int(1) NOT NULL DEFAULT '0',
  `card_num` varchar(45) DEFAULT NULL,
  `card_val_num` varchar(45) DEFAULT NULL,
  `card_exp` date DEFAULT NULL,
  `card_name_first` varchar(45) DEFAULT NULL,
  `card_name_last` varchar(45) DEFAULT NULL,
  `card_address` varchar(90) DEFAULT NULL,
  `card_zip` varchar(45) DEFAULT NULL,
  `card_country` varchar(45) DEFAULT NULL,
  `card_region` varchar(45) DEFAULT NULL,
  `card_email` varchar(45) DEFAULT NULL,
  `card_country_code` varchar(45) DEFAULT NULL,
  `card_area_code` varchar(45) DEFAULT NULL,
  `card_contact_num` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='payment[0 = credit card, 1 = paypal]\n';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aircraft`
--

DROP TABLE IF EXISTS `aircraft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aircraft` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pilot_id` int(11) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircraft`
--

LOCK TABLES `aircraft` WRITE;
/*!40000 ALTER TABLE `aircraft` DISABLE KEYS */;
/*!40000 ALTER TABLE `aircraft` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `flight_id` int(11) NOT NULL,
  `account_id` int(11) DEFAULT NULL,
  `account_parent_id` int(11) DEFAULT NULL,
  `seat_loc` varchar(4) NOT NULL,
  `type` int(1) NOT NULL DEFAULT '0',
  `authority` int(1) NOT NULL DEFAULT '0',
  `cost` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='type[0 = one-way, 1 = round-trip, 2 = multi-city]\nauthority[0 = fly, 1 = fly+bag, 2 = fly+bag+meal]';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flight`
--

DROP TABLE IF EXISTS `flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flight` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `aircraft_id` int(11) DEFAULT NULL,
  `from` varchar(45) NOT NULL,
  `to` varchar(45) NOT NULL,
  `depart` datetime NOT NULL,
  `return` datetime DEFAULT NULL,
  `passenger_max` int(11) NOT NULL,
  `fare_seat` float NOT NULL,
  `fare_baggage` float DEFAULT NULL,
  `fare_meal` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='fare:\n	null = not available.\n	meal needs baggage to be available.\n	seat is always available, otherwise flight should not be created.\n\n*total passenger is taken from ''book'' table.\n*max passenger does not necessarily need to be the same as ''aircraft'' capacity.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flight`
--

LOCK TABLES `flight` WRITE;
/*!40000 ALTER TABLE `flight` DISABLE KEYS */;
/*!40000 ALTER TABLE `flight` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-19  3:20:46
