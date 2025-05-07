create DATABASE isst_database;
use isst_database;
DROP DATABASE isst_database;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(255) UNIQUE NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    primer_Apellido VARCHAR(255),
    segundo_Apellido VARCHAR(255),
    fecha_nacimiento DATE NOT NULL,
    tipo ENUM('persona', 'empresa') NOT NULL,
    CIF VARCHAR(20) NULL,
    CHECK ((tipo = 'empresa' AND CIF IS NOT NULL AND CIF <> '') OR 
           (tipo = 'persona' AND (CIF IS NULL OR CIF = '')))
);


-- Insertar usuarios de tipo persona
INSERT INTO Usuario (nombreUsuario, correo, contraseña, nombre, primer_Apellido, segundo_Apellido, fecha_nacimiento, tipo) 
VALUES 
('juanperez', 'juan.perez@email.com', 'contraseña123', 'Juan', 'Pérez', 'García', '1990-05-12', 'persona'),
('ana.garcia', 'ana.garcia@email.com', 'password456', 'Ana', 'García', NULL, '1985-07-20', 'persona');

INSERT INTO Usuario (nombreUsuario, correo, contraseña, nombre, primer_Apellido, segundo_Apellido, fecha_nacimiento, tipo, CIF) 
VALUES 
('empresa_tech', 'contacto@empresa.com', 'empresa123', 'Empresa Tech', NULL, NULL, '2005-04-15', 'empresa', 'A12345678'),
('servicios_srl', 'contacto@serviciossrl.com', 'servicios456', 'Servicios SRL', NULL, NULL, '2010-08-25', 'empresa', 'B98765432');

CREATE USER 'admin' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON eventconnect_db.* TO 'admin';
FLUSH PRIVILEGES;

CREATE TABLE Evento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    fecha TIMESTAMP NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    organizador_Id INT NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(255),
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (organizador_Id) REFERENCES Usuario(id) ON DELETE CASCADE
);

INSERT INTO Evento (nombre, fecha, ubicacion, organizador_Id, descripcion, categoria, precio) VALUES
('Conferencia de Tecnología', '2025-05-10 10:00:00', 'Madrid, España', 1, 'Evento sobre las últimas tendencias en tecnología.', 'Tecnología', 25.00),
('Concierto de Rock', '2025-06-15 20:00:00', 'Barcelona, España', 2, 'Banda en vivo con los mejores éxitos del rock.', 'Música', 50.00),
('Torneo de Ajedrez', '2025-04-20 15:00:00', 'Valencia, España', 3, 'Competencia abierta para jugadores de todos los niveles.', 'Deportes', 10.00),
('Feria del Libro', '2025-07-05 11:00:00', 'Sevilla, España', 4, 'Encuentro con autores y presentaciones de libros.', 'Cultura', NULL);


CREATE TABLE Grupo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    evento_Id INT NOT NULL,
    admin_Id INT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (evento_Id) REFERENCES Evento(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_Id) REFERENCES Usuario(id) ON DELETE CASCADE
);

INSERT INTO Grupo (nombre, evento_Id, admin_Id, descripcion) VALUES
('Tech Enthusiasts', 1, 1, 'Discusiones sobre tecnología y networking profesional'),
('Amantes del Rock', 2, 2, 'Grupo para fans del concierto de rock - organiza meetups'),
('Ajedrez Valencia', 3, 3, 'Grupo oficial del torneo de ajedrez'),
('Club de Lectura', 4, 4, 'Compartimos opiniones sobre libros presentados en la feria');

INSERT INTO Grupo (nombre, evento_Id, admin_Id, descripcion) VALUES
('Club de Prueba', 4, 1, 'LOREM IPSUM');


CREATE TABLE Mensaje (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenido VARCHAR(255) NOT NULL,
    remitente_Id INT NOT NULL,
    grupo_Id INT NOT NULL,
    fecha TIMESTAMP NOT NULL,
    FOREIGN KEY (remitente_Id) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (grupo_Id) REFERENCES Grupo(id) ON DELETE CASCADE
);

