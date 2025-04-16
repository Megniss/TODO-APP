fetch('http://localhost:3000/tasks')
  .then(response => response.json())
  .then(tasks => {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';

    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.textContent = task.title;
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Dzēst';
      deleteButton.addEventListener('click', function () {
        fetch(`http://localhost:3000/tasks/${task._id}`, {
          method: 'DELETE',
        })
        .then(() => taskItem.remove())
        .catch(error => console.error('Kļūda dzēšot uzdevumu:', error));
      });

      taskItem.appendChild(deleteButton);
      tasksList.appendChild(taskItem);
    });
  })
  .catch(error => console.error('Kļūda iegūstot uzdevumus:', error));

const form = document.getElementById('task-form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.getElementById('task-title').value;

  fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })
  .then(response => response.json())
  .then(task => {
    console.log('Jauns uzdevums pievienots:', task);

    const tasksList = document.getElementById('tasks-list');
    const taskItem = document.createElement('li');
    taskItem.textContent = task.title;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Dzēst';
    deleteButton.addEventListener('click', function () {
      fetch(`http://localhost:3000/tasks/${task._id}`, {
        method: 'DELETE',
      })
      .then(() => taskItem.remove())
      .catch(error => console.error('Kļūda dzēšot uzdevumu:', error));
    });

    taskItem.appendChild(deleteButton);
    tasksList.appendChild(taskItem);

    form.reset();
  })
  .catch(error => console.error('Kļūda pievienojot uzdevumu:', error));
});
