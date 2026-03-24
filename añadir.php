<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Añadir Contacto</title>
</head>

<body>

    <body>
        <form action="guardar.php" method="post">

            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required><br><br>

            <label for="telefono">Teléfono:</label>
            <input type="text" id="telefono" name="telefono"><br><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email"><br><br>

            <input type="submit" value="Guardar">
            
        </form>
    </body>

    <a href='index.php'>Agenda</a>

</html>