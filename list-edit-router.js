// Crear una tarea
listEditRouter.post('/create', (req, res) => {
  const newTask = {
    id: generateNewId(),
    isCompleted: false,
    description: req.body.description
  };
  tasks.push(newTask);
  res.json(newTask);
});

// Actualizar una tarea
listEditRouter.put('/update/:id', (req, res) => {
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
listEditRouter.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Tarea eliminada' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});
