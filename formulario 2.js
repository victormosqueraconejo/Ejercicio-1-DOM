// Modal 
const modal = document.getElementById("ventanaModal");
const abrirModal = document.getElementById("abrirModal");
const cerrar = document.getElementById("cerrar");
const botonOk = document.getElementById("botonOk");
const tabla = document.querySelector("table");

const IDForm = document.querySelector(".Id");
const nombreForm = document.querySelector(".nombre");
const apellidoForm = document.querySelector(".apellido");
const identificacionForm = document.querySelector(".identificacion");

var personas = [
  {id: 1,nombre: 'Juan',apellidos: 'Pérez',identificacion: '123456789'},
  {id: 2,nombre: 'María',apellidos: 'García',identificacion: '987654321'},
  {id: 3,nombre: 'Pedro',apellidos: 'Rodríguez',identificacion: '456789123'},
  {id: 4, nombre: 'Ana', apellidos: 'González', identificacion: '789123456'},
  {id: 5, nombre: 'Luis', apellidos: 'Hernández',identificacion: '321654987'}
];

// Guardar datos en localStorage

function limpiarFormulario() {
    IDForm.value = "";
    nombreForm.value = "";
    apellidoForm.value = "";
    identificacionForm.value = "";
}

function mostrarPersonasEnTabla() {
    // Limpiar tabla existente
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    // Agregar personas a la tabla
    personas.forEach(persona => {
        const tr = tabla.insertRow();
        tr.insertCell().textContent = persona.id;
        tr.insertCell().textContent = persona.nombre;
        tr.insertCell().textContent = persona.apellidos;
        tr.insertCell().textContent = persona.identificacion;
        
        const accionesCelda = tr.insertCell();
        const botonAct = document.createElement("button");
        botonAct.setAttribute('id','botonAct');
        botonAct.textContent = "Actualizar";
        const botonElm = document.createElement("button");
        botonElm.setAttribute('id','botonElm')
        botonElm.textContent = "Eliminar";
        accionesCelda.appendChild(botonAct);
        accionesCelda.appendChild(botonElm);

        botonElm.addEventListener("click", function () {
            personas = personas.filter(p => p.id !== persona.id);
            
            mostrarPersonasEnTabla();
        });

        botonAct.addEventListener("click", function () {
            modal.style.display = "block";
            IDForm.value = persona.id;
            nombreForm.value = persona.nombre;
            apellidoForm.value = persona.apellidos;
            identificacionForm.value = persona.identificacion;
            

            botonOk.onclick = function() {
                persona.id = IDForm.value;
                persona.nombre = nombreForm.value;
                persona.apellidos = apellidoForm.value;
                persona.identificacion = identificacionForm.value;
                personas = personas.filter(p => p.id !== persona.id);
                
                mostrarPersonasEnTabla();
                modal.style.display = "none";
                
            };
        });
    });
}

function nuevaPersona() {
    const nuevaPersona = {
        id: IDForm.value,
        nombre: nombreForm.value,
        apellidos: apellidoForm.value,
        identificacion: identificacionForm.value
    };

    personas.push(nuevaPersona);
    
    mostrarPersonasEnTabla();
    limpiarFormulario();
}


// Eventos de los botones
abrirModal.addEventListener("click", function () {
    modal.style.display = "block";
    limpiarFormulario();
});

botonOk.addEventListener("click", function () {
    if (IDForm.value.length < 1 || nombreForm.value.length < 1 ||
        apellidoForm.value.length < 1 || identificacionForm.value.length < 1
    ) {
        alert("No puedes agregar valores vacíos");
    } else {
        nuevaPersona();
        modal.style.display = "none";
    }
});

cerrar.addEventListener("click", function () {
    modal.style.display = "none";
    limpiarFormulario();
});

// Cargar datos al iniciar la página
document.addEventListener('DOMContentLoaded', mostrarPersonasEnTabla);