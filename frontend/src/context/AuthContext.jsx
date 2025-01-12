import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { use } from 'react';

const AuthContext = createContext(null);
const BASE_URL = import.meta.env.VITE_APP_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [id, setId] = useState(null); 
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   console.log('token', token);
  //   if (token) {
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //     checkAuth();
  //   } else {
  //     setLoading(false);
  //   }
  //   // checkAuth();
  // }, []);

//   const checkAuth = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       console.log('Token:', token); // Log the token
//       if (token) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         const response = await axios.get(`${BASE_URL}/api/users/profile`);
//         console.log('User data:', response.data); 
//         setUser(response?.data?.user);
//         console.log('user ', user)
//         console.log('Token:', token); // Log the token
// console.log('Response:', response.data); // Log the entire response
//       } else {
//         console.log('No token found, user is logged out.');
//         setUser(null);
//         // localStorage.removeItem('token');
//         // delete axios.defaults.headers.common['Authorization'];
//       }
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       localStorage.removeItem('token');
//       delete axios.defaults.headers.common['Authorization'];
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

 
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      console.log('user data after login', response.data);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.log('Login error:', error);
      throw error;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.log('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};