-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 11-08-2022 a las 22:43:59
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sidekickdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncio`
--

DROP TABLE IF EXISTS `anuncio`;
CREATE TABLE IF NOT EXISTS `anuncio` (
  `id_anuncio` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuarioPropietario` int(11) NOT NULL,
  `id_juego` int(11) NOT NULL,
  `plataforma` int(11) NOT NULL,
  `usuariosRequeridos` int(11) NOT NULL,
  `usuariosActuales` int(11) NOT NULL DEFAULT 1,
  `titulo` varchar(45) NOT NULL,
  `descripcion` varchar(280) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_anuncio`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `anuncio`
--

INSERT INTO `anuncio` (`id_anuncio`, `id_usuarioPropietario`, `id_juego`, `plataforma`, `usuariosRequeridos`, `usuariosActuales`, `titulo`, `descripcion`, `creacion`) VALUES
(1, 66, 2, 4, 2, 1, 'example', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2022-08-11 03:00:00'),
(2, 66, 1, 1, 1, 1, 'example2', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2022-08-11 22:23:34'),
(3, 66, 2, 4, 3, 1, 'example3', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2022-08-11 22:27:20'),
(4, 66, 1, 2, 3, 1, 'example4', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos officia dolore quod accusantium ipsa, fugiat velit corrupti nemo consequuntur accusamus ducimus, repellat quibusdam voluptatem quidem unde ipsam. Officiis, necessitatibus eveniet.', '2022-08-11 22:42:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta_usuario`
--

DROP TABLE IF EXISTS `cuenta_usuario`;
CREATE TABLE IF NOT EXISTS `cuenta_usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_plataforma` int(11) NOT NULL,
  `cuenta` varchar(45) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero`
--

DROP TABLE IF EXISTS `genero`;
CREATE TABLE IF NOT EXISTS `genero` (
  `id_genero` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero_anuncio`
--

