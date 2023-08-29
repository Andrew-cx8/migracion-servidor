const express = require('express');
const listViewRouter = express.Router();

// Listar tareas completas
listViewRouter.get('/completed', (req, res, next) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});

// Listar tareas incompletas
listViewRouter.get('/incomplete', (req, res, next) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

// Middleware para validar parámetros
listViewRouter.use('/:status', (req, res, next) => {
  const validStatus = ['completed', 'incomplete'];
  const status = req.params.status;

  if (!validStatus.includes(status)) {
    return res.status(400).json({ message: 'Estado de tarea no válido' });
  }

  next();
});

// Ruta para listar tareas por estado
listViewRouter.get('/:status', (req, res, next) => {
  const status = req.params.status;
  const filteredTasks = tasks.filter(task =>
    status === 'completed' ? task.isCompleted : !task.isCompleted
  );
  res.json(filteredTasks);
});

module.exports = listViewRouter;