INSERT INTO Mensaje (contenido, remitente_Id, grupo_Id, fecha) VALUES
('Hola a todos! ¿Alguien va a la conferencia de IA?', 1, 1, '2025-04-01 10:30:00'),
('Sí, estaré allí. ¿Quieren quedar antes para tomar un café?', 2, 1, '2025-04-01 10:35:00'),
('Buena idea, propongo el café junto al centro de convenciones', 3, 1, '2025-04-01 10:40:00');

-- Mensajes para el grupo Amantes del Rock (ID 2)
INSERT INTO Mensaje (contenido, remitente_Id, grupo_Id, fecha) VALUES
('¿Sabéis si habrá merchandising de la banda?', 2, 2, '2025-05-20 15:22:00'),
('Sí, confirmado que tendrán stand con camisetas y discos', 4, 2, '2025-05-20 15:25:00'),
('Genial! Llevaré dinero extra entonces', 1, 2, '2025-05-20 15:30:00');

-- Mensajes para el grupo Ajedrez Valencia (ID 3)
INSERT INTO Mensaje (contenido, remitente_Id, grupo_Id, fecha) VALUES
('Recordad que las inscripciones cierran mañana', 3, 3, '2025-03-15 09:00:00'),
('¿Alguien quiere practicar antes del torneo?', 1, 3, '2025-03-15 09:05:00'),
('Yo puedo el jueves por la tarde', 2, 3, '2025-03-15 09:10:00');

-- Mensajes para el grupo Club de Lectura (ID 4)
INSERT INTO Mensaje (contenido, remitente_Id, grupo_Id, fecha) VALUES
('Acabo de terminar el libro de García Márquez, impresionante', 4, 4, '2025-06-10 20:15:00'),
('¿Qué otros autores recomiendan del género realismo mágico?', 2, 4, '2025-06-10 20:20:00'),
('Isabel Allende es una buena opción para continuar', 3, 4, '2025-06-10 20:25:00');



CREATE TABLE Usuario_Evento (
    usuario_Id INT,
    evento_Id INT,
    PRIMARY KEY (usuario_Id, evento_Id),
    FOREIGN KEY (usuario_Id) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_Id) REFERENCES Evento(id) ON DELETE CASCADE
);

INSERT INTO Usuario_Evento (usuario_Id, evento_Id) VALUES
-- Usuario 1 asiste a Eventos 1 y 2
(1, 1), (1, 2),
-- Usuario 2 asiste a Eventos 2 y 3
(2, 2), (2, 3),
-- Usuario 3 asiste a Eventos 1 y 4
(3, 1), (3, 4),
-- Usuario 4 asiste a todos los eventos
(4, 1), (4, 2), (4, 3), (4, 4);
INSERT INTO Usuario_Evento (usuario_Id, evento_Id) VALUES
(1, 5);

CREATE TABLE Usuario_Grupo (
    usuario_Id INT,
    grupo_Id INT,
    PRIMARY KEY (usuario_Id, grupo_Id),
    FOREIGN KEY (usuario_Id) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (grupo_Id) REFERENCES Grupo(id) ON DELETE CASCADE
);

-- Usuarios uniéndose a grupos (relación muchos-a-muchos)
INSERT INTO Usuario_Grupo (usuario_Id, grupo_Id) VALUES
-- Usuario 1 en grupos 1 y 3
(1, 1), (1, 3),
-- Usuario 2 en grupos 2 y 4
(2, 2), (2, 4),
-- Usuario 3 en grupos 1, 3 y 4
(3, 1), (3, 3), (3, 4),
-- Usuario 4 en todos los grupos
(4, 1), (4, 2), (4, 3), (4, 4);

INSERT INTO Usuario_Grupo (usuario_Id, grupo_Id) VALUES
-- Usuario 1 en grupos 4
(1, 5);

show TABLES;
describe evento;
SELECT * FROM Usuario;
SELECT * FROM Evento;
SELECT * FROM Grupo;
SELECT * FROM Usuario_Grupo;
describe usuario;

SELECT * FROM Usuario WHERE correo = 'juan.perez@email.com' AND contraseña = 'contraseña123';
SELECT * FROM Grupo WHERE evento_id = 2