DROP TABLE IF EXISTS `genero_anuncio`;
CREATE TABLE IF NOT EXISTS `genero_anuncio` (
  `id_anuncio` int(11) NOT NULL,
  `id_genero` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genero_juego`
--

DROP TABLE IF EXISTS `genero_juego`;
CREATE TABLE IF NOT EXISTS `genero_juego` (
  `id_juego` int(11) NOT NULL,
  `id_genero` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juego`
--

DROP TABLE IF EXISTS `juego`;
CREATE TABLE IF NOT EXISTS `juego` (
  `id_juego` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_juego`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `juego`
--

INSERT INTO `juego` (`id_juego`, `nombre`, `img`) VALUES
(1, 'Fortnite', ''),
(2, 'CSGO', ''),
(3, 'MultiVersus', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medalla`
--

DROP TABLE IF EXISTS `medalla`;
CREATE TABLE IF NOT EXISTS `medalla` (
  `id_medalla` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(280) NOT NULL,
  `precio` decimal(19,4) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_medalla`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataforma`
--

DROP TABLE IF EXISTS `plataforma`;
CREATE TABLE IF NOT EXISTS `plataforma` (
  `id_plataforma` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_plataforma`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `plataforma`
--

INSERT INTO `plataforma` (`id_plataforma`, `nombre`, `img`) VALUES
(1, 'PlayStation 4', ''),
(2, 'PlayStation 5', ''),
(3, 'XBOX', ''),
(4, 'Steam', ''),
(5, 'Epic', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataforma_juego`
--

DROP TABLE IF EXISTS `plataforma_juego`;
CREATE TABLE IF NOT EXISTS `plataforma_juego` (
  `id_juego` int(11) NOT NULL,
  `id_plataforma` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `plataforma_juego`
--

INSERT INTO `plataforma_juego` (`id_juego`, `id_plataforma`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reseña`
--

DROP TABLE IF EXISTS `reseña`;
CREATE TABLE IF NOT EXISTS `reseña` (
  `id_reseña` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuarioEmisor` int(11) NOT NULL,
  `id_usuarioReceptor` int(11) NOT NULL,
  `id_anuncio` int(11) NOT NULL,
  `notaHabilidad` int(11) NOT NULL,
  `notaKarma` int(11) NOT NULL,
  `comentario` varchar(280) NOT NULL,
  PRIMARY KEY (`id_reseña`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reseña_medalla`
--

DROP TABLE IF EXISTS `reseña_medalla`;
CREATE TABLE IF NOT EXISTS `reseña_medalla` (
  `id_reseña` int(11) NOT NULL,
  `id_medalla` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE IF NOT EXISTS `tokens` (
  `session` varchar(300) NOT NULL,
  `token` varchar(300) NOT NULL,
  `user` varchar(300) NOT NULL,
  `expire` date NOT NULL,
  PRIMARY KEY (`session`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tokens`
--

INSERT INTO `tokens` (`session`, `token`, `user`, `expire`) VALUES
('6ed99bef624b40088329805a80da193dbe46614a', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjAyNTc3NDF9.-vB8fSy9rB7ZgkEyfM5apW8U4F-TqDXxMSJs4ghfv6k', 'e89a417d12a0059e38b443c71f9e100d768b1d5e', '2022-11-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `descripcion` varchar(280) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=75 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `password`, `descripcion`, `img`) VALUES
(1, 'user1', 'user1@gmail.com', '12345', NULL, NULL),
(3, 'awrwarwar', 'awrawrwar', 'awrawrwarwar', NULL, NULL),
(5, 'awdwadwad', '', 'awdwadwadwad', NULL, NULL),
(74, 'mariano', 'mariano@gmail.com', '$2a$10$rHI2bW0GyFZZf1K8MepjuOttVaQOkHAVuJiXCE2cox5VQ5WY2ZK9u', NULL, NULL),
(7, 'user3', 'user3@gmail.com', '12345', NULL, NULL),
(53, 'goofy', 'goofy@gmail.com', '$2a$10$z7I.x8HUcfmznZJtJcoQbez7qpvwqA8NVTCcmIVKcM7NrzwTuz7rW', NULL, NULL),
(54, 'joe', 'joe@gmail.com', '$2a$10$zpz0k2n1kMoWzt06tt8Xt.cL7pLW/brgDjdqajAduBnsOKRfD.CyW', NULL, NULL),
(52, 'obione', 'obione@gmail.com', '$2a$10$/kF6cwowJqR8Zbs7yFVqFO4t2EdVKwZVxeavZpss6zAvsS.kYeX66', NULL, NULL),
(50, 'star', 'star@gmail.com', '$2a$10$tzysy0M.FebJDhtl0UuG3eYeQGsSKnJfwmaizL5CNXISTc2eQHptC', NULL, NULL),
(51, 'quigon', 'quigon@gmail.com', '$2a$10$7LSngXMkjBuGm5xHwpAUlu3SUyzVFe5iXfQ.ngAxEYIfEQ10Ypvba', NULL, NULL),
(40, 'tito', 'tito@gmail.com', '$2a$10$zGUPS3m3ngQPKQiFw0STqunBuLtdsgWFP8Sl6CBrcKfsHQN.t4jCi', NULL, NULL),
(39, 'miguel', 'miguel@gmail.com', '$2a$10$Q1Wysruj8RQ2TJE23EJb8OVk4NJSfPOqfTup4b6L7gxsKtvBOFTQK', NULL, NULL),
(38, 'pedro', 'pedro@gmail.com', '$2a$10$Yld1b6RXLS3Yq.fmikfDzu95hIgy33gACBT2yJJILV/Aa9.OcPs/e', NULL, NULL),
(37, 'tim', 'tim@gmail.com', '$2a$10$QdbEsNJQF9AUiGuo9zO7DusD7FfiizKvt/v.ofPK49WGB361uTwoG', NULL, NULL),
(36, 'anon', 'anon@gmail.com', '$2a$10$lp.5kpOIGM5Ulo4rJmnLdezCUISD4.YDXj5VHKUr1c7Y.oYlhQYkG', NULL, NULL),
(35, 'anon', 'anon@gmail.com', '$2a$10$R339dLzdIRwPwDVl3kC1Te7sEAFjTIcfeniXH1lsFBVfFSIPRvJKe', NULL, NULL),
(34, 'juan', 'juan@gmail.com', '$2a$10$cg98uRU.PcEBCUoWPvAlFOLEtefM6eDjXtPOFPyJFlGaQzGZF2yUq', NULL, NULL),
(33, 'juan', 'juan@gmail.com', '$2a$10$8pVtOOx9oH04Td/bpGcal.FS/04EQPiRPcL8c.1niWEcBa/s1stMy', NULL, NULL),
(32, 'user4', 'user4@gmail.com', '$2b$10$nAtLEoennz72.vA9ABu6pezupWJyqFZEOqsdTYm.olaUI3MiXirXW', NULL, NULL),
(49, 'beto', 'beto@gmail.com', '$2a$10$TqtCxxvpI55OnJF4sKX/QeTX4eeAUMmfVGI5tDHqT8QcJNIF9jXv2', NULL, NULL),
(69, 'ryan', 'ryan@gmail.com', '$2a$10$b1lEqv8OzYRe2v5avV3CMO42HOZUKQYW0JcrD/mjzbZYEXtBbsIKa', NULL, NULL),
(68, 'andy', 'andy@waddwawd', '$2a$10$HOrhWWEuy2DPyidiWCSDquFq2sgRNX0.7I5UqvXwwXOw5bMmMGoG6', NULL, NULL),
(67, 'buzz', 'buzz@waddwawd', '$2a$10$mm.8BHQeTOqguxfFb5MBu.mY2JTnfnctQb1wUb14WQxJkNnsLi8cu', NULL, NULL),
(66, 'jijiji', 'juxd2@gmail.com', '$2a$10$uyXYtn0qRCv8TQACdT3nr.2DXGiMIuZ3TqnXe/iAAhBCFveU0pPle', NULL, NULL),
(59, 'ju6', 'ju@gmail.com', '$2a$10$0.Yh4NyxEaVp7PrPBPpYNexTQfBZO3mJoYEp6GHQMNu1SZlKBrExe', NULL, NULL),
(64, 'indio', 'indio@gmail.com', '$2a$10$/E5iLey0hv.NWIxAtBGsv.CsZ4T6eokN7/WARfsWlq5AkwtF7bPHK', NULL, NULL),
(65, 'adadawd', 'awdawd@waddwawd', '$2a$10$VB7MR8s1cge.P6APyDl1W.q9Iido8TqaDDRMHjWc8TzLshKMeQMY.', NULL, NULL),
(62, 'esfsefesf', 'jru@gmail.com', '$2a$10$3PoBfsepKlFRun77ViCXse7iVWuRnnGE4Y9WSgzrcXf.Zgcsrr5my', NULL, NULL),
(63, 'finally', 'juxd@gmail.com', '$2a$10$yvtBnAzFSKJF//BSOkaQd.FfZKnbUaOX4BGvc3z/93ynyv2VD0oq.', NULL, NULL),
(70, 'ryan2', 'ryan2@gmail.com', '$2a$10$I7hSQ/HlJ2.MgaPN7Ccx.eAqQzXRkFYhyCTigO.p5xnRSC9oNcziy', NULL, NULL),
(71, 'harry', 'harry@gmail.com', '$2a$10$N7m/36dQ0xP4SPTuOJct..dO9EirrEQvlyA8MbJr10WDhMa9jIK1a', NULL, NULL),
(72, 'walter', 'walter@gmail.com', '$2a$10$SrK/o2SqhSCNCfu7VeD45O4pWfgCBiyjqHL1QiVh7gzw6aox9aCmm', NULL, NULL),
(73, 'topa', 'topa@gmail.com', '$2a$10$Y7uNjZt.Waohle8zph6YJumrdAtoVwT8ARdgMQN.2ccoC5NoNsAZe', NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
