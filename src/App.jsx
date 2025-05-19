import React from 'react';
import { Header } from './components/header';
import { TaskForm } from './components/TaskForm';
import { TasksSection } from './components/TaskSection';
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog';
import { Toast } from './components/Toast';
import { useTaskManager } from './TaskManagerFirebase';
import './App.css';

function App() {
  const {
    taskText,
    setTaskText,
    dueDate,
    setDueDate,
    dueTime,
    setDueTime,
    priority,
    setPriority,
    editingTaskId,
    showConfirmDialog,
    taskToDelete,
    showToast,
    deletedTask,
    sortOption,
    showSortDropdown,
    filterOption,
    isLoading,
    handleAddOrUpdateTask,
    handleEdit,
    toggleComplete,
    showDeleteConfirmation,
    confirmDelete,
    closeConfirmDialog,
    undoDelete,
    handleKeyDown,
    formatDate,
    toggleSortDropdown,
    handleSortOptionClick,
    handleFilterChange,
    getPriorityClassName,
    getSortedTasks
  } = useTaskManager();

  const sortedTasks = getSortedTasks();

  return (
    <div className="app-wrapper">
      <div className="todo-container">
        <Header />
        
        <TaskForm 
          taskText={taskText}
          setTaskText={setTaskText}
          dueDate={dueDate}
          setDueDate={setDueDate}
          dueTime={dueTime}
          setDueTime={setDueTime}
          priority={priority}
          setPriority={setPriority}
          handleAddOrUpdateTask={handleAddOrUpdateTask}
          editingTaskId={editingTaskId}
          handleKeyDown={handleKeyDown}
        />
        
        <TasksSection 
          sortOption={sortOption}
          showSortDropdown={showSortDropdown}
          toggleSortDropdown={toggleSortDropdown}
          handleSortOptionClick={handleSortOptionClick}
          sortedTasks={sortedTasks}
          toggleComplete={toggleComplete}
          handleEdit={handleEdit}
          showDeleteConfirmation={showDeleteConfirmation}
          formatDate={formatDate}
          getPriorityClassName={getPriorityClassName}
          isLoading={isLoading}
          filterOption={filterOption}
          handleFilterChange={handleFilterChange}
        />
      </div>
      
      <DeleteConfirmDialog 
        showConfirmDialog={showConfirmDialog}
        closeConfirmDialog={closeConfirmDialog}
        confirmDelete={confirmDelete}
      />
      
      <Toast 
        showToast={showToast}
        deletedTask={deletedTask}
        undoDelete={undoDelete}
        setShowToast={() => {}}
      />
    </div>
  );
}

export default App;