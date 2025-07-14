/**
 * Format a date string for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format a date string with time for display
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Calculate days remaining until a date
 */
export const getDaysRemaining = (dateString: string): number => {
  const targetDate = new Date(dateString);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Check if a date is expired
 */
export const isExpired = (dateString: string): boolean => {
  return getDaysRemaining(dateString) < 0;
};

/**
 * Check if a date is due soon (within 30 days)
 */
export const isDueSoon = (dateString: string): boolean => {
  const daysRemaining = getDaysRemaining(dateString);
  return daysRemaining >= 0 && daysRemaining <= 30;
};

/**
 * Get status color class based on days remaining
 */
export const getStatusColor = (dateString: string): string => {
  const daysRemaining = getDaysRemaining(dateString);
  
  if (daysRemaining < 0) return 'text-red-600';
  if (daysRemaining <= 7) return 'text-orange-600';
  if (daysRemaining <= 30) return 'text-yellow-600';
  return 'text-green-600';
};
