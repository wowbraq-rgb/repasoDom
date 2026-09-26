const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const inputResponsable = document.querySelector("#responsable-input")
const lista = document.querySelector("#todo-list");

form.addEventListener("submit", function(event) {

    event.preventDefault();
    

    const texto = input.value.trim();

    const responsable = inputResponsable.value.trim();

    if (texto === "") {
        return;
    }


    // Crear el elemento <li>
    const tarea = document.createElement("li");

    tarea.textContent = texto +" - "+responsable;

    // Crear botón eliminar
    const botonEliminar = document.createElement("button");

    botonEliminar.textContent = "Eliminar";

    // Evento para eliminar
    botonEliminar.addEventListener("click", function() {
        tarea.remove();
    });

    // Agregar botón al li
    tarea.appendChild(botonEliminar);

    // Agregar tarea al ul
    lista.appendChild(tarea);

    // Limpiar input
    input.value = "";
    inputResponsable.value = "";
});

async function obtenerTareas() {

    try {

        const respuesta = await fetch(
            "http://localhost:3000/api/productos"
        );

        const datos = await respuesta.json();

        datos.forEach(function(producto) {

            const tarea = document.createElement("li");

            tarea.textContent = producto.nombre + " - " + producto.precio;

            lista.appendChild(tarea);

        });

    } catch (error) {

        console.error(error);

    }

}

obtenerTareas();