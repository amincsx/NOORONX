"use client";

import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

type HomepageContentSliderProps<T> = {
  title: string;
  items: T[];
  emptyState: string;
  viewAllHref: string;
  viewAllLabel: string;
  buttonClassName: string;
  itemLabel: string;
  dir?: "rtl" | "ltr";
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
};

export default function HomepageContentSlider<T>({
  title,
  items,
  emptyState,
  viewAllHref,
  viewAllLabel,
  buttonClassName,
  itemLabel,
  dir = "rtl",
  getKey,
  renderItem,
}: HomepageContentSliderProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [items.length]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  return (
    <div className="glass-strong rounded-3xl p-4 sm:p-6 flex flex-col h-full">
      <div className="mb-6 flex items-center justify-between gap-4 animate-on-scroll">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/80 text-shadow">
          {title}
        </h2>
        {items.length > 1 && (
          <div className="flex items-center gap-2" dir="ltr">
            <button
              type="button"
              onClick={goToPrevious}
              className="slider-nav-button"
              aria-label={dir === "rtl" ? "مورد قبلی" : "Previous item"}
            >
              <span aria-hidden="true">{dir === "rtl" ? "→" : "←"}</span>
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="slider-nav-button"
              aria-label={dir === "rtl" ? "مورد بعدی" : "Next item"}
            >
              <span aria-hidden="true">{dir === "rtl" ? "←" : "→"}</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex-grow">
        {items.length > 0 ? (
          <div className="space-y-4">
            <div className="slider-stage">
              <div
                className="slider-track"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {items.map((item, index) => (
                  <div key={getKey(item, index)} className="slider-slide">
                    {renderItem(item, index)}
                  </div>
                ))}
              </div>
            </div>

            {items.length > 1 && (
              <div className="flex items-center justify-between gap-4" dir="ltr">
                <div className="flex gap-2">
                  {items.map((item, index) => (
                    <button
                      key={`${getKey(item, index)}-dot`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`slider-dot ${index === activeIndex ? "slider-dot-active" : ""}`}
                      aria-label={`${itemLabel} ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="text-xs tracking-[0.25em] text-white/45">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-on-scroll glass rounded-lg overflow-hidden hover-lift">
            <div className="relative h-32 overflow-hidden">
              <div className="w-full h-full bg-gray-700/50 flex items-center justify-center">
                <span className="text-white/50">{emptyState}</span>
              </div>
            </div>
            <div className="p-3">
              <div className="h-4 bg-gray-700/50 rounded mb-2"></div>
              <div className="h-12 bg-gray-700/30 rounded mb-2"></div>
              <div className="h-6 bg-gray-700/20 rounded"></div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-6">
        <Link
          href={viewAllHref}
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${buttonClassName}`}
        >
          {viewAllLabel}
        </Link>
      </div>
    </div>
  );
}
