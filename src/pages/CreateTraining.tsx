import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchDepartments } from '../store/departmentSlice';
import { fetchUsers } from '../store/userManagementSlice';
import { createTraining } from '../store/trainingSlice';
import LoadingSpinner from '../components/LoadingSpinner';

interface CreateTrainingFormData {
  trainingName: string;
  department: string;
  content: string;
  lastDate: string;
  users: string[];
}

const CreateTraining: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { departments } = useAppSelector((state) => state.departments);
  const { users } = useAppSelector((state) => state.userManagement);
  const { isLoading, error } = useAppSelector((state) => state.trainings);

  const [formData, setFormData] = useState<CreateTrainingFormData>({
    trainingName: '',
    department: '',
    content: '',
    lastDate: '',
    users: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<CreateTrainingFormData>>({});

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchUsers({}));
  }, [dispatch]);

  const validateForm = (): boolean => {
    const errors: Partial<CreateTrainingFormData> = {};

    if (!formData.trainingName.trim()) {
      errors.trainingName = 'Training name is required';
    }

    if (!formData.department.trim()) {
      errors.department = 'Department is required';
    }

    if (!formData.content.trim()) {
      errors.content = 'Content description is required';
    }

    if (!formData.lastDate) {
      errors.lastDate = 'Valid until date is required';
    } else {
      const selectedDate = new Date(formData.lastDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate <= today) {
        errors.lastDate = 'Valid until date must be in the future';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof CreateTrainingFormData]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleUserSelection = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      users: prev.users.includes(userId)
        ? prev.users.filter(id => id !== userId)
        : [...prev.users, userId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await dispatch(createTraining(formData)).unwrap();
      
      // Navigate back to trainings list on success
      navigate('/trainings');
    } catch (error) {
      console.error('Failed to create training:', error);
      // Error is handled by the training slice
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/trainings');
  };

  // Filter users by selected department
  const filteredUsers = formData.department 
    ? users?.filter(user => user.departmentId === formData.department) || []
    : users || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <Link
            to="/trainings"
            className="text-indigo-600 hover:text-indigo-900"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Training</h1>
            <p className="mt-2 text-gray-600">
              Add a new training program to the system
            </p>
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

      {/* Form */}
      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Training Name */}
          <div>
            <label htmlFor="trainingName" className="block text-sm font-medium text-gray-700 mb-1">
              Training Name *
            </label>
            <input
              type="text"
              id="trainingName"
              name="trainingName"
              value={formData.trainingName}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formErrors.trainingName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter training name"
            />
            {formErrors.trainingName && (
              <p className="mt-1 text-sm text-red-600">{formErrors.trainingName}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Department *
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formErrors.department ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select a department</option>
              {departments?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            {formErrors.department && (
              <p className="mt-1 text-sm text-red-600">{formErrors.department}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content Description *
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              value={formData.content}
              onChange={handleInputChange}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formErrors.content ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter training content description"
            />
            {formErrors.content && (
              <p className="mt-1 text-sm text-red-600">{formErrors.content}</p>
            )}
          </div>

          {/* Valid Until Date */}
          <div>
            <label htmlFor="lastDate" className="block text-sm font-medium text-gray-700 mb-1">
              Valid Until *
            </label>
            <input
              type="date"
              id="lastDate"
              name="lastDate"
              value={formData.lastDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                formErrors.lastDate ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {formErrors.lastDate && (
              <p className="mt-1 text-sm text-red-600">{formErrors.lastDate}</p>
            )}
          </div>

          {/* User Assignment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Assign Users (Optional)
            </label>
            {formData.department ? (
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
                {filteredUsers.length === 0 ? (
                  <p className="text-gray-500 text-sm">No users found in selected department</p>
                ) : (
                  <div className="space-y-2">
                    {filteredUsers.map((user) => (
                      <label key={user.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.users.includes(user.id)}
                          onChange={() => handleUserSelection(user.id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {user.fullName} ({user.empNo}) - {user.role}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Select a department first to assign users</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Selected: {formData.users.length} user(s)
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isLoading ? (
                <div className="flex items-center">
                  <LoadingSpinner />
                  <span className="ml-2">Creating...</span>
                </div>
              ) : (
                'Create Training'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTraining;
