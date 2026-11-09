import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  ChevronDown, 
  Phone, 
  Check 
} from 'lucide-react';
import { BRANCHES } from '../data/branches';

export default function Navbar({ 
  selectedBranch, 
  onSelectBranch, 
  cartCount, 
  cartTotal, 
  onOpenCart, 
  onOpenReservation,
  branchSelectorOpen,
  setBranchSelectorOpen
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchSearch, setBranchSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setBranchSelectorOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setBranchSelectorOpen]);

  const filteredBranches = BRANCHES.filter(b => 
    b.name.toLowerCase().includes(branchSearch.toLowerCase()) ||
    b.address.toLowerCase().includes(branchSearch.toLowerCase()) ||
    b.region.toLowerCase().includes(branchSearch.toLowerCase())
  );

  return (
    <header className={`sticky top-[41px] z-40 transition-colors duration-300 ${
      scrolled 
        ? 'bg-[#0e0d0b]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-xl' 
        : 'bg-[#0e0d0b] border-b border-white/5 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Authentic Brand Logo */}
          <a href="#" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Arabian Garden Seafood Restaurant" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </a>

          {/* Branch Selector (Desktop) */}
          <div className="hidden lg:block relative" ref={dropdownRef}>
            <button
              onClick={() => setBranchSelectorOpen(!branchSelectorOpen)}
              className="flex items-center gap-2 px-3 py-1.5 border border-white/10 hover:border-[#E4C590]/50 bg-[#171819] text-left transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#E4C590]" />
              <div className="text-left font-dmsans">
                <div className="text-[9px] uppercase tracking-widest text-[#a7a7a7]">Branch</div>
                <div className="text-xs text-white font-medium flex items-center gap-1.5">
                  <span className="truncate max-w-[150px]">{selectedBranch?.name}</span>
                  <ChevronDown className="w-3 h-3 text-[#E4C590]" />
                </div>
              </div>
            </button>

            {branchSelectorOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-[#171819] border border-[#E4C590]/30 shadow-2xl p-3 z-50 animate-in fade-in duration-150">
                <div className="pb-2 mb-2 border-b border-white/10">
                  <input
                    type="text"
                    placeholder="Search 12 branches..."
                    value={branchSearch}
                    onChange={(e) => setBranchSearch(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#0e0d0b] border border-white/15 text-xs text-white placeholder-[#a7a7a7] focus:outline-none focus:border-[#E4C590]"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {filteredBranches.map((branch) => {
                    const isSelected = selectedBranch?.id === branch.id;
                    return (
                      <button
                        key={branch.id}
                        onClick={() => {
                          onSelectBranch(branch);
                          setBranchSelectorOpen(false);
                        }}
                        className={`w-full text-left p-2 transition-colors flex items-center justify-between text-xs ${
                          isSelected ? 'bg-[#E4C590]/15 text-[#E4C590]' : 'text-[#a7a7a7] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <div className="font-medium text-white">{branch.name}</div>
                          <div className="text-[10px] text-[#a7a7a7] truncate">{branch.address}</div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#E4C590]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Nav Links matching original site */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-dmsans uppercase tracking-widest font-medium">
            <a href="#" className="text-white hover:text-[#E4C590] transition-colors">
              Home
            </a>
            <a href="#story" className="text-[#a7a7a7] hover:text-[#E4C590] transition-colors">
              About Us
            </a>
            <a href="#menu" className="text-[#a7a7a7] hover:text-[#E4C590] transition-colors">
              Specials
            </a>
            <a href="#menu" className="text-[#a7a7a7] hover:text-[#E4C590] transition-colors">
              Menu
            </a>
            <a href="#branches" className="text-[#a7a7a7] hover:text-[#E4C590] transition-colors">
              Branches (12)
            </a>
            <a href="#savings" className="text-[#E4C590] hover:text-white transition-colors">
              Zero Fees
            </a>
            <a href="#contact" className="text-[#a7a7a7] hover:text-[#E4C590] transition-colors">
              Contact
            </a>
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            
            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 py-2 border border-white/10 hover:border-[#E4C590] bg-[#171819] text-white transition-colors font-dmsans text-xs"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#E4C590]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-[#E4C590] text-[#0e0d0b] font-bold text-[9px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold">
                {cartCount === 0 ? 'Cart' : `₹${cartTotal}`}
              </span>
            </button>

            {/* Find a Table (Book a Table) CTA Button */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex btn-luxury-outline"
            >
              <span>Find a Table</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white border border-white/10 bg-[#171819]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e0d0b] border-b border-white/10 px-4 pt-4 pb-6 space-y-4 font-dmsans">
          <div className="flex flex-col space-y-3 text-xs uppercase tracking-widest">
            <a 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-white border-b border-white/5"
            >
              Home
            </a>
            <a 
              href="#story" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-[#a7a7a7] border-b border-white/5"
            >
              About Us
            </a>
            <a 
              href="#menu" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-[#a7a7a7] border-b border-white/5"
            >
              Seafood Menu
            </a>
            <a 
              href="#branches" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-[#a7a7a7] border-b border-white/5"
            >
              Our Branches (12)
            </a>
            <a 
              href="#savings" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-[#E4C590] border-b border-white/5"
            >
              Commission Savings
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-[#a7a7a7] border-b border-white/5"
            >
              Contact
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="btn-luxury-solid w-full text-center"
            >
              Find a Table
            </button>
            <a
              href="tel:+918680000674"
              className="btn-luxury-outline w-full text-center"
            >
              <Phone className="w-3.5 h-3.5" /> Call +91 86800 00674
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
