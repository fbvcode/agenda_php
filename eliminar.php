<?php
include("conexion.php");

//Verificamos que llega el ID
if (isset($_POST['id'])) {
    $id = $_POST['id'];

    //Preparamos la consulta sin el dato
    $consulta = $conexion->prepare('DELETE FROM contactos WHERE id = ?');

    //Le damos el dato a la consulta
    $consulta->bind_param('i', $id);

    //Ejecutamos la consulta
    if ($consulta->execute()) {
        echo 'ok'; //Respuesta para el JS
    } else {
        echo 'error_db';
    }

    //Cerramosel statement
    $consulta->close();
} else {
    //Si no recibimos el ID (o alguien intenta entrar por donde no debe)
    echo 'no_id'; // Le avisamos al JS que no llegó el ID
}
$conexion->close();
exit();
