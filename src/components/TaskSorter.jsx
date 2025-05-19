import React from 'react';

export const TaskSorter = ({ 
  sortOption, 
  showSortDropdown, 
  toggleSortDropdown, 
  handleSortOptionClick 
}) => {
  return (
    <div className="sort-container">
      <button 
        onClick={toggleSortDropdown}
        className="sort-btn"
      >
        Sort by: {sortOption === 'dateAdded' ? 'Date Added' : sortOption === 'dueDate' ? 'Due Date' : 'Priority'}
        <span className="dropdown-icon"></span>
      </button>
      
      {showSortDropdown && (
        <div className="sort-dropdown">
          <button
            onClick={() => handleSortOptionClick('dateAdded')}
            className={`sort-option ${sortOption === 'dateAdded' ? 'selected' : ''}`}
          >
            Date Added
          </button>
          <button
            onClick={() => handleSortOptionClick('dueDate')}
            className={`sort-option ${sortOption === 'dueDate' ? 'selected' : ''}`}
          >
            Due Date
          </button>
          <button
            onClick={() => handleSortOptionClick('priority')}
            className={`sort-option ${sortOption === 'priority' ? 'selected' : ''}`}
          >
            Priority
          </button>
        </div>
      )}
    </div>
  );
};