const express = require('express');
const app = express();

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
  }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
