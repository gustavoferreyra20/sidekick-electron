-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 07-04-2022 a las 22:40:42
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
  `usuariosRequeridos` int(11) NOT NULL,
  `usuariosActuales` int(11) NOT NULL,
  `titulo` varchar(45) NOT NULL,
  `descripcion` varchar(280) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_anuncio`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
  `titulo` varchar(45) NOT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_juego`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataforma_juego`
--

DROP TABLE IF EXISTS `plataforma_juego`;
CREATE TABLE IF NOT EXISTS `plataforma_juego` (
  `id_juego` int(11) NOT NULL,
  `id_plataforma` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `descripcion` varchar(280) DEFAULT NULL,
  `img` varchar(45) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
