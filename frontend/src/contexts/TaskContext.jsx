/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useCallback } from 'react';
import * as taskService from '../services/taskService';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatingTasks, setUpdatingTasks] = useState({});
  const [deletingTasks, setDeletingTasks] = useState({});
  const [creatingTask, setCreatingTask] = useState(false);

  const isUpdating = (taskId) => updatingTasks[taskId];
  const isDeleting = (taskId) => deletingTasks[taskId];

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const tasks = await taskService.getTasks();
      setTasks(tasks);
      return tasks;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTodayTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const tasks = await taskService.getTodayTasks();
      return tasks;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch today\'s tasks');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTask = useCallback(async (taskData) => {
    setCreatingTask(true);
    try {
      // Optimistic UI update with temporary ID
      const tempId = `temp-${Date.now()}`;
      const optimisticTask = { ...taskData, id: tempId, isOptimistic: true };
      setTasks(prev => [...prev, optimisticTask]);
      
      // Actual API call
      const newTask = await taskService.createTask(taskData);
      
      // Replace optimistic task with real one
      setTasks(prev => 
        prev.map(task => 
          task.id === tempId ? newTask : task
        ).filter(task => !task.isOptimistic)
      );
      
      return newTask;
    } catch (err) {
      // Rollback on error
      setTasks(prev => prev.filter(task => task.id !== tempId));
      setError(err.response?.data?.message || 'Failed to add task');
      throw err;
    } finally {
      setCreatingTask(false);
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    setUpdatingTasks(prev => ({ ...prev, [id]: true }));
    const originalTask = tasks.find(task => task.id === id);
    
    try {
      // Optimistic update
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? { ...task, ...taskData } : task
        )
      );
      
      const updatedTask = await taskService.updateTask(id, taskData);
      
      // Update with server response
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? updatedTask : task
        )
      );
      
      return updatedTask;
    } catch (err) {
      // Revert on error
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? originalTask : task
        )
      );
      setError(err.response?.data?.message || 'Failed to update task');
      throw err;
    } finally {
      setUpdatingTasks(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  }, [tasks]);

  const deleteTask = useCallback(async (id) => {
    setDeletingTasks(prev => ({ ...prev, [id]: true }));
    const originalTasks = tasks;
    
    try {
      // Optimistic update
      setTasks(prev => prev.filter(task => task.id !== id));
      
      await taskService.deleteTask(id);
    } catch (err) {
      // Revert on error
      setTasks(originalTasks);
      setError(err.response?.data?.message || 'Failed to delete task');
      throw err;
    } finally {
      setDeletingTasks(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        creatingTask,
        isUpdating,
        isDeleting,
        fetchTasks,
        fetchTodayTasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);