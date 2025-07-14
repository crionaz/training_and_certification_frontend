import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchUserById, updateUserStatus, clearError, clearCurrentUser } from '../store/userManagementSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { currentUser, isLoading, error } = useAppSelector(
    (state) => state.userManagement
  );
  const { user: currentLoggedUser } = useAppSelector((state) => state.auth);

  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
    
    return () => {
      dispatch(clearCurrentUser());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleStatusUpdate = async (newStatus: 'active' | 'locked' | 'close') => {
    if (!currentUser || !id) return;
    
    const confirmMessage = `Are you sure you want to ${newStatus === 'active' ? 'activate' : newStatus === 'locked' ? 'lock' : 'close'} this user?`;
    
    if (window.confirm(confirmMessage)) {
      setStatusUpdateLoading(true);
      try {
        await dispatch(updateUserStatus({ id, status: newStatus })).unwrap();
        // Success message could be added here
      } catch (error) {
        console.error('Failed to update user status:', error);
      } finally {
        setStatusUpdateLoading(false);
      }
    }
  };

  const getUserStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'locked':
        return 'bg-yellow-100 text-yellow-800';
      case 'close':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleStyle = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'staff':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading && !currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-4">The user you're looking for doesn't exist.</p>
          <Link
            to="/users"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/users" className="text-gray-400 hover:text-gray-500">
                Users
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-4 text-sm font-medium text-gray-500">
                  {currentUser.fullName}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        
        <div className="mt-4 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{currentUser.fullName}</h1>
            <p className="mt-1 text-gray-600">Employee ID: {currentUser.empNo}</p>
          </div>
          
          <div className="flex space-x-3">
            <Link
              to={`/users/${currentUser.id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Edit User
            </Link>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                User Information
              </h3>
            </div>
            <div className="px-6 py-4 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Full Name</label>
                  <div className="mt-1 text-sm text-gray-900">{currentUser.fullName}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Employee Number</label>
                  <div className="mt-1 text-sm text-gray-900">{currentUser.empNo}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Email</label>
                  <div className="mt-1 text-sm text-gray-900">{currentUser.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Phone</label>
                  <div className="mt-1 text-sm text-gray-900">{currentUser.phone}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                  <div className="mt-1 text-sm text-gray-900">
                    {formatDate(currentUser.dateOfBirth)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Role</label>
                  <div className="mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleStyle(currentUser.role)}`}>
                      {currentUser.role}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Address</label>
                <div className="mt-1 text-sm text-gray-900">{currentUser.address}</div>
              </div>
            </div>
          </div>

          {/* Account Dates */}
          <div className="bg-white shadow rounded-lg mt-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Account Information
              </h3>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Account Created</label>
                  <div className="mt-1 text-sm text-gray-900">
                    {formatDate(currentUser.createdAt)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                  <div className="mt-1 text-sm text-gray-900">
                    {formatDate(currentUser.updatedAt)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Last Login</label>
                  <div className="mt-1 text-sm text-gray-900">
                    {currentUser.lastLogin 
                      ? formatDate(currentUser.lastLogin)
                      : 'Never logged in'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Status & Actions
              </h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Current Status
                </label>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getUserStatusStyle(currentUser.status)}`}>
                  {currentUser.status}
                </span>
              </div>

              {/* Status Update Actions */}
              {currentLoggedUser?.role === 'admin' && currentUser.id !== currentLoggedUser.id && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-3">
                    Update Status
                  </label>
                  <div className="space-y-2">
                    {currentUser.status !== 'active' && (
                      <button
                        onClick={() => handleStatusUpdate('active')}
                        disabled={statusUpdateLoading}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {statusUpdateLoading ? (
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : null}
                        Activate User
                      </button>
                    )}
                    
                    {currentUser.status !== 'locked' && (
                      <button
                        onClick={() => handleStatusUpdate('locked')}
                        disabled={statusUpdateLoading}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {statusUpdateLoading ? (
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : null}
                        Lock User
                      </button>
                    )}
                    
                    {currentUser.status !== 'close' && (
                      <button
                        onClick={() => handleStatusUpdate('close')}
                        disabled={statusUpdateLoading}
                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {statusUpdateLoading ? (
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : null}
                        Close Account
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-500 mb-3">
                  Quick Actions
                </label>
                <div className="space-y-2">
                  <Link
                    to={`/users/${currentUser.id}/trainings`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View Trainings
                  </Link>
                  <Link
                    to={`/users/${currentUser.id}/certifications`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View Certifications
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
