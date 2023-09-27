const express = require('express');
const listEditRouter = express.Router();

const ListaDeTareas = require('./ListadeTareas');

function validarCampos (req, res, next) {
  const {Id, Indicador, Descripcion } = req.body

  if(req.method === 'POST') {
    if(!Id || !Indicador || !Descripcion) {
      return res.status(400).json({error: "Id, Indicador y Descripcion son obligatorios"})
    }
    if (ListaDeTareas.some(task => task.Id === Id)) {
      return res.status(401).json({ error: "El Id no puede ser igual a otro" });
    }
    if (Indicador === " " || Descripcion === " "){
      return res.status(400).json({error: "El cuerpo de la solicitud POST no puede estar vacío"})
    }
  }
  next();
}

listEditRouter.post('/crear', validarCampos, (req, res) => {
    const { Id, Indicador, Descripcion } = req.body;

    ListaDeTareas.push({
      Id,
      Indicador,
      Descripcion,
      completed: false
    });
    
    res.status(201).json({ message: "Tarea creada exitosamente" });
  });

listEditRouter.delete('/eliminar/:id', (req, res) => {
    const taskId = req.params.id;
  
    if (taskId !== undefined) {
      const index = ListaDeTareas.findIndex(task => task.id === taskId);
      
      if (index !== -1) {
        ListaDeTareas.splice(index, 1);
        res.json({ message: `Tarea ${taskId} eliminada` });
      } else {
        res.status(404).json({ error: "Tarea no encontrada" });
      }
    } else {
      res.status(400).json({ error: "Se requiere un ID válido en el cuerpo de la solicitud" });
    }
  });

listEditRouter.put('/actualizar/:id', validarCampos, (req, res) => {
    const taskId = req.params.id;
  
    if (taskId) {
      const index = ListaDeTareas.findIndex(task => task.id === taskId);
  
      if (index !== -1) {
        ListaDeTareas[index].completed = !ListaDeTareas[index].completed;
        res.json({ message: `Tarea ${taskId} actualizada` });
      } else {
        res.status(404).json({ error: "Tarea no encontrada" });
      }
    } else {
      res.status(400).json({ error: "Se requiere un ID válido en los parámetros de la solicitud" });
    } 
  });

  module.exports = listEditRouter;
