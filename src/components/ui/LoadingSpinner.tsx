import React from 'react';
import { clsx } from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'solar' | 'pulse' | 'dots';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className,
  text
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const renderSpinner = () => {
    switch (variant) {
      case 'solar':
        return (
          <div className={clsx('relative', sizes[size])}>
            {/* Outer ring - sun rays */}
            <div className="absolute inset-0 border-4 border-yellow-400/30 rounded-full animate-spin"></div>
            {/* Inner ring - sun core */}
            <div className="absolute inset-2 border-4 border-yellow-400 rounded-full animate-pulse"></div>
            {/* Center dot */}
            <div className="absolute inset-4 bg-yellow-400 rounded-full animate-ping"></div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className={clsx('flex space-x-1', sizes[size])}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
      
      case 'dots':
        return (
          <div className={clsx('flex space-x-2', sizes[size])}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );
      
      default:
        return (
          <div className={clsx('animate-spin rounded-full border-4 border-yellow-400/30 border-t-yellow-400', sizes[size])} />
        );
    }
  };

  return (
    <div className={clsx('flex flex-col items-center justify-center', className)}>
      {renderSpinner()}
      {text && (
        <p className="mt-4 text-white/60 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
