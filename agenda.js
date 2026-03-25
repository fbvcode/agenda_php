document.addEventListener("DOMContentLoaded", () => {
    const btnAdd = document.getElementById("boton-add");
    const tbody = document.getElementById("agenda-body");

    btnAdd.addEventListener("click", () => {
        // Crear la fila nueva
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td><input type="text" placeholder="Nombre"></td>
            <td><input type="text" placeholder="Teléfono"></td>
            <td><input type="text" placeholder="Email"></td>
            <td class="acciones">
                <button class="guardar-nuevo">Guardar</button>
            </td>
        `;

        tbody.appendChild(newRow);
    });
});