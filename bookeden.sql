-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: bookeden_db
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

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
-- Table structure for table `author_book`
--

DROP TABLE IF EXISTS `author_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `author_book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id_idx` (`author_id`),
  KEY `book_id_idx` (`book_id`),
  CONSTRAINT `author_id_` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`),
  CONSTRAINT `book_id_` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author_book`
--

LOCK TABLES `author_book` WRITE;
/*!40000 ALTER TABLE `author_book` DISABLE KEYS */;
/*!40000 ALTER TABLE `author_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'J.R.R. Tolkien'),(2,'Gabriel Garcia Marquez'),(3,'Anabel Hernández'),(4,'Jorge Luis Borges'),(5,'Julio Cortázar'),(6,'William Shakespeare'),(7,'Franz Kafka'),(8,'James Joyce'),(9,'Philip K. Dick'),(10,'Paulo Coelho'),(11,'William Butler Yeats'),(12,'Fiódor Dostoievski'),(13,'Haruki Murakami'),(14,'Charles Dickens'),(15,'Aldous Huxley'),(16,'Ernest Hemmingway'),(17,'Truman Capote'),(18,'Marcel Proust'),(19,'Charles Darwin'),(20,'Mary Wollstonecraft'),(21,'Virginia Woolf'),(22,'Simone de Beauvoir'),(23,'Roald Dahl'),(24,'Herman Melville'),(25,'Dante Alighieri'),(26,'Stephen King'),(27,'Margaret Atwood'),(28,'Jane Austen'),(29,'Isabel Allende'),(30,'Ernesto Sábato'),(31,'Pedro Pérez'),(32,'Pedro Pérez'),(33,'Pedro Pérez'),(34,''),(35,'J.K Rowling'),(36,'WayneDyer'),(37,'Jules Verne'),(38,'Anne Rice'),(39,'Homero'),(40,'María Ángeles Anglada');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `author_id` int(11) NOT NULL,
  `publisher_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `format_id` int(11) NOT NULL,
  `price` decimal(5,1) NOT NULL,
  `description` text NOT NULL,
  `discount` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `avatar` varchar(45) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `release_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id_idx` (`author_id`),
  KEY `publisher_id_idx` (`publisher_id`),
  KEY `format_id_idx` (`format_id`),
  KEY `language_id_idx` (`language_id`),
  KEY `categories_id_idx` (`category_id`),
  KEY `genre_id_idx` (`genre_id`),
  CONSTRAINT `author_id` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `genres` (`id`),
  CONSTRAINT `format_id` FOREIGN KEY (`format_id`) REFERENCES `format` (`id`),
  CONSTRAINT `genre_id` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`),
  CONSTRAINT `language_id` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`),
  CONSTRAINT `publisher_id` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (2,'El Traidor. El Diario Secreto del Hijo del Mayo    ',3,3,1,4,1331.9,'El traidor es uno de los trabajos periodísticos más ambiciosos en la trayectoria de Anabel Hernández. Su historia se remonta a enero de 2011, cuando la contactó uno de los abogados de Vicente Zambada Niebla, mejor conocido como Vicentillo, quien enfrentaba un juicio en una corte de Chicago. La intención era compartir con la periodista documentos y hechos que ampliaban y esclarecían varios de los episodios que acababa de dar a conocer en Los señores del narco. Entre los documentos a los que tuvo acceso se encuentran el inquietante autorretrato como payaso que aparece en la portada y los diarios realizados por Vicentillo durante las negociaciones para colaborar con el gobierno norteamericano, los cuales hasta ahora eran secretos. En ellos el capo reconstruyó su historia y la historia de una de las organizaciones de tráfico de estupefacientes más grandes del planeta. A lo largo de estas páginas, la autora se adentra en el Cártel de Sinaloa a través del relato de Vicentillo, quien exhibe de manera descarnada cómo funciona el sistema interno que da vida a la organización criminal, la violencia, las mil formas de traficar droga y la complicidad entre políticos, empresarios y fuerzas del orden. Pero sobre todo devela el perfil de quien durante el último medio siglo ha sido el rey del narcotráfico. Quien nunca ha pisado la cárcel y quien desde su trono ha visto caer a amigos, enemigos, socios, competidores, familiares, empleados del gobierno y hasta sus propios hijos, sin que eso haga mella en su poder, el padre de Vicentillo: Ismael el Mayo Zambada.',15,3,1,'nov1.jpg',2,'0000-00-00 00:00:00'),(3,'El Traidor. El Diario Secreto del Hijo del Mayo',3,3,2,2,1331.6,'El traidor es uno de los trabajos periodísticos más ambiciosos en la trayectoria de Anabel Hernández. Su historia se remonta a enero de 2011, cuando la contactó uno de los abogados de Vicente Zambada Niebla, mejor conocido como Vicentillo, quien enfrentaba un juicio en una corte de Chicago. La intención era compartir con la periodista documentos y hechos que ampliaban y esclarecían varios de los episodios que acababa de dar a conocer en Los señores del narco. Entre los documentos a los que tuvo acceso se encuentran el inquietante autorretrato como payaso que aparece en la portada y los diarios realizados por Vicentillo durante las negociaciones para colaborar con el gobierno norteamericano, los cuales hasta ahora eran secretos. En ellos el capo reconstruyó su historia y la historia de una de las organizaciones de tráfico de estupefacientes más grandes del planeta. A lo largo de estas páginas, la autora se adentra en el Cártel de Sinaloa a través del relato de Vicentillo, quien exhibe de manera descarnada cómo funciona el sistema interno que da vida a la organización criminal, la violencia, las mil formas de traficar droga y la complicidad entre políticos, empresarios y fuerzas del orden. Pero sobre todo devela el perfil de quien durante el último medio siglo ha sido el rey del narcotráfico. Quien nunca ha pisado la cárcel y quien desde su trono ha visto caer a amigos, enemigos, socios, competidores, familiares, empleados del gobierno y hasta sus propios hijos, sin que eso haga mella en su poder, el padre de Vicentillo: Ismael el Mayo Zambada.',5,3,1,'nov1.jpg',2,'0000-00-00 00:00:00'),(4,'El Traidor. El Diario Secreto del Hijo del Mayo',3,3,2,2,1331.6,'El traidor es uno de los trabajos periodísticos más ambiciosos en la trayectoria de Anabel Hernández. Su historia se remonta a enero de 2011, cuando la contactó uno de los abogados de Vicente Zambada Niebla, mejor conocido como Vicentillo, quien enfrentaba un juicio en una corte de Chicago. La intención era compartir con la periodista documentos y hechos que ampliaban y esclarecían varios de los episodios que acababa de dar a conocer en Los señores del narco. Entre los documentos a los que tuvo acceso se encuentran el inquietante autorretrato como payaso que aparece en la portada y los diarios realizados por Vicentillo durante las negociaciones para colaborar con el gobierno norteamericano, los cuales hasta ahora eran secretos. En ellos el capo reconstruyó su historia y la historia de una de las organizaciones de tráfico de estupefacientes más grandes del planeta. A lo largo de estas páginas, la autora se adentra en el Cártel de Sinaloa a través del relato de Vicentillo, quien exhibe de manera descarnada cómo funciona el sistema interno que da vida a la organización criminal, la violencia, las mil formas de traficar droga y la complicidad entre políticos, empresarios y fuerzas del orden. Pero sobre todo devela el perfil de quien durante el último medio siglo ha sido el rey del narcotráfico. Quien nunca ha pisado la cárcel y quien desde su trono ha visto caer a amigos, enemigos, socios, competidores, familiares, empleados del gobierno y hasta sus propios hijos, sin que eso haga mella en su poder, el padre de Vicentillo: Ismael el Mayo Zambada.',5,3,1,'nov1.jpg',2,'0000-00-00 00:00:00'),(15,'Normal People',3,3,2,3,999.2,'Connell and Marianne grow up in the same small town in the west of Ireland, but the similarities end there. In school, Connell is popular and well-liked, while Marianne is a loner. But when the two strike up a conversation - awkward but electrifying - something life-changing begins. Normal People is a story of mutual fascination, friendship and love. It takes us from that first conversation to the years beyond, in the company of two people who try to stay apart but find they can\'t.',0,2,2,'nov4.jpg',4,'0000-00-00 00:00:00'),(16,'Normal People',3,3,2,3,999.2,'Connell and Marianne grow up in the same small town in the west of Ireland, but the similarities end there. In school, Connell is popular and well-liked, while Marianne is a loner. But when the two strike up a conversation - awkward but electrifying - something life-changing begins. Normal People is a story of mutual fascination, friendship and love. It takes us from that first conversation to the years beyond, in the company of two people who try to stay apart but find they can\'t.',0,2,2,'nov4.jpg',4,'0000-00-00 00:00:00'),(17,'Normal People',3,3,2,3,999.2,'Connell and Marianne grow up in the same small town in the west of Ireland, but the similarities end there. In school, Connell is popular and well-liked, while Marianne is a loner. But when the two strike up a conversation - awkward but electrifying - something life-changing begins. Normal People is a story of mutual fascination, friendship and love. It takes us from that first conversation to the years beyond, in the company of two people who try to stay apart but find they can\'t.',0,2,2,'nov4.jpg',4,'0000-00-00 00:00:00'),(18,'Los trucos de los ricos',3,3,2,3,1856.1,'Nadie nos enseña los trucos para, legalmente, incrementar nuestro patrimonio y ponerlo a resguardo de Hacienda. Pero existir, existen. Y los más ricos, bien asesorados, los utilizan para maximizar su patrimonio y minimizar los impuestos a pagar. Y, también, para evitar que en un golpe de mala fortuna bancos o acreedores puedan quedarse con lo acumulado a base de esfuerzo y trabajo. En este libro, el experto en inversión Juan Haro nos explica una serie de fórmulas prácticas y sencillas para que nosotros también podamos multiplicar nuestros ahorros y proteger lo que es nuestro. Para ello, conoceremos nuevas formas para la creación de sociedades y cómo afectan a la vulnerabilidad del patrimonio, descubriremos nuevas herramientas de inversión y conoceremos de primera mano un sinfín de trucos para ahorrar en nuestra declaración de la renta.',10,4,4,'nov8.jpg',7,'0000-00-00 00:00:00'),(19,'Los trucos de los ricos',3,3,2,3,1856.1,'Nadie nos enseña los trucos para, legalmente, incrementar nuestro patrimonio y ponerlo a resguardo de Hacienda. Pero existir, existen. Y los más ricos, bien asesorados, los utilizan para maximizar su patrimonio y minimizar los impuestos a pagar. Y, también, para evitar que en un golpe de mala fortuna bancos o acreedores puedan quedarse con lo acumulado a base de esfuerzo y trabajo. En este libro, el experto en inversión Juan Haro nos explica una serie de fórmulas prácticas y sencillas para que nosotros también podamos multiplicar nuestros ahorros y proteger lo que es nuestro. Para ello, conoceremos nuevas formas para la creación de sociedades y cómo afectan a la vulnerabilidad del patrimonio, descubriremos nuevas herramientas de inversión y conoceremos de primera mano un sinfín de trucos para ahorrar en nuestra declaración de la renta.',10,4,4,'nov8.jpg',7,'0000-00-00 00:00:00'),(20,'Los trucos de los ricos',3,3,2,3,1856.1,'Nadie nos enseña los trucos para, legalmente, incrementar nuestro patrimonio y ponerlo a resguardo de Hacienda. Pero existir, existen. Y los más ricos, bien asesorados, los utilizan para maximizar su patrimonio y minimizar los impuestos a pagar. Y, también, para evitar que en un golpe de mala fortuna bancos o acreedores puedan quedarse con lo acumulado a base de esfuerzo y trabajo. En este libro, el experto en inversión Juan Haro nos explica una serie de fórmulas prácticas y sencillas para que nosotros también podamos multiplicar nuestros ahorros y proteger lo que es nuestro. Para ello, conoceremos nuevas formas para la creación de sociedades y cómo afectan a la vulnerabilidad del patrimonio, descubriremos nuevas herramientas de inversión y conoceremos de primera mano un sinfín de trucos para ahorrar en nuestra declaración de la renta.',10,4,4,'nov8.jpg',7,'0000-00-00 00:00:00'),(21,'aaaaaaa',2,2,2,3,100.0,'aaaaaaaaaaaaaaaaaaa',2,3,3,'image-1592600083608.jpg',17,'0000-00-00 00:00:00');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_products`
