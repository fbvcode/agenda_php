<?php
include("conexion.php");

//Comprobamos que se ha enviado un ID de contacto para editar
if(!isset($_POST['id'])) {
    //Si alguien intenta acceder a esta página sin enviar un ID, lo redirigimos al index
    header("Location: index.php");
    exit();
}

$id = $_POST['id'];
$nombre = strtoupper($_POST['nombre']);
$telefono = strtoupper($_POST['telefono']);
$email = strtolower($_POST['email']);

//Preparamos consulta
$consulta = $conexion->prepare("UPDATE contactos SET nombre=?, telefono=?, email=? WHERE id=?");

//Damos valores a los ?
$consulta ->bind_param("sssi", $nombre, $telefono, $email, $id);

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda</title>
</head>
<body>
    
</body>
</html>

<?php
if ($consulta->execute() === TRUE) {
    echo "<p>Contacto actualizado exitosamente.</p>";
} else {
    echo "<p>Error al actualizar el contacto: " . $consulta->error . "</p>";
}

echo "<a href='index.php'>Agenda</a>";

$consulta->close();
$conexion->close();

?>
