const express = require('express');
const router = express.Router();

// Crear una tarea
router.post('/create', (req, res, next) => {
  if (!req.body.description) {
    return res.status(400).send("Descripción de tarea vacía");
  }

  const newTask = {
    id: generateNewId(),
    isCompleted: false,
    description: req.body.description
  };
  tasks.push(newTask);
  res.json(newTask);
});

// Actualizar una tarea
router.put('/update/:id', (req, res, next) => {
  const taskId = req.params.id;
  const updatedDescription = req.body.description;
  const taskToUpdate = tasks.find(task => task.id === taskId);
  if (taskToUpdate) {
    taskToUpdate.description = updatedDescription;
    res.json(taskToUpdate);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

// Eliminar una tarea
router.delete('/delete/:id', (req, res, next) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

module.exports = router;
