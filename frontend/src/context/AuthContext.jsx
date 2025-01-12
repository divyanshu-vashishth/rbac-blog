import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
// import { useNavigate  } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';


const AuthContext = createContext(null);
const BASE_URL = import.meta.env.VITE_APP_API_URL;



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [id, setId] = useState(null); 
  // const navigate = useNavigate();
  // const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Log the token
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get(`${BASE_URL}/api/users/profile`);
        console.log('User data:', response.data); 
        setUser(response.data);
      } else {
        console.log('No token found, user is logged out.');
      setUser([]);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser([]);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      console.log('login response data', response.data);
      setUser(response.data.user);
      await checkAuth(); 
      // navigate('/')
      // history.push('/');
      // console.log('user data after login response data user', response.data.user);
      // console.log('user data after login', user);
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
      console.log('signup response data', response.data);
      setUser(response.data.user);
      await checkAuth();
      // navigate('/')
      // history.push('/');
      // console.log('user data after signup', user);
      return response.data;
    } catch (error) {
      console.log('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser([]);
    await checkAuth();
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