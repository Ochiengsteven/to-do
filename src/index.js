import './style.css';
import reload from './assets/reload.png';
import uncheck from './assets/unchecked.png';
import dots from './assets/vertical-dots.png';

const reloadIcon = new Image();
reloadIcon.src = reload;

const uncheckIcon = new Image();
uncheckIcon.src = uncheck;

const dotsIcon = new Image();
dotsIcon.src = dots;

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

const tasks = [
  {
    description: 'Finish homework',
    completed: false,
    index: 1,
  },
  {
    description: 'Go grocery shopping',
    completed: false,
    index: 2,
  },
  {
    description: 'Clean the house',
    completed: false,
    index: 3,
  },
];

tasks.forEach((task) => {
  const div = document.createElement('div');
  div.classList.add('task');
  div.setAttribute('id', task.index);
  div.innerHTML = `<img src="${uncheckIcon.src}" alt="Uncheck Icon"><p>${task.description}</p><img src="${dotsIcon.src}" alt="move" class="move">`;
  frame.appendChild(div);
});

const clearAll = document.createElement('div');
clearAll.classList.add('clear-all');
clearAll.innerHTML = '<p>Clear All Completed</p>';
frame.appendChild(clearAll);
