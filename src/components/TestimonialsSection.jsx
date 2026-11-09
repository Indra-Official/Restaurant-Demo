import React from 'react';

const REVIEWS = [
  {
    name: 'Dr. Vigneshwaran K.',
    branch: 'Adyar Waterfront Hub',
    review: 'The Lobster Thermidor is in a league of its own. Baked to creamy perfection and reserving our table direct saved us nearly ₹800 vs third-party food delivery apps.',
    date: 'Chennai'
  },
  {
    name: 'Ayesha Farooqi',
    branch: 'Nungambakkam Luxury Haven',
    review: 'Finally an authentic Moroccan Fish Tagine in Chennai slow-cooked in a terracotta tagine pot. Fresh, delicate, and instant WhatsApp booking was seamless.',
    date: 'Chennai'
  },
  {
    name: 'Sridhar Ramakrishnan',
    branch: 'Mahabalipuram Coastal Hub',
    review: 'A must-visit stop on our ECR drive. Full Charcoal Fish BBQ with Arabian garlic toum was sensational. You can genuinely taste the morning ocean breeze.',
    date: 'ECR'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#141311] border-b border-white/10 font-dmsans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#E4C590]">
            What People Are Saying
          </div>
          <div className="flex justify-center my-2">
            <img src="/separator.svg" alt="" className="h-2 w-auto opacity-70" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-forum text-white mt-1">
            Loved by Seafood Enthusiasts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#0e0d0b] border border-white/10 flex flex-col justify-between"
            >
              <p className="text-xs text-[#a7a7a7] leading-relaxed italic">
                "{rev.review}"
              </p>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white">{rev.name}</div>
                  <div className="text-[10px] text-[#E4C590] mt-0.5">{rev.branch}</div>
                </div>
                <span className="text-[10px] text-[#a7a7a7]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
