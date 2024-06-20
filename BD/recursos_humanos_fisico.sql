-- Crear la base de datos
CREATE DATABASE recursos_humanos_fisico;

-- Usar la base de datos
USE recursos_humanos_fisico;

-- creación de tablas
CREATE TABLE PAISES (
       pais_ID INT PRIMARY KEY AUTO_INCREMENT,
       pais_nombre VARCHAR(255) NOT NULL
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   
CREATE TABLE CIUDADES (
       ciud_ID INT PRIMARY KEY AUTO_INCREMENT,
       ciud_nombre VARCHAR(255) NOT NULL,
       ciud_pais_ID INT,
       FOREIGN KEY (ciud_pais_ID) REFERENCES PAISES(pais_ID)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   
CREATE TABLE LOCACIONES (
       localiz_ID INT PRIMARY KEY AUTO_INCREMENT,
       localiz_direccion VARCHAR(255) NOT NULL,
       localiz_ciudad_ID INT,
       FOREIGN KEY (localiz_ciudad_ID) REFERENCES CIUDADES(ciud_ID)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   
CREATE TABLE DEPARTAMENTOS (
       dpto_ID INT PRIMARY KEY AUTO_INCREMENT,
       dpto_nombre VARCHAR(255) NOT NULL,
       dpto_localiz_ID INT,
       FOREIGN KEY (dpto_localiz_ID) REFERENCES LOCACIONES(localiz_ID)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   
   
CREATE TABLE CARGOS (
       cargo_ID INT PRIMARY KEY AUTO_INCREMENT,
       cargo_nombre VARCHAR(255) NOT NULL,
       cargo_sueldo_minimo DECIMAL(10, 2) NOT NULL,
       cargo_sueldo_maximo DECIMAL(10, 2) NOT NULL
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   
   
CREATE TABLE EMPLEADOS (
       empl_ID INT PRIMARY KEY AUTO_INCREMENT,
       empl_primer_nombre VARCHAR(255) NOT NULL,
       empl_segundo_nombre VARCHAR(255),
       empl_email VARCHAR(255) NOT NULL,
       empl_fecha_nac DATE NOT NULL,
       empl_sueldo DECIMAL(10, 2) NOT NULL,
       empl_comision DECIMAL(10, 2),
       empl_cargo_ID INT,
       empl_Gerente_ID INT,
       empl_dpto_ID INT,
       FOREIGN KEY (empl_cargo_ID) REFERENCES CARGOS(cargo_ID),
       FOREIGN KEY (empl_Gerente_ID) REFERENCES EMPLEADOS(empl_ID),
       FOREIGN KEY (empl_dpto_ID) REFERENCES DEPARTAMENTOS(dpto_ID)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

   CREATE TABLE HISTORICOS (
       emphist_ID INT PRIMARY KEY AUTO_INCREMENT,
       emphist_fecha_retiro DATE NOT NULL,
       emphist_cargo_ID INT,
       emphist_dpto_ID INT,
       FOREIGN KEY (emphist_cargo_ID) REFERENCES CARGOS(cargo_ID),
       FOREIGN KEY (emphist_dpto_ID) REFERENCES DEPARTAMENTOS(dpto_ID)
   ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
   
		--  Uso de claves
        CREATE INDEX idx_pais_nombre ON PAISES(pais_nombre);
        
		CREATE INDEX idx_ciud_nombre ON CIUDADES(ciud_nombre);
        
		CREATE INDEX idx_localiz_direccion ON LOCACIONES(localiz_direccion);
        
		CREATE INDEX idx_dpto_nombre ON DEPARTAMENTOS(dpto_nombre);
     
	    CREATE INDEX idx_cargo_nombre ON CARGOS(cargo_nombre);
        
		CREATE INDEX idx_empl_email ON EMPLEADOS(empl_email);
        
-- Insertar datos de prueba en la tabla PAISES
INSERT INTO PAISES (pais_nombre) VALUES
('Colombia'),
('Argentina'),
('Brasil'),
('Chile'),
('Perú');

-- Insertar datos de prueba en la tabla CIUDADES
INSERT INTO CIUDADES (ciud_nombre, ciud_pais_ID) VALUES
('Bogotá', 1),
('Buenos Aires', 2),
('São Paulo', 3),
('Santiago', 4),
('Lima', 5);

-- Insertar datos de prueba en la tabla LOCACIONES
INSERT INTO LOCACIONES (localiz_direccion, localiz_ciudad_ID) VALUES
('Calle 123', 1),
('Avenida 456', 2),
('Rua 789', 3),
('Calle 101', 4),
('Avenida 202', 5);

-- Insertar datos de prueba en la tabla DEPARTAMENTOS
INSERT INTO DEPARTAMENTOS (dpto_nombre, dpto_localiz_ID) VALUES
('Recursos Humanos', 1),
('Finanzas', 2),
('Marketing', 3),
('Ventas', 4),
('IT', 5);

-- Insertar datos de prueba en la tabla CARGOS
INSERT INTO CARGOS (cargo_nombre, cargo_sueldo_minimo, cargo_sueldo_maximo) VALUES
('Gerente', 5000.00, 10000.00),
('Analista', 3000.00, 6000.00),
('Desarrollador', 4000.00, 8000.00),
('Vendedor', 2000.00, 5000.00),
('Soporte Técnico', 2500.00, 5500.00);

-- Insertar datos de prueba en la tabla EMPLEADOS
INSERT INTO EMPLEADOS (empl_primer_nombre, empl_segundo_nombre, empl_email, empl_fecha_nac, empl_sueldo, empl_comision, empl_cargo_ID, empl_Gerente_ID, empl_dpto_ID) VALUES
('Juan', 'Perez', 'juan.perez@example.com', '1980-01-01', 7000.00, 500.00, 1, NULL, 1),
('Maria', 'Gomez', 'maria.gomez@example.com', '1985-02-02', 4500.00, 300.00, 2, 1, 2),
('Carlos', 'Lopez', 'carlos.lopez@example.com', '1990-03-03', 5000.00, 400.00, 3, 1, 3),
('Ana', 'Martinez', 'ana.martinez@example.com', '1995-04-04', 3500.00, 200.00, 4, 2, 4),
('Luis', 'Garcia', 'luis.garcia@example.com', '2000-05-05', 4000.00, 250.00, 5, 3, 5);

-- Insertar datos de prueba en la tabla HISTORICOS
INSERT INTO HISTORICOS (emphist_fecha_retiro, emphist_cargo_ID, emphist_dpto_ID) VALUES
('2020-01-01', 1, 1),
('2020-02-02', 2, 2),
('2020-03-03', 3, 3),
('2020-04-04', 4, 4),
('2020-05-05', 5, 5);

        