import React, { useEffect } from 'react';

const Toast = ({ message, type, showToast, setShowToast }) => {
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Show toast for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showToast, setShowToast]);

  const toastStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  };

  return (
    showToast && (
      <div className="fixed top-5 center-5 z-50 flex flex-col items-center">
        {/* Toast message */}
        <div
          className={`${toastStyles[type]} px-2 py-6 rounded-lg shadow-lg text-xl text-center transition-opacity duration-300 ease-in-out`}
        >
          {message}
        </div>

        {/* Loading indicator */}
        <div className="loader mt-2"></div>
      </div>
    )
  );
};

export default Toast;
