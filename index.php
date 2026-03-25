<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="estilos_agenda.css">
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
            <th></th>
        </tr>";
        while ($fila = $resultado->fetch_assoc()) {
            echo "<tr>"; //fila
            echo "<td>" . $fila["nombre"] . "</td>"; //columna
            echo "<td>" . $fila["telefono"] . "</td>";
            echo "<td>" . $fila["email"] . "</td>";
            echo "<td class='acciones'>"; //Columna de acciones


            //Botón para editar contacto
            echo "<form action='editar.php' method='post'>"; //Formulario para editar contacto
            echo "<input type='hidden' name='id' value='" . $fila["id"] . "'>"; //Campo oculto con el ID del contacto
            echo "<button type='submit'>Editar</button>"; //Botón para editar contacto
            echo "</form>";
            //Botón para eliminar contacto
            echo "<form action='eliminar.php' method='post'>"; //Formulario para eliminar contacto
            echo "<input type='hidden' name='id' value='" . $fila["id"] . "'>"; //Campo oculto con el ID del contacto           
            echo "<button class='eliminar' type='submit' onclick='return confirm(\"¿Seguro que quieres eliminar este contacto?\")'>
            Eliminar</button>";

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