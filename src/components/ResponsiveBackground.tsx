'use client';

import { useState, useEffect } from 'react';

export default function ResponsiveBackground() {
  const [backgroundImage, setBackgroundImage] = useState('/bg1080.jpg');

  useEffect(() => {
    const updateBackground = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;
      
      // Check if it's a vertical/mobile screen
      if (aspectRatio < 1) {
        setBackgroundImage('/bgvertical.jpg');
      }
      // Check if it's 4K or high resolution
      else if (width >= 2560) {
        setBackgroundImage('/bg4k.jpg');
      }
      // Default to 1080p
      else {
        setBackgroundImage('/bg1080.jpg');
      }
    };

    // Set initial background
    updateBackground();

    // Update on resize
    window.addEventListener('resize', updateBackground);
    
    return () => {
      window.removeEventListener('resize', updateBackground);
    };
  }, []);

  return (
    <>
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat max-sm:transition-none transition-all duration-500"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark overlay - hidden on mobile */}
      <div className="fixed inset-0 -z-5 max-sm:hidden bg-black/40" />
    </>
  );
}
