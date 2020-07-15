-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bookeden
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `author_book`
--

DROP TABLE IF EXISTS `author_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author_book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `book_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `author_id_idx` (`author_id`),
  KEY `book_id_idx` (`book_id`),
  CONSTRAINT `author_id_` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`),
  CONSTRAINT `book_id_` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'J.R.R. Tolkien'),(2,'Gabriel Garcia Marquez'),(3,'Anabel Hernández'),(4,'Jorge Luis Borges'),(5,'Julio Cortázar'),(6,'William Shakespeare'),(7,'Franz Kafka'),(8,'James Joyce'),(9,'Philip K. Dick'),(10,'Paulo Coelho'),(11,'William Butler Yeats'),(12,'Fiódor Dostoievski'),(13,'Haruki Murakami'),(14,'Charles Dickens'),(15,'Aldous Huxley'),(16,'Ernest Hemmingway'),(17,'Truman Capote'),(18,'Marcel Proust'),(19,'Charles Darwin'),(20,'Mary Wollstonecraft'),(21,'Virginia Woolf'),(22,'Simone de Beauvoir'),(23,'Roald Dahl'),(24,'Herman Melville'),(25,'Dante Alighieri'),(26,'Stephen King'),(27,'Margaret Atwood'),(28,'Jane Austen'),(29,'Isabel Allende'),(30,'Ernesto Sábato'),(35,'J.K Rowling'),(36,'WayneDyer'),(37,'Jules Verne'),(38,'Anne Rice'),(39,'Homero'),(40,'María Ángeles Anglada'),(41,'Dross'),(42,'Miguel de Cervantes'),(43,'Benjamin Graham'),(56,'nuevo');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `author_id` int NOT NULL,
  `publisher_id` int NOT NULL,
  `language_id` int NOT NULL,
  `format_id` int NOT NULL,
  `price` decimal(5,1) NOT NULL,
  `description` text NOT NULL,
  `discount` int NOT NULL,
  `rating` int NOT NULL,
  `category_id` int NOT NULL,
  `avatar` varchar(45) NOT NULL,
  `genre_id` int NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (2,'El Traidor. El Diario Secreto del Hijo del Mayo     ',3,3,1,3,1331.9,'El traidor es uno de los trabajos periodísticos más ambiciosos en la trayectoria de Anabel Hernández. Su historia se remonta a enero de 2011, cuando la contactó uno de los abogados de Vicente Zambada Niebla, mejor conocido como Vicentillo, quien enfrentaba un juicio en una corte de Chicago. La intención era compartir con la periodista documentos y hechos que ampliaban y esclarecían varios de los episodios que acababa de dar a conocer en Los señores del narco. Entre los documentos a los que tuvo acceso se encuentran el inquietante autorretrato como payaso que aparece en la portada y los diarios realizados por Vicentillo durante las negociaciones para colaborar con el gobierno norteamericano, los cuales hasta ahora eran secretos. En ellos el capo reconstruyó su historia y la historia de una de las organizaciones de tráfico de estupefacientes más grandes del planeta. A lo largo de estas páginas, la autora se adentra en el Cártel de Sinaloa a través del relato de Vicentillo, quien exhibe de manera descarnada cómo funciona el sistema interno que da vida a la organización criminal, la violencia, las mil formas de traficar droga y la complicidad entre políticos, empresarios y fuerzas del orden. Pero sobre todo devela el perfil de quien durante el último medio siglo ha sido el rey del narcotráfico. Quien nunca ha pisado la cárcel y quien desde su trono ha visto caer a amigos, enemigos, socios, competidores, familiares, empleados del gobierno y hasta sus propios hijos, sin que eso haga mella en su poder, el padre de Vicentillo: Ismael el Mayo Zambada.',15,3,1,'nov1.jpg',2,'2020-01-21 00:00:00'),(3,'Harry Potter and the Philosopher\'s Stone',1,4,1,3,766.4,'Escape to Hogwarts with the unmissable series that has sparked a lifelong reading journey for children and families all over the world. The magic starts here.\r\nHarry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry\'s eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. The magic starts here!\r\nThese editions of the classic and internationally bestselling Harry Potter series feature thrilling jacket artwork by award-winning illustrator Jonny Duddle. They are the perfect starting point for anyone who\'s ready to lose themselves in the greatest children\'s story of all time.',5,3,2,'image-1594314842540.jpg',3,'2014-10-16 00:00:00'),(4,'CUENTOS',16,5,1,3,1099.0,'Esta edición recupera la recopilación que el propio Hemingway hizo de todos sus cuentos en 1938, conocida como Los cuarenta y nueve primeros cuentos, donde se encuentran relatos tan magistrales como \'Los asesinos\', \'Las nieves del Kilimanjaro\' y \'Padres e hijos\'. El mundo estético y moral de Hemingway se encuentra aquí destilado, seco, sobrio, cegador, latente. La caza, la pesca, el boxeo, la guerra, el alcohol, el deseo o la derrota son algunos de los materiales con que se construye esta obra cuyo aliento perdura con un vigor insospechado.',2,3,2,'image-1594315640973.png',21,'2012-06-08 00:00:00'),(5,'EL ALEPH',4,5,2,1,649.0,'La mayoría de los cuentos reunidos en este libro pertenecen al género fantástico. Algunos surgieron a partir de crónicas policiales, de pinturas o simplemente de la visión de algún conventillo; otro explora el efecto que la inmortalidad causaría en los hombres; hay una glosa al Martín Fierro, sueños sobre la identidad personal y fantasías del tiempo.\r\nEl cuento \'El Aleph\', publicado por primera vez en 1 945, aborda uno de los temas recurrentes en la literatura de Borges: el infinito. Porque en esa esfera resplandeciente confluyen de un modo asombroso todos los tiempos y todos los espacios.',2,3,4,'image-1594318639990.png',1,'2011-06-08 00:00:00'),(6,'El Libro Negro ',41,8,2,3,1060.5,'\"La vida puede ser una verdadera mierda para algunas, que no la mayoría de las personas. Sin embargo, por lo menos un par de veces, a lo largo y ancho de esa vida, ésta elige un día para demostrarnos qué tanto asco puede dar. Esto les pasa a todos y cada uno de los seres humanos que habitan en este mundo, caprichosos o no, malos o buenos, simples o excéntricos: todos tienen una probada de qué tan mal pueden salir las cosas durante veinticuatro horas. Y para mí, ese día parece que va a ser hoy.\" En los cuatro cuentos reunidos en este libro escabroso, Ángel David Revilla, alias Dross, nos revela detalles perturbadores de la deep web y que la vida jamás es lo que parece y que la existencia humana no es más que un recorte fugaz y lastimoso del universo. El universo se vuelve escalofriante cuando la vida se bifurca. Vuele Dross con su primer libro de cuentos.',0,3,4,'image-1594334732335.jpg',3,'2019-12-10 00:00:00'),(7,'Entrevista con el Vampiro',38,10,2,3,1449.6,'Posiblemente la más original historia de vampiros jamás escrita, Entrevista con el vampiro, primer volumen de la serie «Crónicas Vampíricas», es ya un clásico de nuestro tiempo.\r\n\r\n\r\n\r\nEsta es la historia de Louis, un joven de Nueva Orleans que, atormentado por un sentimiento de culpabilidad por la muerte de su hermano menor, se convierte en eterno habitante de la noche. Pero desde el comienzo de su nueva vida los sentimientos más humanos salen a su paso..., en especial el amor.\r\n\r\n\r\n\r\n«-Pero ¿cuánta tienes? -preguntó el vampiro, y se dio la vuelta para que el muchacho pudiera verle el perfil-. ¿Suficiente para la historia de una vida?\r\n\r\n\r\n\r\n-Desde luego, sí es una buena vida. A veces entrevisto hasta a tres o cuatro personas en una noche si tengo suerte. Pero tiene que ser una buena historia. Eso es justo, ¿no le parece?\r\n\r\n\r\n\r\n-Sumamente justo -contestó el vampiro-. Me gustaría contarte la historia de mi vida. Me gustaría mucho.»',0,3,5,'image-1594335529058.jpg',3,'2019-02-19 00:00:00'),(8,'A Christmas Carol  ',14,2,1,2,485.2,'In October 1843, Charles Dickens ― heavily in debt and obligated to his publisher ― began work on a book to help supplement his family\'s meager income. That volume, A Christmas Carol, has long since become one of the most beloved stories in the English language. As much a part of the holiday season as holly, mistletoe, and evergreen wreaths, this perennial favorite continues to delight new readers and rekindle thoughts of charity and goodwill.\r\nWith its characters exhibiting many qualities ― as well as failures ― often ascribed to Dickens himself, the imaginative and entertaining tale relates Ebenezer Scrooge\'s eerie encounters with a series of spectral visitors. Journeying with them through Christmases past, present, and future, he is ultimately transformed from an arrogant, obstinate, and insensitive miser to a generous, warmhearted, and caring human being. Written by one of England\'s greatest and most popular novelists, A Christmas Carol has come to epitomize the true meaning of Christmas.',15,3,1,'image-1594335759150.jpg',21,'1991-06-01 00:00:00'),(9,'Pobre gente  ',12,4,2,3,1434.7,'Makar Dévushkin lleva treinta años copiando documentos en un departamento administrativo de San Petersburgo y vive en la habitación más barata de una pensión, junto a la cocina. A través de la ventana ve, sin embargo, a la joven Varvara, pariente lejana suya, que es toda su alegría. Varvara, huérfana, sin dinero ni posición, ha huido de una pariente agriada y maquiavélica e intenta ganarse la vida bordando. Varvara y Makar se cartean, se prestan dinero y libros, comparten decepciones y pequeñas alegrías. Son pobres e insignificantes, pero tienen amor propio y llegan a ver en las cartas que se escriben –en la literatura– una forma de dignidad.',0,3,1,'image-1594336237686.jpg',21,'2019-05-14 00:00:00'),(39,'Rayuela',5,5,2,3,1510.9,'La obra maestra de Julio Cortázar. Una novela que conmocionó el panorama cultural de su tiempo y marcó un hito insoslayable dentro de la narrativa contemporánea.\r\n\r\n«Contranovela», «crónica de una locura», «el agujero negro de un enorme embudo», «un feroz sacudón por las solapas», «un grito de alerta», «una especie de bomba atómica», «una llamada al desorden necesario», «una gigantesca humorada», «un balbuceo».\r\n\r\nCon estas y otras expresiones se aludió a Rayuela tras su aparición en 1963. Sin duda, la publicación de la novela conmocionó el panorama cultural de su tiempo y supuso una verdadera revolución en la narrativa en lengua castellana: por primera vez un escritor llevaba hasta las últimas consecuencias la voluntad de transgredir el orden tradicional de una historia y el lenguaje para contarla.\r\n\r\nPlena de ambición literaria y vital, renovadora de las herramientas narrativas, destructora de lo establecido y buscadora de la raíz de la poesía, es quizás el libro donde Cortázar está entero, con toda su complejidad ética y estética, con su imaginación y su humor. Y, transcurridas más de 5 décadas desde su primera publicación, Rayuela sigue siendo leída con curiosidad, asombro, interés y devoción\r\n\r\nCortázar empieza por proponer un acercamiento activo al libro y ofrece varias posibilidades de lectura: el lector ha de decidir: ¿optar por el orden de lectura tradicional?, ¿seguir el tablero de dirección?, ¿remitirse al azar? Después lo lleva a dos lugares distintos «Del lado de allá», París, la relación de Oliveira y la Maga, el club de la serpiente, el primer descenso de Horacio a los infiernos; y «Del lado de acá», Buenos Aires, el encuentro de Tráveler y Talita, el circo, el manicomio, el segundo descenso.\r\n\r\n¿Viaje hacia delante?, ¿viaje hacia atrás? Viaje iniciático, sin duda, del que el lector emerge tal vez con otra idea acerca del modo de leer los libros y de ver la vida. Un mosaico donde toda una época se vio maravillosamente reflejada.',0,3,2,'image-1594508806130.jpg',3,'2018-04-24 00:00:00'),(40,'Don Quijote de la Mancha ',42,11,2,3,1020.0,'Descubre con Alfaguara Clásicos a Don Quijote de la Mancha, el personaje por excelencia de la literatura española adaptado para jóvenes. Con Prólogo de Fernando Savater Alonso Quijano, más conocido como Don Quijote de la Mancha, se volvió loco por leer demasiados libros de caballerías. Entonces se disfrazó de caballero, tomó su lanza, montó en su caballo Rocinante y, acompañado por su inseparable escudero Sancho Panza, salió a combatir el mal. Así, creyéndose un auténtico héroe, vivió las más increíbles aventuras: luchó contra villanos y monstruos, gigantes y brujos malvados... y defendió a su bella amada, Dulcinea del Toboso, ante todo el que osara poner en duda su belleza. Adaptación de José Luis Giménez-Frontín.',0,3,4,'image-1594510224538.jpg',22,'2016-07-26 00:00:00'),(41,'Antes del Fin',30,5,2,1,1280.0,'Antes del fin es uno de los últimos textos del escritor argentino Ernesto Sabato, publicado en 1998, cuando el autor ya era un hombre de ochenta y seis años. Se trata de reflexiones que desarrolla tomando como eje los grandes episodios de su vida, sin que puedan considerarse exactamente memorias o un relato autobiográfico, sino, como él mismo define, un \"testamento\" espiritual. ',0,3,1,'image-1594683212156.jpg',22,'1998-03-10 00:00:00'),(42,'El Tunel',30,1,2,1,600.0,'El túnel es una novela corta argentina escrita por Ernesto Sábato en 1948. Juan Pablo Castel, personaje principal y narrador, cuenta desde la cárcel los motivos que lo llevaron a cometer un asesinato contra su amante María Iribarne. ',0,3,3,'image-1594683315819.jpg',22,'1948-05-31 00:00:00'),(43,'La Resistencia',30,1,2,4,900.0,'La resistencia es un ensayo del escritor argentino Ernesto Sabato publicado en 2000. El libro se divide en cinco partes y un epílogo, en las cuales se perciben, entre hechos que aluden a la misma vida del autor, diversos temas de criticismo a la sociedad moderna, al individualismo, a la pérdida de valores espirituales, y la necesidad de la comunicación con el otro. La obra se enmarca en el carácter de Sabato de escritor existencial.',0,3,4,'image-1594683400056.jpg',22,'2000-10-31 00:00:00'),(44,'El Hobbit        ',1,11,2,2,2223.0,'Cuando alrededor de 1930, J.R.R. Tolkien comenzó a escribir El Hobbit, hacía ya diez años que trabajaba en el vasto panorama mitológico de El Libro de los Relatos, que más tarde se llamaría El Silmarillion. Así como esas crónicas tempranas narraban los mitos inmemoriales de la Primera y Segunda Edad, Tolkien pronto advirtió que El Hobbit iba ordenándose de algún modo como un relato de la Tercera Edad (Gandalf habla del Nigromante en las primeras páginas), aunque las inesperadas aventuras de un pacífico hombre del campo no parecieran tener mucha relación con las vastas y oscuras mitologías de la Tierra Media. El estilo directo y lineal, con alusiones (que el autor deploró más tarde) a un público infantil, no impide la poderosa irrupción --unas pocas veces en términos de comedia-- de los grandes temas tolkienianos (el poder, la codicia, la guerra, la muerte) que reaparecerían en una dimensión a menudo obviamente épica en El Señor de los Anillos.',5,3,2,'image-1594765278560.jpg',3,'2002-09-01 00:00:00'),(45,'El Mercader De Venecia ',6,12,2,3,789.0,'\"- Me ha arruinado... se ha reído de mis pérdidas y burlado de mis ganancias, ha afrentado a mi nación, ha desalentado a mis amigos y azuzado a mis enemigos. ¿Y cuál es su motivo? Que soy judío. ¿El judío no tiene ojos? ¿El judío no tiene manos, órganos, dimensiones, sentidos, afectos, pasiones? ¿No es alimentado con la misma comida y herido por las mismas armas, víctima de las mismas enfermedades y curado por los mismos medios, no tiene calor en verano y frío en invierno, como el cristiano? ¿Si lo pinchan, no sangra? ¿No se ríe si le hacen cosquillas? ¿Si nos envenenáis no morimos? ¿Si nos hacéis daño, no nos vengaremos?\" William Shakespeare, El Mercador De Venecia',0,3,1,'image-1594736759607.jpg',4,'2017-04-24 00:00:00'),(46,'El Inversor Inteligente : Un Libro de Asesoramiento Practico',43,13,2,3,1940.0,'A lo largo de los años, la evolución del mercado ha comprobado lo sabias que han sido las estrategias enseñadas por Graham. A la vez que conserva la integridad del texto original, esta edición revisada incluye comentarios actualizados del famoso periodista financiero Jason Zweig, cuya perspectiva incorpora las realidades del mercado presente, traza paralelismos entre los ejemplos de Graham y los titulares financieros actuales, y brinda a los lectores una comprensión más plena de cómo hacer para aplicar dichos principios.',10,3,4,'image-1594845574737.jpg',4,'2019-01-07 00:00:00');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `status` varchar(45) NOT NULL,
  `total` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (2,3,'0',0),(3,7,'1',485),(4,7,'1',0),(5,7,'1',0),(16,22,'0',2223),(17,22,'0',1450),(18,22,'0',3060),(19,23,'0',4159),(20,23,'1',0),(21,24,'0',2664),(22,24,'1',0),(23,25,'1',0),(24,26,'0',4593),(25,26,'1',0),(26,27,'0',2040),(27,27,'1',0),(28,28,'1',0),(29,29,'1',0),(30,22,'1',0);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_products`
