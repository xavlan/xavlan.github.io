-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 11 juin 2024 à 13:03
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_plongee`
--
CREATE DATABASE IF NOT EXISTS `projet_plongee` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `projet_plongee`;

-- --------------------------------------------------------

--
-- Structure de la table `connexion`
--

DROP TABLE IF EXISTS `connexion`;
CREATE TABLE IF NOT EXISTS `connexion` (
  `email` varchar(50) NOT NULL,
  `utilisateur` varchar(50) NOT NULL,
  `mdp` varchar(50) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `connexion`
--

INSERT INTO `connexion` (`email`, `utilisateur`, `mdp`) VALUES
('admin@gmail.com', 'default', 'root');

-- --------------------------------------------------------

--
-- Structure de la table `mn90`
--

DROP TABLE IF EXISTS `mn90`;
CREATE TABLE IF NOT EXISTS `mn90` (
  `profondeur` int(11) NOT NULL,
  `duree_plongee` int(11) NOT NULL,
  `palier_3m` int(11) DEFAULT NULL,
  `palier_6m` int(11) DEFAULT NULL,
  `palier_9m` int(11) DEFAULT NULL,
  `palier_12m` int(11) DEFAULT NULL,
  `palier_15m` int(11) DEFAULT NULL,
  PRIMARY KEY (`profondeur`,`duree_plongee`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `mn90`
--

INSERT INTO `mn90` (`profondeur`, `duree_plongee`, `palier_3m`, `palier_6m`, `palier_9m`, `palier_12m`, `palier_15m`) VALUES
(6, 360, NULL, NULL, NULL, NULL, NULL),
(8, 360, NULL, NULL, NULL, NULL, NULL),
(10, 330, NULL, NULL, NULL, NULL, NULL),
(10, 360, 1, NULL, NULL, NULL, NULL),
(12, 135, NULL, NULL, NULL, NULL, NULL),
(12, 140, 2, NULL, NULL, NULL, NULL),
(12, 150, 4, NULL, NULL, NULL, NULL),
(12, 160, 6, NULL, NULL, NULL, NULL),
(12, 170, 7, NULL, NULL, NULL, NULL),
(12, 180, 9, NULL, NULL, NULL, NULL),
(12, 190, 11, NULL, NULL, NULL, NULL),
(12, 200, 13, NULL, NULL, NULL, NULL),
(12, 210, 14, NULL, NULL, NULL, NULL),
(12, 220, 15, NULL, NULL, NULL, NULL),
(12, 230, 16, NULL, NULL, NULL, NULL),
(12, 240, 17, NULL, NULL, NULL, NULL),
(12, 250, 18, NULL, NULL, NULL, NULL),
(12, 255, 19, NULL, NULL, NULL, NULL),
(12, 270, 21, NULL, NULL, NULL, NULL),
(15, 75, NULL, NULL, NULL, NULL, NULL),
(15, 80, 2, NULL, NULL, NULL, NULL),
(15, 85, 4, NULL, NULL, NULL, NULL),
(15, 90, 6, NULL, NULL, NULL, NULL),
(15, 95, 8, NULL, NULL, NULL, NULL),
(15, 100, 11, NULL, NULL, NULL, NULL),
(15, 105, 13, NULL, NULL, NULL, NULL),
(15, 110, 15, NULL, NULL, NULL, NULL),
(15, 115, 17, NULL, NULL, NULL, NULL),
(15, 120, 18, NULL, NULL, NULL, NULL),
(18, 50, NULL, NULL, NULL, NULL, NULL),
(18, 55, 1, NULL, NULL, NULL, NULL),
(18, 60, 2, NULL, NULL, NULL, NULL),
(18, 65, 8, NULL, NULL, NULL, NULL),
(18, 70, 11, NULL, NULL, NULL, NULL),
(18, 75, 14, NULL, NULL, NULL, NULL),
(18, 80, 17, NULL, NULL, NULL, NULL),
(18, 85, 21, NULL, NULL, NULL, NULL),
(18, 90, 23, NULL, NULL, NULL, NULL),
(18, 95, 26, NULL, NULL, NULL, NULL),
(18, 100, 28, NULL, NULL, NULL, NULL),
(18, 105, 31, NULL, NULL, NULL, NULL),
(18, 110, 34, NULL, NULL, NULL, NULL),
(18, 115, 36, NULL, NULL, NULL, NULL),
(18, 120, 38, NULL, NULL, NULL, NULL),
(20, 40, NULL, NULL, NULL, NULL, NULL),
(20, 45, 1, NULL, NULL, NULL, NULL),
(20, 50, 4, NULL, NULL, NULL, NULL),
(20, 55, 9, NULL, NULL, NULL, NULL),
(20, 60, 13, NULL, NULL, NULL, NULL),
(20, 65, 16, NULL, NULL, NULL, NULL),
(20, 70, 20, NULL, NULL, NULL, NULL),
(20, 75, 24, NULL, NULL, NULL, NULL),
(20, 80, 27, NULL, NULL, NULL, NULL),
(20, 85, 30, NULL, NULL, NULL, NULL),
(20, 90, 34, NULL, NULL, NULL, NULL),
(22, 35, NULL, NULL, NULL, NULL, NULL),
(22, 40, 2, NULL, NULL, NULL, NULL),
(22, 45, 7, NULL, NULL, NULL, NULL),
(22, 50, 12, NULL, NULL, NULL, NULL),
(22, 55, 16, NULL, NULL, NULL, NULL),
(22, 60, 20, NULL, NULL, NULL, NULL),
(22, 65, 25, NULL, NULL, NULL, NULL),
(22, 70, 29, NULL, NULL, NULL, NULL),
(22, 75, 33, NULL, NULL, NULL, NULL),
(22, 80, 37, NULL, NULL, NULL, NULL),
(22, 85, 41, NULL, NULL, NULL, NULL),
(22, 90, 44, NULL, NULL, NULL, NULL),
(25, 20, NULL, NULL, NULL, NULL, NULL),
(25, 25, 1, NULL, NULL, NULL, NULL),
(25, 30, 2, NULL, NULL, NULL, NULL),
(25, 35, 5, NULL, NULL, NULL, NULL),
(25, 40, 10, NULL, NULL, NULL, NULL),
(25, 45, 16, NULL, NULL, NULL, NULL),
(25, 50, 21, NULL, NULL, NULL, NULL),
(25, 55, 27, NULL, NULL, NULL, NULL),
(25, 60, 32, NULL, NULL, NULL, NULL),
(25, 65, 37, NULL, NULL, NULL, NULL),
(25, 70, 41, 1, NULL, NULL, NULL),
(25, 75, 43, 4, NULL, NULL, NULL),
(25, 80, 45, 7, NULL, NULL, NULL),
(25, 85, 48, 9, NULL, NULL, NULL),
(25, 90, 50, 11, NULL, NULL, NULL),
(28, 15, NULL, NULL, NULL, NULL, NULL),
(28, 20, 1, NULL, NULL, NULL, NULL),
(28, 25, 2, NULL, NULL, NULL, NULL),
(28, 30, 6, NULL, NULL, NULL, NULL),
(28, 35, 12, NULL, NULL, NULL, NULL),
(28, 40, 19, NULL, NULL, NULL, NULL),
(28, 45, 25, NULL, NULL, NULL, NULL),
(28, 50, 32, NULL, NULL, NULL, NULL),
(28, 55, 36, 2, NULL, NULL, NULL),
(28, 60, 40, 4, NULL, NULL, NULL),
(28, 65, 43, 8, NULL, NULL, NULL),
(28, 70, 46, 11, NULL, NULL, NULL),
(28, 75, 48, 14, NULL, NULL, NULL),
(28, 80, 50, 17, NULL, NULL, NULL),
(28, 85, 53, 20, NULL, NULL, NULL),
(28, 90, 56, 23, NULL, NULL, NULL),
(30, 10, NULL, NULL, NULL, NULL, NULL),
(30, 15, 1, NULL, NULL, NULL, NULL),
(30, 20, 2, NULL, NULL, NULL, NULL),
(30, 25, 4, NULL, NULL, NULL, NULL),
(30, 30, 9, NULL, NULL, NULL, NULL),
(30, 35, 17, NULL, NULL, NULL, NULL),
(30, 40, 24, NULL, NULL, NULL, NULL),
(30, 45, 31, 1, NULL, NULL, NULL),
(30, 50, 36, 3, NULL, NULL, NULL),
(30, 55, 39, 6, NULL, NULL, NULL),
(30, 60, 43, 10, NULL, NULL, NULL),
(30, 65, 46, 14, NULL, NULL, NULL),
(30, 70, 48, 17, NULL, NULL, NULL),
(32, 10, NULL, NULL, NULL, NULL, NULL),
(32, 15, 1, NULL, NULL, NULL, NULL),
(32, 20, 3, NULL, NULL, NULL, NULL),
(32, 25, 6, NULL, NULL, NULL, NULL),
(32, 30, 14, NULL, NULL, NULL, NULL),
(32, 35, 22, NULL, NULL, NULL, NULL),
(32, 40, 29, 1, NULL, NULL, NULL),
(32, 45, 35, 4, NULL, NULL, NULL),
(32, 50, 39, 7, NULL, NULL, NULL),
(32, 55, 43, 11, NULL, NULL, NULL),
(32, 60, 46, 15, NULL, NULL, NULL),
(32, 65, 48, 19, NULL, NULL, NULL),
(32, 70, 50, 23, NULL, NULL, NULL),
(35, 10, NULL, NULL, NULL, NULL, NULL),
(35, 15, 2, NULL, NULL, NULL, NULL),
(35, 20, 5, NULL, NULL, NULL, NULL),
(35, 25, 11, NULL, NULL, NULL, NULL),
(35, 30, 20, 1, NULL, NULL, NULL),
(35, 35, 27, 2, NULL, NULL, NULL),
(35, 40, 34, 5, NULL, NULL, NULL),
(35, 45, 39, 9, NULL, NULL, NULL),
(35, 50, 43, 14, NULL, NULL, NULL),
(35, 55, 47, 18, NULL, NULL, NULL),
(35, 60, 50, 22, NULL, NULL, NULL),
(35, 65, 52, 26, 2, NULL, NULL),
(35, 70, 57, 28, 4, NULL, NULL),
(38, 5, NULL, NULL, NULL, NULL, NULL),
(38, 10, 1, NULL, NULL, NULL, NULL),
(38, 15, 4, NULL, NULL, NULL, NULL),
(38, 20, 8, NULL, NULL, NULL, NULL),
(38, 25, 16, 1, NULL, NULL, NULL),
(38, 30, 24, 3, NULL, NULL, NULL),
(38, 35, 33, 5, NULL, NULL, NULL),
(38, 40, 38, 10, NULL, NULL, NULL),
(38, 45, 43, 15, NULL, NULL, NULL),
(38, 50, 47, 20, NULL, NULL, NULL),
(38, 55, 50, 23, 2, NULL, NULL),
(38, 60, 53, 27, 5, NULL, NULL),
(38, 65, 58, 29, 8, NULL, NULL),
(38, 70, 62, 31, 11, NULL, NULL),
(40, 5, NULL, NULL, NULL, NULL, NULL),
(40, 10, 2, NULL, NULL, NULL, NULL),
(40, 15, 4, NULL, NULL, NULL, NULL),
(40, 20, 9, 1, NULL, NULL, NULL),
(40, 25, 19, 2, NULL, NULL, NULL),
(40, 30, 28, 4, NULL, NULL, NULL),
(40, 35, 35, 8, NULL, NULL, NULL),
(40, 40, 40, 13, NULL, NULL, NULL),
(40, 45, 45, 18, 1, NULL, NULL),
(40, 50, 48, 23, 2, NULL, NULL),
(40, 55, 52, 26, 5, NULL, NULL),
(40, 60, 57, 29, 8, NULL, NULL),
(40, 65, 61, 21, 12, NULL, NULL),
(40, 70, 66, 33, 15, NULL, NULL),
(42, 5, NULL, NULL, NULL, NULL, NULL),
(42, 10, 2, NULL, NULL, NULL, NULL),
(42, 15, 5, NULL, NULL, NULL, NULL),
(42, 20, 12, 1, NULL, NULL, NULL),
(42, 25, 22, 3, NULL, NULL, NULL),
(42, 30, 31, 6, NULL, NULL, NULL),
(42, 35, 37, 11, NULL, NULL, NULL),
(42, 40, 43, 16, 1, NULL, NULL),
(42, 45, 47, 21, 3, NULL, NULL),
(42, 50, 50, 24, 6, NULL, NULL),
(42, 55, 55, 29, 8, NULL, NULL),
(42, 60, 60, 30, 13, NULL, NULL),
(45, 5, NULL, NULL, NULL, NULL, NULL),
(45, 10, 3, NULL, NULL, NULL, NULL),
(45, 15, 6, 1, NULL, NULL, NULL),
(45, 20, 15, 3, NULL, NULL, NULL),
(45, 25, 25, 5, NULL, NULL, NULL),
(45, 30, 35, 9, NULL, NULL, NULL),
(45, 35, 40, 15, 1, NULL, NULL),
(45, 40, 46, 20, 3, NULL, NULL),
(45, 45, 50, 24, 6, NULL, NULL),
(45, 50, 54, 28, 10, NULL, NULL),
(45, 55, 60, 30, 14, NULL, NULL),
(45, 60, 65, 32, 18, 1, NULL),
(48, 5, NULL, NULL, NULL, NULL, NULL),
(48, 10, 4, NULL, NULL, NULL, NULL),
(48, 15, 7, 2, NULL, NULL, NULL),
(48, 20, 19, 4, NULL, NULL, NULL),
(48, 25, 30, 7, NULL, NULL, NULL),
(48, 30, 37, 12, 1, NULL, NULL),
(48, 35, 44, 18, 3, NULL, NULL),
(48, 40, 48, 23, 6, NULL, NULL),
(48, 45, 53, 27, 10, NULL, NULL),
(48, 50, 59, 30, 14, 1, NULL),
(48, 55, 64, 32, 18, 2, NULL),
(48, 60, 70, 36, 19, 5, NULL),
(50, 5, 1, NULL, NULL, NULL, NULL),
(50, 10, 4, NULL, NULL, NULL, NULL),
(50, 15, 9, 2, NULL, NULL, NULL),
(50, 20, 22, 4, NULL, NULL, NULL),
(50, 25, 32, 8, 1, NULL, NULL),
(50, 30, 39, 14, 2, NULL, NULL),
(50, 35, 45, 20, 5, NULL, NULL),
(50, 40, 50, 24, 9, NULL, NULL),
(50, 45, 55, 29, 12, 1, NULL),
(50, 50, 62, 30, 17, 2, NULL),
(50, 55, 67, 34, 19, 4, NULL),
(52, 5, 1, NULL, NULL, NULL, NULL),
(52, 10, 4, 1, NULL, NULL, NULL),
(52, 15, 10, 3, NULL, NULL, NULL),
(52, 20, 23, 5, 1, NULL, NULL),
(52, 25, 34, 9, 2, NULL, NULL),
(52, 30, 41, 15, 4, NULL, NULL),
(52, 35, 47, 22, 6, NULL, NULL),
(52, 40, 52, 36, 10, 2, NULL),
(52, 45, 59, 29, 15, 2, NULL),
(52, 50, 64, 32, 17, 5, NULL),
(52, 55, 71, 36, 19, 8, NULL),
(55, 5, 1, NULL, NULL, NULL, NULL),
(55, 10, 5, 1, NULL, NULL, NULL),
(55, 15, 13, 4, NULL, NULL, NULL),
(55, 20, 27, 6, 1, NULL, NULL),
(55, 25, 37, 11, 3, NULL, NULL),
(55, 30, 44, 18, 6, NULL, NULL),
(55, 35, 50, 23, 9, 1, NULL),
(55, 40, 55, 29, 12, 3, NULL),
(55, 45, 62, 31, 17, 5, NULL),
(55, 50, 69, 35, 19, 8, NULL),
(55, 55, 76, 37, 22, 12, NULL),
(58, 5, 2, NULL, NULL, NULL, NULL),
(58, 10, 5, 2, NULL, NULL, NULL),
(58, 15, 16, 4, 1, NULL, NULL),
(58, 20, 30, 7, 2, NULL, NULL),
(58, 25, 40, 13, 4, NULL, NULL),
(58, 30, 46, 21, 7, 1, NULL),
(58, 35, 52, 26, 11, 2, NULL),
(58, 40, 59, 30, 15, 5, NULL),
(58, 45, 66, 33, 18, 8, NULL),
(58, 50, 74, 37, 21, 11, 1),
(58, 55, 83, 39, 23, 14, 3),
(60, 10, 6, 2, NULL, NULL, NULL),
(60, 15, 19, 4, 1, NULL, NULL),
(60, 20, 32, 8, 3, NULL, NULL),
(60, 25, 41, 15, 5, NULL, NULL),
(60, 30, 48, 22, 8, 1, NULL),
(60, 35, 54, 28, 11, 4, NULL),
(60, 40, 62, 30, 17, 6, NULL),
(60, 45, 69, 35, 19, 9, 1),
(60, 50, 78, 37, 22, 13, 2),
(60, 55, 88, 40, 24, 15, 5),
(62, 5, 2, NULL, NULL, NULL, NULL),
(62, 10, 7, 2, NULL, NULL, NULL),
(62, 15, 21, 5, 1, NULL, NULL),
(65, 5, 3, NULL, NULL, NULL, NULL),
(65, 10, 8, 6, NULL, NULL, NULL),
(65, 15, 24, 5, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `parametre`
--

DROP TABLE IF EXISTS `parametre`;
CREATE TABLE IF NOT EXISTS `parametre` (
  `utilisateur` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `vitesse_descente` float NOT NULL,
  `vitesse_remontee` float NOT NULL,
  `volume_bouteille` float NOT NULL,
  `pression_bouteille` float NOT NULL,
  `respiration` float NOT NULL,
  PRIMARY KEY (`utilisateur`,`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `parametre`
--

INSERT INTO `parametre` (`utilisateur`, `nom`, `vitesse_descente`, `vitesse_remontee`, `volume_bouteille`, `pression_bouteille`, `respiration`) VALUES
('default', 'default', 20, 10, 15, 200, 20),
('default', 'erggr', 57, 75, 57, 57, 75);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
