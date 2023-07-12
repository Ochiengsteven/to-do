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

const addedTasks = document.createElement('div');
addedTasks.classList.add('added-tasks');

frame.appendChild(addedTasks);
const displayTasks = () => {
  addedTasks.innerHTML = '';

  tasks.forEach((task) => {
    const div = document.createElement('div');
    div.classList.add('task');
    div.setAttribute('id', `task-${task.index}`);
    div.innerHTML = `<img src="${uncheckIcon.src}" alt="Uncheck Icon">
                     <p>${task.description}</p>
                     <img src="${deleteIcon.src}" alt="deleteico" class="deleteico">
                     <img src="${dotsIcon.src}" alt="move" class="move">`;
    addedTasks.appendChild(div);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputTask = document.querySelector('.task-input').value;
  const myTask = {
    description: inputTask,
    completed: false,
    index: Math.floor(Math.random() * 1000), // Generate a random number as the index
  };
  tasks.push(myTask);
  document.querySelector('.task-input').value = '';
  displayTasks();
});

const clearAll = document.createElement('div');
clearAll.classList.add('clear-all');
clearAll.innerHTML = '<p>Clear All Completed</p>';
frame.appendChild(clearAll);

addedTasks.addEventListener('click', (event) => {
  if (event.target.classList.contains('deleteico')) {
    const taskId = Number(event.target.parentNode.id.split('-')[1]);
    tasks = tasks.filter((task) => task.index !== taskId);
    displayTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    displayTasks();
  }
});
