<?php
require 'conexion.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar preflight request de CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(['error' => 'Faltan datos']);
    exit;
}

$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);

$sql = "INSERT INTO usuarios (email, password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $email, $password);

if ($stmt->execute()) {
    echo json_encode(['success' => 'Usuario registrado correctamente']);
} else {
    echo json_encode(['error' => 'No se pudo registrar el usuario']);
}

$conn->close();
