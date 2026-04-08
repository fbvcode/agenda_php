<?php

include("conexion.php");

//Comprobamos que se ha enviado un ID de contacto para editar
if(!isset($_POST['id'])) {
    //Si alguien intenta acceder a esta página sin enviar un ID, lo redirigimos al index
    exit();
}

//Metemos en variables los datos que recibimos
$id = $_POST['id'];
$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];


//Consulta para recuperar los datos del contacto a editar
$sql = "UPDATE contactos SET nombre = ?, telefono=?, email=? WHERE id=?";

$consulta = $conexion->prepare($sql); //con = es establecer
$consulta -> bind_param("sssi", $nombre, $telefono, $email, $id); //con -> es realizar algo

if ($consulta->execute()){
    echo "ok";
}else {
    echo "error";
}

?>