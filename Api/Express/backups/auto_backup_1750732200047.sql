/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: areas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `areas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `description` varchar(180) DEFAULT NULL,
  `type` tinyint unsigned NOT NULL DEFAULT '1',
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  `id_floor` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `id_floor` (`id_floor`),
  CONSTRAINT `areas_ibfk_1` FOREIGN KEY (`id_floor`) REFERENCES `floors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `areas_chk_1` CHECK ((`status` in (0, 1)))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: backup_config
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `backup_config` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tipo` enum('diario', 'semanal', 'mensual', 'anual') NOT NULL,
  `dia_semana` enum(
  'Lunes',
  'Martes',
  'Mircoles',
  'Jueves',
  'Viernes',
  'Sbado',
  'Domingo'
  ) DEFAULT NULL,
  `dia_mes` tinyint unsigned DEFAULT NULL,
  `mes_anual` enum(
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
  ) DEFAULT NULL,
  `hora` time NOT NULL,
  `ultimo_respaldo` datetime DEFAULT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categories
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(180) NOT NULL,
  `type` tinyint unsigned NOT NULL DEFAULT '1',
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: checklists
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `checklists` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `cpu` decimal(5, 2) NOT NULL DEFAULT '0.00',
  `mouse` tinyint(1) NOT NULL DEFAULT '0',
  `keyboard` tinyint(1) NOT NULL DEFAULT '0',
  `power` tinyint(1) NOT NULL DEFAULT '0',
  `disk` tinyint(1) NOT NULL DEFAULT '0',
  `display` tinyint(1) NOT NULL DEFAULT '0',
  `fan` tinyint(1) NOT NULL DEFAULT '0',
  `virus` tinyint(1) NOT NULL DEFAULT '0',
  `windows` tinyint(1) NOT NULL DEFAULT '0',
  `paper` tinyint(1) NOT NULL DEFAULT '0',
  `temp` tinyint(1) NOT NULL DEFAULT '0',
  `free_disk_space` tinyint(1) NOT NULL DEFAULT '0',
  `software_np` tinyint(1) NOT NULL DEFAULT '0',
  `extensions` tinyint(1) NOT NULL DEFAULT '0',
  `defragmentation` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  CONSTRAINT `checklists_chk_1` CHECK ((`status` in (0, 1)))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: departments
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `departments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `abbreviation` varchar(4) NOT NULL,
  `description` varchar(180) DEFAULT NULL,
  `department_head` varchar(60) NOT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `abbreviation` (`abbreviation`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: device_groups
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `device_groups` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `group_number` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_number` (`group_number`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: devices
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `devices` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `brand` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `serial_number` varchar(50) NOT NULL,
  `category_id` int unsigned NOT NULL,
  `group_id` int unsigned NOT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `serial_number` (`serial_number`),
  KEY `category_id` (`category_id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `devices_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `device_groups` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: floors
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `floors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(180) NOT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: guard_rep
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `guard_rep` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `report_date` date NOT NULL DEFAULT (curdate()),
  `name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `group_id` int unsigned NOT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  CONSTRAINT `guard_rep_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `device_groups` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `guard_rep_chk_1` CHECK ((`status` in (0, 1)))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: leave_records
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `leave_records` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `record_date` date NOT NULL DEFAULT (curdate()),
  `info` varchar(255) NOT NULL,
  `detected` varchar(255) NOT NULL,
  `removal_observations` varchar(255) NOT NULL,
  `device_id` int unsigned NOT NULL,
  `department_id` int unsigned NOT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `device_id` (`device_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `leave_records_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `leave_records_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `leave_records_chk_1` CHECK ((`status` in (0, 1)))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: maintenance_rep
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `maintenance_rep` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `maintenance_date` date NOT NULL DEFAULT (curdate()),
  `username` varchar(50) NOT NULL,
  `user_password` varchar(128) NOT NULL,
  `group_id` int unsigned NOT NULL,
  `checklist_id` int unsigned NOT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `checklist_id` (`checklist_id`),
  CONSTRAINT `maintenance_rep_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `device_groups` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `maintenance_rep_ibfk_2` FOREIGN KEY (`checklist_id`) REFERENCES `checklists` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `maintenance_rep_chk_1` CHECK ((`status` in (0, 1)))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: movements
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `movements` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `movement_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `affected_table` varchar(50) NOT NULL,
  `change_type` tinyint unsigned NOT NULL,
  `after_info` text,
  `before_info` text,
  `object_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `movements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `movements_chk_1` CHECK ((`status` in (0, 1)))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: passwords
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `passwords` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `password_hash` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: supplies
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `supplies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `brand` varchar(30) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `stock` int unsigned NOT NULL DEFAULT '0',
  `new_stock` int unsigned NOT NULL DEFAULT '0',
  `used_stock` int unsigned NOT NULL DEFAULT '0',
  `empty_stock` int unsigned NOT NULL DEFAULT '0',
  `category_id` int unsigned NOT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `supplies_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `supplies_chk_1` CHECK ((`status` in (0, 1)))
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: supplies_areas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `supplies_areas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `partial_stock` int unsigned NOT NULL DEFAULT '0',
  `new_stock` int unsigned NOT NULL DEFAULT '0',
  `used_stock` int unsigned NOT NULL DEFAULT '0',
  `empty_stock` int unsigned NOT NULL DEFAULT '0',
  `material_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `material_id` (`material_id`),
  CONSTRAINT `supplies_areas_ibfk_1` FOREIGN KEY (`material_id`) REFERENCES `supplies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `username` varchar(25) NOT NULL,
  `role` tinyint unsigned NOT NULL DEFAULT '1',
  `password_id` int unsigned NOT NULL,
  `status` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `username` (`username`),
  KEY `password_id` (`password_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`password_id`) REFERENCES `passwords` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: areas
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: backup_config
# ------------------------------------------------------------

INSERT INTO
  `backup_config` (
    `id`,
    `tipo`,
    `dia_semana`,
    `dia_mes`,
    `mes_anual`,
    `hora`,
    `ultimo_respaldo`,
    `status`
  )
VALUES
  (1, 'diario', NULL, NULL, NULL, '00:00:00', NULL, 0);
INSERT INTO
  `backup_config` (
    `id`,
    `tipo`,
    `dia_semana`,
    `dia_mes`,
    `mes_anual`,
    `hora`,
    `ultimo_respaldo`,
    `status`
  )
VALUES
  (2, 'semanal', 'Lunes', NULL, NULL, '00:00:00', NULL, 0);
INSERT INTO
  `backup_config` (
    `id`,
    `tipo`,
    `dia_semana`,
    `dia_mes`,
    `mes_anual`,
    `hora`,
    `ultimo_respaldo`,
    `status`
  )
VALUES
  (3, 'diario', NULL, NULL, NULL, '00:00:00', NULL, 0);
INSERT INTO
  `backup_config` (
    `id`,
    `tipo`,
    `dia_semana`,
    `dia_mes`,
    `mes_anual`,
    `hora`,
    `ultimo_respaldo`,
    `status`
  )
VALUES
  (4, 'mensual', NULL, 1, NULL, '00:00:00', NULL, 0);
INSERT INTO
  `backup_config` (
    `id`,
    `tipo`,
    `dia_semana`,
    `dia_mes`,
    `mes_anual`,
    `hora`,
    `ultimo_respaldo`,
    `status`
  )
VALUES
  (5, 'anual', NULL, NULL, 'Febrero', '00:00:00', NULL, 0);
INSERT INTO
  `backup_config` (
    `id`,
    `tipo`,
    `dia_semana`,
    `dia_mes`,
    `mes_anual`,
    `hora`,
    `ultimo_respaldo`,
    `status`
  )
VALUES
  (6, 'diario', NULL, NULL, NULL, '00:00:00', NULL, 0);
INSERT INTO
  `backup_config` (
    `id`,
    `tipo`,
    `dia_semana`,
    `dia_mes`,
    `mes_anual`,
    `hora`,
    `ultimo_respaldo`,
    `status`
  )
VALUES
  (7, 'diario', NULL, NULL, NULL, '00:00:00', NULL, 0);
INSERT INTO
  `backup_config` (
    `id`,
    `tipo`,
    `dia_semana`,
    `dia_mes`,
    `mes_anual`,
    `hora`,
    `ultimo_respaldo`,
    `status`
  )
VALUES
  (8, 'diario', NULL, NULL, NULL, '20:30:00', NULL, 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categories
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: checklists
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: departments
# ------------------------------------------------------------

INSERT INTO
  `departments` (
    `id`,
    `name`,
    `abbreviation`,
    `description`,
    `department_head`,
    `status`
  )
VALUES
  (1, 'Test', 'TES', 'Test', 'Test', 1);
INSERT INTO
  `departments` (
    `id`,
    `name`,
    `abbreviation`,
    `description`,
    `department_head`,
    `status`
  )
VALUES
  (3, 'test2', 'tes2', 'test2', 'test2', 0);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: device_groups
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: devices
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: floors
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: guard_rep
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: leave_records
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: maintenance_rep
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: movements
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: passwords
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: supplies
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: supplies_areas
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
