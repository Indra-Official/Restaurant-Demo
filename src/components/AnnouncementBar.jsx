import React from 'react';
import { MapPin, Clock, Phone, Sparkles } from 'lucide-react';

export default function AnnouncementBar({ serviceMode, setServiceMode, selectedBranch, onOpenBranchSelector }) {
  return (
    <aside aria-label="Announcements & Service Selector" className="w-full bg-[#0e0d0b] border-b border-white/10 text-xs text-[#a7a7a7] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 font-dmsans">
        
        {/* Left: Location & Hours matching arabiangardengroupofrestaurants.com */}
        <div className="flex items-center gap-4 text-[11px] tracking-wider uppercase">
          <div className="flex items-center gap-1.5 text-white">
            <MapPin className="w-3.5 h-3.5 text-[#E4C590]" />
            <span>Mahabalipuram — Chennai</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-[#a7a7a7]">
            <Clock className="w-3.5 h-3.5 text-[#E4C590]" />
            <span>Daily: 11:00 AM – 11:30 PM</span>
          </div>
        </div>

        {/* Center: Clean Minimalist Service Toggle */}
        <div className="inline-flex items-center bg-[#171819] border border-white/10 p-0.5 rounded-sm">
          <button
            type="button"
            onClick={() => setServiceMode('delivery')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider font-semibold transition-colors ${
              serviceMode === 'delivery'
                ? 'bg-[#E4C590] text-[#0e0d0b]'
                : 'text-[#a7a7a7] hover:text-white'
            }`}
          >
            Delivery
          </button>
          
          <button
            type="button"
            onClick={() => setServiceMode('takeaway')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider font-semibold transition-colors ${
              serviceMode === 'takeaway'
                ? 'bg-[#E4C590] text-[#0e0d0b]'
                : 'text-[#a7a7a7] hover:text-white'
            }`}
          >
            Takeaway
          </button>

          <button
            type="button"
            onClick={() => setServiceMode('reservation')}
            className={`px-3 py-1 text-[11px] uppercase tracking-wider font-semibold transition-colors ${
              serviceMode === 'reservation'
                ? 'bg-[#E4C590] text-[#0e0d0b]'
                : 'text-[#a7a7a7] hover:text-white'
            }`}
          >
            Table Booking
          </button>
        </div>

        {/* Right: Direct Hotline & Savings Message */}
        <div className="flex items-center gap-4 text-[11px] tracking-wider">
          <span className="hidden xl:inline text-[#E4C590] font-medium">
            Save up to 25% Direct Web Ordering
          </span>
          <a
            href="tel:+918680000674"
            className="flex items-center gap-1.5 text-white hover:text-[#E4C590] transition-colors"
          >
            <Phone className="w-3 h-3 text-[#E4C590]" />
            <span className="font-semibold">+91 86800 00674</span>
          </a>
        </div>

      </div>
    </aside>
  );
}
