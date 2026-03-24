<?php
include("conexion.php");

$nombre = strtoupper($_POST['nombre']);
$telefono = strtoupper($_POST['telefono']);
$email = strtolower($_POST['email']);

$sql = "INSERT INTO contactos (nombre, telefono, email) VALUES ('$nombre', '$telefono', '$email')";

if ($conexion->query($sql) === TRUE) {
    echo "Contacto guardado exitosamente.";
} else {
    echo "Error: " . $sql . "<br>" . $conexion->error;
}

$conexion->close();

header("Location: index.php");
exit();
?>