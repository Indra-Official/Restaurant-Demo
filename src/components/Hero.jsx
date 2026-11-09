import React from 'react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

export default function Hero({ onOrderClick, onReserveClick, selectedBranch }) {
  return (
    <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#0e0d0b] border-b border-white/10">
      
      {/* Authentic Background Slider Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url('/slider-1.webp')` }}
      />
      {/* Minimalist Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0d0b]/90 via-[#0e0d0b]/80 to-[#0e0d0b]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-24 text-center">
        
        {/* Top Branch Callout */}
        <div className="inline-flex items-center gap-2 text-xs font-dmsans uppercase tracking-[0.25em] text-[#E4C590] mb-3">
          <span>{selectedBranch?.name || 'Mahabalipuram — Chennai'}</span>
          <span className="text-white/30">•</span>
          <span>100% Commission-Free Direct Dining</span>
        </div>

        {/* Authentic Separator SVG */}
        <div className="flex justify-center my-3">
          <img src="/separator.svg" alt="separator ornament" className="h-2.5 w-auto opacity-80" />
        </div>

        {/* Minimalist Forum Serif Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-forum leading-tight max-w-4xl mx-auto tracking-wide my-4">
          Fresh Ocean Catches &amp; Signature Arabian Seafood Delivered Commission-Free
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#a7a7a7] font-dmsans max-w-2xl mx-auto leading-relaxed mt-4 mb-8">
          Serving 12+ locations across Chennai &amp; Tamil Nadu. Experience direct web ordering, instant table bookings, and zero middleman fees.
        </p>

        {/* Dual Minimalist CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOrderClick}
            className="btn-luxury-solid w-full sm:w-auto"
          >
            <span>Order Direct Online</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onReserveClick}
            className="btn-luxury-outline w-full sm:w-auto"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve a Table</span>
          </button>
        </div>

        {/* Signature Dishes Preview Minimal Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-14 pt-8 border-t border-white/10 text-left font-dmsans">
          
          {/* Dish 1: Lobster Thermidor */}
          <div className="p-4 bg-[#171819]/80 border border-white/10 flex items-center gap-3.5 hover:border-[#E4C590]/50 transition-colors">
            <img 
              src="/menu-special.jpg" 
              alt="Lobster Thermidor" 
              className="w-16 h-16 object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-[#E4C590]">Special Selection</div>
              <h4 className="text-sm text-white font-forum font-normal truncate">Lobster Thermidor</h4>
              <div className="text-xs text-white mt-0.5">
                <span className="text-[#E4C590] font-bold">₹1,499</span>
                <span className="text-[10px] text-[#a7a7a7] line-through ml-2">App: ₹1,899</span>
              </div>
            </div>
          </div>

          {/* Dish 2: Moroccan Fish Tagine */}
          <div className="p-4 bg-[#171819]/80 border border-white/10 flex items-center gap-3.5 hover:border-[#E4C590]/50 transition-colors">
            <img 
              src="/dish-1.jpg" 
              alt="Fish Tagine" 
              className="w-16 h-16 object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-[#E4C590]">Traditional Claypot</div>
              <h4 className="text-sm text-white font-forum font-normal truncate">Moroccan Fish Tagine</h4>
              <div className="text-xs text-white mt-0.5">
                <span className="text-[#E4C590] font-bold">₹680</span>
                <span className="text-[10px] text-[#a7a7a7] line-through ml-2">App: ₹850</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
