import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';

export default function AnnouncementBar({ selectedBranch, onOpenBranchSelector }) {
  return (
    <aside aria-label="Restaurant Info" className="w-full bg-[#0a0908] border-b border-white/5 text-[11px] text-[#8e8d8a] font-dmsans tracking-wider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        
        {/* Left: Location & Hours matching original arabiangardengroupofrestaurants.com */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenBranchSelector}
            className="flex items-center gap-1.5 text-white/90 hover:text-[#E4C590] transition-colors"
          >
            <MapPin className="w-3 h-3 text-[#E4C590]" />
            <span className="uppercase tracking-widest">{selectedBranch?.name || 'Mahabalipuram — Chennai'}</span>
            <span className="text-[9px] text-[#E4C590] ml-0.5">▾</span>
          </button>
          
          <span className="text-white/10 hidden sm:inline">•</span>
          
          <div className="hidden sm:flex items-center gap-1.5 text-[#8e8d8a]">
            <Clock className="w-3 h-3 text-[#E4C590]/70" />
            <span>Daily: 11:00 AM – 11:30 PM</span>
          </div>
        </div>

        {/* Right: Direct Web Ordering Message & Hotline */}
        <div className="flex items-center gap-4 text-xs">
          <span className="hidden md:inline text-[#E4C590] font-normal tracking-wide text-[11px]">
            Save up to 25% vs Food Apps
          </span>
          <a
            href="tel:+918680000674"
            className="flex items-center gap-1.5 text-white/90 hover:text-[#E4C590] transition-colors font-medium text-[11px]"
          >
            <Phone className="w-3 h-3 text-[#E4C590]" />
            <span>+91 86800 00674</span>
          </a>
        </div>

      </div>
    </aside>
  );
}
