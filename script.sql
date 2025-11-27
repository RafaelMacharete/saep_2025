
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema saep_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `saep_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `saep_db` ;

-- -----------------------------------------------------
-- Table `saep_db`.`auth_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saep_db`.`auth_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(128) NOT NULL,
  `last_login` DATETIME(6) NULL DEFAULT NULL,
  `is_superuser` TINYINT(1) NOT NULL,
  `username` VARCHAR(150) NOT NULL,
  `first_name` VARCHAR(150) NOT NULL,
  `last_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `is_staff` TINYINT(1) NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `date_joined` DATETIME(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `saep_db`.`api_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saep_db`.`api_product` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `minimum_quantity` INT UNSIGNED NOT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  `current_quantity` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `saep_db`.`api_historical`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saep_db`.`api_historical` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `operation_type` VARCHAR(50) NOT NULL,
  `operation_date` DATETIME(6) NOT NULL,
  `quantity_moved` INT NOT NULL,
  `movement_responsible_id` INT NULL DEFAULT NULL,
  `product_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `api_historical_movement_responsible_id_c2a9517b_fk_auth_user_id` (`movement_responsible_id` ASC) VISIBLE,
  INDEX `api_historical_product_id_e40b33a9_fk_api_product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `api_historical_movement_responsible_id_c2a9517b_fk_auth_user_id`
    FOREIGN KEY (`movement_responsible_id`)
    REFERENCES `saep_db`.`auth_user` (`id`),
  CONSTRAINT `api_historical_product_id_e40b33a9_fk_api_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `saep_db`.`api_product` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;





SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema saep_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `saep_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `saep_db` ;

-- -----------------------------------------------------
-- Table `saep_db`.`auth_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saep_db`.`auth_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(128) NOT NULL,
  `last_login` DATETIME(6) NULL DEFAULT NULL,
  `is_superuser` TINYINT(1) NOT NULL,
  `username` VARCHAR(150) NOT NULL,
  `first_name` VARCHAR(150) NOT NULL,
  `last_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  `is_staff` TINYINT(1) NOT NULL,
  `is_active` TINYINT(1) NOT NULL,
  `date_joined` DATETIME(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `saep_db`.`api_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saep_db`.`api_product` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `minimum_quantity` INT UNSIGNED NOT NULL,
  `description` LONGTEXT NULL DEFAULT NULL,
  `current_quantity` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `saep_db`.`api_historical`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saep_db`.`api_historical` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `operation_type` VARCHAR(50) NOT NULL,
  `operation_date` DATETIME(6) NOT NULL,
  `quantity_moved` INT NOT NULL,
  `movement_responsible_id` INT NULL DEFAULT NULL,
  `product_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `api_historical_movement_responsible_id_c2a9517b_fk_auth_user_id` (`movement_responsible_id` ASC) VISIBLE,
  INDEX `api_historical_product_id_e40b33a9_fk_api_product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `api_historical_movement_responsible_id_c2a9517b_fk_auth_user_id`
    FOREIGN KEY (`movement_responsible_id`)
    REFERENCES `saep_db`.`auth_user` (`id`),
  CONSTRAINT `api_historical_product_id_e40b33a9_fk_api_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `saep_db`.`api_product` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO auth_user (password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined)
VALUES
('pbkdf2_sha256$fake1', NULL, 0, 'joao', 'João', 'Silva', 'joao@example.com', 0, 1, '2025-01-10 10:00:00'),

('pbkdf2_sha256$fake2', NULL, 0, 'maria', 'Maria', 'Oliveira', 'maria@example.com', 0, 1, '2025-02-15 14:30:00'),

('pbkdf2_sha256$fake3', NULL, 1, 'admin', 'Super', 'User', 'admin@example.com', 1, 1, '2025-03-01 09:00:00');

INSERT INTO api_product (name, minimum_quantity, description, current_quantity)
VALUES
('Caneta Azul', 10, 'Caneta esferográfica azul', 120),

('Caderno Universitário', 5, 'Caderno 200 folhas', 45),

('Grampeador', 2, 'Grampeador metálico grande', 18);

INSERT INTO api_historical (operation_type, operation_date, quantity_moved, movement_responsible_id, product_id)
VALUES
('Entrada', '2025-03-10 09:30:00', 20, 1, 1),

('Saída', '2025-03-11 15:20:00', 5, 2, 2),

('Entrada', '2025-03-12 11:10:00', 12, 3, 3);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
