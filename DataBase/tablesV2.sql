SET default_storage_engine = InnoDB;
SET NAMES utf8mb4;

-- Departamentos
CREATE TABLE departments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL UNIQUE,
    abbreviation VARCHAR(4) NOT NULL UNIQUE,
    description VARCHAR(180),
    department_head VARCHAR(60) NOT NULL,
    status TINYINT UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Pisos
CREATE TABLE floors (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(180) NOT NULL,
    status TINYINT UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Áreas
CREATE TABLE areas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    description VARCHAR(180),
    type TINYINT UNSIGNED NOT NULL DEFAULT 1,
    status TINYINT UNSIGNED NOT NULL DEFAULT 1,
    id_floor INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_floor) REFERENCES floors(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CHECK (status IN (0,1))
) ENGINE=InnoDB;

-- Tabla para contraseñas
CREATE TABLE passwords (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    password_hash VARCHAR(128) NOT NULL
) ENGINE=InnoDB;

-- Usuarios
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    last_name VARCHAR(30) NOT NULL,
    username VARCHAR(25) NOT NULL UNIQUE,
    role TINYINT UNSIGNED NOT NULL DEFAULT 1,
    password_id INT UNSIGNED NOT NULL,
    status TINYINT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (password_id) REFERENCES passwords(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Categorías de dispositivos
CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    description VARCHAR(180) NOT NULL,
    type TINYINT UNSIGNED NOT NULL DEFAULT 1,
    status TINYINT UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Campos personalizados por categoría
CREATE TABLE custom_fields (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    data_type VARCHAR(10) NOT NULL,
    category_id INT UNSIGNED NOT NULL,
    required TINYINT(1) DEFAULT 0,
    status TINYINT(1) DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Grupos de dispositivos
CREATE TABLE device_groups (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    group_number SMALLINT UNSIGNED NOT NULL UNIQUE
) ENGINE=InnoDB;

-- Dispositivos
CREATE TABLE devices (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    serial_number VARCHAR(50) NOT NULL UNIQUE,
    category_id INT UNSIGNED NOT NULL,
    group_id INT UNSIGNED NOT NULL,
    status TINYINT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (group_id) REFERENCES device_groups(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Valores personalizados por dispositivo
CREATE TABLE device_custom_values (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    device_id INT UNSIGNED NOT NULL,
    custom_field_id INT UNSIGNED NOT NULL,
    value TEXT,
    FOREIGN KEY (device_id) REFERENCES devices(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (custom_field_id) REFERENCES custom_fields(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Insumos
CREATE TABLE supplies (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(30) NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    stock INT UNSIGNED NOT NULL DEFAULT 0,
    new_stock INT UNSIGNED NOT NULL DEFAULT 0,
    used_stock INT UNSIGNED NOT NULL DEFAULT 0,
    empty_stock INT UNSIGNED NOT NULL DEFAULT 0,
    category_id INT UNSIGNED NOT NULL,
    status TINYINT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CHECK (status IN (0,1))
) ENGINE=InnoDB;

-- Relación insumos-áreas
CREATE TABLE supplies_areas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    partial_stock INT UNSIGNED NOT NULL DEFAULT 0,
    new_stock INT UNSIGNED NOT NULL DEFAULT 0,
    used_stock INT UNSIGNED NOT NULL DEFAULT 0,
    empty_stock INT UNSIGNED NOT NULL DEFAULT 0,
    material_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (material_id) REFERENCES supplies(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Movimientos registrados
CREATE TABLE movements (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    movement_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    affected_table VARCHAR(50) NOT NULL,
    change_type TINYINT UNSIGNED NOT NULL,
    after_info TEXT,
    before_info TEXT,
    object_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    status TINYINT UNSIGNED NOT NULL DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CHECK (status IN (0,1))
) ENGINE=InnoDB;

-- Configuración de respaldos
CREATE TABLE IF NOT EXISTS backup_config (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    tipo ENUM('diario', 'semanal', 'mensual', 'anual') NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') DEFAULT NULL,
    dia_mes TINYINT UNSIGNED DEFAULT NULL,
    mes_anual ENUM('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre') DEFAULT NULL,
    hora TIME NOT NULL,
    ultimo_respaldo DATETIME DEFAULT NULL,
    status TINYINT UNSIGNED NOT NULL DEFAULT 1,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
