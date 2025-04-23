import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

const withRetry = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export const taskService = {
  getTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data?.data || [];
    } catch (error) {
      console.error('API Error in getTasks:', error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      return response.data;
    } catch (error) {
      console.error('API Error in createTask:', error);
      throw error;
    }
  },

  updateTaskStatus: async (taskId, status) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${taskId}`, { status });
      return response.data;
    } catch (error) {
      console.error('API Error in updateTaskStatus:', error);
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('API Error in deleteTask:', error);
      throw error;
    }
  },
};