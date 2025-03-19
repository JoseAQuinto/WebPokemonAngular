<?php
require 'conexion.php'; // Asegúrate de que tienes este archivo para la conexión a la base de datos


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Si la petición es de tipo OPTIONS (preflight request), termina aquí para evitar problemas con CORS.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}


$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['usuario_id']) || !isset($data['producto_id']) || !isset($data['cantidad'])) {
    echo json_encode(['error' => 'Faltan datos']);
    exit;
}

$usuario_id = $data['usuario_id'];
$producto_id = $data['producto_id'];
$cantidad = $data['cantidad'];

$conn = new mysqli('localhost', 'root', '', 'tu_base_de_datos'); // Ajusta los datos de conexión

if ($conn->connect_error) {
    die(json_encode(['error' => 'Error de conexión']));
}

// Verificar si el producto ya está en el carrito
$sql = "SELECT cantidad FROM carritos WHERE usuario_id = ? AND producto_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $usuario_id, $producto_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $nueva_cantidad = $row['cantidad'] + $cantidad;
    $sql = "UPDATE carritos SET cantidad = ? WHERE usuario_id = ? AND producto_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iii', $nueva_cantidad, $usuario_id, $producto_id);
} else {
    $sql = "INSERT INTO carritos (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iii', $usuario_id, $producto_id, $cantidad);
}

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'No se pudo agregar el producto']);
}

$conn->close();
