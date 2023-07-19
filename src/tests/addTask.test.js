const {
  addTask,
  removeTaskForTesting,
  tasks,
} = require("../modules/taskManager.js");

describe("addTask", () => {
  beforeEach(() => {
    tasks.length = 0; // Reset tasks before each test
  });

  it("should add a task to the tasks array", () => {
    // Initial tasks array should be empty
    expect(tasks).toHaveLength(0);

    // Add a task
    addTask("Task 1");

    // After adding a task, tasks array should contain one element
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toEqual("Task 1");
  });

  it("should add multiple tasks to the tasks array", () => {
    // Initial tasks array should be empty
    expect(tasks).toHaveLength(0);

    // Add multiple tasks
    addTask("Task 1");
    addTask("Task 2");
    addTask("Task 3");

    // After adding multiple tasks, tasks array should contain all the added tasks
    expect(tasks).toHaveLength(3);
    expect(tasks).toEqual(["Task 1", "Task 2", "Task 3"]);
  });
});

describe("removeTask", () => {
  beforeEach(() => {
    tasks.length = 0; // Reset tasks before each test
    tasks.push(
      { index: 1, name: "Task 1" },
      { index: 2, name: "Task 2" },
      { index: 3, name: "Task 3" }
    );
  });

  it("should remove a task from the tasks array", () => {
    const updatedTasks = removeTaskForTesting(2);

    // Update the tasks array with the updatedTasks
    tasks.length = 0;
    tasks.push(...updatedTasks);

    // Verify the updated tasks array
    expect(tasks).toHaveLength(2);
    expect(tasks[0]).toEqual({ index: 1, name: "Task 1" });
    expect(tasks[1]).toEqual({ index: 3, name: "Task 3" });
  });
});
