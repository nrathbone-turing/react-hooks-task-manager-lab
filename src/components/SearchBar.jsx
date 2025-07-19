import React, { useRef, useState, useContext } from "react";
import TaskList from "./TaskList";
import { TaskContext } from "../context/TaskContext";

function SearchBar() {
  const [query, setQuery] = useState("");

  // This is the piece that updates the local query state every time the user types in the search input!
  function handleSearch(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleSearch}
      />
      {/* Pass the search query down to filter the list in TaskList */}
      <TaskList query={query}/>
    </div>
  );
}

export default SearchBar;