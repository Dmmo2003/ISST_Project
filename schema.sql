create DATABASE isst_database;
use isst_database;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(255) UNIQUE NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    primer_Apellido VARCHAR(255),
    segundo_Apellido VARCHAR(255),
    fecha_nacimiento TIMESTAMP NOT NULL,
    tipo ENUM('persona', 'empresa') NOT NULL,
    CIF VARCHAR(20) NULL,
    CHECK (tipo = 'empresa' AND CIF IS NOT NULL OR tipo = 'persona' AND CIF IS NULL)
);

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
    FOREIGN KEY (organizador_Id) REFERENCES Usuario(id) ON DELETE CASCADE
);

CREATE TABLE Grupo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    evento_Id INT NOT NULL,
    admin_Id INT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (evento_Id) REFERENCES Evento(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_Id) REFERENCES Usuario(id) ON DELETE CASCADE
);

CREATE TABLE Mensaje (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contenido VARCHAR(255) NOT NULL,
    remitente_Id INT NOT NULL,
    grupo_Id INT NOT NULL,
    fecha TIMESTAMP NOT NULL,
    FOREIGN KEY (remitente_Id) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (grupo_Id) REFERENCES Grupo(id) ON DELETE CASCADE
);

CREATE TABLE Usuario_Evento (
    usuario_Id INT,
    evento_Id INT,
    PRIMARY KEY (usuario_Id, evento_Id),
    FOREIGN KEY (usuario_Id) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (evento_Id) REFERENCES Evento(id) ON DELETE CASCADE
);

CREATE TABLE Usuario_Grupo (
    usuario_Id INT,
    grupo_Id INT,
    PRIMARY KEY (usuario_Id, grupo_Id),
    FOREIGN KEY (usuario_Id) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (grupo_Id) REFERENCES Grupo(id) ON DELETE CASCADE
);

