import React from 'react';
import './test.css'; // Import the simple test CSS

const TestComponent = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">🎬 SIMPLE CSS TEST</h1>
      
      {/* Test with simple CSS file */}
      <div className="test-simple-gradient text-white p-4 mb-4">
        🔴🔵 SIMPLE TEST: Should be red-to-blue gradient
      </div>
      
      <div className="test-simple-glass text-white p-4 mb-4">
        🪞 SIMPLE TEST: Should be semi-transparent red with blur
      </div>

      {/* Test with inline styles as comparison */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #00ff00, #0000ff)',
          height: '100px',
          padding: '1rem'
        }} 
        className="text-white mb-4"
      >
        🎨 INLINE STYLE: Should be green-to-blue gradient
      </div>

      {/* Test if Tailwind is working */}
      <div className="bg-purple-500 text-white p-4">
        ✅ Tailwind test: Should be purple background
      </div>
    </div>
  );
};

export default TestComponent;