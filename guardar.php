<?php
include("conexion.php");
include("helpers.php"); //php con funciones para usar en todos

$nombre = normalizarTextoMayusculas($_POST['nombre']) ?? "";
$telefono = normalizarTelefono($_POST['telefono']) ?? "";
$email = normalizarTextoMinusculas($_POST['email']) ?? "";

if($nombre === "") {
    echo json_encode(["ok" => false, "error" => "El nombre es obligatorio."]);
    exit;
}

//Es obligatorio al menos uno de los dos campos, teléfono o email
if($telefono === "" && $email === "") {
    echo json_encode(["ok" => false, "error" => "Debe proporcionar al menos un teléfono o un email."]);
    exit;
}

$sql = "INSERT INTO contactos (nombre, telefono, email) VALUES (?, ?, ?)";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("sss", $nombre, $telefono, $email);

if ($stmt->execute() === TRUE) {
    echo json_encode([
        "ok" => true,
        "id" => $stmt -> insert_id //ID del contacto recién guardado
    ]);
} else {
    echo json_encode(["ok" => false, "error" => "Error al guardar el contacto."]);
}

$stmt->close();
$conexion->close();

exit();
?>