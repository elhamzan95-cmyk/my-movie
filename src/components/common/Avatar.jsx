import { useState } from 'react';

const Avatar = ({ user, size = 'md', className = '' }) => {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  };

  const sizeClass = sizes[size] || sizes.md;

  // If avatar exists and no error occurred
  if (user?.avatar && !imageError) {
    return (
      <img
        src={user.avatar}
        alt={user.name || 'avatar'}
        className={`${sizeClass} rounded-full object-cover ${className}`}
        onError={() => setImageError(true)}
      />
    );
  }

  // Generate random color based on username
  const getColorClass = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
    ];
    const index = (name?.length || 0) % colors.length;
    return colors[index];
  };

  return (
    <div
      className={`${sizeClass} rounded-full ${getColorClass(
        user?.name
      )} flex items-center justify-center text-white font-bold ${className}`}
    >
      {user?.name?.charAt(0)?.toUpperCase() || '?'}
    </div>
  );
};

export default Avatar;