<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Si la petición es de tipo OPTIONS (preflight request), termina aquí para evitar problemas con CORS.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}


$servername = "localhost"; // Cambia esto si tu base de datos está en otro servidor
$username = "root"; // Cambia esto con el usuario de tu base de datos
$password = "diosarceus"; // Cambia esto con la contraseña de tu base de datos
$dbname = "pokemon_store"; // Cambia esto con el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>