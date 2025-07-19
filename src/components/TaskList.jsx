import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function TaskList({ query }) {
  // this will pull the current list of tasks and also the completed toggle function from the shared context!
  const { tasks, toggleComplete } = useContext(TaskContext);
  
  // This will dynamically filter tasks based on user search input
  const filteredTasks = tasks.filter(task =>
    task.title?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <span style={{
              textDecoration: task.completed ? "line-through" : "none" 
            }}
          >
            {task.title}
          </span>
          <button data-testid={task.id} onClick={() => toggleComplete(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
