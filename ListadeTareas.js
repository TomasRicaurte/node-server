let readlineSync = require("readline-sync");

let ListaDeTareas = [];

async function AgregarTarea() {
    let Indicador = readlineSync.question("Ingrese el indicador de la tarea");
    let Descripcion = readlineSync.question("Ingrese la descripción de la tarea");

    ListaDeTareas.push({
        Indicador,
        Descripcion,
        completed: false
    });

    console.log("Tarea agregada exitosamente");
}

async function EliminarTarea() {
    let Indice = readlineSync.question("Ingrese el índice de la tarea a eliminar");

    if (Indice >= 0 && Indice < ListaDeTareas.length) {
        ListaDeTareas.splice(Indice, 1);
        console.log("Tarea eliminada");
    } else {
        console.log("Índice no existe");
    }
}

async function CompletarTarea() {
    let Indice = readlineSync.question("Ingrese el índice de la tarea a completar");

    if (Indice >= 0 && Indice < ListaDeTareas.length) {
        ListaDeTareas[Indice].completed = true;
        console.log("Tarea completada con éxito");
    } else {
        console.log("Índice inválido");
    }
}

function ImprimirLista() {
    console.log("Lista de tareas: ");
    ListaDeTareas.forEach((tarea, indice) => {
        let estado = tarea.completed ? "[X]" : "[ ]";
        console.log(`${indice}, ${estado} ${tarea.Indicador}: ${tarea.Descripcion}`);
    });
}

async function correrPrograma() {
    while (true) {
        console.log("Elige una opción");
        console.log("");
        console.log("1. Crear una tarea");
        console.log("2. Eliminar una tarea");
        console.log("3. Completar una tarea");
        console.log("4. Imprimir la lista de tareas");
        console.log("5. Salir");

        const opcion = readlineSync.question("Ingrese una opcion");

        switch (opcion) {
            case "1":
                await AgregarTarea();
                break;
            case "2":
                await EliminarTarea();
                break;
            case "3":
                await CompletarTarea();
                break;
            case "4":
                ImprimirLista();
                break;
            case "5":
                return;
            default:
                console.log("Opción inválida");
        }
    }
}

correrPrograma();
