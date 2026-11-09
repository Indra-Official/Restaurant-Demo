import React, { useEffect, useState, useRef } from 'react';

function useCounter(endValue, duration = 1800, trigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime = null;
    let animationFrameId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * endValue);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [endValue, duration, trigger]);

  return count;
}

export default function LiveMetrics() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    const fallback = setTimeout(() => setIsVisible(true), 350);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const locationsCount = useCounter(12, 1400, isVisible);
  const dinersCount = useCounter(1000, 2000, isVisible);
  const dishesCount = useCounter(50, 1600, isVisible);
  const commissionCount = useCounter(100, 1400, isVisible);

  return (
    <section 
      ref={sectionRef} 
      className="py-14 bg-[#0e0d0b] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Section Subtitle & Ornament */}
        <div className="text-center mb-8 font-dmsans">
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#E4C590]">
            Our Proven Scale &amp; Excellence
          </div>
          <div className="flex justify-center my-2">
            <img src="/separator.svg" alt="" className="h-2 w-auto opacity-70" />
          </div>
        </div>

        {/* 4 Minimalist Counter Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          {/* Stat 1: 12+ Locations */}
          <div className="p-4 border-r border-white/5 last:border-r-0">
            <div className="text-4xl sm:text-5xl font-forum text-[#E4C590] leading-none">
              {locationsCount}<span className="text-2xl ml-0.5">+</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-white font-dmsans mt-2 font-medium">
              Prime Locations
            </div>
            <p className="text-[11px] text-[#a7a7a7] font-dmsans mt-1">Across Tamil Nadu</p>
          </div>

          {/* Stat 2: 1,000+ Daily Diners */}
          <div className="p-4 border-r border-white/5 last:border-r-0">
            <div className="text-4xl sm:text-5xl font-forum text-[#E4C590] leading-none">
              {dinersCount.toLocaleString()}<span className="text-2xl ml-0.5">+</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-white font-dmsans mt-2 font-medium">
              Daily Satisfied Diners
            </div>
            <p className="text-[11px] text-[#a7a7a7] font-dmsans mt-1">Dine-in &amp; Direct Delivery</p>
          </div>

          {/* Stat 3: 50+ Specialities */}
          <div className="p-4 border-r border-white/5 last:border-r-0">
            <div className="text-4xl sm:text-5xl font-forum text-[#E4C590] leading-none">
              {dishesCount}<span className="text-2xl ml-0.5">+</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-white font-dmsans mt-2 font-medium">
              Seafood Specialities
            </div>
            <p className="text-[11px] text-[#a7a7a7] font-dmsans mt-1">Dawn Catch to Table</p>
          </div>

          {/* Stat 4: 100% Commission-Free */}
          <div className="p-4">
            <div className="text-4xl sm:text-5xl font-forum text-[#E4C590] leading-none">
              {commissionCount}<span className="text-2xl ml-0.5">%</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-white font-dmsans mt-2 font-medium">
              Commission-Free
            </div>
            <p className="text-[11px] text-[#a7a7a7] font-dmsans mt-1">Direct Web Ordering</p>
          </div>

        </div>

      </div>
    </section>
  );
}
