import React, { useState, useId, useContext } from "react";
import { addTask, TaskContext } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === "") return;
    setTaskName("");
  }
  // generate a unique id for the input field
  const inputID = useId();

  // use useEffect to focus the input field when the component mounts
  useEffect(() => {
    inputId.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      {/* use the generated id in the label */}
      <label htmlFor={inputID}>New Task:</label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>

    
  );
}

export default TaskForm;
