import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [completed, setCompleted] = useState(false)

    return (
        <TaskContext.Provider value={{ completed, setCompleted }}>
        {children}
        </TaskContext.Provider>
    );
}

export function addTask() {

}

export function toggleComplete(id) {
        
    fetch(`http://localhost:6001/tasks${id}`, {
      method:"PATCH",
      headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ completed: setCompleted })
    })
    .then(response => response.json())
    .then(updatedTask => {
      setcompleted(tasks =>
        // Update just the task that was completed using .map() instead of re-fetching all tasks
        tasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task,
          task.completed = true
        )
      )
    })   
    .catch(err => setError(err.message));

    toggleComplete();
  };