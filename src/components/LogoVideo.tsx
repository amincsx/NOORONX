'use client';

import { useRef, useState, useEffect } from 'react';

export default function LogoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      console.log('Logo video loaded');
    }
  }, []);

  const handleMouseEnter = () => {
    console.log('Logo hover started');
    setIsHovered(true);
    const video = videoRef.current;
    if (video && isVideoLoaded) {
      video.currentTime = 0;
      video.play().catch(error => {
        console.error('Error playing logo video:', error);
      });
    }
  };

  const handleMouseLeave = () => {
    console.log('Logo hover ended');
    setIsHovered(false);
    // Let the video finish playing naturally
  };

  const handleVideoLoad = () => {
    console.log('Logo video metadata loaded');
    setIsVideoLoaded(true);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Logo video error:', e);
  };

  return (
    <video
      ref={videoRef}
      className="fixed-logo w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 cursor-pointer transition-all duration-300"
      muted
      playsInline
      preload="metadata"
      onLoadedMetadata={handleVideoLoad}
      onError={handleVideoError}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        zIndex: 1000,
        pointerEvents: 'auto',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <source src="/videos/logo.webm" type="video/webm" />
      <source src="/videos/logo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
