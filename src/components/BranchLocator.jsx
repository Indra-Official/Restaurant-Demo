import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Check } from 'lucide-react';
import { BRANCHES } from '../data/branches';

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export default function BranchLocator({ selectedBranch, onSelectBranch, onOrderFromBranch }) {
  const [filterRegion, setFilterRegion] = useState('all');
  const [userLocation, setUserLocation] = useState(null);
  const [locating, setLocating] = useState(false);

  const handleFindNearest = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setUserLocation({ lat: 12.9815, lng: 80.2180 });
        setLocating(false);
      },
      { timeout: 8000 }
    );
  };

  let displayBranches = BRANCHES.filter((b) => {
    if (filterRegion === 'all') return true;
    if (filterRegion === 'ECR & Coastal') return b.region === 'ECR & Coastal';
    if (filterRegion === 'OMR Tech Corridor') return b.region === 'OMR Tech Corridor';
    return b.region === 'Central & South Chennai';
  });

  if (userLocation) {
    displayBranches = displayBranches.map(b => ({
      ...b,
      distanceKm: calculateDistanceKm(userLocation.lat, userLocation.lng, b.lat, b.lng)
    })).sort((a, b) => a.distanceKm - b.distanceKm);
  }

  return (
    <section id="branches" className="py-20 bg-[#141311] border-b border-white/10 font-dmsans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#E4C590]">
            Visit Arabian Garden Seafood Restaurant
          </div>
          <div className="flex justify-center my-2">
            <img src="/separator.svg" alt="" className="h-2 w-auto opacity-70" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-forum text-white mt-1">
            Our Branches Across Tamil Nadu
          </h2>
          <p className="text-xs sm:text-sm text-[#a7a7a7] mt-3">
            Operating Daily from 11:00 AM to 11:30 PM. Experience oceanfront dining or order direct to your door.
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={handleFindNearest}
              disabled={locating}
              className="btn-luxury-outline text-xs py-2 px-4"
            >
              <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
              <span>{locating ? 'Locating...' : 'Find Nearest Branch'}</span>
            </button>
          </div>
        </div>

        {/* Region Filter */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {['all', 'ECR & Coastal', 'OMR Tech Corridor', 'Central & South Chennai'].map((reg) => (
            <button
              key={reg}
              onClick={() => setFilterRegion(reg)}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                filterRegion === reg
                  ? 'bg-[#E4C590] text-[#0e0d0b]'
                  : 'text-[#a7a7a7] hover:text-white border border-white/10 bg-[#0e0d0b]'
              }`}
            >
              {reg === 'all' ? 'All 12 Branches' : reg}
            </button>
          ))}
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBranches.map((branch) => {
            const isSelected = selectedBranch?.id === branch.id;

            return (
              <div
                key={branch.id}
                className={`bg-[#171819] border transition-colors flex flex-col justify-between ${
                  isSelected ? 'border-[#E4C590]' : 'border-white/10 hover:border-white/25'
                }`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-[#0e0d0b]">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/mahab-1.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171819] via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#E4C590] font-bold">
                      {branch.region}
                    </span>
                    {branch.distanceKm !== undefined && (
                      <span className="text-[10px] bg-[#0e0d0b]/90 border border-white/15 px-2 py-0.5 text-white">
                        {branch.distanceKm} km away
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-forum text-white">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-[#a7a7a7] mt-2 flex items-start gap-1.5 leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 text-[#E4C590] flex-shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </p>
                    <p className="text-[11px] text-[#a7a7a7]/70 pl-5 mt-0.5">
                      Landmark: {branch.landmark}
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-[#a7a7a7]">
                        <Clock className="w-3.5 h-3.5 text-[#E4C590]" />
                        <span>Daily: 11:00 AM – 11:30 PM</span>
                      </div>
                      <span className="text-[11px] text-[#E4C590]">Open Today</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                    <a
                      href={`tel:${branch.phone}`}
                      className="w-full py-2 px-3 border border-white/10 hover:border-[#E4C590] bg-[#0e0d0b] text-white text-xs flex items-center justify-center gap-2 transition-colors uppercase tracking-wider font-medium"
                    >
                      <Phone className="w-3 h-3 text-[#E4C590]" />
                      <span>{branch.displayPhone}</span>
                    </a>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={branch.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 text-center border border-white/10 text-[11px] text-[#a7a7a7] hover:text-white transition-colors uppercase tracking-wider"
                      >
                        Directions
                      </a>
                      <button
                        onClick={() => {
                          onSelectBranch(branch);
                          onOrderFromBranch(branch);
                        }}
                        className={`py-1.5 text-center text-[11px] uppercase tracking-wider font-bold transition-colors ${
                          isSelected ? 'bg-[#E4C590] text-[#0e0d0b]' : 'border border-[#E4C590] text-[#E4C590] hover:bg-[#E4C590] hover:text-[#0e0d0b]'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Order Here'}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
