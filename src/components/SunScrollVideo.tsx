'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

export default function SunScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastScrollTime = useRef(0);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      console.log('SunScroll video loaded');
    }
  }, []);

  // Interactive scroll handler - maps scroll to video timeline
  const handleScroll = useCallback(() => {
    const now = performance.now();
    const timeSinceLastScroll = now - lastScrollTime.current;
    
    // Throttle to 120fps for ultra-smooth performance
    if (timeSinceLastScroll < 8) { // 8ms = ~120fps
      return;
    }
    
    lastScrollTime.current = now;

    const video = videoRef.current;
    if (!video || !videoLoaded || videoDuration === 0) {
      return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) {
      return;
    }

    const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    targetTimeRef.current = progress * videoDuration;
    
    // Start smooth animation if not already running
    if (!animationFrameRef.current) {
      animateVideo();
    }
  }, [videoLoaded, videoDuration]);

  // Smooth animation function
  const animateVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) {
      animationFrameRef.current = undefined;
      return;
    }

    const currentTime = video.currentTime;
    const targetTime = targetTimeRef.current;
    const diff = targetTime - currentTime;
    
    // Smooth interpolation with easing
    const easing = 0.15; // Adjust for smoothness (0.1 = very smooth, 0.3 = faster)
    const newTime = currentTime + diff * easing;
    
    try {
      video.currentTime = newTime;
    } catch (error) {
      // Handle any video time setting errors
    }
    
    // Keep video paused for frame-by-frame control
    if (!video.paused) {
      video.pause();
    }
    
    // Continue animation if we haven't reached the target
    if (Math.abs(diff) > 0.01) {
      animationFrameRef.current = requestAnimationFrame(animateVideo);
    } else {
      animationFrameRef.current = undefined;
    }
  }, [videoLoaded]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [handleScroll]);

  const handleVideoLoad = () => {
    const video = videoRef.current;
    if (video) {
      console.log('SunScroll video loaded! Duration:', video.duration, 'Ready state:', video.readyState);
      setVideoLoaded(true);
      setVideoDuration(video.duration);
      video.currentTime = 0;
      video.pause();
      console.log('SunScroll: Video initialized and paused');
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('SunScroll video error:', e);
  };

  return (
    <video
      ref={videoRef}
      className="fixed top-2 left-2 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"
      muted
      playsInline
      preload="metadata"
      onLoadedMetadata={handleVideoLoad}
      onError={handleVideoError}
      style={{
        zIndex: 1000,
        pointerEvents: 'auto',
        backgroundColor: 'transparent'
      }}
    >
      <source src="/videos/sunscroll.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
}
