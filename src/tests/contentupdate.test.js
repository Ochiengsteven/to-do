// Import the required functions and modules
const {
  editTaskDescription,
  clearCompletedTasks,
  getTasks,
  // eslint-disable-next-line no-unused-vars
  updateIndexes,
} = require('../modules/taskManager.js');

// Helper function to create a task object
const createTask = (index, description, completed = false) => ({
  index,
  description,
  completed,
});

describe('editTaskDescription and clearCompletedTasks', () => {
  beforeEach(() => {
    // Reset tasks before each test
    getTasks().length = 0;
  });

  test('editTaskDescription should update task description', () => {
    // Arrange: Create a test task with taskId: 1 and description: 'Old Description'
    const taskId = 1;
    const oldDescription = 'Old Description';
    const testTask = createTask(taskId, oldDescription, false);
    getTasks().push(testTask);

    // Act: Edit the task description
    const newDescription = 'New Description';
    editTaskDescription(taskId, newDescription);

    // Assert: Check that the task description is updated
    const tasks = getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].index).toBe(taskId);
    expect(tasks[0].description).toBe(newDescription);
    expect(tasks[0].completed).toBe(false);
  });

  test('editTaskDescription should do nothing if task is not found', () => {
    // Arrange: Create a test task with taskId: 1 and description: 'Old Description'
    const taskId = 1;
    const oldDescription = 'Old Description';
    const testTask = createTask(taskId, oldDescription, false);
    getTasks().push(testTask);

    // Act: Edit the description for an invalid taskId
    const newDescription = 'New Description';
    editTaskDescription(999, newDescription); // Invalid taskId

    // Assert: Check that the task remains unchanged
    const tasks = getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].index).toBe(taskId);
    expect(tasks[0].description).toBe(oldDescription);
    expect(tasks[0].completed).toBe(false); // Should remain unchanged
  });

  test('clearCompletedTasks should remove completed tasks', () => {
    // Arrange: Create test tasks, some completed and some not completed
    const task1 = createTask(1, 'Task 1', true);
    const task2 = createTask(2, 'Task 2', false);
    const task3 = createTask(3, 'Task 3', true);
    getTasks().push(task1, task2, task3);

    // Act: Clear completed tasks
    clearCompletedTasks();

    // Assert: Check that completed tasks are removed, and indexes are updated
    const tasks = getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual({ index: 1, description: 'Task 2', completed: false });
  });
});
