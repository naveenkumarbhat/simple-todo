// AddTask.js
import { useState } from "react";
import "./AddTask.css";

function AddTask({ onAdd }) {
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newTask.trim()) {
      onAdd(newTask);
      setNewTask('');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="add-task">
      <input
        type="text"
        placeholder="Add a new Task"
        value={newTask}
        onChange={handleInputChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTask;