--

DROP TABLE IF EXISTS `cart_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id_idx` (`cart_id`),
  KEY `book_id_idx` (`book_id`),
  CONSTRAINT `book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_products`
--

LOCK TABLES `cart_products` WRITE;
/*!40000 ALTER TABLE `cart_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Últimas novedades'),(2,'Más vendidos'),(3,'Mejores vendidos'),(4,'Libros destacados en español'),(5,'Destacado');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `format`
--

DROP TABLE IF EXISTS `format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `format` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `format`
--

LOCK TABLES `format` WRITE;
/*!40000 ALTER TABLE `format` DISABLE KEYS */;
INSERT INTO `format` VALUES (1,'CD-Audio'),(2,'Hardback'),(3,'Paperback'),(4,'eBook');
/*!40000 ALTER TABLE `format` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Arte y Fotografía'),(2,'Filosofía y psicología'),(3,'Ficción'),(4,'Literatura'),(5,'Biografias'),(6,'Religión'),(7,'Comunicación'),(8,'Cocina'),(9,'Computación e informática'),(10,'Deportes'),(11,'Biologia'),(12,'Humanidades'),(13,'Infantiles'),(14,'Derecho'),(15,'Medicina'),(16,'Viajes y vacaciones'),(17,'Historia'),(18,'Humor'),(19,'Policiales'),(20,'Romance');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'English'),(2,'Spanish');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publisher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (1,'Gredos'),(2,'longseller'),(3,'Anabel Hernández'),(4,'Salamandra'),(5,''),(6,''),(7,''),(8,'Zeta'),(9,'Andrés Bello'),(10,'CorSair');
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `avatar` varchar(45) NOT NULL,
  `isAdmin` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Juan','Manuel','Juan@gmail.com','$2b$10$egkdXtSvxbQddcU.Qpsyi.BhoDQpdjeWhKpMQFDDpRaCfwLusC/We','avatar-1593282138037.png','0'),(4,'Juan','Manuel','juan@gmail.com','$2b$10$5ST8zmNo8iKcXZ1RezAYze1qqjJAw05WIUbnANQ9LiOeHOu7XVkrO','avatar-1593282362379.jpg','0'),(5,'Mayra','Rincones','mayra@gmail.com','$2b$10$MAIGqrzAbtrQlCcK.8K0t.NmLB0L34oCAqLYJ56zjRWd0ALktwGeK','avatar-1593282824577.jpg','1'),(6,'Alejo','Sammet','alejo@gmail.com','$2b$10$EzIPaaoHysieKw6Gca5StedSiQtW8.36hZ7rMpGr1f8/FE4gmL4Xq','avatar-1593283405337.jpg','0'),(7,'Alejo','Sammet','alejo@gmail.com','$2b$10$6tzSlV.qNfY9j0Hxxjdyb.PZj5UbCxYRQ0FQO/8Ihl82xhCAXjFVG','avatar-1593283535548.jpg','0'),(8,'Costi','Perret','costi@gmail.com','$2b$10$EI6EP2xQUtsnsWuaA1JmZ.s0TYYGyepcTO/5FW.4W7QSBi8pbdYkq','avatar-1593545137818.jpg','0'),(9,'Costi','Perret','costi@gmail.com','$2b$10$aBzM0KCm.BJiutzwEUn3cOzxH2Ie9gUYLWk2tKzz7M74i5cimIYsK','avatar-1593545295296.jpg','0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-01 14:32:04
