"use client";

import { useEffect, useState } from "react";

export default function HomepageBackdrop() {
  const [backgroundImage, setBackgroundImage] = useState("/bg1080.webp");

  useEffect(() => {
    const updateBackground = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const aspectRatio = width / height;

      if (aspectRatio < 1) {
        setBackgroundImage("/bgvertical.webp");
        return;
      }

      if (width >= 2560) {
        setBackgroundImage("/bg1080.webp");
        return;
      }

      setBackgroundImage("/bg1080.webp");
    };

    updateBackground();
    window.addEventListener("resize", updateBackground);

    return () => {
      window.removeEventListener("resize", updateBackground);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#04070c]">
      <div
        className="homepage-backdrop-image absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(8px)',
          transform: 'scale(1.05)'
        }}
      />
      {/* No overlay text here, only background */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
