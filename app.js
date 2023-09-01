const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const app = express();
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

dotenv.config();

app.use(express.json());
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

const users = [
  { username: 'usuario1', password: 'contrasena1' },
  { username: 'usuario2', password: 'contrasena2' },
];

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


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET);

  res.json({ token });
});

app.get('/protected', (req, res) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Acceso autorizado' });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
