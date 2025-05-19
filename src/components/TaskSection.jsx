import React from 'react';
import { TaskSorter } from './TaskSorter';
import { TaskList } from './TaskList';
import { TaskFilter } from './TaskFilter';

export const TasksSection = ({
  sortOption,
  showSortDropdown,
  toggleSortDropdown,
  handleSortOptionClick,
  sortedTasks,
  toggleComplete,
  handleEdit,
  showDeleteConfirmation,
  formatDate,
  getPriorityClassName,
  isLoading,
  filterOption,
  handleFilterChange
}) => {
  return (
    <div className="tasks-section">
      <div className="tasks-header-container">
        <h2 className="tasks-header">My Tasks</h2>
        
        <TaskSorter 
          sortOption={sortOption}
          showSortDropdown={showSortDropdown}
          toggleSortDropdown={toggleSortDropdown}
          handleSortOptionClick={handleSortOptionClick}
        />
      </div>
      
      <TaskFilter 
        filterOption={filterOption}
        handleFilterChange={handleFilterChange}
      />
      
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : (
        <TaskList 
          sortedTasks={sortedTasks}
          toggleComplete={toggleComplete}
          handleEdit={handleEdit}
          showDeleteConfirmation={showDeleteConfirmation}
          formatDate={formatDate}
          getPriorityClassName={getPriorityClassName}
        />
      )}
    </div>
  );
};