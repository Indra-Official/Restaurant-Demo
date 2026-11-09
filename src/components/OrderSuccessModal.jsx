import React, { useEffect } from 'react';
import { X, Clock, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderSuccessModal({ orderData, onClose }) {
  useEffect(() => {
    if (orderData) {
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
      } catch (e) {}
    }
  }, [orderData]);

  if (!orderData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 font-dmsans">
      <div className="w-full max-w-md bg-[#0e0d0b] border border-[#E4C590] p-6 text-white shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#E4C590] font-bold">
              Order Confirmed
            </div>
            <div className="text-xs text-[#a7a7a7]">
              Ref: <span className="font-mono text-white">{orderData.orderId}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-[#a7a7a7] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary */}
        <div className="p-4 bg-[#171819] border border-white/10 space-y-2 text-xs">
          <div className="text-[10px] uppercase tracking-wider text-[#a7a7a7]">
            Ordered Dishes ({orderData.items.length})
          </div>
          <div className="space-y-1">
            {orderData.items.map((i, idx) => (
              <div key={idx} className="flex justify-between text-[#a7a7a7]">
                <span>{i.name} x{i.quantity}</span>
                <span className="text-white">₹{i.price * i.quantity}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-white/10 flex justify-between items-baseline font-forum text-base">
            <span>Total:</span>
            <span className="text-xl text-[#E4C590]">₹{orderData.total}</span>
          </div>
        </div>

        {/* Hotline */}
        <div className="mt-4 p-3 bg-[#171819] border border-white/10 flex items-center justify-between text-xs">
          <div>
            <div className="text-white font-medium">{orderData.branch?.name || 'Mahabalipuram'}</div>
            <div className="text-[10px] text-[#a7a7a7]">Hotline: +91 86800 00674</div>
          </div>
          <a
            href="tel:+918680000674"
            className="btn-luxury-outline py-1 px-3 text-[10px]"
          >
            <Phone className="w-3 h-3 text-[#E4C590]" />
            <span>Call</span>
          </a>
        </div>

        <button
          onClick={onClose}
          className="btn-luxury-solid w-full text-xs mt-5"
        >
          Return to Menu
        </button>

      </div>
    </div>
  );
}
