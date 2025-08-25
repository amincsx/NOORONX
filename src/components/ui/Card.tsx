import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'glass-strong' | 'elevated';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  shadow?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hover = false,
  padding = 'md',
  border = true,
  shadow = true,
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white/10 backdrop-blur-sm border border-white/20',
    glass: 'glass',
    'glass-strong': 'glass-strong',
    elevated: 'bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-2xl hover:bg-white/15' : '';
  const borderClasses = border ? '' : 'border-none';
  const shadowClasses = shadow ? 'shadow-lg' : '';

  return (
    <div
      className={clsx(
        baseClasses,
        variants[variant],
        paddings[padding],
        hoverClasses,
        borderClasses,
        shadowClasses,
        className
      )}
    >
      {children}
    </div>
  );
};

// Card Header Component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={clsx('mb-6', className)}>
      {children}
    </div>
  );
};

// Card Content Component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={clsx('', className)}>
      {children}
    </div>
  );
};

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => {
  return (
    <div className={clsx('mt-6 pt-6 border-t border-white/10', className)}>
      {children}
    </div>
  );
};

// Card Title Component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  className, 
  as: Component = 'h3' 
}) => {
  return (
    <Component className={clsx('text-xl font-bold text-white/80 mb-2', className)}>
      {children}
    </Component>
  );
};

// Card Description Component
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => {
  return (
    <p className={clsx('text-white/60 text-sm leading-relaxed', className)}>
      {children}
    </p>
  );
};

export default Card;
