-- Active: 1721317293145@@127.0.0.1@3306@EventProDB
-- Tabla municipio
CREATE TABLE municipio (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(25) NOT NULL UNIQUE
);

-- Tabla disponibilidad
CREATE TABLE disponibilidad (
    codigo VARCHAR(5) PRIMARY KEY,
    descripcion VARCHAR(10) UNIQUE
);

-- Tabla salon
CREATE TABLE salon (
    codigo VARCHAR(15) PRIMARY KEY,
    nombre VARCHAR(20) UNIQUE,
    dir_calle VARCHAR(25),
    dir_num INT,
    dir_colonia VARCHAR(25),
    costo DECIMAL(10, 2),
    disponibilidad VARCHAR(5),
    municipio INT,
    FOREIGN KEY (disponibilidad) REFERENCES disponibilidad(codigo),
    FOREIGN KEY (municipio) REFERENCES municipio(codigo)
);

-- Tabla lista_asistencia
CREATE TABLE lista_asistencia (
    numero INT AUTO_INCREMENT PRIMARY KEY,
    hora_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    nombre_empleado VARCHAR(25),
    area VARCHAR(25)
);

-- Tabla tarjeta_RFID
CREATE TABLE tarjeta_RFID (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    lista_asistencia_numero INT UNIQUE,
    FOREIGN KEY (lista_asistencia_numero) REFERENCES lista_asistencia(numero)
);

-- Tabla registro_acceso
CREATE TABLE registro_acceso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora_acceso DATETIME DEFAULT CURRENT_TIMESTAMP,
    tarjeta_RFID_id INT,
    salon_codigo VARCHAR(15),
    FOREIGN KEY (tarjeta_RFID_id) REFERENCES tarjeta_RFID(id),
    FOREIGN KEY (salon_codigo) REFERENCES salon(codigo)
);

-- Tabla servicios_paquetes
CREATE TABLE servicios_paquetes (
    numero INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE,
    descripcion TEXT,
    precio DECIMAL(10, 2)
);

-- Tabla estado
CREATE TABLE estado (
    codigo VARCHAR(5) PRIMARY KEY,
    descripcion VARCHAR(30) UNIQUE
);

-- Tabla transporte
CREATE TABLE transporte (
    matricula VARCHAR(10) PRIMARY KEY,
    capacidad INT NOT NULL,
    costo DECIMAL(10, 2) NOT NULL
);

-- Tabla factura
CREATE TABLE factura (
    numero INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(25),
    fecha_factura DATE,
    monto_total DECIMAL(10, 2),
    sub_total DECIMAL(10, 2),
    IVA DECIMAL(10, 2)
);

-- Tabla hotel
CREATE TABLE hotel (
    codigo VARCHAR(5) PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE,
    dir_calle VARCHAR(25),
    dir_num INT,
    dir_colonia VARCHAR(25),
    contacto INT
);

ALTER TABLE hotel MODIFY COLUMN contacto VARCHAR(15);


-- Tabla cliente
CREATE TABLE cliente (
    numero INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(25) NOT NULL,
    dir_calle VARCHAR(25) NOT NULL,
    dir_num INT NOT NULL,
    dir_colonia VARCHAR(25) NOT NULL,
    num_tel INT NOT NULL,
    correo VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    municipio INT,
    FOREIGN KEY (municipio) REFERENCES municipio(codigo)
);

ALTER TABLE cliente MODIFY COLUMN num_tel VARCHAR(15);


-- Tabla evento
CREATE TABLE evento (
    numero INT AUTO_INCREMENT PRIMARY KEY,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_evento DATE NOT NULL,
    evento_inicio TIME NOT NULL,
    evento_fin TIME NOT NULL,
    duracion TIME,
    cantidad_personas INT NOT NULL,
    salon VARCHAR(15),
    hotel VARCHAR(5),
    estado VARCHAR(5),
    transporte VARCHAR(10),
    servicios INT,
    factura INT UNIQUE,
    lista_asistencia INT UNIQUE,
    cliente INT,
    FOREIGN KEY (salon) REFERENCES salon(codigo),
    FOREIGN KEY (hotel) REFERENCES hotel(codigo),
    FOREIGN KEY (estado) REFERENCES estado(codigo),
    FOREIGN KEY (transporte) REFERENCES transporte(matricula),
    FOREIGN KEY (servicios) REFERENCES servicios_paquetes(numero),
    FOREIGN KEY (factura) REFERENCES factura(numero),
    FOREIGN KEY (lista_asistencia) REFERENCES lista_asistencia(numero),
    FOREIGN KEY (cliente) REFERENCES cliente(numero)
);

CREATE TABLE evaluacion (
    numero INT PRIMARY KEY AUTO_INCREMENT,
    calificacion DECIMAL(3, 2),
    comentarios TEXT,
    evento INT UNIQUE,
    cliente INT,
    FOREIGN KEY (evento) REFERENCES evento(numero),
    FOREIGN KEY (cliente) REFERENCES cliente(numero)
);


-- Tabla habitaciones
CREATE TABLE habitaciones (
    numero INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) UNIQUE,
    precio DECIMAL(10, 2),
    hotel VARCHAR(5),
    FOREIGN KEY (hotel) REFERENCES hotel(codigo)
);

