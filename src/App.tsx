import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { loadUserFromStorage } from './store/authSlice';

// Components
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import UserEdit from './pages/UserEdit';
import CreateUser from './pages/CreateUser';
import Departments from './pages/Departments';
import CreateDepartment from './pages/CreateDepartment';
import DepartmentDetail from './pages/DepartmentDetail';
import Trainings from './pages/Trainings';
import CreateTraining from './pages/CreateTraining';
import Profile from './pages/Profile';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(loadUserFromStorage());
    }
  }, [dispatch, token, user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Header />}
      <main className={user ? 'pt-0' : ''}>
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? <Navigate to="/dashboard" replace /> : <Login />
            } 
          />
          <Route 
            path="/register" 
            element={
              user ? <Navigate to="/dashboard" replace /> : <Register />
            } 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-trainings"
            element={
              <ProtectedRoute>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-8">My Trainings</h1>
                  <div className="card">
                    <Trainings />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainings"
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <Trainings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainings/create"
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <CreateTraining />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compliance"
            element={
              <ProtectedRoute allowedRoles={['admin', 'manager']}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-8">Compliance Dashboard</h1>
                  <div className="card">
                    <p className="text-gray-600">Compliance Dashboard - Coming soon!</p>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Departments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments/create"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateDepartment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/departments/:id"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DepartmentDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/create"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id/edit"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/unauthorized"
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized</h1>
                  <p className="text-gray-600">You don't have permission to access this page.</p>
                </div>
              </div>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route 
            path="*" 
            element={
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                  <p className="text-gray-600">The page you're looking for doesn't exist.</p>
                </div>
              </div>
            } 
          />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;
