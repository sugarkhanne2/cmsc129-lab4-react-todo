import React from 'react';

export const Task = ({ 
  task, 
  toggleComplete, 
  handleEdit, 
  showDeleteConfirmation, 
  formatDate, 
  getPriorityClassName 
}) => {
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    return `${formattedHours}:${minutes} ${ampm}`;
  };
  
  const formatDueTime = (timeString) => {
    if (timeString.toLowerCase().includes('am') || timeString.toLowerCase().includes('pm')) {
      return timeString;
    }
    
    const timeParts = timeString.split(':');
    if (timeParts.length === 2) {
      const hours = parseInt(timeParts[0], 10);
      const minutes = timeParts[1].padStart(2, '0');
      
      if (!isNaN(hours) && hours >= 0 && hours <= 23) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
        return `${formattedHours}:${minutes} ${ampm}`;
      }
    }
    
    return timeString;
  };

  return (
    <li 
      className={`task-item ${task.completed ? 'completed' : ''}`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
        className="task-checkbox"
      />
      
      <div className="task-content">
        <div className="task-text-container">
          <p className={`task-text ${task.completed ? 'completed' : ''}`}>
            {task.text}
          </p>
          <span className={`priority-tag ${getPriorityClassName(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        
        <div className="task-dates">
          {task.dateAdded && (
            <p className="task-created">
              Created: {formatDate(new Date(task.dateAdded))} at {formatTime(task.dateAdded)}
            </p>
          )}
          
          {(task.dueDate || task.dueTime) && (
            <p className="task-due">
              Due: {task.dueDate && formatDate(new Date(task.dueDate))}
              {task.dueTime && (task.dueDate ? ' at ' : '') + 
                (task.dueTime.toLowerCase().includes('am') || task.dueTime.toLowerCase().includes('pm') 
                  ? task.dueTime 
                  : formatDueTime(task.dueTime))}
            </p>
          )}
        </div>
      </div>
      
      <div className="task-actions">
        <button 
          onClick={() => handleEdit(task)}
          className="action-btn edit-icon"
          aria-label="Edit task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
        </button>
        
        <button 
          onClick={() => showDeleteConfirmation(task.id)}
          className="action-btn delete-icon"
          aria-label="Delete task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </li>
  );
};