--

DROP TABLE IF EXISTS `cart_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `book_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `cart_id_idx` (`cart_id`),
  KEY `book_id_idx` (`book_id`),
  CONSTRAINT `book_id` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_products`
--

LOCK TABLES `cart_products` WRITE;
/*!40000 ALTER TABLE `cart_products` DISABLE KEYS */;
INSERT INTO `cart_products` VALUES (1,4,2,0),(2,5,2,0),(38,16,44,1),(39,17,7,1),(40,19,40,3),(41,19,4,1),(42,21,2,2),(43,24,40,3),(44,24,3,2),(45,26,40,2),(47,18,40,1),(49,18,40,2);
/*!40000 ALTER TABLE `cart_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `format` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Arte y Fotografía'),(2,'Filosofía y psicología'),(3,'Ficción'),(4,'Literatura'),(5,'Biografias'),(6,'Religión'),(7,'Comunicación'),(8,'Cocina'),(9,'Computación e informática'),(10,'Deportes'),(11,'Biologia'),(12,'Humanidades'),(13,'Infantiles'),(14,'Derecho'),(15,'Medicina'),(16,'Viajes y vacaciones'),(17,'Historia'),(18,'Humor'),(19,'Policiales'),(20,'Romance'),(21,'Narrativa'),(22,'Novelas'),(23,'Ensayos');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `language` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (1,'Gredos'),(2,'longseller'),(3,'Anabel Hernández'),(4,'Salamandra'),(5,'Debolsillo'),(8,'Zeta'),(9,'Andrés Bello'),(10,'CorSair'),(11,'MinoTauro'),(12,'Createspace Independent Publishing Platform'),(13,' HarperCollins Espanol');
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `avatar` varchar(45) NOT NULL,
  `isAdmin` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Juan','Manuel','Juan@gmail.com','$2b$10$egkdXtSvxbQddcU.Qpsyi.BhoDQpdjeWhKpMQFDDpRaCfwLusC/We','avatar-1593282138037.png','0'),(5,'Mayra','Rincones','mayra@gmail.com','$2b$10$MAIGqrzAbtrQlCcK.8K0t.NmLB0L34oCAqLYJ56zjRWd0ALktwGeK','avatar-1593282824577.jpg','1'),(7,'Alejo  ','Sammet','alejo@gmail.com','123456789','avatar-1593283535548.jpg','0'),(8,'miguel','guibi','miguel@gmail.com','$2b$10$iFrTdKqMFIhjFilTYIALJ.JBwOpi6oiNCSPD61qWLkBP8.xPt9DuK','avatar-1593788061059.jpg','0'),(21,'Maria Laura','Robles','roblesma.laura@gmail.com','$2b$10$2ExLTP9IgAyJJQC/cbkXkupmAE2.AfjlSi3z7Hcbe0RsprxjoqO5K','avatar-1592599185603.jpg','1'),(22,'Andres            ','Laje','pelon@gmail.com','$2b$10$5F2yLV8ePAzE9i9fG3mw9.gC3ZpOKF5hyrMVAo086QjEI47RQ6tn2','image-1594765729808.jpg','0'),(23,'Jose','nuevo','nuevo@gmail.com','$2b$10$Sk1IuL2xQVKw2sg0jK6ZPOUMAAWetQLGYyguY7rY/fZV0XWugGAU2','image-1594767291316.jpg','0'),(24,'Nombre','Editado','campos@gmail.com','$2b$10$TYIAxiLTNfkZROOTgslLqO9MxX5beWzYz4g8YQ6WAbp9qRGZ9G4ji','image-1594768179889.jpg','0'),(25,'nombreeditado','nuevoo','nuevo111@gmail.com','$2b$10$Nnn6GEHaHfdk9k05Aiq4VeJYxrihjKffBmRl.lbNjoRoVTKXtS1vK','image-1594769809992.jpg','0'),(26,'NombreEditado','nuevousuario','email@gmail.com','$2b$10$rS8ApBIgxJLwCw3U/ujUnuEUgNYL5bfhV0G0wN28XKZrXfbwBRWNK','image-1594770107731.jpg','0'),(27,'NOMBREEDITADO','apellido','nuevosss@gmail.com','$2b$10$zAJO1cBR.CDzHrfEuhwP2ue0jwtarGMZ2YhGEHUuwez3DaVTfuZby','image-1594770987475.jpg','0'),(28,'guibarra  ','miguel','guibi@gmail.com','$2b$10$jWWaRmsJz.PgDnkJ6zu36.gvCCeTiqTROhb.BzAK3tsTAl48VcY.W','image-1594848197626.jpg','0'),(29,'diego  ','caplan','diegocaplan@gmail.com','$2b$10$ILBnkNNsdFwtXTQiVyPB/eJE2IG2uo0oHu9TRnmGYbgKL0ynjQnkq','image-1594849364258.jpg','0');
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

-- Dump completed on 2020-07-15 19:36:11
