import React, { useState } from 'react';
import { Plus, Minus, Clock, ShieldCheck } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';

export default function MenuSection({ cartItems, onAddToCart, onUpdateQuantity, onOpenCart }) {
  const [activeCategory, setActiveCategory] = useState('signature');

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-[#0e0d0b] border-b border-white/10 font-dmsans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#E4C590]">
            Fresh Coastal Selections
          </div>
          <div className="flex justify-center my-2">
            <img src="/separator.svg" alt="" className="h-2 w-auto opacity-70" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-forum text-white mt-1">
            Special Varieties at Arabian Garden
          </h2>
          <p className="text-xs sm:text-sm text-[#a7a7a7] mt-3 max-w-xl mx-auto leading-relaxed">
            Our commitment to culinary excellence ensures that every ocean catch and authentic Arabian dish is prepared fresh to order.
          </p>
        </div>

        {/* Minimalist Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex border-b border-white/15 overflow-x-auto max-w-full">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-3 text-xs uppercase tracking-widest font-medium transition-all relative whitespace-nowrap ${
                    isActive
                      ? 'text-[#E4C590] font-bold'
                      : 'text-[#a7a7a7] hover:text-white'
                  }`}
                >
                  {cat.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E4C590]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((dish) => {
            const inCart = cartItems.find((i) => i.id === dish.id);
            const quantity = inCart ? inCart.quantity : 0;
            const savings = dish.aggregatorPrice - dish.price;

            return (
              <div
                key={dish.id}
                className="bg-[#171819] border border-white/10 hover:border-[#E4C590]/40 transition-colors flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden bg-[#121111]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/dish-1.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Direct Savings pill */}
                  <div className="absolute top-3 left-3 bg-[#0e0d0b]/90 border border-white/15 px-2.5 py-1 text-[10px] text-[#E4C590] uppercase tracking-wider">
                    Save ₹{savings} Direct
                  </div>

                  {dish.isHalal && (
                    <div className="absolute top-3 right-3 bg-[#0e0d0b]/90 border border-white/15 px-2 py-0.5 text-[9px] text-[#a7a7a7] uppercase tracking-wider">
                      Halal
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#E4C590]">
                        {dish.tags[0] || 'Signature'}
                      </span>
                      <span className="text-[11px] text-[#a7a7a7]">{dish.portion}</span>
                    </div>

                    <h3 className="text-xl font-forum text-white mt-1 group-hover:text-[#E4C590] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#E4C590]/80 mt-0.5 font-medium">
                      {dish.subtitle}
                    </p>

                    <p className="text-xs text-[#a7a7a7] mt-3 leading-relaxed">
                      {dish.description}
                    </p>

                    {dish.allergens.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-[#a7a7a7]">
                        Allergens: {dish.allergens.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Pricing & Add */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-forum text-[#E4C590]">
                          ₹{dish.price}
                        </span>
                        <span className="text-xs text-[#a7a7a7] line-through">
                          ₹{dish.aggregatorPrice}
                        </span>
                      </div>
                      <span className="text-[9px] uppercase tracking-widest text-[#a7a7a7] block">
                        Fair Direct Price
                      </span>
                    </div>

                    {quantity === 0 ? (
                      <button
                        onClick={() => onAddToCart(dish)}
                        className="btn-luxury-outline py-2 px-4 text-[11px]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="flex items-center border border-[#E4C590] bg-[#0e0d0b]">
                        <button
                          onClick={() => onUpdateQuantity(dish.id, quantity - 1)}
                          className="px-2.5 py-1.5 text-white hover:text-[#E4C590]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#E4C590]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(dish.id, quantity + 1)}
                          className="px-2.5 py-1.5 text-white hover:text-[#E4C590]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
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
