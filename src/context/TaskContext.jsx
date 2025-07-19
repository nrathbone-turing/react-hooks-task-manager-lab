import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch("http://localhost:6001/tasks")
        .then((response) => response.json())
        .then(setTasks)
        .catch((err) => setError(err.message));
    }, []);

    function toggleComplete(id) {
      const taskToUpdate = tasks.find((task) => task.id === id);
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      
      fetch(`http://localhost:6001/tasks${id}`, {
        method:"PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed: updatedTask.completed })
      })
      .then(response => response.json())
      .then((updatedTask) => {
        // Update just the task that was completed using .map() instead of re-fetching all tasks
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      })
      .catch(err => setError(err.message));
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, toggleComplete, error }}>
        {children}
        </TaskContext.Provider>
    );
}