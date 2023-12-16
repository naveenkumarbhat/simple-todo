// App.js
import React, { useState, useEffect } from "react";
import './App.css';
import Task from "./Task";
import AddTask from "./AddTask";
// import './DarkModeToggle.css'

const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

function App() {
  // const [darkMode, setDarkMode] = useState(false)
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState(storedTasks);

  useEffect(()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks)
  },[])

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
  },[tasks])

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: prevTasks.length + 1, text: newTask, completed: false }
    ]);
  };

  const handleCompleteTask = (task) => {
    const updatedTasks = tasks.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t));
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleRemoveTask = (task) => {
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleEditTask = (editedTask) => {
    const taskIndex = tasks.findIndex((t) => t.id === editedTask.id);
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = editedTask;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="App">
      <h1>My Tasks</h1>
      {/* <button className="dark-mode-toggle" onClick={()=>setDarkMode(!darkMode)}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button> */}
      <AddTask className="add-task" onAdd={handleAddTask} />

      <div className="filter-buttons">
        <button className="filter-btn-all" onClick={() => setFilter('all')}>📃 All</button>
        <button className=" filter-btn-active" onClick={() => setFilter('active')}>💡 Active</button>
        <button className="filter-btn-complete" onClick={() => setFilter('completed')}>✔Completed</button>
      </div>

      {tasks
        .filter((task) => {
          if (filter === 'all') return true;
          if (filter === 'active') return !task.completed;
          if (filter === 'completed') return task.completed;
          return true;
        })
        .map((task) => (
          <Task key={task.id} task={task}
            onRemove={handleRemoveTask}
            onComplete={handleCompleteTask}
            onEdit={handleEditTask}
          />
        ))}
         <footer className="footer">
      <p>&copy; 21st Century ~ NVB ~ version 0.1 🔆  </p>
    </footer>
    </div>
  );
}

export default App;
