import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { firestore } from './firebase';

export const useTaskManager = () => {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  
  // State for form inputs
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [priority, setPriority] = useState('Mid'); // Default priority
  
  // State for editing
  const [editingTaskId, setEditingTaskId] = useState(null);
  
  // State for delete confirmation
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  
  // State for toast
  const [showToast, setShowToast] = useState(false);
  const [deletedTask, setDeletedTask] = useState(null);
  
  // State for sorting
  const [sortOption, setSortOption] = useState('dateAdded');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // State for filtering
  const [filterOption, setFilterOption] = useState('all');
  
  // State for loading
  const [isLoading, setIsLoading] = useState(true);

  // Get tasks from Firestore
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const tasksCollection = collection(firestore, 'tasks');
      const q = query(tasksCollection, orderBy('dateAdded', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedTasks = [];
      querySnapshot.forEach((doc) => {
        fetchedTasks.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Hide toast after 5 seconds
  useEffect(() => {
    let toastTimer;
    if (showToast) {
      toastTimer = setTimeout(() => {
        setShowToast(false);
        setDeletedTask(null);
      }, 5000);
    }
    
    return () => {
      if (toastTimer) clearTimeout(toastTimer);
    };
  }, [showToast]);

  // Add or update task
  const handleAddOrUpdateTask = async () => {
    if (!taskText.trim()) return;
    
    try {
      if (editingTaskId !== null) {
        // Update existing task in Firestore
        const taskRef = doc(firestore, 'tasks', editingTaskId);
        await updateDoc(taskRef, {
          text: taskText,
          dueDate,
          dueTime,
          priority
        });
        
        // Update local state
        setTasks(tasks.map(task => 
          task.id === editingTaskId 
            ? { ...task, text: taskText, dueDate, dueTime, priority } 
            : task
        ));
        
        setEditingTaskId(null);
      } else {
        // Add new task to Firestore
        const newTask = {
          text: taskText,
          dueDate,
          dueTime,
          priority,
          completed: false,
          dateAdded: Date.now()
        };
        
        const docRef = await addDoc(collection(firestore, 'tasks'), newTask);
        
        // Add to local state with Firestore ID
        setTasks([...tasks, { id: docRef.id, ...newTask }]);
      }
      
      // Reset form
      resetForm();
    } catch (error) {
      console.error("Error adding/updating task:", error);
    }
  };

  // Start editing a task
  const handleEdit = (task) => {
    setTaskText(task.text);
    setDueDate(task.dueDate || '');
    setDueTime(task.dueTime || '');
    setPriority(task.priority || 'Mid');
    setEditingTaskId(task.id);
  };

  // Toggle task completion
  const toggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      const newCompletedState = !task.completed;
      
      // Update in Firestore
      const taskRef = doc(firestore, 'tasks', taskId);
      await updateDoc(taskRef, {
        completed: newCompletedState
      });
      
      // Update in local state
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: newCompletedState } 
          : task
      ));
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  // Show delete confirmation dialog
  const showDeleteConfirmation = (taskId) => {
    setTaskToDelete(taskId);
    setShowConfirmDialog(true);
  };

  // Delete task after confirmation
  const confirmDelete = async () => {
    try {
      const taskToRemove = tasks.find(task => task.id === taskToDelete);
      setDeletedTask(taskToRemove);
      
      // Delete from Firestore
      await deleteDoc(doc(firestore, 'tasks', taskToDelete));
      
      // Delete from local state
      setTasks(tasks.filter(task => task.id !== taskToDelete));
      closeConfirmDialog();
      
      // Show toast
      setShowToast(true);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Close confirmation dialog
  const closeConfirmDialog = () => {
    setShowConfirmDialog(false);
    setTaskToDelete(null);
  };
  
  // Undo task deletion
  const undoDelete = async () => {
    if (deletedTask) {
      try {
        // Re-add to Firestore (will create a new ID)
        const { id, ...taskData } = deletedTask;
        const docRef = await addDoc(collection(firestore, 'tasks'), taskData);
        
        // Add back to local state with new ID
        setTasks([...tasks, { id: docRef.id, ...taskData }]);
        setShowToast(false);
        setDeletedTask(null);
      } catch (error) {
        console.error("Error undoing delete:", error);
      }
    }
  };

  // Reset form inputs
  const resetForm = () => {
    setTaskText('');
    setDueDate('');
    setDueTime('');
    setPriority('Mid');
  };

  // Handle Enter key in task input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddOrUpdateTask();
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Toggle sort dropdown
  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };
  
  // Choose sort option
  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };
  
  // Set filter option
  const handleFilterChange = (filter) => {
    setFilterOption(filter);
  };
  
  // Get filtered tasks
  const getFilteredTasks = () => {
    switch (filterOption) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'all':
      default:
        return tasks;
    }
  };
  
  // Sort tasks based on selected option
  const getSortedTasks = () => {
    const filteredTasks = getFilteredTasks();
    
    return [...filteredTasks].sort((a, b) => {
      switch (sortOption) {
        case 'dateAdded':
          return a.dateAdded - b.dateAdded;
        case 'dueDate':
          // Handle tasks without due dates
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          if (a.dueDate === b.dueDate) {
            // If dates are same, sort by time
            if (!a.dueTime) return 1;
            if (!b.dueTime) return -1;
            return a.dueTime.localeCompare(b.dueTime);
          }
          return a.dueDate.localeCompare(b.dueDate);
        case 'priority':
          const priorityOrder = { 'High': 0, 'Mid': 1, 'Low': 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        default:
          return 0;
      }
    });
  };
  
  // Get priority class name
  const getPriorityClassName = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Mid': return 'priority-mid';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  return {
    // State
    tasks,
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
    
    // Actions
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
  };
};