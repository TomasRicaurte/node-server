const express = require('express');
const listEditRouter = express.Router();

const ListaDeTareas = require('./ListadeTareas');

function validarCampos (req, res, next) {
  const { Indicador, Descripcion } = req.body

  if(req.method === 'POST') {
    if(!Indicador || !Descripcion) {
      return res.status(400).json({error: "Indicador y Descripcion son obligatorios"})
    }
    if (Indicador === " " || Descripcion === " "){
      return res.status(400).json({error: "El cuerpo de la solicitud POST no puede estar vacío"})
    }
  } else if (req.method === 'PUT'){
    if (Object.keys(req.body).length === 0){
      return res.status(400).json({error: "El cuerpo de la solicitud PUT no puede estar vacío"})
    }
    if (Indicador === undefined && Descripcion === undefined) {
      return res.status(400).json({error: "Se requiere al menos uno de los siguientes campos: Indicador o Descripcion"})
    }
  }
  next();
}

listEditRouter.post('/crear', validarCampos, (req, res) => {
    const { Indicador, Descripcion } = req.body;
  
    ListaDeTareas.push({
      Indicador,
      Descripcion,
      completed: false
    });
    
    res.status(201).json({ message: "Tarea creada exitosamente" });
  });

listEditRouter.delete('/eliminar/:id', (req, res) => {
    const taskId = req.params.id;
  
    if (taskId >= 0 && taskId < ListaDeTareas.length) {
      ListaDeTareas.splice(taskId, 1);
      res.json({ message: `Tarea ${taskId} eliminada` });
    } else {
      res.status(404).json({ error: "Tarea no encontrada" });
    }
  });

listEditRouter.put('/actualizar/:id', validarCampos, (req, res) => {
    const taskId = req.params.id;
  
    if (taskId >= 0 && taskId < ListaDeTareas.length) {
      ListaDeTareas[taskId].completed = !ListaDeTareas[taskId].completed;
      res.json({ message: `Tarea ${taskId} actualizada` });
    } 
  });

  module.exports = listEditRouter;
