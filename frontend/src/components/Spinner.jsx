import React from 'react';

function Spinner() {
  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="animate-ping w-16 h-16 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 shadow-lg mt-16"></div>
    </div>
  );
}

export default Spinner;
