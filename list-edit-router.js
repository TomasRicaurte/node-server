const express = require('express');
const listEditRouter = express.Router();

const ListaDeTareas = require('./ListadeTareas');


listEditRouter.post('/crear', (req, res) => {
    const { Indicador, Descripcion } = req.body;
  
    if (!Indicador || !Descripcion) {
      return res.status(400).json({ error: "Indicador y Descripcion son obligatorios" });
    }
  
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

  listEditRouter.put('/actualizar/:id', (req, res) => {
    const taskId = req.params.id;
  
    if (taskId >= 0 && taskId < ListaDeTareas.length) {
      ListaDeTareas[taskId].completed = !ListaDeTareas[taskId].completed;
      res.json({ message: `Tarea ${taskId} actualizada` });
    } else {
      res.status(404).json({ error: "Tarea no encontrada" });
    }
  });

module.exports = listEditRouter;
