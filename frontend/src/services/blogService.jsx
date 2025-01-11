import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

const blogService = {
  getAllPosts: async (page = 1, limit = 10) => {
    const response = await axios.get(`${API_URL}/api/posts?page=${page}&limit=${limit}`);
    return response.data;
  },

  getPost: async (id) => {
    const response = await axios.get(`${API_URL}/api/posts/${id}`);
    return response.data;
  },

  createPost: async (postData) => {
    try {
      const response = await axios.post(`${API_URL}/api/posts`, postData);
      return response.data;
  } catch (error) {
      console.log('Create post error:', error);
      throw error;
  }
  },

  updatePost: async (id, postData) => {
    try {
      const response = await axios.put(`${API_URL}/api/posts/${id}`, postData);
      return response.data;
  } catch (error) {
      console.log('Update post error:', error);
      throw error;
  }
  },

  deletePost: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/api/posts/${id}`);
      return response.data;
  } catch (error) {
      console.log('Delete post error:', error);
      throw error;
  }
  },

  getUserPosts: async () => {
    const response = await axios.get(`${API_URL}/api/posts/user`);
    return response.data;
  }
};

export default blogService;