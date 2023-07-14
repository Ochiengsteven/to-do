/* eslint-disable no-unused-vars */
import './style.css';
import reload from './assets/reload.png';
import uncheck from './assets/unchecked.png';
import dots from './assets/vertical-dots.png';
import deleteicon from './assets/delete.png';
import plus from './assets/plus.png';
import checkedicon from './assets/checked.png';
import {
  addTask, removeTask, editTaskDescription, toggleTaskCompleted, clearCompletedTasks, getTasks,
} from './modules/taskManager.js';

import { toggleCompleted, clearCompleted } from './modules/interaction.js';

const plusIcon = new Image();
plusIcon.src = plus;

const reloadIcon = new Image();
reloadIcon.src = reload;

const uncheckIcon = new Image();
uncheckIcon.src = uncheck;

const dotsIcon = new Image();
dotsIcon.src = dots;

const deleteIcon = new Image();
deleteIcon.src = deleteicon;

const checkedIcon = new Image();
checkedIcon.src = checkedicon;

const frame = document.querySelector('.container');
const header = document.createElement('div');
header.classList.add('header');
header.innerHTML = '<h1>Todo List</h1>';
const reloadIconWrapper = document.createElement('div');
reloadIconWrapper.classList.add('reload-icon-wrapper');
reloadIconWrapper.appendChild(reloadIcon);
header.appendChild(reloadIconWrapper);
frame.appendChild(header);

const taskForm = document.createElement('form');
taskForm.classList.add('task-form');
taskForm.innerHTML = `<input type="text" class="task-input" placeholder="Add to your list...">
                      <img src="${plusIcon.src}" alt="enter" class="add-icon">`;
frame.appendChild(taskForm);

const form = document.querySelector('.task-form');
const taskInput = document.querySelector('.task-input');
const addIcon = document.querySelector('.add-icon');

const addedTasks = document.createElement('div');
addedTasks.classList.add('added-tasks');

frame.appendChild(addedTasks);
const displayTasks = () => {
  addedTasks.innerHTML = '';

  const tasks = getTasks();

  tasks.forEach((task) => {
    const div = document.createElement('div');
    div.classList.add('task');
    div.setAttribute('id', `task-${task.index}`);
    const checkboxClass = task.completed ? 'checkico' : 'uncheckico';
    const pClass = task.completed ? 'completed' : '';
    const checkboxIcon = task.completed ? checkedIcon.src : uncheckIcon.src;
    const checkboxAlt = task.completed ? 'Checked Icon' : 'Unchecked Icon';
    div.innerHTML = `<img src="${checkboxIcon}" alt="${checkboxAlt}" class="${checkboxClass}">
                     <p class="${pClass}" contenteditable>${task.description}</p>
                     <img src="${deleteIcon.src}" alt="deleteico" class="deleteico">
                     <img src="${dotsIcon.src}" alt="move" class="move">`;
    addedTasks.appendChild(div);
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const clearAll = document.createElement('div');
clearAll.classList.add('clear-all');
clearAll.innerHTML = '<p>Clear All Completed</p>';
frame.appendChild(clearAll);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputTask = taskInput.value;
  if (inputTask.trim() !== '') {
    const myTask = {
      description: inputTask,
      completed: false,
      index: getTasks().length + 1,
    };
    addTask(myTask);
    taskInput.value = '';
    displayTasks();
  }
});

addIcon.addEventListener('click', (e) => {
  e.preventDefault();
  const inputTask = taskInput.value;
  if (inputTask.trim() !== '') {
    const myTask = {
      description: inputTask,
      completed: false,
      index: getTasks().length + 1,
    };
    addTask(myTask);
    taskInput.value = '';
    displayTasks();
  }
});

addedTasks.addEventListener('click', (event) => {
  if (event.target.classList.contains('deleteico')) {
    const taskId = Number(event.target.parentNode.id.split('-')[1]);
    removeTask(taskId);
    displayTasks();
    localStorage.setItem('tasks', JSON.stringify(getTasks()));
  }
});

// Edit the description
addedTasks.addEventListener('input', (event) => {
  if (event.target.tagName === 'P') {
    const taskId = Number(event.target.parentNode.id.split('-')[1]);
    const newDescription = event.target.textContent;
    editTaskDescription(taskId, newDescription);
    localStorage.setItem('tasks', JSON.stringify(getTasks()));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => {
      addTask(task);
    });
    displayTasks();
  }
});

// Marking tasks as completed
addedTasks.addEventListener('click', (event) => {
  if (event.target.classList.contains('checkico') || event.target.classList.contains('uncheckico')) {
    const taskId = Number(event.target.parentNode.id.split('-')[1]);
    toggleTaskCompleted(taskId);
    displayTasks();
    localStorage.setItem('tasks', JSON.stringify(getTasks()));
  }
});

// Clear All Completed
clearAll.addEventListener('click', () => {
  clearCompletedTasks();
  displayTasks();
  localStorage.setItem('tasks', JSON.stringify(getTasks()));
});
