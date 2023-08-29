const express = require('express');
const app = express();
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use(express.json());
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

const tasks = [
    {
    id: "1",
    isCompleted: false,
    description: "Walk the dog"
  },
  {
    id: "2",
    isCompleted: true,
    description: "Take breakfast"
  },
  {
    id: "3",
    isCompleted: false,
    description: "Go to the gym"
  }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.use((req, res, next) => {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    return res.status(400).send("Método HTTP no válido");
  }

  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
