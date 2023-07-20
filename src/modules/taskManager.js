/* eslint-disable no-undef */
// eslint-disable-next-line import/no-mutable-exports
let tasks = [];

export function addTask(task) {
  tasks.push(task);
}

export { tasks };

export function updateIndexes() {
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
}

// Function for application functionality
export function removeTask(taskId) {
  tasks = tasks.filter((task) => task.index !== taskId);
  updateIndexes();
}

export function removeTaskForTesting(taskId) {
  const updatedTasks = tasks.filter((task) => task.index !== taskId);
  updateIndexes(updatedTasks);
  return updatedTasks;
}

export function editTaskDescription(taskId, newDescription) {
  const task = tasks.find((task) => task.index === taskId);
  if (task) {
    task.description = newDescription;
  }
}

export function toggleTaskCompleted(taskId) {
  const task = tasks.find((task) => task.index === taskId);
  if (task) {
    task.completed = !task.completed;
  }
}

export function clearCompletedTasks() {
  tasks = tasks.filter((task) => !task.completed);
  updateIndexes();
}

export function getTasks() {
  return tasks;
}

export const displayTasks = () => {
  const addedTasks = document.createElement('div');
  addedTasks.classList.add('added-tasks');
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
