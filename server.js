const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// Get todos with optional filter
app.get('/api/todos', async (req, res) => {
  try {
    const filter = req.query.completed !== undefined ? { completed: req.query.completed === 'true' } : {};
    const todos = await Todo.find(filter);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos', error: err.message });
  }
});

// Add new todo
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      task: req.body.task,
      completed: false,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: 'Error adding todo', error: err.message });
  }
});

// Update todo
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  // Find the todo by ID and update the task and completed status
  const updatedTodo = await Todo.findByIdAndUpdate(id, 
    { 
      task: task || undefined,  // Only update if task is provided
      completed: completed !== undefined ? completed : undefined, // Only update if completed is provided
    }, 
    { new: true }
  );

  res.json(updatedTodo);
});


// Delete todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo', error: err.message });
  }
});

app.use(express.static('public'));  // Serves the frontend files

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
