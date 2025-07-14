import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchTrainings, clearError } from '../store/trainingSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const Trainings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { trainings, isLoading, error } = useAppSelector(
    (state) => state.trainings
  );

  const { user: currentUser } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTrainings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const getStatusStyle = (lastDate: string) => {
    const date = new Date(lastDate);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays < 0) {
      return 'bg-red-100 text-red-800'; // Expired
    } else if (diffDays <= 30) {
      return 'bg-yellow-100 text-yellow-800'; // Expiring soon
    } else {
      return 'bg-green-100 text-green-800'; // Active
    }
  };

  const getStatusText = (lastDate: string) => {
    const date = new Date(lastDate);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays < 0) {
      return 'Expired';
    } else if (diffDays <= 30) {
      return 'Expiring Soon';
    } else {
      return 'Active';
    }
  };

  const getDepartmentName = (department: string | { name?: string }) => {
    if (typeof department === 'string') {
      return department;
    }
    return department?.name || 'Unknown Department';
  };

  if (isLoading && trainings?.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Training Management</h1>
            <p className="mt-2 text-gray-600">
              Manage training programs and track certifications
            </p>
          </div>
          {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
            <div>
              <Link
                to="/trainings/create"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Training
              </Link>
            </div>
          )}
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

      {/* Trainings Grid */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <LoadingSpinner />
          </div>
        )}
        
        <div className="relative">
          {!trainings || trainings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              {isLoading ? 'Loading trainings...' : 'No trainings found'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {trainings.map((training) => (
                <div
                  key={training.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusStyle(training.lastDate)}`}>
                        {getStatusText(training.lastDate)}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {training.trainingName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {training.content || 'No content description available'}
                    </p>
                    
                    <div className="text-xs text-gray-500 mb-4">
                      <div>Department: {getDepartmentName(training.department)}</div>
                      <div>Valid until: {new Date(training.lastDate).toLocaleDateString()}</div>
                      <div>Assigned Users: {training.users?.length || 0}</div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        to={`/trainings/${training.id}`}
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                      >
                        View
                      </Link>
                      {(currentUser?.role === 'admin' || currentUser?.role === 'manager') && (
                        <Link
                          to={`/trainings/${training.id}/edit`}
                          className="text-green-600 hover:text-green-900 text-sm font-medium"
                        >
                          Edit
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trainings;
