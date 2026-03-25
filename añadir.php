<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="estilos_agenda.css">
    <title>Agenda</title>
</head>

<body>

    <body>
            <header>
        <h1 class="titulo_header">Agenda de Contactos</h1>
        <nav>
            <a class="link_header" href="añadir.php">Añadir</a>
            <a class="link_header" href="index.php">Contactos</a>
        </nav>

    </header>
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