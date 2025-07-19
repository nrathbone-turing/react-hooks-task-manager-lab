import React, { useState, useEffect, useRef, useId, useContext } from "react";
import { addTask, TaskContext } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const inputRef = useRef(null);
  // generate a unique id for the input field
  const inputID = useId();
  const { setTasks } = useContext(TaskContext);

  // use useEffect to focus the input field when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (taskName.trim() === "") return;
    
    const newTask = {
      title: taskName,
      completed: false,
    };

    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
    .then((response) => response.json())
    .then((addedTask) => {
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setTaskName("");
    });
  }
 
  return (
    <form onSubmit={handleSubmit}>
      {/* use the generated id in the label */}
      <label htmlFor={inputID}>New Task:</label>
      <input
        id={inputID}
        ref={inputRef}
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