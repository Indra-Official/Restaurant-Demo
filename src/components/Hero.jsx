import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

export default function Hero({ onOrderClick, onReserveClick, selectedBranch }) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0e0d0b] border-b border-white/5">
      
      {/* Authentic Background Slider Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url('/slider-1.webp')` }}
      />
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0d0b]/85 via-[#0e0d0b]/75 to-[#0e0d0b]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 sm:py-32 text-center">
        
        {/* Subtle Pre-heading */}
        <div className="text-[11px] font-dmsans uppercase tracking-[0.3em] text-[#E4C590] mb-4">
          Luxury Seafood &amp; Arabian Dining • Tamil Nadu
        </div>

        {/* Authentic Separator SVG */}
        <div className="flex justify-center mb-6">
          <img src="/separator.svg" alt="" className="h-2.5 w-auto opacity-75" />
        </div>

        {/* Grand Forum Serif Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-forum leading-[1.15] max-w-3xl mx-auto tracking-wide my-4">
          Fresh Ocean Catches &amp; Signature Arabian Seafood Delivered Commission-Free
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#a7a7a7] font-dmsans max-w-xl mx-auto leading-relaxed mt-5 mb-10">
          Serving 12+ locations across Chennai &amp; Tamil Nadu. Experience direct web ordering, instant table bookings, and zero middleman fees.
        </p>

        {/* Dual Minimalist CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOrderClick}
            className="btn-luxury-solid w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.2em]"
          >
            <span>Order Direct Online</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onReserveClick}
            className="btn-luxury-outline w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.2em]"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve a Table</span>
          </button>
        </div>

      </div>
    </section>
  );
}
