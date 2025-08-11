/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import * as taskService from '../services/taskService';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const tasks = await taskService.getTasks();
      setTasks(tasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTodayTasks = async () => {
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
  };

  const addTask = async (taskData) => {
    setIsLoading(true);
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([...tasks, newTask]);
      return newTask;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    setIsLoading(true);
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      return updatedTask;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setIsLoading(true);
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
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