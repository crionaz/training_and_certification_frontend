import React from 'react';
import type { UserTraining } from '../types';

interface StatusBadgeProps {
  status: UserTraining['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'inprogress':
        return 'status-inprogress';
      case 'completed':
        return 'status-completed';
      case 'expired':
        return 'status-expired';
      default:
        return 'status-pending';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'inprogress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'expired':
        return 'Expired';
      default:
        return 'Unknown';
    }
  };

  return (
    <span className={getStatusClass(status)}>
      {getStatusText(status)}
    </span>
  );
};

export default StatusBadge;
