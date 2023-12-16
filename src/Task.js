// Task.js
import { useState } from "react";
import "./Task.css";

function Task({ task, onRemove, onComplete, onEdit }) {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEdit = () => {
    onEdit({ ...task, text: editedText });
    setEditMode(false);
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div>
        {editMode ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            autoFocus
          />
        ) : (
          <span>{task.text}</span>
        )}
      </div>
      <div>
        {editMode ? (
          <button onClick={handleEdit} className="btn-save">Save</button>
        ) : (
          <>
            <button className={task.completed ? "btn-incomplete" : "btn-complete"} onClick={() => onComplete(task)}>
              {task.completed ? "Not Yet" : "Done"}
            </button>
            <button className="task-edit" onClick={toggleEditMode}>Edit</button>
            <button className="task-remove" onClick={() => onRemove(task)}>Remove</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Task;
