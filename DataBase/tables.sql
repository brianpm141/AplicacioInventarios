CREATE TABLE passwords (
    id INT PRIMARY KEY,
    password VARCHAR(255)
);

CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    department_head VARCHAR(255),
    status INT
);

CREATE TABLE floors (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    status INT
);

CREATE TABLE areas (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    type INT,
    id_floor INT,
    status INT,
    FOREIGN KEY (id_floor) REFERENCES floors(id)
);

CREATE TABLE area_departments (
    id INT PRIMARY KEY,
    area_id INT,
    department_id INT,
    FOREIGN KEY (area_id) REFERENCES areas(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    last_name VARCHAR(255),
    username VARCHAR(255),
    role INT,
    password_id INT,
    department_id INT,
    status INT,
    FOREIGN KEY (password_id) REFERENCES passwords(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE categories (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    type INT,
    status INT
);

CREATE TABLE device_groups (
    id INT PRIMARY KEY,
    group_number INT
);


CREATE TABLE devices (
    id INT PRIMARY KEY,
    brand VARCHAR(255),
    model VARCHAR(255),
    serial_number VARCHAR(255),
    category_id INT,
    group_id INT,
    area_department_id INT,
    status INT,
    FOREIGN KEY (category_id) REFERENCES categories(id), 
    FOREIGN KEY (group_id) REFERENCES device_groups(id),
    FOREIGN KEY (area_department_id) REFERENCES area_departments(id)
);


CREATE TABLE supplies (
    id INT PRIMARY KEY,
    brand VARCHAR(255),
    product_name VARCHAR(255),
    stock INT,
    new_stock INT,
    used_stock INT,
    empty_stock INT,
    category_id INT,
    status INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);


CREATE TABLE supplies_areas (
    id INT PRIMARY KEY,
    partial_stock INT,
    new_stock INT,
    used_stock INT,
    empty_stock INT,
    material_id INT,
    area_department_id INT,
    FOREIGN KEY (material_id) REFERENCES supplies(id),
    FOREIGN KEY (area_department_id) REFERENCES area_departments(id)
);


CREATE TABLE guard_rep (
    id INT PRIMARY KEY,
    date DATE,
    name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    area_department_id INT,
    group_id INT,
    status INT,
    FOREIGN KEY (area_department_id) REFERENCES area_departments(id),
    FOREIGN KEY (group_id) REFERENCES device_groups(id)
);


CREATE TABLE checklists (
    id INT PRIMARY KEY,
    cpu DOUBLE,
    mouse BOOLEAN,
    keyboard BOOLEAN,
    power BOOLEAN,
    disk BOOLEAN,
    display BOOLEAN,
    fan BOOLEAN,
    virus BOOLEAN,
    windows BOOLEAN,
    paper BOOLEAN,
    temp BOOLEAN,
    free_disk_space BOOLEAN,
    software_np BOOLEAN,
    extensions BOOLEAN,
    defragmentation BOOLEAN
);

CREATE TABLE leave_records (
    id INT PRIMARY KEY,
    date DATE,
    info VARCHAR(255),
    detected VARCHAR(255),
    removal_observations VARCHAR(255),
    device_id INT,
    department_id INT,
    status INT,
    FOREIGN KEY (device_id) REFERENCES devices(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE maintenance_rep (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    date DATE,
    username VARCHAR(255),
    user_password VARCHAR(255),
    group_id INT,
    checklist_id INT,
    status INT,
    FOREIGN KEY (group_id) REFERENCES device_groups(id),
    FOREIGN KEY (checklist_id) REFERENCES checklists(id)
);


CREATE TABLE movements (
    id INT PRIMARY KEY,
    date DATE,
    affected_table VARCHAR(255),
    change_type INT,
    after_info VARCHAR(255),
    before_info VARCHAR(255),
    object_id INT,
    user_id INT,
    status INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
