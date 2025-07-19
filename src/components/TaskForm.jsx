import React, { useState, useEffect, useRef, useId, useContext } from "react";
import { addTask, TaskContext } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  // this just allows us direct access to the DOM
  const inputRef = useRef(null);
  // this generates a unique id for the input field for accessibility purposes, so the label is properly linked to the input
  const inputID = useId();
  // this gets the `setTasks` updater function from the provided context to be able to create/add a new task globally
  const { setTasks } = useContext(TaskContext);

  // this will focus the input field when the component mounts
  useEffect(() => {
    inputRef.current.focus(); // note to self that this is like document.querySelector('input').focus() but in React
  }, []);

  // This function will handle the form submission logic and associated events to be able to send a task to the backend database (`db.json`), then update the frontend state with the new task
  function handleSubmit(event) {
    event.preventDefault();
    if (taskName.trim() === "") return;
    
    const newTask = {
      title: taskName,
      completed: false,
    };

    // make a POST request to add the new task to the server
    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
    .then((response) => response.json())
    .then((addedTask) => {
      // This will add the new task to the global state using context the other direction (from child to parent)
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      // then clear the input field after successfully adding it
      setTaskName("");
    });
  }
 
  return (
    <form onSubmit={handleSubmit}>
      {/* use the generated id in the label */}
      <label htmlFor={inputID}>New Task:</label>
      <input
        id={inputID}
        ref={inputRef} // added this logic to connect ref with the useEffect input focus
        type="text"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;