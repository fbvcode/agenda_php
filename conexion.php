<?php
$host = "localhost";
$username = "fatima"; 
$password = "fatima";
$database = "agenda_fatima";

$conexion = new mysqli("$host", "$username", "$password", "$database");



if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}   

$conexion->set_charset("utf8");
?>