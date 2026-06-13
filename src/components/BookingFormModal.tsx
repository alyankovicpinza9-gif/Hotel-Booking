/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, ClipboardCheck, Info, Sparkles, ShieldCheck, Mail, Phone, User, Users, Bed, Maximize2, CreditCard, Wallet, Fingerprint, Copy, Check, TicketPercent } from 'lucide-react';
import { Hotel, RoomType, Reservation, SearchCriteria } from '../types';

interface BookingFormModalProps {
  hotel: Hotel;
  room: RoomType;
  search: SearchCriteria;
  onClose: () => void;
  onSubmitBooking: (reservation: Omit<Reservation, 'id' | 'bookingDate' | 'status'>) => void;
}

export default function BookingFormModal({
  hotel,
  room,
  search,
  onClose,
  onSubmitBooking
}: BookingFormModalProps) {
  // 1. Fully interactive inputs (overriding initial search criteria)
  const [selectedRoomId, setSelectedRoomId] = useState<string>(room.id);
  const [checkIn, setCheckIn] = useState<string>(search.checkIn || '2026-06-13');
  const [checkOut, setCheckOut] = useState<string>(search.checkOut || '2026-06-16');
  const [guestsCount, setGuestsCount] = useState<number>(search.guests || 2);

  // 2. Client contact details state
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // 3. Optional luxury upgrades
  const [addOnBreakfast, setAddOnBreakfast] = useState(false);
  const [addOnShuttle, setAddOnShuttle] = useState(false);

  // 3.1 Payment details and visual states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'paypal' | 'crypto'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cryptoAcknowledged, setCryptoAcknowledged] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  // 3.2 Dynamic Coupon promotion states
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPercent, setAppliedPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // 4. Form Validation notifications
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derive active selected room type object
  const currentRoom = hotel.rooms.find(r => r.id === selectedRoomId) || room;

  // Real-time rates calculations
  const roomPriceUnit = Math.round(hotel.basePrice * currentRoom.priceMultiplier);
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  let totalNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
  if (isNaN(totalNights) || totalNights <= 0) {
    totalNights = 1; // Fallback default
  }

  const baseRatesLodging = roomPriceUnit * totalNights;
  const breakfastTotalFee = addOnBreakfast ? (25 * totalNights * guestsCount) : 0;
  const shuttleFlatCharge = addOnShuttle ? 45 : 0;
  
  const subtotalCost = baseRatesLodging + breakfastTotalFee + shuttleFlatCharge;
  
  // Apply coupon rate
  const discountSum = Math.round(subtotalCost * (appliedPercent / 100));
  const subtotalAfterCoupon = subtotalCost - discountSum;
  
  const localTaxCalculated = Math.round(subtotalAfterCoupon * 0.12); // 12% luxury custom eco-tax
  const grandTotalCost = subtotalAfterCoupon + localTaxCalculated;

  const handleApplyPremiumCode = (code: string) => {
    const c = code.trim().toUpperCase();
    if (c === 'AVENTINE20') {
      setAppliedPercent(20);
      setPromoMessage('AVENTINE20 code successfully applied: 20% off total stay packages!');
    } else if (c === 'LUXESCAPE') {
      setAppliedPercent(15);
      setPromoMessage('LUXESCAPE code successfully applied: 15% off suite villas!');
    } else if (c === 'SOJOURN') {
      setAppliedPercent(10);
      setPromoMessage('SOJOURN code successfully applied: 10% off duration stay!');
    } else {
      setAppliedPercent(0);
      setPromoMessage('Promo code could not be verified. Please check inputs.');
    }
  };

  const handleCopyWalletAddress = () => {
    navigator.clipboard.writeText('0xAVENT1NEf7a3ce4e881822d79e55b4c100777');
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];
    
    // Validate Dates
    if (!checkIn) {
      errors.push('Check-in date is required');
    }
    if (!checkOut) {
      errors.push('Check-out date is required');
    }
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) {
        errors.push('Please enter valid dates');
      } else if (outDate <= inDate) {
        errors.push('Check-out date must be at least one full day after the check-in date');
      }
    }

    // Validate occupancy limits
    if (guestsCount <= 0) {
      errors.push('Number of guests must be at least 1');
    } else if (guestsCount > currentRoom.capacity) {
      errors.push(`The selected room "${currentRoom.name}" has a maximum capacity of ${currentRoom.capacity} guests. Please reduce the number of guests or upgrade to a larger Suite above!`);
    }

    // Validate Customer Credentials
    if (!guestName.trim()) {
      errors.push('Please enter customer full name');
    }
    if (!guestEmail.trim()) {
      errors.push('Please enter email address for receipt details');
    } else if (!/\S+@\S+\.\S+/.test(guestEmail)) {
      errors.push('Please enter a valid email address');
    }
    if (!guestPhone.trim()) {
      errors.push('Please enter a contact mobile phone number');
    }

    // Validate Payment Choices
    if (paymentMethod === 'card') {
      const sanitizedNum = cardNumber.replace(/\s/g, '');
      if (!sanitizedNum || sanitizedNum.length < 12) {
        errors.push('Please enter a valid Credit Card Number (12-16 digits)');
      }
      if (!cardHolder.trim()) {
        errors.push('Please enter the Cardholder name matching official passport/ID');
      }
      if (!cardExpiry.trim() || !cardExpiry.includes('/')) {
        errors.push('Please enter expiration dates styled as MM/YY');
      }
      if (!cardCvv.trim() || cardCvv.length < 3) {
        errors.push('Please enter a valid 3-4 digit Security CVV Code');
      }
    } else if (paymentMethod === 'crypto') {
      if (!cryptoAcknowledged) {
        errors.push('You must acknowledge that cryptocurrency transfers are final and verified manually prior to receipt release');
      }
    }

    if (errors.length > 0) {
      setFormErrors(errors);
      // Scroll to error block location
      const container = document.getElementById('checkout-panel');
      if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    setFormErrors([]);
    setIsSubmitting(true);

    // Simulate high-end reservation processing latency
    setTimeout(() => {
      onSubmitBooking({
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelCity: hotel.city,
        hotelCountry: hotel.country,
        hotelImageUrl: hotel.imageUrl,
        roomId: currentRoom.id,
        roomName: currentRoom.name,
        checkIn,
        checkOut,
        guests: guestsCount,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
        addOnBreakfast,
        addOnShuttle,
        totalNights,
        totalPrice: grandTotalCost
      });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-neutral-950/80 p-4 backdrop-blur-xs"
      id="booking-checkout-modal"
    >
      {/* Absolute Backdrop Close Trigger */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Checkout Panel Structure */}
      <div 
        className="relative z-10 flex h-full max-h-[92vh] w-full max-w-4xl flex-col rounded-xs bg-neutral-950 border border-white/15 shadow-2xl overflow-hidden animate-fade-in"
        id="checkout-panel"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <ClipboardCheck className="h-5.5 w-5.5 text-accent-amber" />
            <div>
              <h3 className="font-display text-lg font-bold text-white italic">
                Secure Stay Reservation
              </h3>
              <p className="text-[10px] font-bold text-accent-amber uppercase tracking-[0.2em] leading-none mt-1">
                Luxury Resort: {hotel.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xs bg-white/5 border border-white/10 p-2 text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Scrollable multi-layout layout */}
        <form onSubmit={handleConfirmReservation} className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 bg-neutral-950 text-white">
          
          {/* LEFT COLUMN: Customizable parameters, credentials inputs */}
          <div className="md:col-span-7 p-6 space-y-6 border-b border-white/10 md:border-b-0 md:border-r border-white/10">
            
            {/* Header description */}
            <div>
              <h4 className="font-display text-xl font-bold text-white italic">
                Configure Premium Parameters
              </h4>
              <p className="text-xs text-stone-400 font-medium mt-1">
                AventineStay lets you customize, review quotes, and provide contact details immediately.
              </p>
            </div>

            {/* Live Error Warnings */}
            {formErrors.length > 0 && (
              <div className="rounded-xs bg-red-950/80 border border-red-900 p-4 text-xs font-semibold text-red-100 space-y-1 animate-fade-in">
                <p className="font-bold flex items-center gap-1.5 text-red-200">
                  <span>Booking details validation issues:</span>
                </p>
                <ul className="list-disc pl-4 space-y-0.5 font-light">
                  {formErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* SECTOR A: Stay Customize & Room Type Selection */}
            <div className="rounded-xs bg-neutral-900/50 border border-white/5 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                <Calendar className="h-4.5 w-4.5 text-accent-amber" />
                <h5 className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-white">
                  1. Real-time stay selection
                </h5>
              </div>

              {/* Room Type dropdown */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-amber mb-1.5">
                  Room Type / Chamber Selection
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => {
                    setSelectedRoomId(e.target.value);
                    setFormErrors([]);
                  }}
                  className="w-full rounded-xs border border-white/10 bg-neutral-950 py-3 px-4 text-xs font-semibold text-white focus:border-accent-amber focus:outline-hidden cursor-pointer"
                >
                  {hotel.rooms.map((r) => {
                    const price = Math.round(hotel.basePrice * r.priceMultiplier);
                    return (
                      <option key={r.id} value={r.id} className="bg-neutral-950 text-white text-xs">
                        {r.name} — ${price}/night (Max cap: {r.capacity} Guests)
                      </option>
                    );
                  })}
                </select>
                <p className="text-[9px] text-stone-500 font-mono mt-1">
                  Selected Chamber Specs: {currentRoom.bedType} • {currentRoom.size}
                </p>
              </div>

              {/* Checkin / Checkout / Guests inputs */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1.5">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      setFormErrors([]);
                    }}
                    className="w-full rounded-xs border border-white/10 bg-neutral-950 py-2.5 px-3 text-xs font-semibold text-white focus:border-accent-amber focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1.5">
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => {
                      setCheckOut(e.target.value);
                      setFormErrors([]);
                    }}
                    className="w-full rounded-xs border border-white/10 bg-neutral-950 py-2.5 px-3 text-xs font-semibold text-white focus:border-accent-amber focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1.5">
                    No. of Guests
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={10}
                    value={guestsCount}
                    onChange={(e) => {
                      setGuestsCount(Math.max(1, Number(e.target.value)));
                      setFormErrors([]);
                    }}
                    className="w-full rounded-xs border border-white/10 bg-neutral-950 py-2.5 px-3 text-xs font-semibold text-white focus:border-accent-amber focus:outline-hidden"
                  />
                  <p className="text-[9px] text-stone-500 font-medium text-right mt-1">Room capacity: {currentRoom.capacity}</p>
                </div>
              </div>
            </div>

            {/* SECTOR B: Guest Contact Info */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                <User className="h-4.5 w-4.5 text-accent-amber" />
                <h5 className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-white">
                  2. Lead Customer Credentials
                </h5>
              </div>

              {/* Name */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-amber mb-1.5">
                  Lead Customer Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="E.g. Lord Charles Windsor"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full rounded-xs border border-white/15 bg-neutral-900 py-3 pl-10 pr-4 text-xs font-semibold text-white placeholder-stone-500 transition-colors focus:border-accent-amber focus:bg-stone-900/40 focus:outline-hidden"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent-amber font-bold text-lg leading-none">•</span>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-amber mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="e.g. customer@palace.co.uk"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full rounded-xs border border-white/15 bg-neutral-900 py-3 pl-10 pr-4 text-xs font-semibold text-white placeholder-stone-500 transition-colors focus:border-accent-amber focus:bg-stone-900/40 focus:outline-hidden"
                    />
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent-amber font-bold text-lg leading-none">•</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-amber mb-1.5">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +44 7911 886633"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full rounded-xs border border-white/15 bg-neutral-900 py-3 pl-10 pr-4 text-xs font-semibold text-white placeholder-stone-500 transition-colors focus:border-accent-amber focus:bg-stone-900/40 focus:outline-hidden"
                    />
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-accent-amber font-bold text-lg leading-none">•</span>
                  </div>
                </div>
              </div>

              {/* Special Requests textarea */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1.5">
                  Special Request Box (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Requests like 'near elevator', 'gluten-free breakfast', 'late-check-in arrangements', 'champagne bucket setup' etc."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full rounded-xs border border-white/15 bg-neutral-900 py-3 px-4 text-xs font-medium text-white placeholder-stone-600 transition-colors focus:border-accent-amber focus:bg-stone-900/40 focus:outline-hidden resize-none"
                />
              </div>
            </div>

            {/* SECTOR C: Concierge Options */}
            <div className="border-t border-white/10 pt-5 space-y-4">
              <div>
                <h5 className="font-display text-base font-bold text-white flex items-center gap-1.5 italic">
                  <Sparkles className="h-4 w-4 text-accent-amber" /> Custom Hospitality Upgrades
                </h5>
                <p className="text-[11px] text-stone-400 font-medium">
                  Add optional perks that are fully refundable prior to check-in.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {/* Breakfast Choice */}
                <label 
                  className={`flex cursor-pointer items-start gap-3 rounded-xs border p-3 md:p-3.5 transition-all select-none ${
                    addOnBreakfast 
                      ? 'border-accent-amber bg-white/5' 
                      : 'border-white/15 bg-neutral-900/40 hover:border-white/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={addOnBreakfast}
                    onChange={(e) => setAddOnBreakfast(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded-xs accent-neutral-950 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="block text-xs font-bold text-white uppercase tracking-wider">Artisan Breakfast</span>
                    <span className="block text-[10px] text-stone-400 font-medium mt-1 leading-normal">
                      Warm pastries, local organic eggs, cold presses. Just <strong className="text-white font-bold">$25/day per guest</strong>.
                    </span>
                  </div>
                </label>

                {/* Shuttle Service */}
                <label 
                  className={`flex cursor-pointer items-start gap-3 rounded-xs border p-3 md:p-3.5 transition-all select-none ${
                    addOnShuttle 
                      ? 'border-accent-amber bg-white/5' 
                      : 'border-white/15 bg-neutral-900/40 hover:border-white/30'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={addOnShuttle}
                    onChange={(e) => setAddOnShuttle(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded-xs accent-neutral-950 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <span className="block text-xs font-bold text-white uppercase tracking-wider">Tesla Shuttle Transport</span>
                    <span className="block text-[10px] text-stone-400 font-medium mt-1 leading-normal">
                      Private high-speed airport chauffeur transfer welcome path. <strong className="text-white font-bold">$45 total rate</strong>.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* SECTOR D: Instant Secure Payment Gateway Selector */}
            <div className="border-t border-white/10 pt-5 space-y-4">
              <div>
                <h5 className="font-display text-base font-bold text-white flex items-center gap-1.5 italic">
                  <CreditCard className="h-4.5 w-4.5 text-accent-amber" /> 3. Secure Premium Payment Portal
                </h5>
                <p className="text-[11px] text-stone-400 font-medium">
                  We verify payments using elite direct encryption protocol. Select your pathway:
                </p>
              </div>

              {/* Payment selector tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'card', label: 'Credit Card', icon: CreditCard },
                  { id: 'applepay', label: 'Apple Pay', icon: Fingerprint },
                  { id: 'paypal', label: 'PayPal Secure', icon: ClipboardCheck },
                  { id: 'crypto', label: 'Crypto Ledger', icon: Wallet }
                ].map((item) => {
                  const isActive = paymentMethod === item.id;
                  const IconComp = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-black font-extrabold shadow-sm'
                          : 'border border-white/10 bg-stone-900/40 text-stone-300 hover:border-white/20'
                      }`}
                    >
                      <IconComp className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic conditional payment fields and mockup renderings */}
              <div className="mt-4 rounded-xs border border-white/5 bg-neutral-900/30 p-4 space-y-4">
                {paymentMethod === 'card' && (
                  <div className="space-y-4 animate-fade-in">
                    
                    {/* Glowing Credit Card Visual Mockup Preview */}
                    <div className="relative overflow-hidden w-full h-40 rounded-xl bg-gradient-to-br from-stone-800 via-stone-900 to-neutral-950 border border-white/10 p-5 flex flex-col justify-between text-white shadow-xl">
                      {/* Gold Chip Design */}
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col">
                          <span className="font-serif italic text-sm font-bold text-accent-amber">Aventine Sovereign</span>
                          <span className="text-[7px] uppercase tracking-[0.3em] text-white/55">Membership Card</span>
                        </div>
                        <div className="h-7 w-9 rounded-sm bg-gradient-to-br from-yellow-500/80 to-yellow-300/40 border border-yellow-250/25 flex flex-col justify-center items-center">
                          <div className="w-5 h-4 border border-black/10 rounded-xs" />
                        </div>
                      </div>

                      {/* Card Number display with masks */}
                      <p className="font-mono text-sm tracking-wider text-stone-200">
                        {cardNumber ? cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                      </p>

                      <div className="flex items-end justify-between font-mono text-[9px] uppercase">
                        <div>
                          <span className="block text-[6px] text-stone-500">Cardholder</span>
                          <span className="block tracking-widest text-stone-200 truncate max-w-[140px]">{cardHolder || 'LORD GUEST TRAVELER'}</span>
                        </div>
                        <div className="flex gap-4">
                          <div>
                            <span className="block text-[6px] text-stone-500">Expires</span>
                            <span className="block text-stone-200">{cardExpiry || 'MM/YY'}</span>
                          </div>
                          <div>
                            <span className="block text-[6px] text-stone-500">CVV</span>
                            <span className="block text-accent-amber">{cardCvv ? '•••' : '***'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inputs panel */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4111 2222 3333 4444"
                          value={cardNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setCardNumber(val);
                          }}
                          className="w-full rounded-xs border border-white/10 bg-neutral-950 py-2 px-3 text-xs font-semibold focus:border-accent-amber focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="Lord Guest Traveler"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          className="w-full rounded-xs border border-white/10 bg-neutral-950 py-2 px-3 text-xs font-semibold focus:border-accent-amber focus:outline-hidden"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full rounded-xs border border-white/10 bg-neutral-950 py-2 px-3 text-xs font-semibold text-center focus:border-accent-amber focus:outline-hidden"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400 mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            placeholder="***"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            className="w-full rounded-xs border border-white/10 bg-neutral-950 py-2 px-3 text-xs font-semibold text-center focus:border-accent-amber focus:outline-hidden"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {paymentMethod === 'applepay' && (
                  <div className="text-center py-4 space-y-3 animate-fade-in">
                    <div className="mx-auto h-12 w-12 rounded-full border border-white/15 bg-stone-900 flex items-center justify-center text-accent-amber shadow-inner">
                      <Fingerprint className="h-6 w-6 text-accent-amber animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-white">Apple Cash & Touch ID Validation</p>
                      <p className="text-[10px] text-stone-400">Rest your finger on the device Touch ID or use Face ID to authenticate secure checkout.</p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="text-center py-4 space-y-3 animate-fade-in">
                    <div className="mx-auto h-12 w-12 rounded-full border border-white/15 bg-neutral-900 flex items-center justify-center text-amber-500">
                      <ClipboardCheck className="h-6 w-6 text-amber-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-white">PayPal Wallet Authorized</p>
                      <p className="text-[10px] text-stone-400">We will open a brief secure gateway to capture confirmation during final confirmation step.</p>
                    </div>
                  </div>
                )}

                {paymentMethod === 'crypto' && (
                  <div className="space-y-3 animate-fade-in text-xs font-medium">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold flex items-center gap-1.5 text-white">
                        <Wallet className="h-4 w-4 text-accent-amber" /> Aventine Escrow Wallet:
                      </p>
                      {copyStatus && (
                        <span className="text-[9px] text-emerald-500 font-mono animate-fade-in">✓ Address Copied!</span>
                      )}
                    </div>
                    
                    <div className="flex gap-2 items-center bg-neutral-950 p-2.5 rounded-xs border border-white/10">
                      <span className="font-mono text-[9px] text-stone-400 truncate flex-1 leading-none select-all select-none">
                        0xAVENT1NEf7a3ce4e881822d79e55b4c100777
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyWalletAddress}
                        className="p-1 rounded-md bg-stone-900 border border-white/10 text-stone-300 hover:text-white cursor-pointer"
                        title="Copy cryptographic wallet address"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <label className="flex gap-2 items-start cursor-pointer select-none mt-2">
                      <input
                        type="checkbox"
                        checked={cryptoAcknowledged}
                        onChange={(e) => setCryptoAcknowledged(e.target.checked)}
                        className="mt-0.5 h-3.5 w-3.5 rounded-xs accent-neutral-950 cursor-pointer"
                      />
                      <span className="text-[10px] text-stone-405 font-semibold leading-normal">
                        I pledge cryptocurrency escrow transfers are final and verified prior to boarding pass clearance.
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Invoice Breakdown & Dynamic Billing Summary */}
          <div className="md:col-span-5 bg-neutral-900/40 p-6 flex flex-col justify-between" id="checkout-summary">
            
            <div className="space-y-5">
              <div>
                <h4 className="font-display text-xl font-bold text-white italic">
                  Booking Summary
                </h4>
                <p className="text-xs text-stone-400 font-medium mt-1">Real-time quote snapshot</p>
              </div>

              {/* Hotel mini display card */}
              <div className="flex gap-3 rounded-xs border border-white/10 bg-neutral-950 p-3 shadow-md">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="aspect-square w-12 rounded-xs object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-display text-xs font-bold text-white truncate">{hotel.name}</h5>
                  <p className="text-[10px] text-stone-500 font-semibold">{hotel.city}, {hotel.country}</p>
                  <span className="inline-block mt-1 bg-white/10 rounded-xs px-2 py-0.5 text-[9px] font-bold text-stone-300 uppercase tracking-widest border border-white/5 truncate max-w-full">
                    {currentRoom.name}
                  </span>
                </div>
              </div>

              {/* Dynamic properties listings */}
              <div className="rounded-xs border border-white/10 bg-neutral-950 p-3.5 space-y-2.5 text-xs font-medium">
                <div className="flex justify-between items-center text-stone-400">
                  <span className="flex items-center gap-1.5">Check In</span>
                  <span className="text-white font-semibold font-mono">{checkIn || 'Not specified'}</span>
                </div>
                <div className="flex justify-between items-center text-stone-400">
                  <span className="flex items-center gap-1.5">Check Out</span>
                  <span className="text-white font-semibold font-mono">{checkOut || 'Not specified'}</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-2.5 text-stone-400">
                  <span>Number of Guests</span>
                  <span className="text-white font-bold">{guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}</span>
                </div>
                <div className="flex justify-between items-center text-stone-400">
                  <span>Stay Duration</span>
                  <span className="text-accent-amber font-bold">{totalNights} {totalNights === 1 ? 'Night' : 'Nights'}</span>
                </div>
              </div>

              {/* Promo Code Coupon Selector */}
              <div className="rounded-xs border border-white/10 bg-neutral-950 p-3.5 space-y-2.5">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-amber">
                  Applied Corporate Coupon Vouchers
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. LUXESCAPE)"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                    className="flex-1 rounded-xs border border-white/10 bg-neutral-900 py-1.5 px-3 text-xs font-mono font-semibold text-white uppercase placeholder-stone-605 focus:border-accent-amber focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyPremiumCode(promoCodeInput)}
                    className="rounded-xs bg-white text-black px-3.5 py-1.5 text-[10px] uppercase font-bold tracking-wider hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {/* Clickable quick presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { code: 'AVENTINE20', label: 'Launch 20%' },
                    { code: 'LUXESCAPE', label: 'Villa 15%' },
                    { code: 'SOJOURN', label: 'Sojourn 10%' }
                  ].map((voucher) => (
                    <button
                      key={voucher.code}
                      type="button"
                      onClick={() => {
                        setPromoCodeInput(voucher.code);
                        handleApplyPremiumCode(voucher.code);
                      }}
                      className={`px-2 py-0.5 rounded-xs text-[9px] font-bold transition-all cursor-pointer ${
                        appliedPercent > 0 && promoCodeInput === voucher.code
                          ? 'bg-accent-amber text-neutral-950'
                          : 'bg-stone-900 border border-white/5 text-stone-400 hover:text-white'
                      }`}
                    >
                      {voucher.label}
                    </button>
                  ))}
                </div>

                {promoMessage && (
                  <p className={`text-[10px] font-medium leading-normal animate-fade-in ${appliedPercent > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {promoMessage}
                  </p>
                )}
              </div>

              {/* Itemized invoice display */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-accent-amber font-sans">
                  Billing Breakdown
                </p>
                
                <div className="flex justify-between text-xs font-medium text-stone-400">
                  <span>Chamber Stays ({totalNights} nights × ${roomPriceUnit})</span>
                  <span className="text-white">${baseRatesLodging}</span>
                </div>

                {addOnBreakfast && (
                  <div className="flex justify-between text-xs font-medium text-stone-400 animate-fade-in">
                    <span>Artisan Breakfast ({totalNights} × {guestsCount} × $25)</span>
                    <span className="text-white">${breakfastTotalFee}</span>
                  </div>
                )}

                {addOnShuttle && (
                  <div className="flex justify-between text-xs font-medium text-stone-400 animate-fade-in">
                    <span>Tesla Chauffeur Transfer (Flat rate)</span>
                    <span className="text-white">${shuttleFlatCharge}</span>
                  </div>
                )}

                {appliedPercent > 0 && (
                  <div className="flex justify-between text-xs font-bold text-emerald-400 animate-fade-in">
                    <span className="flex items-center gap-1">
                      <TicketPercent className="h-3.5 w-3.5" /> Promotion applied ({appliedPercent}%)
                    </span>
                    <span>-${discountSum}</span>
                  </div>
                )}

                <div className="flex justify-between text-xs font-medium text-stone-400">
                  <span>Local Luxury & Eco-Tax (12%)</span>
                  <span className="text-white">${localTaxCalculated}</span>
                </div>

                {/* Grand Total Cost calculations */}
                <div className="flex justify-between border-t border-white/15 pt-4">
                  <div>
                    <span className="block font-display text-sm font-bold text-white leading-none">Total Price</span>
                    <span className="text-[9px] text-stone-500 font-bold tracking-[0.15em] uppercase block mt-1.5">
                      All taxes included
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-display text-2xl font-extrabold text-white leading-none">
                      ${grandTotalCost}
                    </span>
                    <span className="text-[10px] text-stone-400 font-bold block mt-1">USD</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Form Confirmation & Actions buttons */}
            <div className="mt-8 space-y-3.5">
              <button
                type="submit"
                id="btn-confirm-checkout"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xs bg-white py-3.5 font-display font-bold text-neutral-950 uppercase tracking-widest text-[11px] hover:bg-stone-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-950 border-t-transparent" />
                    <span>Verifying Stay & Securing ticket...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4.5 w-4.5 text-neutral-950" />
                    <span>Confirm & Generate Booking Ticket</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5 justify-center text-[10px] text-stone-500 font-medium">
                <Info className="h-3 w-3" />
                <span>24-hour hassle-free cancel rules certified climate-neutral.</span>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
