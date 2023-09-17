const express = require('express');
const listViewRouter = express.Router();

const ListaDeTareas = require('./ListadeTareas');

listViewRouter.param('estado', (req, res, next, estado) => {
  if (estado === 'completas' || estado === 'incompletas') {
    req.estadoTarea = estado;
    next();
  } else {
    res.status(400).json({ error: 'Estado de tarea no válido' });
  }
});

listViewRouter.get('/:estado', (req, res) => {
  if (Array.isArray(ListaDeTareas)) {
    if (req.estadoTarea === 'completas') {
      const tareasCompletas = ListaDeTareas.filter(tarea => tarea.completed === true);
      res.json(tareasCompletas);
    } else if (req.estadoTarea === 'incompletas') { // Aquí cambiamos de res a req
      const tareasIncompletas = ListaDeTareas.filter(tarea => tarea.completed === false);
      res.json(tareasIncompletas);
    }
  } else {
    res.status(500).json({ error: 'ListadeTareas no es un Array' });
  }
});

module.exports = listViewRouter;
