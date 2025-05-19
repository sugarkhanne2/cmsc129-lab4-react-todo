import React from 'react';

export const Toast = ({ 
  showToast, 
  deletedTask, 
  undoDelete, 
  setShowToast 
}) => {
  if (!showToast || !deletedTask) return null;
  
  return (
    <div className="toast">
      <div className="toast-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div className="toast-content">
        <p className="toast-title">Task Deleted</p>
        <p className="toast-text">{deletedTask.text}</p>
        <button 
          onClick={undoDelete}
          className="toast-undo"
        >
          Undo
        </button>
      </div>
      <button 
        onClick={() => setShowToast(false)}
        className="toast-close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};