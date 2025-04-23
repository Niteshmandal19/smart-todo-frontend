import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const tasksData = await taskService.getTasks();
      setTasks(tasksData);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle task updates
  const handleTaskUpdate = useCallback(async (taskId, newStatus) => {
    if (taskId && newStatus) {
      try {
        // Optimistic update
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
        
        // Make API call
        await taskService.updateTaskStatus(taskId, newStatus);
        toast.success(`Task ${newStatus === 'success' ? 'completed' : 'marked as ongoing'}!`);
      } catch (err) {
        toast.error('Failed to update task');
        console.error('Error updating task:', err);
        // Revert changes on error
        fetchTasks();
      }
    } else {
      // Just refresh tasks if no specific updates
      await fetchTasks();
    }
  }, [fetchTasks]);

  // Initial fetch and polling
  useEffect(() => {
    fetchTasks();
    const interval = setInterval(fetchTasks, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [fetchTasks]);

  return {
    tasks,
    activeTab,
    setActiveTab,
    loading,
    error,
    fetchTasks,
    handleTaskUpdate
  };
};