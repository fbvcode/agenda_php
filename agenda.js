//Importamos funciones del archivo helpers.js para no saturar este con funciones
import {
  normalizarTextoMayusculas,
  normalizarTextoMinusculas,
  normalizarTelefono,
  telefonoValido,
  emailValido,
  formatearTelefono,
} from "./helpers.js";

console.log("agenda.js cargado correctamente");

document.addEventListener("DOMContentLoaded", async () => {
  /*
    let estadoAgenda = "idle"; //idle = todavía no estoy haciendo nada

  if (estadoAgenda !== "idle") return; //Si ya estoy en otro estado, salgo
  try {
  
  estadoAgenda = "conectando";
    const response = await fetch("ping.php", {
      cache: "no-store"
    })
    if (!response.ok) {
      throw new Error("Servidor no responde");
    }

    const texto = await response.text();

    if (texto.trim() !== "ok") {
      throw new Error("Respuesta inesperada")
    }

    //Si no entra en los errores, inicializamos la agenda
    estadoAgenda = "iniciada";
    iniciaragenda();
  } catch (error) { //Ante alguna excepcion, bloqueamos la agenda
   estadoagenda = "bloqueada";
    bloquearAgenda();
  }*/
  const botonAniadir = document.getElementById("boton-add");
  const tbody = document.getElementById("agenda-body");

  let hayNuevoContactoAbierto = false;

  //Evento escuchado: click en el botón "Agregar contacto"(ejecuta boque al hacer click)
  botonAniadir.addEventListener("click", () => {
    //Si ya hay una fila de nuevo contacto abierta, no hacemos nada
    if (hayNuevoContactoAbierto) {
      return;
    }

    //Si llegamos aquí, activamos el interruptor de nuevoContactoAbierto
    hayNuevoContactoAbierto = true;
    // Crear la fila nueva
    const nuevaFila = document.createElement("tr"); // Crear una nueva fila (tr) para el nuevo contacto

    nuevaFila.classList.add("fila-nueva"); // Añadir clase para animación

    //Dentro de la fila, se crean las celdas (td)
    nuevaFila.innerHTML = `
            <td><input type="text" placeholder="Nombre" class="input-nombre"></td>
            <td><input type="text" placeholder="Teléfono" class="input-telefono"></td>
            <td><input type="text" placeholder="Email" class="input-email"></td>
            <td class="celda-acciones">
                <button class="guardar-nuevo">Guardar</button> 
                <button class="cancelar-nuevo">Cancelar</button>
            </td>
        `;

    // Agregar la nueva fila al cuerpo de la tabla
    tbody.appendChild(nuevaFila);
    document.getElementById("agenda").classList.remove("agenda-vacia");

    nuevaFila.querySelector(".input-nombre").focus()

    //Localizamos el boton con clase "guardar-nuevo" dentro de la nueva fila
    const btnGuardar = nuevaFila.querySelector(".guardar-nuevo");

    //Localizamos el boton con clase "cancelar-nuevo" dentro de la nueva fila
    const btnCancelar = nuevaFila.querySelector(".cancelar-nuevo");
    //Le asignamos un evento click para cancelar la creación del nuevo contacto
    btnCancelar.addEventListener("click", () => {
      //si se cancela el nuevo contacto, se desactiva hayNuevoContacto
      hayNuevoContactoAbierto = false;
      //Animación de desvanecimiento antes de eliminar la fila
      nuevaFila.classList.add("ocultar");

      //Si le damos a cancelar, y era la única fila que había en la agenda,
      //le damos a la tabla la clase agenda-vacía para que desaparezca
      let filasEnTabla = tbody.getElementsByTagName("tr").length;
      if (filasEnTabla === 1) {
        document.getElementById("agenda").classList.add("agenda-vacia");
      }

      //Elimina la fila después de la animación
      setTimeout(() => {
        nuevaFila.remove();
      }, 400); // Duración de la animación (400ms)=0.4 seg
    });

    //y le asignamos un evento click para guardar el nuevo contacto
    btnGuardar.addEventListener("click", async () => {
      const nombre = normalizarTextoMayusculas(
        nuevaFila.querySelector(".input-nombre").value.trim(),
      );
      const telefono = normalizarTelefono(
        nuevaFila.querySelector(".input-telefono").value.trim(),
      );
      const email = normalizarTextoMinusculas(
        nuevaFila.querySelector(".input-email").value.trim(),
      );

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

      if (telefono && !telefonoValido(telefono)) {
        alert("El teléfono no tiene un formato válido.");
        return;
      }

      if (email && !emailValido(email)) {
        alert("El formato del email no es válido.");
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
        body: formData,
      });

      const datos = await respuesta.json();

      if (!datos.ok) {
        alert("Error al guardar el contacto: " + datos.error);
        return;
      }

      //Si el contacto se guarda, desactivamos el interruptor hayNuevoContactoAbierto
      hayNuevoContactoAbierto = false;

      //Si no hay errores, el contacto se ha guardado y, por lo tanto:
      //Quitamos la clase de agenda-vacia
      document.getElementById("agenda").classList.remove("agenda-vacia");

      //Quitamos el mensaje de "No hay contactos." si existe

      const mensajeNoContactos = document.querySelector(".no-contactos");
      if (mensajeNoContactos) {
        mensajeNoContactos.remove();
      }

      //Reemplazar inputs → texto al guardar
      nuevaFila.innerHTML = `
                <td class="celda-nombre">${nombre}</td>
                <td class="celda-telefono">${formatearTelefono(telefono)}</td>
                <td class="celda-email">${email}</td>
                <td class='celda-acciones'>
                    <button class='editar' type='button'>Editar</button>
        <button class='eliminar' type='button'>Eliminar</button>
                </td>
            `;
      //Colocamos el ID en el dataset de la fila
      nuevaFila.dataset.id = datos.id;
    });
  });

  //Comienza la lógica para 'editar'
  //Detectar el click en el botón 'Editar'
  /*Las filas pueden venir del php inicial o pueden
  haberse creado despues con js, por lo que escuchamos todo el body y luego comprobamos 
  si el click escuchado ha sido en el botón 'Editar' */
  tbody.addEventListener("click", function (e) {
    const botonEditar = e.target.closest(".editar");

    if (!botonEditar) return;

    e.preventDefault();

    const filaPulsada = botonEditar.closest("tr");

    //Guardamos la info que hay actualmente en la fila,
    // por si se cancela la edición, dejar los valores que estaban
    const nombre = normalizarTextoMayusculas(
      filaPulsada.querySelector(".celda-nombre").textContent,
    );
    const telefono = normalizarTelefono(
      filaPulsada.querySelector(".celda-telefono").textContent,
    );
    const email = normalizarTextoMinusculas(
      filaPulsada.querySelector(".celda-email").textContent,
    );

    //
    filaPulsada.dataset.nombreOriginal = nombre;
    filaPulsada.dataset.telefonoOriginal = telefono;
    filaPulsada.dataset.emailOriginal = email;

    //Reemplazamos el contenido por los inputs
    filaPulsada.innerHTML = `
    <td><input type="text" class="input-nombre" value="${nombre}"></td>
    <td><input type="text" class="input-telefono" value="${formatearTelefono(telefono)}"></td>
    <td><input type="text" class="input-email" value="${email}"></td>
    <td class="celda-acciones">
      <button class="guardar-editar">Guardar</button>
      <button class="cancelar-editar">Cancelar</button>
    </td>
  `;
  });

  //Lógica para el botón cancelar-editar
  tbody.addEventListener("click", function (e) {
    const botonCancelar = e.target.closest(".cancelar-editar");
    if (!botonCancelar) return;

    e.preventDefault();

    const filaEditable = botonCancelar.closest("tr");

    // Recuperamos los valores originales
    const nombre = normalizarTextoMayusculas(
      filaEditable.dataset.nombreOriginal,
    );
    const telefono = normalizarTelefono(filaEditable.dataset.telefonoOriginal);
    const email = normalizarTextoMinusculas(filaEditable.dataset.emailOriginal);

    // Restauramos la fila editable a modo lectura
    filaEditable.innerHTML = `
    <td class="celda-nombre">${nombre}</td>
    <td class="celda-telefono">${telefono}</td>
    <td class="celda-email">${email}</td>
    <td class="celda-acciones">
      <button class="editar" type="button">Editar</button>
      <button class="eliminar" type="button">Eliminar</button>
    </td>
  `;
  });

  //Lógica para el botón guardar-editar
  tbody.addEventListener("click", async function (e) {
    //Definimos el botón
    const botonGuardar = e.target.closest(".guardar-editar");
    //Si no encuentra el botón, sale de la función
    if (!botonGuardar) return;

    console.log("Click en guardar-editar detectado");
    e.preventDefault();
    //Determinamos que la fila que estamos editando es la padre más cercana al botón guardar en este caso
    const filaEditable = botonGuardar.closest("tr");
    console.log("Fila detectada: ", filaEditable);

    const nombre = normalizarTextoMayusculas(
      filaEditable.querySelector(".input-nombre").value.trim(),
    );
    const telefono = normalizarTelefono(
      filaEditable.querySelector(".input-telefono").value.trim(),
    );
    const email = normalizarTextoMinusculas(
      filaEditable.querySelector(".input-email").value.trim(),
    );
    const id = filaEditable.dataset.id;

    console.log("Datos leídos: ", { id, nombre, telefono, email });
    //Para comprobar que se recibe correctamente el id del contacto en dataset del tr
    console.log("ID del contacto: ", filaEditable.dataset.id);

    //Validaciones (igual que en nuevo contacto)
    if (!nombre) {
      alert("El nombre es obligatorio.");
      return;
    }

    if (!telefono && !email) {
      alert("Debe proporcionar al menos un teléfono o un email.");
      return;
    }

    //Lanzamos alerta si el teléfono no pasa la validación
    if (telefono && !telefonoValido(telefono)) {
      alert("El teléfono no tiene un formato válido.");
      return;
    }
    //Lanzamos alerta si el email no pasa la validación
    if (email && !emailValido(email)) {
      alert("El formato del email no es válido.");
      return;
    }

    //Declaramos un nuevo "formulario"
    const formDatos = new FormData();
    //Metemos los datos en el "formularo" que acabamos de crear
    formDatos.append("id", id);
    formDatos.append("nombre", nombre);
    formDatos.append("telefono", telefono);
    formDatos.append("email", email);

    //Enviamos dicho formulario al php correspondiente
    const respuesta = await fetch("editar.php", {
      method: "POST",
      body: formDatos,
    });
    //Leemos la respuesta del PHP
    const resultado = await respuesta.text();

    if (resultado.trim() === "ok") {
      // Sustituir inputs por texto (guardado visual)
      filaEditable.innerHTML = `
    <td class="celda-nombre">${nombre}</td>
    <td class="celda-telefono">${formatearTelefono(telefono)}</td>
    <td class="celda-email">${email}</td>
    <td class="celda-acciones">
      <button class="editar" type="button">Editar</button>
      <button class="eliminar" type="button">Eliminar</button>
    </td>
  `;
    } else {
      alert("Error al guardar en la base de datos");
      console.log("Error: ", $cons);
    }

    // Limpiamos el estado de edición
    //filaEditable.classList.remove("editando");
  });

  //Animación para eliminar una fila existente:
  //Escuchamos el click en el cuerpo de la tabla
  tbody.addEventListener("click", async function (e) {
    //La pulsación ha sido en el botón eliminar?
    const boton = e.target.closest(".eliminar");

    //Si no es el botón eliminar, ignoramos el click
    if (!boton) return;

    e.preventDefault();

    //Localizamos la fila (tr) y su ID
    const fila = boton.closest("tr");
    const id = fila.dataset.id; //el id está en el dataset de la fila

    //Hacemos que el usuario confirme la eliminación
    if (!confirm("¿Seguro que quieres eliminar este contacto?")) return;

    //Preparamos el FormData para el PHP
    const datosEnvio = new FormData();
    datosEnvio.append("id", id); //Añadimos el id al FormData

    try {
      //Eviamos el formulario
      const respuesta = await fetch(
        //await: te esperas a tener la respuesta y luego sigues
        "eliminar.php",
        {
          method: "POST",
          body: datosEnvio,
        },
      );
      //Leemos la respuesta del PHP
      const resultado = await respuesta.text();

      if (resultado.trim() === "ok") {
        //Si el resultado es ok
        fila.classList.add("ocultar"); //Le ponemos la clase para el efecto en CSS

        setTimeout(() => {
          fila.remove();

          //Comprobamos si la agenda se ha quedado vacía
          const filasEnTabla = tbody.getElementsByTagName("tr").length;
          if (filasEnTabla === 0) {
            document.getElementById("agenda").classList.add("agenda-vacia");

            const mensaje = document.createElement("p");
            mensaje.className = "no-contactos";
            mensaje.textContent = "No hay contactos en la agenda.";

            document.body.appendChild(mensaje);
          }
        }, 400);
      } else {
        //Si el resultado no es ok (hay error)
        alert("Error en el servidor: No se pudo eliminar el contacto.");
      }
    } catch (error) {
      //Se atrapa el error y se muestra en consola
      console.error("Error de conexión: ", error);
    }
  });
  document.querySelectorAll(".celda-telefono").forEach((celda) => {
  const telefono = celda.textContent.trim();

  if (telefono) {
    celda.textContent = formatearTelefono(telefono);
  }
});
});
