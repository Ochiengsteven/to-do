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
