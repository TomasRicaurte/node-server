const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tareas = [
  { id: 1, titulo: 'Tarea 1', descripcion: 'Prueba de tarea completa', completed: true },
  { id: 2, titulo: 'Tarea 2', descripcion: 'Prueba de tarea incompleta', completed: false }
];

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.get('/tarea/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }
  res.json(tarea);
});

app.get('/tareas/completas', (req, res) => {
  const tareasCompletas = tareas.filter(t => t.completed);
  res.json(tareasCompletas);
});

app.get('/tareas/incompletas', (req, res) => {
  const tareasIncompletas = tareas.filter(t => !t.completed);
  res.json(tareasIncompletas);
});

app.post('/tareas', (req, res) => {
  const { id, titulo, descripcion } = req.body;

  if (!id ||!titulo || !descripcion) {
    return res.status(400).json({ error: 'El id, el título y la descripción son obligatorios.' });
  }

  const existingTask = tareas.find(task => task.titulo === titulo);
  if (existingTask) {
    return res.status(400).json({ error: 'No se puede repetir el mismo título para distintas tareas.' });
  }

  const nuevaTarea = {
    id: tareas.length + 1,
    titulo,
    descripcion,
    completed: false
  };

  tareas.push(nuevaTarea);
  res.status(201).json({ mensaje: 'Tarea creada con éxito', tarea: nuevaTarea });
});

app.put('/tareas/:id', (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  if (req.body.titulo) {
    tarea.titulo = req.body.titulo;
  }

  if (req.body.descripcion) {
    tarea.descripcion = req.body.descripcion;
  }

  if (req.body.completed !== undefined) {
    tarea.completed = req.body.completed;
  }

  res.status(200).json({ mensaje: 'Tarea actualizada correctamente', tarea });
});

app.delete('/tareas/:id', (req, res) => {
  const tareaIndex = tareas.findIndex(t => t.id === parseInt(req.params.id));
  if (tareaIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tareas.splice(tareaIndex, 1);
  res.json({ mensaje: 'Tarea eliminada con éxito' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
