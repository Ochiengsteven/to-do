// Import the required functions and modules
const { toggleTaskCompleted, getTasks } = require('../modules/taskManager.js');

// Function to create a task object
const createTask = (index, description, completed = false) => ({
  index,
  description,
  completed,
});

describe('toggleTaskCompleted', () => {
  beforeEach(() => {
    // Reset tasks before each test
    getTasks().length = 0;
  });

  test('should toggle task completion status', () => {
    // Arrange: Create a test task with taskId: 1 and completed: false
    const taskId = 1;
    const testTask = createTask(taskId, 'Test Task', false);
    getTasks().push(testTask);

    // Act: Toggle the completion status of the task
    toggleTaskCompleted(taskId);

    // Assert: Check that the task completion status is toggled
    const tasks = getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].index).toBe(taskId);
    expect(tasks[0].description).toBe('Test Task');
    expect(tasks[0].completed).toBe(true);
  });

  test('should do nothing if task is not found', () => {
    // Arrange: Create a test task with taskId: 1 and completed: false
    const taskId = 1;
    const testTask = createTask(taskId, 'Test Task', false);
    getTasks().push(testTask);

    // Act: Toggle the completion status for an invalid taskId
    toggleTaskCompleted(999); // Invalid taskId

    // Assert: Check that the task remains unchanged
    const tasks = getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].index).toBe(taskId);
    expect(tasks[0].description).toBe('Test Task');
    expect(tasks[0].completed).toBe(false); // Should remain unchanged
  });
});
