CREATE TABLE Usuario (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) UNIQUE NOT NULL,
    Correo VARCHAR(255) UNIQUE NOT NULL,
    Contraseña VARCHAR(255) NOT NULL,
    Nombre VARCHAR(255) NOT NULL,
    Primer_Apellido VARCHAR(255) NOT NULL,
    Segundo_Apellido VARCHAR(255),
    Fecha_nac TIMESTAMP NOT NULL,
    Tipo ENUM('persona', 'empresa') NOT NULL,  
    CIF VARCHAR(20) NULL,  
    CHECK (Tipo IN ('persona', 'empresa')),
    CHECK (Tipo = 'empresa' AND CIF IS NOT NULL OR Tipo = 'persona' AND CIF IS NULL), 
    CHECK (Fecha_nac <= CURRENT_TIMESTAMP) 
);


CREATE TABLE Evento (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Fecha TIMESTAMP NOT NULL,
    Ubicacion VARCHAR(255) NOT NULL,
    Organizador_Id INT NOT NULL,
    Descripcion TEXT,
    Categoria VARCHAR(255),
    FOREIGN KEY (Organizador_Id) REFERENCES Usuario(Id) ON DELETE CASCADE
);


CREATE TABLE Grupo (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Evento_Id INT NOT NULL,
    Admin_Id INT NOT NULL,
    Descripcion TEXT,
    FOREIGN KEY (Evento_Id) REFERENCES Evento(Id) ON DELETE CASCADE,
    FOREIGN KEY (Admin_Id) REFERENCES Usuario(Id) ON DELETE CASCADE
);


CREATE TABLE Mensaje (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Contenido VARCHAR(255) NOT NULL,
    Remitente_Id INT NOT NULL,
    Grupo_Id INT NOT NULL,
    Fecha TIMESTAMP NOT NULL,
    FOREIGN KEY (Remitente_Id) REFERENCES Usuario(Id) ON DELETE CASCADE,
    FOREIGN KEY (Grupo_Id) REFERENCES Grupo(Id) ON DELETE CASCADE
);


CREATE TABLE Usuario_Evento (
    Usuario_Id INT,
    Evento_Id INT,
    PRIMARY KEY (Usuario_Id, Evento_Id),
    FOREIGN KEY (Usuario_Id) REFERENCES Usuario(Id) ON DELETE CASCADE,
    FOREIGN KEY (Evento_Id) REFERENCES Evento(Id) ON DELETE CASCADE
);


CREATE TABLE Usuario_Grupo (
    Usuario_Id INT,
    Grupo_Id INT,
    PRIMARY KEY (Usuario_Id, Grupo_Id),
    FOREIGN KEY (Usuario_Id) REFERENCES Usuario(Id) ON DELETE CASCADE,
    FOREIGN KEY (Grupo_Id) REFERENCES Grupo(Id) ON DELETE CASCADE
);