let readlineSync = require("readline-sync");

let ListaDeTareas = [];

function AgregarTareas () {

    let Indicador = readlineSync.question("Ingrese el indicador de la tarea")
    let Descripcion = readlineSync.question("Ingrese la descripción de la tarea")

    ListaDeTareas.push({
        Indicador,
        Descripcion,
        completed: false
    });

    console.log("Tarea agregada exitosamente");
}

function EliminarTarea() {
    let Indice = readlineSync.question("Ingese el indice de la tarea a eliminar")

    if (Indice >= 0 && Indice < ListaDeTareas.length){
        ListaDeTareas.splice(Indice, 1)
        console.log("Tarea eliminada")
    } else {
        console.log("Indice no existe")
    }
}

function CompletarTarea() {
    let Indice = readlineSync.question("Ingese el indice de la tarea a completar")

    if (Indice >= 0 && Indice < ListaDeTareas.length){
        ListaDeTareas[Indice].completed = true;
        console.log("Tarea completada con exito")
    } else {
        console.log("Indice invalido!");
    }
}

function ImprimirLista() {
    console.log("Lista de tareas: ")
    ListaDeTareas.forEach((ListaDeTareas, indice) => {
        let estado = ListaDeTareas.completed ? "[X]" : "[ ]"
        console.log(`${indice}, ${estado} ${ListadeTareas.indicador}: ${ListaDeTareas.descripción}`)
    })
}

function correrPrograma () {
    while (true) {
        console.log("Elige una opción")
        console.log("")
        console.log("1. Crear una tarea")
        console.log("2. Eliminar una tarea")
        console.log("3. Completar una tarea")
        console.log("4. Imprimir la lista de tareas")
        console.log("5. Salir")

        const opcion = readlineSync.question("Ingrese una opcion")

        switch (opcion) {
            case "1":
                AgregarTareas()
                break
            case "2":
                EliminarTarea()
                break
            case "3":
                CompletarTarea()
                break
            case "4":
                ImprimirLista()
                break
            case "5":
                return
            default:
                console.log("Opción invalida")
        }
    }
}

correrPrograma()