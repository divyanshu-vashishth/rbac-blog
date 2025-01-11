import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import AdminDashboard from './pages/AdminDashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/blogs"
              element={
                <ProtectedRoute roles={['admin', 'user']}>
                  <BlogList />
                </ProtectedRoute>
              }
              />
              <Route path="/blogs/:id"
                element={
                  <ProtectedRoute roles={['admin', 'user']}>
                    <BlogPost />
                  </ProtectedRoute>
                }
                />
                
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/posts/create"
              element={
                <ProtectedRoute roles={['admin']}>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/posts/edit/:id"
              element={
                <ProtectedRoute roles={['admin']}>
                  <EditPost />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;