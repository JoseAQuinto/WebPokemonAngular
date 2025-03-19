<?php
require 'conexion.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Si la petición es de tipo OPTIONS (preflight request), termina aquí para evitar problemas con CORS.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}


$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(['error' => 'Faltan datos']);
    exit;
}

$email = $data['email'];
$password = $data['password'];

$sql = "SELECT id, password FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    if (password_verify($password, $user['password'])) {
        $token = bin2hex(random_bytes(16)); // Genera un token simple
        echo json_encode(['success' => true, 'token' => $token, 'usuario_id' => $user['id']]);
    } else {
        echo json_encode(['error' => 'Contraseña incorrecta']);
    }
} else {
    echo json_encode(['error' => 'Usuario no encontrado']);
}

$conn->close();
