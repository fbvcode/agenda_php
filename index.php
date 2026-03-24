<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Agenda</title>
</head>

<body>
    <h1>Agenda de Contactos</h1>
    <a href="añadir.php">Añadir Contacto</a>
    <br><br>
    <h2>Contactos guardados: </h2>

    <?php
    include("conexion.php");
    $sql = "SELECT * FROM contactos"; 
    $resultado = $conexion->query($sql);

    if ($resultado->num_rows > 0) {
    echo "<table> 
        <tr> <!--fila de encabezado-->
            <th>Nombre</th><!--columnas de encabezado-->
            <th>Teléfono</th>
            <th>Email</th>
        </tr>";
        while ($fila = $resultado->fetch_assoc()) {
            echo "<tr>";//fila
            echo "<td>" . $fila["nombre"] . "</td>";//columna
            echo "<td>" . $fila["telefono"] . "</td>";
            echo "<td>" . $fila["email"] . "</td>";
            echo "<td>";//Columna de acciones
            //Botón para eliminar contacto
            echo "<form action='eliminar.php' method='post'>";//Formulario para eliminar contacto
            echo "<input type='hidden' name='id' value='" . $fila["id"] . "'>";//Campo oculto con el ID del contacto
            //Botón para eliminar contacto            
            echo"<button type='submit' onclick='return confirm(\"¿Seguro que quieres eliminar este contacto?\")'>
            Eliminar</button>";

            echo "</form>";
            //Botón para editar contacto
            echo "<form action='editar.php' method='post'>";//Formulario para editar contacto
            echo "<input type='hidden' name='id' value='" . $fila["id"] . "'>";//Campo oculto con el ID del contacto
            echo "<button type='submit'>Editar</button>";//Botón para editar contacto
            echo "</form>";
            echo "</td>";
            echo "</tr>";

        }
        echo "</table>";
    } else {
        echo "<p>No hay contactos en la agenda.</p>";
    }
    ?>
    
</body>

</html>