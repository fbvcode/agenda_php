<?php
include("conexion.php");

if(!isset($_POST['id'])) {
    //Si alguien intenta acceder a esta página sin enviar un ID, lo redirigimos al index
    header("Location: index.php");
    exit();
}

$sql = "DELETE FROM contactos WHERE id = " . $_POST['id'];
if ($conexion->query($sql) === TRUE) {
    echo "Contacto eliminado exitosamente.";
} else {
    echo "Error: " . $sql . "<br>" . $conexion->error;
}
$conexion->query($sql);

$conexion->close();
header("Location: index.php");
exit();
?>