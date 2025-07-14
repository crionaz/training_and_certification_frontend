import React from 'react';
import { useAppSelector } from '../hooks/redux';

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const getDashboardContent = () => {
    if (!user) return null;

    switch (user.role) {
      case 'admin':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-primary-600">248</p>
              <p className="text-sm text-gray-500">Across all departments</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Trainings</h3>
              <p className="text-3xl font-bold text-green-600">12</p>
              <p className="text-sm text-gray-500">Currently scheduled</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Rate</h3>
              <p className="text-3xl font-bold text-blue-600">85%</p>
              <p className="text-sm text-gray-500">Organization wide</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Reviews</h3>
              <p className="text-3xl font-bold text-yellow-600">23</p>
              <p className="text-sm text-gray-500">Need attention</p>
            </div>
          </div>
        );
      
      case 'manager':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Members</h3>
              <p className="text-3xl font-bold text-primary-600">15</p>
              <p className="text-sm text-gray-500">Direct reports</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Compliance</h3>
              <p className="text-3xl font-bold text-green-600">92%</p>
              <p className="text-sm text-gray-500">Above average</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Deadlines</h3>
              <p className="text-3xl font-bold text-orange-600">5</p>
              <p className="text-sm text-gray-500">Next 30 days</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">My Trainings</h3>
              <p className="text-3xl font-bold text-primary-600">8</p>
              <p className="text-sm text-gray-500">Total assigned</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed</h3>
              <p className="text-3xl font-bold text-green-600">6</p>
              <p className="text-sm text-gray-500">75% completion rate</p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending</h3>
              <p className="text-3xl font-bold text-yellow-600">2</p>
              <p className="text-sm text-gray-500">Need to complete</p>
            </div>
          </div>
        );
    }
  };

  const getQuickActions = () => {
    if (!user) return null;

    switch (user.role) {
      case 'admin':
        return (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md">
                Create New Training
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md">
                Add Department
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md">
                Register User
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md">
                View Reports
              </button>
            </div>
          </div>
        );
      
      case 'manager':
        return (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md">
                View Team Progress
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md">
                Review Compliance
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md">
                Send Reminders
              </button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md">
                View My Trainings
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md">
                Update Progress
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md">
                View Certificates
              </button>
            </div>
          </div>
        );
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user.fullName}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your training progress.
        </p>
      </div>

      <div className="space-y-8">
        {getDashboardContent()}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {getQuickActions()}
          
          <div className="card lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">CPR Certification completed</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <span className="status-completed">Completed</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">Fire Safety Training assigned</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
                <span className="status-pending">Pending</span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">HIPAA Training started</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
                <span className="status-inprogress">In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
