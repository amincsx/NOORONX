"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';

interface BackgroundVideoProps {
  className?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [refreshRate, setRefreshRate] = useState(60);
  const [isScrolling, setIsScrolling] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Simple refs for direct control
  const progressRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [is4K, setIs4K] = useState(false);
  
  // Check if screen is mobile or 4K
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const is4K = width >= 2560; // Higher threshold for actual 4K screens
      const isMobile = width < 768; // Back to standard mobile breakpoint
      
      console.log(`Screen size: ${width}x${height}, is4K: ${is4K}, isMobile: ${isMobile}`);
      console.log(`Current video source: ${isMobile ? 'vertical' : is4K ? '4K' : 'black'}`);
      setIsMobile(isMobile);
      setIs4K(is4K);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const sources = isMobile 
    ? ['/videos/back33vertical.mp4', '/videos/back33.mp4']
    : is4K 
      ? ['/videos/back334k.mp4', '/videos/back33black.mp4']
      : ['/videos/back33black.mp4', '/videos/back33.mp4'];
  
  console.log(`Screen: Mobile=${isMobile}, 4K=${is4K}, Video: ${sources[0]}`);
  console.log(`Available sources:`, sources);
  const [sourceIndex, setSourceIndex] = useState(0);
  
  // Force video reload when source changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      setVideoLoaded(false);
      console.log('Video source changed, reloading...');
    }
  }, [isMobile, is4K]);

  // Easing
  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Initialize video and detect refresh rate when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      console.log('Video element found, loading...');
    }

    let frameCount = 0;
    const lastTime = performance.now();
    const detectRefreshRate = () => {
      frameCount++;
      const currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        const detectedFPS = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setRefreshRate(detectedFPS);
        console.log(`Detected refresh rate: ${detectedFPS}Hz`);
        return;
      }
      requestAnimationFrame(detectRefreshRate);
    };
    requestAnimationFrame(detectRefreshRate);
  }, []);

  // Interactive scroll handler (updates progress only)
  const handleScroll = useCallback(() => {
    setIsScrolling(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 100); // Reduced timeout for faster response

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
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
      progressRef.current = progress;
      setScrollProgress(progress);

      // Direct video control - much more responsive
      if (progress <= 0.01) {
        // At top - freeze video
        if (!video.paused) {
          video.pause();
        }
        if (Math.abs(video.currentTime - 0) > 0.1) {
          video.currentTime = 0;
        }
      } else {
        // During scroll - direct time mapping with minimal smoothing
        const targetTime = progress * videoDuration;
        const currentTime = video.currentTime;
        const timeDiff = Math.abs(targetTime - currentTime);
        
        // Only update if difference is significant enough
        if (timeDiff > 0.05) { // 50ms threshold
          video.currentTime = targetTime;
        }
        
        // Keep video paused for frame-by-frame control
        if (!video.paused) {
          video.pause();
        }
      }
    });
  }, [videoLoaded, videoDuration]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleScroll]);

  const handleVideoLoad = () => {
    const video = videoRef.current;
    if (video) {
      console.log('Video loaded! Duration:', video.duration);
      console.log('Video source:', video.src);
      setVideoLoaded(true);
      setVideoDuration(video.duration);
      video.currentTime = 0;
      video.pause();
      setTimeout(() => {
        if (video && !video.paused) {
          video.pause();
          console.log('Forced video to pause');
        }
      }, 100);
      console.log('Video paused at start - waiting for user interaction');
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    console.error('Failed to load video:', sources[sourceIndex]);
    const video = videoRef.current;
    // Try next fallback source if available
    setVideoLoaded(false);
    setTimeout(() => {
      setSourceIndex((prev) => {
        const next = Math.min(prev + 1, sources.length - 1);
        console.log('Trying fallback video source:', sources[next]);
        return next;
      });
      if (video) {
        try { video.load(); } catch {}
      }
    }, 0);
  };

  return (
    <div className={`fixed inset-0 -z-10 bg-black ${className}`}>
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className={`w-full h-full object-cover transition-opacity duration-300 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          objectPosition: 'center',
          willChange: 'auto',
          transform: 'translateZ(0) scale(1)'
        }}
        onLoadedMetadata={handleVideoLoad}
        onError={handleVideoError}
        onLoadStart={() => console.log('Video load started for:', sources[sourceIndex])}
        onCanPlay={() => console.log('Video can play')}
      >
        <source src={sources[sourceIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Responsive progress bar */}
      <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 h-0.5 sm:h-1 bg-gray-400/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-gray-700 transition-all duration-200"
          style={{ width: `${Math.min(Math.max(scrollProgress * 100, 0), 100)}%` }}
        />
      </div>
    </div>
  );
};

export default BackgroundVideo;
