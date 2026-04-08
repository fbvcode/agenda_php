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
            <button id="boton-add" class="link_header" href="añadir.php">Añadir</button>
            <a class="link_header" href="index.php">Contactos</a>
        </nav>

    </header>


    <?php
    include("conexion.php");
    $sql = "SELECT * FROM contactos";
    $resultado = $conexion->query($sql);

//Si no hay contactos, le añadimos la clase "agenda-vacia" a la tabla
$hayContactos = ($resultado->num_rows > 0);
$claseTabla = $hayContactos ? "" : "agenda-vacia";

    echo "<table id='agenda' class='$claseTabla'> 
        <thead> <!--fila de encabezado-->
        <tr> 
            <th>Nombre</th><!--columnas de encabezado-->
            <th>Teléfono</th>
            <th>Email</th>
            <th></th>
        </tr>
        </thead>
        
        <tbody id='agenda-body'> ";


    //Si hay contactos, pintamos las filas
    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            echo "<tr data-id='{$fila['id']}'>"; //fila
            echo "<td class='celda-nombre'>" . $fila["nombre"] . "</td>"; //columna
            echo "<td class='celda-telefono'>" . $fila["telefono"] . "</td>";
            echo "<td class='celda-email'>" . $fila["email"] . "</td>";
            echo "<td class='celda-acciones'>"; //Columna de acciones


            //Botón para editar contacto
            echo "<form action='editar.php' method='post'>"; //Formulario para editar contacto
            echo "<input type='hidden' name='id' value='" . $fila["id"] . "'>"; //Campo oculto con el ID del contacto
            echo "<button class='editar' type='button'>Editar</button>"; //Botón para editar contacto
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
    }
    echo "</tbody>
        </table>";

    //Si no hay contactos, mostramos mensaje
    if ($resultado->num_rows === 0) {

        echo "<p class='no-contactos'>No hay contactos en la agenda.</p>";
    }
    ?>
    <script src="agenda.js"></script>
</body>

</html>