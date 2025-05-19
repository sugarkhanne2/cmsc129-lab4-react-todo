import React from 'react';

export const DeleteConfirmDialog = ({ 
  showConfirmDialog, 
  closeConfirmDialog, 
  confirmDelete 
}) => {
  if (!showConfirmDialog) return null;
  
  return (
    <div className="overlay">
      <div className="confirm-dialog">
        <div className="dialog-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>Confirm Delete</span>
        </div>
        
        <p className="dialog-message">Are you sure you want to delete this task? This action cannot be undone.</p>
        
        <div className="dialog-actions">
          <button
            onClick={closeConfirmDialog}
            className="dialog-btn cancel-btn"
          >
            Cancel
          </button>
          
          <button
            onClick={confirmDelete}
            className="dialog-btn confirm-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};