const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const showAllButton = document.getElementById('show-all');
const showPendingButton = document.getElementById('show-pending');
const showDoneButton = document.getElementById('show-done');
const searchInput = document.getElementById('search-input'); // Ensure this is declared


// Function to fetch todos and update UI
async function fetchTodos(filter = 'all') {
  const response = await fetch('http://localhost:5000/api/todos');
  const todos = await response.json();
  
  todoList.innerHTML = '';

  let filteredTodos = todos;
  
  if (filter === 'done') {
    filteredTodos = todos.filter(todo => todo.completed);
  } else if (filter === 'pending') {
    filteredTodos = todos.filter(todo => !todo.completed);
  }
  
  // Calculate progress
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const completionPercentage = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  // Update progress bar and circular progress
  const progressPercentageElement = document.getElementById('progress-percentage');
  const progressFillElement = document.getElementById('progress-fill');
  const circularProgressElement = document.querySelector('.circular-progress');

  progressPercentageElement.textContent = `${completionPercentage}%`;
  progressFillElement.style.width = `${completionPercentage}%`;
  circularProgressElement.style.background = `conic-gradient(#28a745 ${completionPercentage * 3.6}deg, #ddd ${completionPercentage * 3.6}deg)`;

  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    // Create a checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.classList.add('todo-checkbox');
    checkbox.onchange = () => updateTodo(todo._id, checkbox.checked);

    // Add task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = todo.task;
    taskSpan.classList.add('todo-task');
    if (todo.completed) {
      taskSpan.classList.add('completed');
    }

    // Add delete button with trash icon
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('todo-btn', 'delete-btn');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash');
    deleteButton.appendChild(deleteIcon);
    deleteButton.onclick = () => deleteTodo(todo._id);

    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });

  // Check if all todos are completed and show confetti and play sound
  if (completedTodos === totalTodos && totalTodos > 0) {
    if (typeof confetti === 'function') { // Ensure confetti function is available
      confetti(); // Trigger confetti animation
    }
    const sound = document.getElementById('yup-sound');
    if (sound) {
      sound.play(); // Play sound effect
    }
  }
}

// Event listener for form submission
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const task = todoInput.value;

  if (task) {
    await fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    });
    todoInput.value = '';
    fetchTodos();  // Fetch all todos after adding a new one
  }
});

// Update todo completion status
async function updateTodo(id, completed) {
  await fetch(`http://localhost:5000/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  fetchTodos();
}

// Delete todo
async function deleteTodo(id) {
  await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
  fetchTodos();
}

// Edit Functionality
async function editTodoPrompt(id, oldTask) {
  const newTask = prompt("Edit task", oldTask);
  if (newTask && newTask !== oldTask) {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
    });
    fetchTodos();
  } else if (!newTask) {
    alert("Task cannot be empty! Please provide a valid task.");
  }
}

// Search functionality
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const todos = Array.from(todoList.children);
  
  todos.forEach(todo => {
    const taskText = todo.querySelector('.todo-task').textContent.toLowerCase();
    todo.style.display = taskText.includes(query) ? '' : 'none';
  });
});

// Filter buttons
showAllButton.addEventListener('click', () => fetchTodos('all'));
showPendingButton.addEventListener('click', () => fetchTodos('pending'));
showDoneButton.addEventListener('click', () => fetchTodos('done'));

// Initial fetch
fetchTodos();
