console.log("✅ agenda.js cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
    const btnAdd = document.getElementById("boton-add");
    const tbody = document.getElementById("agenda-body");

    //Evento escuchado: click en el botón "Agregar contacto"(ejecuta boque al hacer click)
    btnAdd.addEventListener("click", () => {
        // Crear la fila nueva
        const newRow = document.createElement("tr"); // Crear una nueva fila (tr) para el nuevo contacto

        newRow.classList.add("fila-nueva"); // Añadir clase para animación

        //Dentro de la fila, se crean las celdas (td) 
        newRow.innerHTML = `
            <td><input type="text" placeholder="Nombre" class="input-nombre"></td>
            <td><input type="text" placeholder="Teléfono" class="input-telefono"></td>
            <td><input type="text" placeholder="Email" class="input-email"></td>
            <td class="acciones">
                <button class="guardar-nuevo">Guardar</button> 
                <button class="cancelar-nuevo">Cancelar</button>
            </td>
        `;

        // Agregar la nueva fila al cuerpo de la tabla
        tbody.appendChild(newRow);

        //Localizamos el boton con clase "guardar-nuevo" dentro de la nueva fila 
        const btnGuardar = newRow.querySelector(".guardar-nuevo");

        //Localizamos el boton con clase "cancelar-nuevo" dentro de la nueva fila
        const btnCancelar = newRow.querySelector(".cancelar-nuevo");
        //Le asignamos un evento click para cancelar la creación del nuevo contacto
        btnCancelar.addEventListener("click", () => {
            //Animación de desvanecimiento antes de eliminar la fila
            newRow.classList.add("ocultar");
            //Elimina la fila después de la animación
            setTimeout(() => {
                newRow.remove();
            }, 400); // Duración de la animación (400ms)=0.4 seg
        });

        //y le asignamos un evento click para guardar el nuevo contacto
        btnGuardar.addEventListener("click", async () => {
            const nombre = newRow.querySelector(".input-nombre").value.trim();
            const telefono = newRow.querySelector(".input-telefono").value.trim();
            const email = newRow.querySelector(".input-email").value.trim();

            //El nombre es obligatorio
            if (!nombre) {
                alert("El nombre es obligatorio.");
                return;
            }
            //Al menos uno de los campos teléfono o email debe ser completado
            if (!telefono && !email) {
                alert("Debe proporcionar al menos un teléfono o un email.");
                return;
            }

            //Preparar los datos para enviar al PHP
            const formData = new FormData();
            formData.append("nombre", nombre);
            formData.append("telefono", telefono);
            formData.append("email", email);

            //Enviar por AJAX a guardar.php
            const respuesta = await fetch("guardar.php", {
                method: "POST",
                body: formData
            });

            const datos = await respuesta.json();

            if (!datos.ok) {
                alert("Error al guardar el contacto: " + datos.error);
                return;
            }


            //Reemplazar inputs → texto al guardar
            newRow.innerHTML = `
                <td>${nombre}</td>
                <td>${telefono}</td>
                <td>${email}</td>
                <td class='acciones'>
                    <form action='editar.php' method='POST'>
                        <input type='hidden' name='id' value='${datos.id}'>
                        <button type='submit'>Editar</button>
                    </form>

                    <form action='eliminar.php' method='POST'>
                        <input type='hidden' name='id' value='${datos.id}'>
                        <button class='eliminar' type='submit'
                            onclick='return confirm("¿Seguro que quieres eliminar este contacto?")'>
                            Eliminar
                        </button>
                    </form>
                </td>
            `;
        });


    });


    //Animación para eliminar una fila existente
    document.querySelectorAll(".eliminar").forEach(boton => {
        boton.addEventListener("click", function (e) {
            e.preventDefault(); // Evita que se envíe inmediatamente

            const form = boton.closest("form");   // Localizamos el formulario asociado
            const fila = boton.closest("tr"); // Buscamos la fila a eliminar

            // Añadimos la clase para animación
            fila.classList.add("fila-eliminar");
            fila.classList.add("ocultar");

            // Cuando termine la animación → 
            setTimeout(() => {
                form.submit();
            }, 400); // Debe coincidir con el CSS
        });
    });

});