CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    descripcion TEXT NOT NULL
);

INSERT INTO productos (nombre, imagen, precio, descripcion) VALUES
('Cartucho Pokémon Rojo', 'img/pokemon_rojo.jpg', 29.99, 'Cartucho original de Pokémon Rojo para Game Boy.'),
('Cartucho Pokémon Azul', 'img/pokemon_azul.jpg', 29.99, 'Cartucho original de Pokémon Azul para Game Boy.'),
('Figura Pikachu Retro', 'img/figura_pikachu.jpg', 19.99, 'Figura coleccionable de Pikachu retro.'),
('Póster Clásico', 'img/poster_pokemon.jpg', 9.99, 'Póster clásico de Pokémon.'),
('Game Boy Color Edición Pikachu', 'img/gameboy_pikachu.jpg', 89.99, 'Edición especial de Game Boy Color con diseño de Pikachu.');

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(255)
);

CREATE TABLE carritos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);
