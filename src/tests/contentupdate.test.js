// Import the jsdom package
// eslint-disable-next-line import/no-extraneous-dependencies
import jsdom from 'jsdom';
// Import the functions to be tested
import {
  addTask,
  removeTask,
  editTaskDescription,
  toggleTaskCompleted,
  clearCompletedTasks,
  getTasks,
} from '../modules/taskManager.js';

// Sample test data
const sampleTask = {
  description: 'Sample Task',
  completed: false,
  index: 1,
};

const { JSDOM } = jsdom;

// Set up the DOM environment before running the tests
const dom = new JSDOM('<!DOCTYPE html><html><body><div class="container"><div class="added-tasks"></div></div></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Manually define TextEncoder and TextDecoder
global.TextEncoder = dom.window.TextEncoder;
global.TextDecoder = dom.window.TextDecoder;

describe('Task Manager Functions', () => {
  // Set up a fresh DOM environment before each test
  beforeEach(() => {
    document.body.innerHTML = `
        <div class="container">
          <div class="added-tasks"></div>
        </div>
      `;
  });

  test('addTask should add a new task to the DOM', () => {
    // Call the addTask function
    addTask(sampleTask);

    // Get the added task element
    const taskElement = document.querySelector('.added-tasks .task');

    // Task element should not be null, meaning it's been added to the DOM
    expect(taskElement).not.toBeNull();

    // Check if the description matches the sample task description
    expect(taskElement.textContent).toContain(sampleTask.description);
  });

  test('removeTask should remove a task from the DOM', () => {
    // Add a sample task first
    addTask(sampleTask);

    // Call the removeTask function
    removeTask(sampleTask.index);

    // Check if the task has been removed from the DOM
    const taskElement = document.querySelector(`#task-${sampleTask.index}`);
    expect(taskElement).toBeNull();
  });

  test('editTaskDescription should update the task description', () => {
    // Add a sample task first
    addTask(sampleTask);

    // New description for the task
    const newDescription = 'Updated Task Description';

    // Call the editTaskDescription function
    editTaskDescription(sampleTask.index, newDescription);

    // Check if the task description has been updated in the DOM
    const taskElement = document.querySelector(`#task-${sampleTask.index} p`);
    expect(taskElement.textContent).toBe(newDescription);
  });

  test('toggleTaskCompleted should toggle task completion status', () => {
    // Add a sample task first
    addTask(sampleTask);

    // Call the toggleTaskCompleted function
    toggleTaskCompleted(sampleTask.index);

    // Check if the task completion status has been updated in the DOM
    const taskElement = document.querySelector(`#task-${sampleTask.index}`);
    expect(taskElement.classList.contains('completed')).toBe(true);
  });

  test('clearCompletedTasks should remove all completed tasks from the DOM', () => {
    // Add a sample completed task
    addTask({ ...sampleTask, completed: true });

    // Add another incomplete task
    addTask(sampleTask);

    // Call the clearCompletedTasks function
    clearCompletedTasks();

    // Check if the completed task has been removed from the DOM
    const completedTaskElement = document.querySelector(`#task-${sampleTask.index}`);
    expect(completedTaskElement).toBeNull();

    // Check if the incomplete task is still in the DOM
    const incompleteTaskElement = document.querySelector('.added-tasks .task');
    expect(incompleteTaskElement).not.toBeNull();
  });

  test('getTasks should return an array of tasks', () => {
    // Add some sample tasks
    addTask(sampleTask);
    addTask({ ...sampleTask, index: 2 });
    addTask({ ...sampleTask, index: 3 });

    // Call the getTasks function
    const tasks = getTasks();

    // Check if the returned value is an array and contains the correct number of tasks
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBe(3);
  });
});
