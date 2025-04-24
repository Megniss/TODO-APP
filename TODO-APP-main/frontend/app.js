// frontend/app.js
const API_URL    = '/tasks';
const form       = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const list       = document.getElementById('tasks-list');

function renderTask(task) {
  const li = document.createElement('li');
  
  const text = document.createElement('span');
  text.textContent = task.title;
  if (task.completed) {
    text.style.textDecoration = 'line-through';
  }
  li.appendChild(text);

  // checkbox completed
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', async () => {
    await fetch(`${API_URL}/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: checkbox.checked, title: task.title })
    });
    loadTasks();
  });
  li.insertBefore(checkbox, text);

  // delete button
  const btn = document.createElement('button');
  btn.textContent = 'Dzēst';
  btn.addEventListener('click', async () => {
    await fetch(`${API_URL}/${task._id}`, { method: 'DELETE' });
    loadTasks();
  });
  li.appendChild(btn);

  list.appendChild(li);
}

async function loadTasks() {
  const res   = await fetch(API_URL);
  const tasks = await res.json();
  list.innerHTML = '';
  tasks.forEach(renderTask);
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  form.reset();
  loadTasks();
});

window.addEventListener('DOMContentLoaded', loadTasks);
