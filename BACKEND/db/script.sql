CREATE DATABASE IF NOT EXISTS libreria;
USE libreria;

CREATE TABLE IF NOT EXISTS autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    anio_publicacion INT NOT NULL,
    autor_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (autor_id) REFERENCES autores(id) ON DELETE CASCADE
);

INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento) VALUES
('Gabriel García Márquez', 'Colombiana', '1927-03-06'),
('Isabel Allende', 'Chilena', '1942-08-02'),
('Mario Vargas Llosa', 'Peruana', '1936-03-28'),
('Julio Cortázar', 'Argentina', '1914-08-26'),
('Octavio Paz', 'Mexicana', '1914-03-31');

INSERT INTO libros (titulo, genero, anio_publicacion, autor_id) VALUES
('Cien años de soledad', 'Realismo mágico', 1967, 1),
('El amor en los tiempos del cólera', 'Romance', 1985, 1),
('La casa de los espíritus', 'Realismo mágico', 1982, 2),
('Paula', 'Autobiografía', 1994, 2),
('La ciudad y los perros', 'Drama', 1963, 3),
('Rayuela', 'Novela experimental', 1963, 4),
('El laberinto de la soledad', 'Ensayo', 1950, 5);