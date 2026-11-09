import React from 'react';
import { Utensils, MapPin, Calendar, ShoppingBag, Phone } from 'lucide-react';

export default function MobileBottomNav({ 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  onOpenReservation, 
  onOpenBranches 
}) {
  return (
    <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0d0b]/95 backdrop-blur-md border-t border-white/10 px-3 py-2 font-dmsans">
      <div className="flex items-center justify-around text-xs">
        
        {/* Menu */}
        <a
          href="#menu"
          className="flex flex-col items-center gap-0.5 text-[#a7a7a7] hover:text-[#E4C590] py-1"
        >
          <Utensils className="w-4 h-4 text-[#E4C590]" />
          <span className="text-[10px] uppercase tracking-wider">Menu</span>
        </a>

        {/* Branches */}
        <a
          href="#branches"
          onClick={onOpenBranches}
          className="flex flex-col items-center gap-0.5 text-[#a7a7a7] hover:text-[#E4C590] py-1"
        >
          <MapPin className="w-4 h-4 text-[#E4C590]" />
          <span className="text-[10px] uppercase tracking-wider">Branches</span>
        </a>

        {/* Book Table (Center) */}
        <button
          onClick={onOpenReservation}
          className="flex flex-col items-center -mt-4 bg-[#E4C590] text-[#0e0d0b] px-3 py-2 border border-[#0e0d0b] shadow-xl"
        >
          <Calendar className="w-4 h-4 text-[#0e0d0b]" />
          <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">Table</span>
        </button>

        {/* Cart */}
        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-0.5 text-[#a7a7a7] hover:text-[#E4C590] py-1"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-[#E4C590]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#E4C590] text-[#0e0d0b] font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider">
            {cartCount > 0 ? `₹${cartTotal}` : 'Cart'}
          </span>
        </button>

        {/* Call */}
        <a
          href="tel:+918680000674"
          className="flex flex-col items-center gap-0.5 text-[#a7a7a7] hover:text-white py-1"
        >
          <Phone className="w-4 h-4 text-[#E4C590]" />
          <span className="text-[10px] uppercase tracking-wider">Call</span>
        </a>

      </div>
    </nav>
  );
}
