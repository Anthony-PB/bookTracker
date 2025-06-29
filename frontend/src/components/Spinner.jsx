import React from 'react';

function Spinner() {
  const delays = ['0s', '0.1s', '0.2s'];

  return (
    <div className="flex justify-center items-start min-h-screen">
      <div className="flex space-x-3 mt-20">
        {delays.map((delay, i) => (
          <div
            key={i}
            className="relative w-4 h-4 animate-bounce"
            style={{ animationDelay: delay }}
          >
            <div className="absolute -top-0.5 -left-0.5 w-6 h-6 bg-black rounded-full z-0 blur-sm opacity-100"></div>

            <div className="w-5 h-5 bg-white rounded-full z-10 relative"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Spinner;
