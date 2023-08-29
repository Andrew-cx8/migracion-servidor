const express = require('express');
const listViewRouter = express.Router();

// Listar tareas completas
listViewRouter.get('/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});

// Listar tareas incompletas
listViewRouter.get('/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

module.exports = listViewRouter;
