<?php
include("conexion.php");

//Comprobamos que se ha enviado un ID de contacto para editar
if(!isset($_POST['id'])) {
    //Si alguien intenta acceder a esta página sin enviar un ID, lo redirigimos al index
    header("Location: index.php");
    exit();
}

$id_contacto = $_POST['id'];

//Consulta para recuperar los datos del contacto a editar
function getContacto($id) {
    global $conexion; //Usamos la conexión global para ejecutar la consulta
    $sql = "SELECT * FROM contactos WHERE id = $id";
    $resultado = $conexion->query($sql);
    if ($resultado->num_rows > 0) {
        return $resultado->fetch_assoc(); //Devolvemos los datos del contacto como un array asociativo
    } else {
        return null; //Si no se encuentra el contacto, devolvemos null
    }
}

//Recuperamos los datos del contacto para mostrar en el formulario de edición
$contacto=getContacto($id_contacto);
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Agenda</title>
</head>
<body>
    <header>
        <h1 class="titulo_header">Agenda de Contactos</h1>
        <nav>
            <a class="link_header" href="añadir.php">Añadir</a>
            <a class="link_header" href="index.php">Contactos</a>
        </nav>

    </header>

<form action="actualizar.php" method="post">

    <input type="hidden" name="id" value="<?php echo $contacto['id']; ?>">

    Nombre:<br>
    <input type="text" name="nombre" value="<?php echo $contacto['nombre']; ?>"><br><br>

    Teléfono:<br>
    <input type="text" name="telefono" value="<?php echo $contacto['telefono']; ?>"><br><br>

    Email:<br>
    <input type="email" name="email" value="<?php echo $contacto['email']; ?>"><br><br>

    <input type="submit" value="Guardar cambios">
</form>

</body>
</html>

