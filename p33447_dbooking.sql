-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Хост: p33447.mysql.ihc.ru
-- Время создания: Дек 20 2021 г., 21:15
-- Версия сервера: 5.7.35-38-log
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `p33447_dbooking`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `Id` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Level` varchar(20) NOT NULL,
  `Capacity` tinyint(4) NOT NULL,
  `Price` int(30) NOT NULL,
  `ExtraPlace` tinyint(4) NOT NULL DEFAULT '0',
  `PriceOfEP` int(21) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`Id`, `Name`, `Level`, `Capacity`, `Price`, `ExtraPlace`, `PriceOfEP`) VALUES
(1, 'Стандартный номер', 'Эконом', 1, 4900, 1, 1000),
(2, 'Студия', 'Полулюкс', 2, 5900, 1, 1000),
(3, 'Номер с повышенной к', 'Полулюкс', 2, 8900, 0, NULL),
(4, 'Президентский номер', 'Люкс', 4, 20900, 1, 3000),
(5, 'Пентхаус', 'Люкс', 6, 31900, 1, 4900);

-- --------------------------------------------------------

--
-- Структура таблицы `categoryFacilities`
--

CREATE TABLE `categoryFacilities` (
  `categoryId` int(11) NOT NULL,
  `facilitiesId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categoryFacilities`
--

INSERT INTO `categoryFacilities` (`categoryId`, `facilitiesId`) VALUES
(2, 1),
(3, 1),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(1, 3),
(3, 4),
(4, 4),
(5, 4),
(4, 5),
(1, 6),
(2, 6),
(3, 6),
(4, 6),
(5, 6),
(4, 7),
(5, 7),
(1, 8),
(2, 8),
(3, 8),
(4, 9),
(5, 9),
(5, 10);

-- --------------------------------------------------------

--
-- Структура таблицы `facilities`
--

CREATE TABLE `facilities` (
  `Id` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `facilities`
--

INSERT INTO `facilities` (`Id`, `Name`, `Description`) VALUES
(1, 'Ванная комната в номере', 'Ванная комната включает в себя : душевую кабину, туалет, умывальник, набор полотенец и набор гигиенических принадлежностей.'),
(2, 'Кухня в номере', 'Кухня включает в себя : кухонный гарнитур с холодильником, электрической плитой, микроволновой печью, электрическим чайником, набором необходимой посуды и сопутствующими товарами, в виде чая, кофе, сахара и соли.'),
(3, 'Мини-кухня в номере', 'Мини-кухня включает в себя : небольшой холодильник, одну конфорку электрической плиты, электрический чайник, небольшой набор посуды.'),
(4, 'Кондиционер в номере', ''),
(5, 'Завтрак включен в стоимость', ''),
(6, 'Ежедневная уборка номера', ''),
(7, 'Наличие кабинета в номере', 'Рабочий кабинет включает в себя : рабочий стол, стул, компьютер, принтер, факс, интернет, телефон.'),
(8, 'Wi-Fi', ''),
(9, 'Большая ванная комна', 'Большая ванная комната включает в себя : джакузи, душевую кабину с тропическим душем, два умывальника, туалет, весь необходимый текстиль и ванные принадлежности.'),
(10, 'Свой выход на крышу ', '');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `Id` int(11) NOT NULL,
  `Room` int(4) NOT NULL,
  `User` int(11) NOT NULL,
  `DateStart` datetime NOT NULL,
  `DateEnd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `rooms`
--

CREATE TABLE `rooms` (
  `number` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `isFree` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `rooms`
--

INSERT INTO `rooms` (`number`, `category`, `isFree`) VALUES
(100, 1, 1),
(101, 1, 1),
(102, 1, 1),
(103, 1, 1),
(104, 1, 1),
(105, 1, 1),
(150, 2, 1),
(151, 2, 1),
(152, 2, 1),
(153, 2, 1),
(154, 2, 1),
(200, 3, 1),
(201, 3, 1),
(202, 3, 1),
(203, 3, 1),
(204, 3, 1),
(251, 4, 1),
(252, 4, 1),
(253, 4, 1),
(254, 4, 1),
(255, 4, 1),
(300, 5, 1),
(301, 5, 1),
(302, 5, 1),
(303, 5, 1),
(304, 5, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `Id` int(12) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `Patronymic` varchar(50) DEFAULT NULL,
  `PhoneNumber` int(11) NOT NULL,
  `Bio` text,
  `Birthday` datetime DEFAULT NULL,
  `Email` text NOT NULL,
  `Password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `categoryFacilities`
--
ALTER TABLE `categoryFacilities`
  ADD PRIMARY KEY (`categoryId`,`facilitiesId`),
  ADD KEY `facilitiesId` (`facilitiesId`);

--
-- Индексы таблицы `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`Id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `User` (`User`),
  ADD KEY `Room` (`Room`);

--
-- Индексы таблицы `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`number`),
  ADD KEY `category` (`category`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(12) NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `categoryFacilities`
--
ALTER TABLE `categoryFacilities`
  ADD CONSTRAINT `categoryFacilities_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `categoryFacilities_ibfk_2` FOREIGN KEY (`facilitiesId`) REFERENCES `facilities` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Room`) REFERENCES `rooms` (`number`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`User`) REFERENCES `users` (`Id`);

--
-- Ограничения внешнего ключа таблицы `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
