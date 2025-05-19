import React from 'react';
import { Task } from './Task';

export const TaskList = ({ 
  sortedTasks, 
  toggleComplete, 
  handleEdit, 
  showDeleteConfirmation, 
  formatDate, 
  getPriorityClassName 
}) => {
  return (
    <>
      {sortedTasks.length === 0 ? (
        <p className="empty-tasks">No tasks yet.</p>
      ) : (
        <ul className="tasks-list">
          {sortedTasks.map(task => (
            <Task
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              handleEdit={handleEdit}
              showDeleteConfirmation={showDeleteConfirmation}
              formatDate={formatDate}
              getPriorityClassName={getPriorityClassName}
            />
          ))}
        </ul>
      )}
    </>
  );
};