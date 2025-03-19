<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'conexion.php'; // Se usa el archivo de conexión

// ✅ Solo filtrar por ID si se proporciona uno en la URL
if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $sql = "SELECT * FROM productos WHERE id = $id";
} else {
    $sql = "SELECT * FROM productos";  // ✅ Si no se especifica ID, obtener todos los productos
}

$result = $conn->query($sql);

$productos = [];
while ($row = $result->fetch_assoc()) {
    $productos[] = $row;
}

$conn->close();
echo json_encode($productos);  // ✅ Devolver siempre un array
