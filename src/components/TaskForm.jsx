import React from 'react';

export const TaskForm = ({ 
  taskText, 
  setTaskText, 
  dueDate, 
  setDueDate, 
  dueTime, 
  setDueTime, 
  priority, 
  setPriority, 
  handleAddOrUpdateTask, 
  editingTaskId, 
  handleKeyDown 
}) => {
  return (
    <div className="form-container">
      <div className="input-group">
        <label htmlFor="task-input">Task</label>
        <input
          id="task-input"
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What do you need to do?"
          autoFocus
        />
      </div>
      
      <div className="date-time-container">
        <div className="input-group">
          <label htmlFor="date-input">Due Date</label>
          <div className="input-with-icon">
            <input
              id="date-input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <span className="input-icon calendar-icon"></span>
          </div>
        </div>
        
        <div className="input-group">
          <label htmlFor="time-input">Due Time</label>
          <div className="input-with-icon">
            <input
              id="time-input"
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
            <span className="input-icon clock-icon"></span>
          </div>
        </div>
      </div>
      
      <div className="input-group">
        <label>Priority</label>
        <div className="priority-selector">
          {['High', 'Mid', 'Low'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`priority-btn ${p === priority ? `priority-btn-${p.toLowerCase()} selected` : ''}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      
      <button 
        className={`btn ${editingTaskId !== null ? 'btn-update' : 'btn-add'}`}
        onClick={handleAddOrUpdateTask}
      >
        {editingTaskId !== null ? 'Update Task' : 'Add Task'}
      </button>
    </div>
  );
};