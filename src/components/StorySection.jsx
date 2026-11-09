import React from 'react';

export default function StorySection() {
  return (
    <section id="story" className="py-20 bg-[#0e0d0b] border-b border-white/10 font-dmsans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Images */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              <div className="overflow-hidden border border-white/10">
                <img
                  src="/menu-special.jpg"
                  alt="Arabian Garden Seafood Craft"
                  className="w-full h-96 object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 hidden sm:block w-48 h-48 border border-[#E4C590]/40 overflow-hidden shadow-2xl bg-[#0e0d0b] p-1">
                <img
                  src="/dish-1.jpg"
                  alt="Fish Tagine"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs uppercase tracking-[0.25em] text-[#E4C590]">
              From Our Kitchen to Your Heart
            </div>
            <div className="flex my-1">
              <img src="/separator.svg" alt="" className="h-2 w-auto opacity-70" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-forum text-white leading-tight">
              Unforgettable Seafood Adventures Await
            </h2>

            <p className="text-xs sm:text-sm text-[#a7a7a7] leading-relaxed">
              Arabian Garden Seafood Restaurant takes pride in offering an array of special seafood varieties that cater to diverse tastes and preferences. Our commitment to culinary excellence and innovation ensures that every dish we serve is unique and unforgettable.
            </p>

            <div className="space-y-3 pt-2 text-xs text-[#a7a7a7] leading-relaxed">
              <p>
                Indulge in our exquisite <span className="text-white font-medium">Lobster Thermidor</span>, featuring tender lobster meat baked in a creamy, cheesy sauce with a hint of mustard and delicate seasonings.
              </p>
              <p>
                Experience the aromatic flavors of our <span className="text-white font-medium">Fish Tagine</span>, a traditional Arabian dish slow-cooked with fresh herbs, spices, and vegetables, served in an authentic terracotta tagine pot.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
              <div>
                <div className="text-xl font-forum text-[#E4C590]">Dawn Catch</div>
                <div className="text-[10px] uppercase tracking-wider text-[#a7a7a7] mt-0.5">Fresh Daily</div>
              </div>
              <div>
                <div className="text-xl font-forum text-[#E4C590]">100% Halal</div>
                <div className="text-[10px] uppercase tracking-wider text-[#a7a7a7] mt-0.5">Kitchen Certified</div>
              </div>
              <div>
                <div className="text-xl font-forum text-[#E4C590]">12 Hubs</div>
                <div className="text-[10px] uppercase tracking-wider text-[#a7a7a7] mt-0.5">Tamil Nadu</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
