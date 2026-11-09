import React, { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveMetrics from './components/LiveMetrics';
import SavingsCalculator from './components/SavingsCalculator';
import BranchLocator from './components/BranchLocator';
import MenuSection from './components/MenuSection';
import CartDrawer from './components/CartDrawer';
import ReservationSection from './components/ReservationSection';
import StorySection from './components/StorySection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import OrderSuccessModal from './components/OrderSuccessModal';
import { BRANCHES } from './data/branches';
import { Check } from 'lucide-react';

export default function App() {
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]); // Mahabalipuram Coastal Heritage
  const [serviceMode, setServiceMode] = useState('delivery');
  const [branchSelectorOpen, setBranchSelectorOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 'sig-1',
      category: 'signature',
      name: 'Lobster Thermidor',
      subtitle: 'Signature creamy baked lobster in shell',
      price: 1499,
      aggregatorPrice: 1899,
      image: '/menu-special.jpg',
      quantity: 1
    }
  ]);
  const [toastMessage, setToastMessage] = useState('');
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  const handleAddToCart = (dish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });

    setToastMessage(`Added ${dish.name} to order`);
    setTimeout(() => setToastMessage(''), 2200);
  };

  const handleUpdateQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== dishId));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === dishId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0d0b] text-[#a7a7a7] flex flex-col font-dmsans pb-16 md:pb-0">
      
      {/* 1. Announcement Bar & Revenue Savings Banner */}
      <AnnouncementBar
        serviceMode={serviceMode}
        setServiceMode={(mode) => {
          setServiceMode(mode);
          if (mode === 'reservation') {
            handleScrollToSection('reservations');
          } else {
            handleScrollToSection('menu');
          }
        }}
        selectedBranch={selectedBranch}
        onOpenBranchSelector={() => setBranchSelectorOpen(true)}
      />

      {/* 2. Header & Navigation with Official Logo */}
      <Navbar
        selectedBranch={selectedBranch}
        onSelectBranch={setSelectedBranch}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenReservation={() => handleScrollToSection('reservations')}
        branchSelectorOpen={branchSelectorOpen}
        setBranchSelectorOpen={setBranchSelectorOpen}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 3. Hero Section (Minimalist Luxury with Authentic Slider & Separator) */}
        <Hero
          onOrderClick={() => handleScrollToSection('menu')}
          onReserveClick={() => handleScrollToSection('reservations')}
          selectedBranch={selectedBranch}
        />

        {/* 4. Live Metrics & Brand Proof */}
        <LiveMetrics />

        {/* Commission Savings Calculator */}
        <SavingsCalculator onOrderClick={() => handleScrollToSection('menu')} />

        {/* 6. Direct Online Seafood Menu & Checkout */}
        <MenuSection
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          onOpenCart={() => setCartDrawerOpen(true)}
        />

        {/* 5. Interactive Multi-Branch Locator (12 Locations) */}
        <BranchLocator
          selectedBranch={selectedBranch}
          onSelectBranch={setSelectedBranch}
          onOrderFromBranch={(branch) => {
            setSelectedBranch(branch);
            handleScrollToSection('menu');
          }}
        />

        {/* 7. Automated Table Reservation System (Step-by-Step + WhatsApp Preview) */}
        <ReservationSection
          selectedBranch={selectedBranch}
          onSelectBranch={setSelectedBranch}
        />

        {/* Culinary Heritage & Story */}
        <StorySection />

        {/* Customer Testimonials */}
        <TestimonialsSection />

      </main>

      {/* 8. Footer & ALYNELABS Agency Credentials */}
      <Footer onSelectBranch={setSelectedBranch} />

      {/* Mobile Sticky Navigation Bar */}
      <MobileBottomNav
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenReservation={() => handleScrollToSection('reservations')}
        onOpenBranches={() => handleScrollToSection('branches')}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        selectedBranch={selectedBranch}
        serviceMode={serviceMode}
        setServiceMode={setServiceMode}
        onOrderSuccess={(orderData) => {
          setOrderSuccessData(orderData);
          setCartItems([]);
        }}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal
        orderData={orderSuccessData}
        onClose={() => setOrderSuccessData(null)}
      />

      {/* Minimal Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-6 z-50 bg-[#171819] border border-[#E4C590] text-white px-4 py-2.5 shadow-2xl flex items-center gap-2.5 text-xs font-dmsans animate-in fade-in duration-150">
          <Check className="w-4 h-4 text-[#E4C590]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
