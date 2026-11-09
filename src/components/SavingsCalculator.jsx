import React, { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function SavingsCalculator({ onOrderClick }) {
  const [orderAmount, setOrderAmount] = useState(1500);

  const aggregatorMarkup = Math.round(orderAmount * 0.18);
  const aggregatorPackaging = 55;
  const aggregatorPlatform = 10;
  const aggregatorSurge = 75;
  const aggregatorTotal = orderAmount + aggregatorMarkup + aggregatorPackaging + aggregatorPlatform + aggregatorSurge;

  const directTotal = orderAmount;
  const totalSavings = aggregatorTotal - directTotal;

  return (
    <section id="savings" className="py-16 bg-[#141311] border-b border-white/10 font-dmsans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.25em] text-[#E4C590]">
            Direct Commission Savings
          </div>
          <div className="flex justify-center my-2">
            <img src="/separator.svg" alt="" className="h-2 w-auto opacity-70" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-forum text-white mt-2">
            Compare Direct Web Ordering vs Third-Party Apps
          </h2>
          <p className="text-xs sm:text-sm text-[#a7a7a7] max-w-lg mx-auto mt-2">
            Third-party delivery platforms inflate menu prices and add hidden surcharges. Drag the slider to calculate your real savings with Arabian Garden.
          </p>
        </div>

        {/* Minimalist Comparison Container */}
        <div className="bg-[#171819] border border-white/10 p-6 sm:p-8">
          
          {/* Slider */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-widest text-[#a7a7a7]">Estimated Meal Order Value</span>
              <span className="text-2xl font-forum text-[#E4C590]">₹{orderAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={orderAmount}
              onChange={(e) => setOrderAmount(Number(e.target.value))}
              className="w-full h-1.5 bg-[#252422] appearance-none cursor-pointer accent-[#E4C590]"
            />
            <div className="flex justify-between text-[10px] text-[#a7a7a7] mt-2 uppercase tracking-wider">
              <span>₹500 (Solo / Quick Lunch)</span>
              <span>₹2,500 (Seafood Dinner)</span>
              <span>₹5,000 (Family Banquet)</span>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            
            {/* Third-Party Apps */}
            <div className="p-4 bg-[#0e0d0b] border border-white/5 space-y-2 text-xs">
              <div className="text-[11px] uppercase tracking-wider text-[#a7a7a7] pb-2 border-b border-white/10">
                Third-Party Food Apps
              </div>
              <div className="flex justify-between text-[#a7a7a7]">
                <span>App Menu Inflation (+18%):</span>
                <span>+₹{aggregatorMarkup}</span>
              </div>
              <div className="flex justify-between text-[#a7a7a7]">
                <span>Packaging Fee:</span>
                <span>+₹{aggregatorPackaging}</span>
              </div>
              <div className="flex justify-between text-[#a7a7a7]">
                <span>Platform Convenience Fee:</span>
                <span>+₹{aggregatorPlatform}</span>
              </div>
              <div className="flex justify-between text-[#a7a7a7]">
                <span>Delivery &amp; Surge:</span>
                <span>+₹{aggregatorSurge}</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-[11px] uppercase tracking-wider text-[#a7a7a7]">Total Cost:</span>
                <span className="text-xl font-forum text-[#a7a7a7] line-through">₹{aggregatorTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Arabian Garden Direct */}
            <div className="p-4 bg-[#0e0d0b] border border-[#E4C590]/40 space-y-2 text-xs">
              <div className="text-[11px] uppercase tracking-wider text-[#E4C590] pb-2 border-b border-white/10 flex items-center justify-between">
                <span>Arabian Garden Direct</span>
                <span className="text-[10px] text-white">0% Middleman Fees</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Direct Kitchen Price:</span>
                <span>₹{orderAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Menu Inflation:</span>
                <span className="text-[#E4C590]">₹0</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Coastal Packaging:</span>
                <span className="text-[#E4C590]">Complimentary (₹0)</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Platform Fee:</span>
                <span className="text-[#E4C590]">₹0</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <div>
                  <div className="text-[10px] uppercase text-[#E4C590]">You Pay Direct:</div>
                  <div className="text-2xl font-forum text-[#E4C590]">₹{directTotal.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase text-white font-medium">You Save:</div>
                  <div className="text-lg font-forum text-white font-bold">₹{totalSavings.toLocaleString()}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Action */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs text-[#a7a7a7]">
              Enjoy fresh kitchen quality with zero middleman app fees.
            </p>
            <button
              onClick={onOrderClick}
              className="btn-luxury-solid text-xs whitespace-nowrap"
            >
              <span>Order Direct Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
