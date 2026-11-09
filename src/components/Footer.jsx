import React from 'react';
import { Phone, Clock, MapPin, Mail, MessageSquare } from 'lucide-react';
import { BRANCHES } from '../data/branches';

export default function Footer({ onSelectBranch }) {
  return (
    <footer id="contact" className="bg-[#0e0d0b] text-[#a7a7a7] border-t border-white/10 pt-16 pb-12 font-dmsans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Logo & Info */}
          <div className="lg:col-span-4 space-y-4">
            <img 
              src="/logo.png" 
              alt="Arabian Garden Seafood Restaurant" 
              className="h-12 w-auto object-contain"
            />
            <p className="text-xs text-[#a7a7a7] leading-relaxed">
              Arabian Garden Seafood Restaurant offers fresh ocean catches and authentic Middle Eastern coal-fired grills across 12 locations in Tamil Nadu with direct, commission-free web ordering.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E4C590]" />
                <span className="text-white">Daily: 11:00 AM – 11:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E4C590]" />
                <a href="tel:+918680000674" className="text-white hover:text-[#E4C590] transition-colors">
                  +91 86800 00674
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E4C590]" />
                <span className="text-[#a7a7a7]">info@arabiangardengroupofrestaurants.com</span>
              </div>
            </div>
          </div>

          {/* 12 Locations */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#E4C590] font-bold">
              Our 12 Tamil Nadu Hubs
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {BRANCHES.map((b) => (
                <a
                  key={b.id}
                  href="#branches"
                  onClick={() => onSelectBranch && onSelectBranch(b)}
                  className="text-[#a7a7a7] hover:text-[#E4C590] transition-colors truncate flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-[#E4C590] flex-shrink-0" />
                  <span>{b.name.split(' ')[0]} Hub</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#E4C590] font-bold">
              Direct Ordering
            </h4>
            <ul className="space-y-2 text-xs text-[#a7a7a7]">
              <li><a href="#menu" className="hover:text-white transition-colors">Seafood &amp; Arabian Menu</a></li>
              <li><a href="#reservations" className="hover:text-white transition-colors">Find a Table (Direct)</a></li>
              <li><a href="#savings" className="hover:text-white transition-colors">Zero Middleman Fee Guarantee</a></li>
              <li><a href="#story" className="hover:text-white transition-colors">Special Varieties &amp; Fresh Catch</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* ALYNELABS Agency Credentials Banner */}
        <div className="mt-10 p-6 bg-[#171819] border border-[#E4C590]/30">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#E4C590]">
                Digital Engineering Partner
              </div>
              <h3 className="text-base font-forum text-white mt-0.5">
                Website Designed &amp; Engineered by ALYNELABS
              </h3>
              <p className="text-xs text-[#a7a7a7] mt-0.5">
                Direct-to-Consumer Web Solutions &amp; Restaurant Hospitality Architecture
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 text-xs">
              <div className="px-3 py-1.5 bg-[#0e0d0b] border border-white/10 text-[#a7a7a7]">
                Founder: <span className="text-white font-medium">Lalith Adhithiya Saravanan</span>
              </div>
              <a
                href="tel:+919943575326"
                className="btn-luxury-outline py-1.5 px-3 text-[11px]"
              >
                <Phone className="w-3 h-3 text-[#E4C590]" />
                <span>+91 9943575326</span>
              </a>
              <a
                href="https://wa.me/919943575326?text=Hello%20Lalith,%20inquiry%20regarding%20ALYNELABS%20web%20solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-solid py-1.5 px-3 text-[11px]"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp Agency</span>
              </a>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#a7a7a7] text-center">
            Website Designed &amp; Engineered by ALYNELABS | Direct-to-Consumer Web Solutions | Contact: +91 9943575326 | Lalith Adhithiya Saravanan
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-[#a7a7a7]/60">
          © {new Date().getFullYear()} Arabian Garden Seafood Restaurant. All rights reserved. 100% Commission-Free Direct Web Platform.
        </div>

      </div>
    </footer>
  );
}
