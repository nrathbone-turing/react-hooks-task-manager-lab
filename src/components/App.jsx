import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";

function App() {
  // allow the function to access `tasks` and `error` from context
  const { tasks, error } = useContext(TaskContext);

  return (
    <div>
      <h1>Task Manager</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TaskForm />
      <SearchBar />
    </div>
  );
}

export default App;
