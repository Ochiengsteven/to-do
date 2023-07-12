let tasks = [];

export function addTask(task) {
  tasks.push(task);
}

export function removeTask(taskId) {
  tasks = tasks.filter((task) => task.index !== taskId);
}

export function getTasks() {
  return tasks;
}
