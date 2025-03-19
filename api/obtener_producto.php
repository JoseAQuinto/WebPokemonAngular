<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'conexion.php'; // Se usa el archivo de conexión

if (!isset($_GET['id'])) {
    die(json_encode(["error" => "Falta el parámetro ID"]));
}

$id = intval($_GET['id']);
$sql = "SELECT * FROM productos WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(["error" => "Producto no encontrado"]);
}

$conn->close();
