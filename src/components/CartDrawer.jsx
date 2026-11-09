import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MessageSquare, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  selectedBranch,
  serviceMode,
  setServiceMode,
  onOrderSuccess
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const aggregatorSubtotal = cartItems.reduce((acc, item) => acc + item.aggregatorPrice * item.quantity, 0);
  const aggregatorExtraFees = cartItems.length > 0 ? (55 + 10 + (serviceMode === 'delivery' ? 85 : 0)) : 0;
  const totalAggregatorCost = aggregatorSubtotal + aggregatorExtraFees;

  let promoDiscount = 0;
  if (appliedPromo === 'ALYNELABS25') {
    promoDiscount = Math.round(subtotal * 0.10);
  }

  const deliveryFee = serviceMode === 'delivery' ? (subtotal >= 499 ? 0 : 49) : 0;
  const finalTotal = Math.max(0, subtotal - promoDiscount + deliveryFee);
  const totalSavings = Math.max(0, totalAggregatorCost - finalTotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'ALYNELABS25') {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Try ALYNELABS25 for 10% off');
    }
  };

  const generateWhatsAppMessage = () => {
    let text = `🦞 *NEW DIRECT ORDER - ARABIAN GARDEN GROUP*\n`;
    text += `📍 *Branch:* ${selectedBranch?.name || 'Mahabalipuram'}\n`;
    text += `📦 *Mode:* ${serviceMode.toUpperCase()}\n`;
    text += `👤 *Customer:* ${customerName || 'Direct Diner'}\n`;
    text += `📱 *Phone:* ${customerPhone || 'Not provided'}\n`;
    if (serviceMode === 'delivery') {
      text += `🏠 *Address:* ${customerAddress || 'Shared on confirmation'}\n`;
    }
    if (orderNotes) {
      text += `📝 *Notes:* ${orderNotes}\n`;
    }
    text += `\n*ORDER ITEMS:*\n`;
    cartItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name} x${item.quantity} - ₹${item.price * item.quantity}\n`;
    });
    text += `\n💵 *Subtotal:* ₹${subtotal}\n`;
    if (promoDiscount > 0) {
      text += `🎟️ *Promo Discount:* -₹${promoDiscount}\n`;
    }
    text += `🚚 *Delivery:* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}\n`;
    text += `💰 *TOTAL PAYABLE:* ₹${finalTotal}\n`;
    text += `✨ *Saved vs Apps:* ₹${totalSavings}\n\n`;
    text += `Please confirm order receipt. Thank you!`;
    return encodeURIComponent(text);
  };

  const handleWhatsAppCheckout = () => {
    const url = `https://wa.me/918680000674?text=${generateWhatsAppMessage()}`;
    window.open(url, '_blank');
    onOrderSuccess({
      orderId: 'AG-' + Math.floor(100000 + Math.random() * 900000),
      items: cartItems,
      total: finalTotal,
      savings: totalSavings,
      customerName: customerName || 'Diner',
      branch: selectedBranch,
      serviceMode,
      paymentMethod: 'WhatsApp Direct Confirmation'
    });
    onClose();
  };

  const handleOnlineCheckout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess({
        orderId: 'AG-' + Math.floor(100000 + Math.random() * 900000),
        items: cartItems,
        total: finalTotal,
        savings: totalSavings,
        customerName: customerName || 'Diner',
        branch: selectedBranch,
        serviceMode,
        paymentMethod: 'Direct Payment Instant'
      });
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-dmsans">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0d0b] border-l border-white/10 flex flex-col justify-between text-white">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-[#171819] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#E4C590]">Direct Order</div>
              <h3 className="text-lg font-forum text-white">Your Seafood Cart</h3>
            </div>
            <button onClick={onClose} className="text-[#a7a7a7] hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Savings Callout */}
          {cartItems.length > 0 && (
            <div className="p-3 bg-[#171819] border-b border-white/10 text-xs text-center">
              <span className="text-[#E4C590] font-bold">
                🎉 You saved ₹{totalSavings} on delivery commissions today!
              </span>
            </div>
          )}

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xs uppercase tracking-widest text-[#a7a7a7]">Your Cart is Empty</p>
                <button
                  onClick={onClose}
                  className="btn-luxury-outline text-xs mt-4"
                >
                  Explore Seafood Menu
                </button>
              </div>
            ) : (
              <>
                {/* Service Mode */}
                <div className="flex items-center justify-between p-2 bg-[#171819] border border-white/10 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-[#a7a7a7]">Order Type:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setServiceMode('delivery')}
                      className={`px-3 py-1 text-xs uppercase tracking-wider ${
                        serviceMode === 'delivery' ? 'bg-[#E4C590] text-[#0e0d0b] font-bold' : 'text-[#a7a7a7]'
                      }`}
                    >
                      Delivery
                    </button>
                    <button
                      onClick={() => setServiceMode('takeaway')}
                      className={`px-3 py-1 text-xs uppercase tracking-wider ${
                        serviceMode === 'takeaway' ? 'bg-[#E4C590] text-[#0e0d0b] font-bold' : 'text-[#a7a7a7]'
                      }`}
                    >
                      Takeaway
                    </button>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-[#171819] border border-white/10 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-forum text-sm text-white truncate">{item.name}</div>
                        <div className="text-xs text-[#E4C590] font-bold mt-0.5">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>

                      <div className="flex items-center border border-white/20 bg-[#0e0d0b]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-[#a7a7a7] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-[#E4C590]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Details */}
                <div className="p-3.5 bg-[#171819] border border-white/10 space-y-2 text-xs">
                  <div className="text-[10px] uppercase tracking-widest text-[#E4C590]">
                    Diner Details
                  </div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0e0d0b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#E4C590]"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile / WhatsApp Number (+91)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0e0d0b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#E4C590]"
                  />
                  {serviceMode === 'delivery' && (
                    <textarea
                      rows={2}
                      placeholder="Delivery Street Address & Landmark"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-[#0e0d0b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#E4C590]"
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Kitchen instructions (optional)"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#0e0d0b] border border-white/15 text-xs text-white focus:outline-none focus:border-[#E4C590]"
                  />
                </div>

                {/* Promo Code */}
                <div className="p-3 bg-[#171819] border border-white/10 text-xs">
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-[#0e0d0b] border border-white/15 text-xs text-white uppercase focus:outline-none focus:border-[#E4C590]"
                    />
                    <button type="submit" className="btn-luxury-outline py-1 px-3 text-[10px]">
                      Apply
                    </button>
                  </form>
                  {appliedPromo && (
                    <div className="mt-1.5 text-[10px] text-[#E4C590]">
                      Coupon {appliedPromo} applied (-10%)
                    </div>
                  )}
                  {promoError && (
                    <div className="mt-1.5 text-[10px] text-red-400">{promoError}</div>
                  )}
                </div>

                {/* Totals */}
                <div className="p-3.5 bg-[#171819] border border-white/10 space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#a7a7a7]">
                    <span>Subtotal:</span>
                    <span className="text-white">₹{subtotal}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-[#E4C590]">
                      <span>Discount ({appliedPromo}):</span>
                      <span>-₹{promoDiscount}</span>
                    </div>
                  )}
                  {serviceMode === 'delivery' && (
                    <div className="flex justify-between text-[#a7a7a7]">
                      <span>Delivery:</span>
                      <span className="text-white">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-white/10 flex justify-between items-baseline font-forum text-lg">
                    <span>Total:</span>
                    <span className="text-2xl text-[#E4C590]">₹{finalTotal}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Checkout Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-white/10 bg-[#171819] space-y-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="btn-luxury-solid w-full text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Instant WhatsApp Checkout (+91 8680000674)</span>
              </button>

              <button
                onClick={handleOnlineCheckout}
                disabled={isSubmitting}
                className="btn-luxury-outline w-full text-xs"
              >
                <span>{isSubmitting ? 'Processing...' : `Pay Online Direct • ₹${finalTotal}`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
