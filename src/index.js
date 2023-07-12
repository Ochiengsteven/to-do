import './style.css';
import reload from './assets/reload.png';
import uncheck from './assets/unchecked.png';
import dots from './assets/vertical-dots.png';
import deleteicon from './assets/delete.png';

const reloadIcon = new Image();
reloadIcon.src = reload;

const uncheckIcon = new Image();
uncheckIcon.src = uncheck;

const dotsIcon = new Image();
dotsIcon.src = dots;

const deleteIcon = new Image();
deleteIcon.src = deleteicon;

const frame = document.querySelector('.container');
const header = document.createElement('div');
header.classList.add('header');
header.innerHTML = '<h1>Todo List</h1>';
header.appendChild(reloadIcon);
frame.appendChild(header);
const taskForm = document.createElement('form');
taskForm.classList.add('task-form');
taskForm.innerHTML = '<input type="text" class="task-input" placeholder="Add to your list...">';
frame.appendChild(taskForm);

let tasks = [];

const form = document.querySelector('.task-form');

const displayTasks = () => {
  const addedTasks = document.createElement('div');
  addedTasks.classList.add('added-tasks');
  addedTasks.innerHTML = '';
  frame.appendChild(addedTasks);
  tasks.forEach((task) => {
    const div = document.createElement('div');
    div.classList.add('task');
    div.setAttribute('id', task.index);
    div.innerHTML = `<img src="${uncheckIcon.src}" alt="Uncheck Icon"><p>${task.description}</p><img src="${deleteIcon.src}" alt="deleteico" class="deleteico"><img src="${dotsIcon.src}" alt="move" class="move">`;
    addedTasks.appendChild(div);
  });

  const clearAll = document.createElement('div');
  clearAll.classList.add('clear-all');
  clearAll.innerHTML = '<p>Clear All Completed</p>';
  frame.appendChild(clearAll);

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputTask = document.querySelector('.task-input').value;
  const myTask = {
    description: inputTask,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(myTask);
  document.querySelector('.task-input').value = '';
  displayTasks();
});

const deleteTask = (e) => {
  const index = e.target.parentNode.id;
  tasks.splice(index - 1, 1);
  frame.innerHTML = '';
  displayTasks();
};

document.addEventListener('click', (e) => {
  if (e.target.className === 'deleteico') {
    deleteTask(e);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const storedTasks = localStorage.getItem('tasks');

  // If there's any data, parse it and assign it to bookData
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    displayTasks(); // Display the books from the local storage data
  }
});
