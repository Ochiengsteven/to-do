import { updateIndexes } from './taskManager.js';

let tasks = [];

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
