INSERT INTO departments (id, name, description, status) VALUES
(1, 'Sistemas', 'Departamento de tecnologías y soporte técnico', 1),
(2, 'Talento Humano', 'Encargado de la gestión del personal', 1),
(3, 'Imagenologia', 'Departamento encargado de los estudios de imagen', 1),
(4, 'Hospitalizacion', 'Área encargada de la atención y estancia de los pacientes hospitalizados', 1),
(5, 'Enfermeria', 'Encargado de la atención y cuidado de los pacientes', 1),
(6, 'Biomedica', 'Departamento encargado del mantenimiento de equipos médicos', 1),
(7, 'Compras', 'Departamento encargado de la adquisición de bienes y servicios', 1),
(8, 'Inventarios', 'Encargado del control y gestión de existencias', 1),
(9, 'CxP', 'Departamento encargado del manejo de cuentas por pagar', 1),
(10, 'Cafeteria', 'Área encargada de la preparación y distribución de alimentos', 1),
(11, 'Direccion General', 'Encargado de la administración y supervisión general', 1),
(12, 'Farmacia', 'Departamento encargado de la gestión y suministro de medicamentos', 1);


INSERT INTO categories (id, name, description, type, status) VALUES
(1, 'CPU', 'Dispositivos electrónicos como laptops o pc', 1, 1),
(2, 'Laptop', 'Equipo para funcionamiento de sistemas', 2, 1)

INSERT INTO areas (id, name, description, type, status, id_floor) VALUES
(1, 'Recepción', 'Área de recepción principal', 1, 1, 1),
(2, 'Sala de Espera', 'Zona de espera para visitantes', 2, 1, 1),
(3, 'Administración', 'Oficina de administración general', 1, 1, 2),
(4, 'Sala de Juntas', 'Espacio para reuniones ejecutivas', 2, 1, 2),
(5, 'Desarrollo', 'Área del equipo de desarrollo de software', 1, 1, 3),
(6, 'Soporte Técnico', 'Área de soporte y mantenimiento', 2, 1, 3);

INSERT INTO area_departments (id, area_id, department_id) VALUES
(1, 1, 1), -- Recepción -> Sistemas
(2, 2, 2), -- Sala de Espera -> Recursos Humanos
(3, 3, 2), -- Administración -> Recursos Humanos
(4, 4, 3), -- Sala de Juntas -> Finanzas
(5, 5, 1), -- Desarrollo -> Sistemas
(6, 6, 1); -- Soporte Técnico -> Sistemas

INSERT INTO devices (id, brand, model, serial_number, category_id, group_id, area_department_id, status) VALUES
(1, 'Dell', 'Latitude 7420', 'SN123456A', 1, NULL, 1, 1),
(2, 'HP', 'LaserJet Pro M404', 'SN987654B', 2, NULL, 2, 1),
(3, 'Lenovo', 'ThinkPad E14', 'SN456789C', 1, NULL, 5, 1);
