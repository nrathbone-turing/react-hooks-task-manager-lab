import React, { createContext, useState, useEffect } from "react";

// Create the context object that will be shared across components
export const TaskContext = createContext();

// This component will be the thing providing the context to all components wrapped inside it
export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]); // state to hold the list of tasks
    const [error, setError] = useState(null); // state to hold any error messages from fetch or updates

    // initial API call to fetch the initial task list
    useEffect(() => {
      fetch("http://localhost:6001/tasks")
        .then((response) => response.json())
        .then(setTasks) // sets the task list to state
        .catch((err) => setError(err.message)); // handles errors if fetch fails
    }, []);

    // This function is used to toggle a task's completed status (true/false)
    function toggleComplete(id) {
      // First find the task object that matches the ID provided
      const taskToUpdate = tasks.find((task) => task.id === id);
      // Then create a copy of that task with the completed value flipped (since it can only ever be true or false)
      const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
      
      // Send the updated task to the server with a PATCH request
      fetch(`http://localhost:6001/tasks${id}`, {
        method:"PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed: updatedTask.completed }) // send only what changed!
      })
      .then(response => response.json())
      .then((updatedTask) => {
        // And then this updates the local state to reflect the change instead of re-rendering everything
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            // Then replace only the updated task!
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      })
      .catch(err => setError(err.message)); // handle any fetch errors here too
    };

    // Adding this provider makes these previous values (state + functions) available to all components inside the tree!
    return (
        <TaskContext.Provider value={{ tasks, setTasks, toggleComplete, error }}>
          {children}
        </TaskContext.Provider>
    );
}