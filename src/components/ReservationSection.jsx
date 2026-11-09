import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, Check, ArrowRight, MessageSquare, X } from 'lucide-react';
import { BRANCHES } from '../data/branches';
import confetti from 'canvas-confetti';

const TIME_SLOTS = [
  '11:30 AM', '12:15 PM', '01:00 PM', '01:45 PM', '02:30 PM',
  '07:00 PM', '07:45 PM', '08:30 PM', '09:15 PM', '10:00 PM', '10:45 PM'
];

const SEATING_PREFERENCES = [
  'Window & Ocean Breeze View',
  'Family AC Lounge',
  'Outdoor Garden Terrace',
  'Private Majlis Dining'
];

export default function ReservationSection({ selectedBranch, onSelectBranch }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [branchId, setBranchId] = useState(selectedBranch?.id || 'mahabalipuram');
  const [bookingDate, setBookingDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('07:45 PM');
  const [guestCount, setGuestCount] = useState(4);
  const [seatingPref, setSeatingPref] = useState('Window & Ocean Breeze View');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const activeBranch = BRANCHES.find((b) => b.id === branchId) || BRANCHES[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guestName || !guestPhone) {
      alert('Please provide your name and mobile number for WhatsApp verification.');
      return;
    }

    const ref = 'AG-RES-' + Math.floor(1000 + Math.random() * 9000);
    const data = {
      ref,
      branch: activeBranch,
      date: bookingDate,
      time: timeSlot,
      guests: guestCount,
      seating: seatingPref,
      name: guestName,
      phone: guestPhone,
      specialRequest
    };
    setBookingData(data);
    setShowModal(true);

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  const handleOpenWhatsApp = () => {
    if (!bookingData) return;
    let text = `👑 *TABLE RESERVATION - ARABIAN GARDEN GROUP*\n\n`;
    text += `🔖 *Booking Ref:* ${bookingData.ref}\n`;
    text += `📍 *Branch:* ${bookingData.branch.name}\n`;
    text += `📅 *Date:* ${bookingData.date}\n`;
    text += `⏰ *Time:* ${bookingData.time}\n`;
    text += `👥 *Guests:* ${bookingData.guests} Diners\n`;
    text += `🪑 *Seating:* ${bookingData.seating}\n`;
    text += `👤 *Diner Name:* ${bookingData.name}\n`;
    text += `📱 *Phone:* ${bookingData.phone}\n`;
    if (bookingData.specialRequest) {
      text += `📝 *Notes:* ${bookingData.specialRequest}\n`;
    }
    text += `\nPlease confirm our table reservation. Thank you!`;

    window.open(`https://wa.me/918680000674?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="reservations" className="py-20 bg-[#0e0d0b] border-b border-white/10 font-dmsans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.25em] text-[#E4C590]">
            Table Booking
          </div>
          <div className="flex justify-center my-2">
            <img src="/separator.svg" alt="" className="h-2 w-auto opacity-70" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-forum text-white mt-1">
            Book a Table Directly
          </h2>
          <p className="text-xs sm:text-sm text-[#a7a7a7] mt-3">
            Operating Daily from 11:00 AM to 11:30 PM across 12 Tamil Nadu locations. Instant WhatsApp verification.
          </p>
        </div>

        {/* Wizard Box */}
        <div className="bg-[#171819] border border-white/10 p-6 sm:p-10">
          
          {/* Step tabs */}
          <div className="grid grid-cols-4 gap-2 mb-8 border-b border-white/10 pb-4 text-center">
            {['1. Location', '2. Time', '3. Guests', '4. Details'].map((step, idx) => (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(idx + 1)}
                className={`py-1 text-xs uppercase tracking-wider transition-colors ${
                  currentStep === idx + 1
                    ? 'text-[#E4C590] border-b border-[#E4C590] font-bold'
                    : 'text-[#a7a7a7] hover:text-white'
                }`}
              >
                {step}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            
            {/* Step 1: Branch */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest text-[#E4C590] mb-2">
                  Select Branch (12 Hubs)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                  {BRANCHES.map((b) => {
                    const isSel = branchId === b.id;
                    return (
                      <div
                        key={b.id}
                        onClick={() => {
                          setBranchId(b.id);
                          onSelectBranch(b);
                        }}
                        className={`p-3 border cursor-pointer transition-colors ${
                          isSel ? 'border-[#E4C590] bg-[#0e0d0b]' : 'border-white/10 bg-[#0e0d0b]/40 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-medium text-white">
                          <span>{b.name}</span>
                          {isSel && <Check className="w-3.5 h-3.5 text-[#E4C590]" />}
                        </div>
                        <div className="text-[10px] text-[#a7a7a7] truncate mt-1">{b.address}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="btn-luxury-solid text-xs py-2 px-5"
                  >
                    Next: Date &amp; Time
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a7a7a7] mb-2">
                    Reservation Date:
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0e0d0b] border border-white/15 text-white text-xs focus:outline-none focus:border-[#E4C590]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a7a7a7] mb-2">
                    Available Seating Slot (11:00 AM – 11:30 PM):
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 text-xs transition-colors border ${
                          timeSlot === slot
                            ? 'bg-[#E4C590] text-[#0e0d0b] border-[#E4C590] font-bold'
                            : 'bg-[#0e0d0b] text-[#a7a7a7] border-white/10 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="btn-luxury-outline text-xs py-2 px-5"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="btn-luxury-solid text-xs py-2 px-5"
                  >
                    Next: Guests
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Guests & Seating */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a7a7a7] mb-2">
                    Number of Guests:
                  </label>
                  <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, '15+'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        className={`py-2 text-xs transition-colors border font-bold ${
                          guestCount === num
                            ? 'bg-[#E4C590] text-[#0e0d0b] border-[#E4C590]'
                            : 'bg-[#0e0d0b] text-[#a7a7a7] border-white/10 hover:text-white'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a7a7a7] mb-2">
                    Atmosphere Preference:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SEATING_PREFERENCES.map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => setSeatingPref(pref)}
                        className={`p-3 text-left text-xs transition-colors border ${
                          seatingPref === pref
                            ? 'border-[#E4C590] bg-[#0e0d0b] text-[#E4C590]'
                            : 'border-white/10 bg-[#0e0d0b] text-[#a7a7a7] hover:text-white'
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="btn-luxury-outline text-xs py-2 px-5"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="btn-luxury-solid text-xs py-2 px-5"
                  >
                    Next: Contact Info
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact & Submit */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a7a7a7] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Guest Name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0e0d0b] border border-white/15 text-white text-xs focus:outline-none focus:border-[#E4C590]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a7a7a7] mb-1">
                    Mobile Number for WhatsApp Confirmation (+91) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 Mobile Number"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0e0d0b] border border-white/15 text-white text-xs focus:outline-none focus:border-[#E4C590]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a7a7a7] mb-1">
                    Special Requests / Dietary Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Birthday dinner, high chair"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full px-4 py-2 bg-[#0e0d0b] border border-white/15 text-white text-xs focus:outline-none focus:border-[#E4C590]"
                  />
                </div>

                {/* Summary */}
                <div className="p-3 bg-[#0e0d0b] border border-white/10 text-xs text-[#a7a7a7] space-y-1">
                  <div className="text-[#E4C590] uppercase tracking-wider text-[10px]">Reservation Summary:</div>
                  <div className="text-white">{activeBranch.name} • {bookingDate} at {timeSlot}</div>
                  <div>{guestCount} Diners • {seatingPref}</div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="btn-luxury-outline text-xs py-2 px-5"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-luxury-solid text-xs py-2 px-6"
                  >
                    View Instant WhatsApp Preview
                  </button>
                </div>
              </div>
            )}

          </form>

        </div>

      </div>

      {/* Instant WhatsApp Confirmation Preview Modal */}
      {showModal && bookingData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0e0d0b] border border-[#E4C590] p-6 text-white font-dmsans shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-[#E4C590] font-bold">
                Table Booking Confirmation
              </span>
              <button onClick={() => setShowModal(false)} className="text-[#a7a7a7] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* WhatsApp Preview Bubble */}
            <div className="my-5 p-4 bg-[#171819] border border-white/10 space-y-2 text-xs">
              <div className="text-[11px] text-[#E4C590] font-bold">
                👑 ARABIAN GARDEN TABLE RESERVATION
              </div>
              <div className="text-[#a7a7a7]">
                Dear <span className="text-white font-semibold">{bookingData.name}</span>, your table request has been registered:
              </div>
              <div className="p-2.5 bg-[#0e0d0b] space-y-1 text-[11px] font-mono border border-white/5">
                <div>Ref: <span className="text-[#E4C590]">{bookingData.ref}</span></div>
                <div>Branch: {bookingData.branch.name}</div>
                <div>Date: {bookingData.date}</div>
                <div>Slot: {bookingData.time}</div>
                <div>Guests: {bookingData.guests} diners</div>
                <div>Seating: {bookingData.seating}</div>
              </div>
              <div className="text-[10px] text-[#E4C590]">
                ✓ 100% Commission-free direct dining reservation
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleOpenWhatsApp}
                className="btn-luxury-solid w-full text-center"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm via WhatsApp (+91 8680000674)</span>
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2 text-xs text-[#a7a7a7] hover:text-white uppercase tracking-wider"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
