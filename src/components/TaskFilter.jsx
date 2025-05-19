import React from 'react';

export const TaskFilter = ({ filterOption, handleFilterChange }) => {
  return (
    <div className="filter-container">
      <button 
        className={`filter-btn ${filterOption === 'all' ? 'active' : ''}`}
        onClick={() => handleFilterChange('all')}
      >
        All
      </button>
      <button 
        className={`filter-btn ${filterOption === 'active' ? 'active' : ''}`}
        onClick={() => handleFilterChange('active')}
      >
        Active
      </button>
      <button 
        className={`filter-btn ${filterOption === 'completed' ? 'active' : ''}`}
        onClick={() => handleFilterChange('completed')}
      >
        Completed
      </button>
    </div>
  );
};