const express = require('express');
const listViewRouter = express.Router();

const ListaDeTareas = require('./ListadeTareas');

listViewRouter.get('/completas', (req, res) => {
    if (Array.isArray(ListaDeTareas)) {
      const tareasCompletas = ListaDeTareas.filter(tarea => tarea.completed);
      res.json(tareasCompletas);
    } else {
      res.status(500).json({ error: 'ListaDeTareas no es un array' });
    }
  });
  
  
  listViewRouter.get('/incompletas', (req, res) => {
    if (Array.isArray(ListaDeTareas)) {
      const tareasIncompletas = ListaDeTareas.filter(tarea => !tarea.completed);
      res.json(tareasIncompletas);
    } else {
      res.status(500).json({ error: 'ListaDeTareas no es un array' });
    }
  });
  

module.exports = listViewRouter;

