import React from 'react';

const Button = ({ icon, text, className, onClick, iconPosition = 'right' }) => {
  return (
    <button
      onClick={onClick}
      className={`flex gap-2 items-center px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ${className || ''}`}
    >
      {iconPosition === 'left' && icon && (
        <span className="flex justify-center items-center bg-white p-2 rounded">
          {icon}
        </span>
      )}

      <span className="font-sans text-sm md:text-base font-medium text-white">
        {text}
      </span>

      {iconPosition === 'right' && icon && (
        <span className="flex justify-center items-center bg-white p-2 rounded">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
