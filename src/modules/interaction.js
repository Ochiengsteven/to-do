import updateIndexes from './taskManager.js';

let tasks = [];
export function toggleCompleted(taskId) {
  const task = tasks.find((task) => task.index === taskId);
  if (task) {
    task.completed = !task.completed;
  }
}

export function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  updateIndexes();
}

export function getTasks() {
  return tasks;
}