-- Inserts para la tabla municipio con los 32 estados de México
INSERT INTO municipio (nombre) VALUES
('Aguascalientes'),
('Baja California'),
('Baja California Sur'),
('Campeche'),
('Chiapas'),
('Chihuahua'),
('Coahuila'),
('Colima'),
('Durango'),
('Guanajuato'),
('Guerrero'),
('Hidalgo'),
('Jalisco'),
('Mexico'),
('Mexico City'),
('Michoacán'),
('Morelos'),
('Nayarit'),
('Nuevo León'),
('Oaxaca'),
('Puebla'),
('Querétaro'),
('Quintana Roo'),
('San Luis Potosí'),
('Sinaloa'),
('Sonora'),
('Tabasco'),
('Tamaulipas'),
('Tlaxcala'),
('Veracruz'),
('Yucatán'),
('Zacatecas');


-- Inserts para la tabla disponibilidad
INSERT INTO disponibilidad (codigo, descripcion) VALUES
('D1', 'Disponible'),
('D2', 'No Disp.');

-- Inserts para la tabla salon
INSERT INTO salon (codigo, nombre, dir_calle, dir_num, dir_colonia, costo, disponibilidad, municipio) VALUES
('S001', 'Salón Principal', 'Av. Reforma', 123, 'Centro', 5000.00, 'D1', 1),
('S002', 'Salón Secundario', 'Av. Insurgentes', 456, 'Roma', 3000.00, 'D2', 2);

-- Inserts para la tabla lista_asistencia
INSERT INTO lista_asistencia (hora_registro, nombre_empleado, area) VALUES
('2024-07-01 08:00:00', 'Juan Pérez', 'Ventas'),
('2024-07-01 09:00:00', 'María López', 'Recursos Humanos'),
('2024-07-01 10:00:00', 'Carlos García', 'Marketing');

-- Inserts para la tabla tarjeta_RFID
INSERT INTO tarjeta_RFID (codigo, lista_asistencia_numero) VALUES
('RFID001', 1),
('RFID002', 2),
('RFID003', 3);

-- Inserts para la tabla registro_acceso
INSERT INTO registro_acceso (hora_acceso, tarjeta_RFID_id, salon_codigo) VALUES
('2024-07-01 08:30:00', 1, 'S001'),
('2024-07-01 09:30:00', 2, 'S002'),
('2024-07-01 10:30:00', 3, 'S001');

-- Inserts para la tabla servicios_paquetes
INSERT INTO servicios_paquetes (nombre, descripcion, precio) VALUES
('Paquete Básico', 'Incluye servicio básico', 1000.00),
('Paquete Premium', 'Incluye servicio premium', 3000.00);

-- Inserts para la tabla estado
INSERT INTO estado (codigo, descripcion) VALUES
('E1', 'Activo'),
('E2', 'Inactivo');

-- Inserts para la tabla transporte
INSERT INTO transporte (matricula, capacidad, costo) VALUES
('ABC123', 50, 1500.00),
('XYZ789', 30, 1000.00);

-- Inserts para la tabla factura
INSERT INTO factura (descripcion, fecha_factura, monto_total, sub_total, IVA) VALUES
('Servicios de Catering', '2024-07-01', 1160.00, 1000.00, 160.00),
('Alquiler de Salón', '2024-07-02', 2320.00, 2000.00, 320.00);

-- Inserts para la tabla hotel
INSERT INTO hotel (codigo, nombre, dir_calle, dir_num, dir_colonia, contacto) VALUES
('H001', 'Hotel Reforma', 'Avenida Reforma', 123, 'Centro', '5551234567'),
('H002', 'Hotel Chapultepec', 'Avenida Chapultepec', 456, 'Roma', '5552345678');


-- Inserts para la tabla cliente
INSERT INTO cliente (nombre, dir_calle, dir_num, dir_colonia, num_tel, correo, password, municipio) VALUES
('Luis Martínez', 'Calle 1', 123, 'Colonia A', '5551234567', 'luis.martinez@gmail.com', 'password123', 1),
('María Fernández', 'Calle 2', 456, 'Colonia B', '5552345678', 'maria.fernandez@gmail.com', 'password456', 2);


-- Inserts para la tabla evento
INSERT INTO evento (fecha_registro, fecha_evento, evento_inicio, evento_fin, duracion, cantidad_personas, salon, hotel, estado, transporte, servicios, factura, lista_asistencia, cliente) VALUES
('2024-07-01 12:00:00', '2024-08-01', '10:00:00', '18:00:00', '08:00:00', 100, 'S001', 'H001', 'E1', 'ABC123', 1, 1, 1, 1),
('2024-07-02 12:00:00', '2024-08-15', '09:00:00', '17:00:00', '08:00:00', 150, 'S002', 'H002', 'E2', 'XYZ789', 2, 2, 2, 2);

-- Inserts para la tabla evaluacion
INSERT INTO evaluacion (calificacion, comentarios, evento, cliente) VALUES
(4.5, 'Muy buen evento', 1, 1),
(3.8, 'Evento satisfactorio', 2, 2);

-- Inserts para la tabla habitaciones
INSERT INTO habitaciones (tipo, precio, hotel) VALUES
('Individual', 800.00, 'H001'),
('Doble', 1200.00, 'H002');
