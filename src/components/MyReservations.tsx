/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Compass, HelpCircle, AlertTriangle, Printer, CalendarRange, Trash2, MapPin, Search } from 'lucide-react';
import { Reservation } from '../types';

interface MyReservationsProps {
  reservations: Reservation[];
  onCancelReservation: (id: string) => void;
  onExploreClick: () => void;
}

export default function MyReservations({
  reservations,
  onCancelReservation,
  onExploreClick
}: MyReservationsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);
  const [viewInvoiceRes, setViewInvoiceRes] = useState<Reservation | null>(null);

  // Filter reservations based on search term (hotel name, guest name, city, reference code)
  const filteredReservations = reservations.filter(res => {
    const searchString = searchTerm.toLowerCase();
    return (
      res.hotelName.toLowerCase().includes(searchString) ||
      res.guestName.toLowerCase().includes(searchString) ||
      res.hotelCity.toLowerCase().includes(searchString) ||
      res.id.toLowerCase().includes(searchString)
    );
  });

  const handlePrint = (res: Reservation) => {
    setViewInvoiceRes(res);
  };

  return (
    <div className="space-y-6" id="my-bookings-panel">
      
      {/* Search Header Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white italic">
            Adventure Itinerary
          </h2>
          <p className="text-xs text-stone-400 font-medium mt-1">
            Manage your upcoming stays, access check-in credentials, and review booked configurations.
          </p>
        </div>

        {/* Local Booking Filter Input */}
        {reservations.length > 0 && (
          <div className="relative w-full sm:w-72" id="bookings-search">
            <input
              type="text"
              placeholder="Filter by Name, City or Ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xs border border-white/15 bg-neutral-900 py-2.5 pl-9.5 pr-4 text-xs font-semibold text-white placeholder-stone-500 transition-colors focus:border-accent-amber focus:outline-hidden"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent-amber" />
          </div>
        )}
      </div>

      {/* 1. EMPTY REHABILITATION STATE */}
      {reservations.length === 0 ? (
        <div 
          className="flex flex-col items-center justify-center text-center rounded-xs border border-dashed border-white/15 bg-neutral-900/30 p-12 sm:p-16 animate-fade-in"
          id="empty-bookings-box"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xs bg-white/5 border border-white/10 text-accent-amber mb-4">
            <CalendarRange className="h-6 w-6 text-accent-amber" />
          </div>
          <h3 className="font-display text-lg font-bold text-white italic">
            No Active Bookings Detected
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-stone-400 font-light">
            Your travel itinerary is currently clear. Discover our handpicked luxury collection of hotels around the globe and design your next sanctuary visit.
          </p>
          <button
            id="empty-explore-btn"
            onClick={onExploreClick}
            className="mt-6 flex items-center gap-2 rounded-xs bg-white px-5.5 py-3 text-[10px] uppercase tracking-wider font-bold text-neutral-950 hover:bg-stone-200 transition-colors"
          >
            <Compass className="h-4 w-4" />
            <span>Browse Selection list</span>
          </button>
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="rounded-xs border border-white/15 bg-neutral-900/40 p-10 text-center animate-fade-in">
          <p className="text-sm font-light text-stone-400">
            No reservations match your filter query "<span className="font-semibold text-white">{searchTerm}</span>".
          </p>
          <button 
            onClick={() => setSearchTerm('')} 
            className="mt-3 text-xs font-bold text-accent-amber hover:underline"
          >
            Reset query
          </button>
        </div>
      ) : (
        /* 2. TICKETS STACK LIST */
        <div className="space-y-6" id="tickets-list">
          {filteredReservations.map((res) => {
            const isConfirmed = res.status === 'confirmed';

            return (
              <div
                key={res.id}
                className={`relative flex flex-col overflow-hidden rounded-xs border transition-all md:flex-row shadow-md bg-neutral-950/40 ${
                  isConfirmed 
                    ? 'border-white/10 hover:border-white/20' 
                    : 'border-red-950 bg-neutral-900/20 opacity-70'
                }`}
                id={`reservation-card-${res.id}`}
              >
                
                {/* Visual Status Indicator Belt */}
                <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${isConfirmed ? 'bg-accent-amber' : 'bg-red-800'}`} />

                {/* Left (Main Pass Segment) */}
                <div className="flex-1 p-5 sm:p-6" id="pass-main-body">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-accent-amber">
                        AventineStay Priority Boarding Pass
                      </span>
                      <h4 className="font-display text-xl font-bold tracking-tight text-white mt-1 italic">
                        {res.hotelName}
                      </h4>
                      <p className="text-xs text-stone-400 font-medium flex items-center gap-1.5 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-accent-amber" />
                        <span>{res.hotelCity}, {res.hotelCountry}</span>
                      </p>
                    </div>

                    {/* Status badges */}
                    <div>
                      {isConfirmed ? (
                        <span className="inline-flex items-center gap-1.5 rounded-xs bg-stone-900 border border-white/15 px-3 py-1 text-[10px] font-bold text-accent-amber tracking-wider">
                          <span className="h-2 w-2 rounded-full bg-accent-amber animate-pulse" />
                          <span>CONFIRMED ITINERARY</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-xs bg-red-950/60 border border-red-900 px-3 py-1 text-[10px] font-bold text-red-400 tracking-wider">
                          <span className="h-2 w-2 rounded-full bg-red-600" />
                          <span>CANCELLED</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Staying parameters specification grids */}
                  <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-6 sm:grid-cols-4 border-t border-b border-white/10 py-5 text-xs text-stone-300 font-medium" id="pass-metadata-grid">
                    <div>
                      <span className="block text-[9px] uppercase font-bold tracking-[0.15em] text-stone-500 font-sans">Lead Traveler</span>
                      <span className="block mt-1 text-sm font-bold text-white truncate">{res.guestName}</span>
                    </div>

                    <div>
                      <span className="block text-[9px] uppercase font-bold tracking-[0.15em] text-stone-500 font-sans">Chamber Configuration</span>
                      <span className="block mt-1 text-sm font-bold text-white truncate">{res.roomName}</span>
                    </div>

                    <div>
                      <span className="block text-[9px] uppercase font-bold tracking-[0.15em] text-stone-500 font-sans">Staying Duration</span>
                      <span className="block mt-1 text-sm font-bold text-white font-mono">
                        {res.checkIn} <strong className="text-accent-amber mx-1">→</strong> {res.checkOut}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[9px] uppercase font-bold tracking-[0.15em] text-stone-500 font-sans">Party Volume</span>
                      <span className="block mt-1 text-sm font-bold text-white">
                        {res.guests} {res.guests === 1 ? 'Person' : 'People'} ({res.totalNights} nights)
                      </span>
                    </div>
                  </div>

                  {/* Add-on inclusions & invoice sum row */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-xs bg-neutral-900 border border-white/10 text-stone-300 px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold">
                        Ref Code: {res.id}
                      </span>
                      {res.addOnBreakfast && (
                        <span className="rounded-xs bg-neutral-900 border border-white/10 text-accent-amber px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold font-sans">
                          🍳 Free Breakfast inclusion
                        </span>
                      )}
                      {res.addOnShuttle && (
                        <span className="rounded-xs bg-neutral-900 border border-white/10 text-accent-amber px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold font-sans">
                          🚗 Private Shuttle booked
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-stone-400 font-medium">Total price charged:</span>
                      <strong className="text-lg font-serif font-extrabold text-white">${res.totalPrice} USD</strong>
                    </div>
                  </div>
                </div>

                {/* Right Tear-off pass stub border layout separator */}
                <div className="hidden relative md:flex flex-col items-center justify-between py-5 bg-neutral-900/40 border-l border-dashed border-white/15 px-6 w-52 shrink-0 select-none text-center" id="ticket-stub-tear">
                  
                  {/* Decorative notch cutouts */}
                  <div className="absolute top-0 left-0 -mt-2 -ml-2 h-4 w-4 bg-neutral-950 border border-white/10 rounded-full" />
                  <div className="absolute bottom-0 left-0 -mb-2 -ml-2 h-4 w-4 bg-neutral-950 border border-white/10 rounded-full" />

                  {/* Stub header */}
                  <div className="w-full">
                    <h5 className="font-display text-[9px] font-bold uppercase tracking-[0.2em] text-stone-500 leading-none">
                      GATE TICKET
                    </h5>
                    <p className="mt-1 font-mono text-[10px] font-bold text-accent-amber uppercase">
                      Class: First Level
                    </p>
                  </div>

                  {/* Gorgeous, authentic CSS striped bar code */}
                  <div className="my-4 flex flex-col items-center">
                    <div className="flex h-11 items-end gap-[1.5px] bg-neutral-950 p-1.5 rounded-xs border border-white/10">
                      {/* Generates a stylized barcode */}
                      {[1.2, 4, 1.2, 2, 0.8, 5, 2, 0.8, 1.2, 3, 0.8, 4, 1.2, 1.5, 3, 2, 0.8].map((width, idx) => (
                        <div 
                          key={idx} 
                          className="h-full bg-white rounded-xs"
                          style={{ width: `${width}px` }} 
                        />
                      ))}
                    </div>
                    <span className="mt-1.5 font-mono text-[9px] font-bold text-stone-500 tracking-wider">
                      {res.id}
                    </span>
                  </div>

                  {/* Actions Row */}
                  <div className="w-full space-y-1.5">
                    {/* Print ticket PDF simulated */}
                    <button
                      onClick={() => handlePrint(res)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xs border border-white/10 bg-white/5 py-1.5 px-2.5 text-[10px] font-bold text-stone-200 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Printer className="h-3 w-3 text-accent-amber" />
                      <span>Print Document</span>
                    </button>

                    {/* Cancellation Trigger */}
                    {isConfirmed && (
                      <>
                        {confirmCancelId === res.id ? (
                          <div className="rounded-xs bg-red-950/95 border border-red-900 p-1.5 animate-fade-in space-y-1">
                            <p className="text-[9px] font-semibold text-red-200 leading-none">Cancel this trip?</p>
                            <div className="flex gap-1 justify-center">
                              <button
                                onClick={() => {
                                  onCancelReservation(res.id);
                                  setConfirmCancelId(null);
                                }}
                                className="rounded-xs bg-red-600 px-2 py-0.5 text-[8px] font-bold text-white hover:bg-red-700"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setConfirmCancelId(null)}
                                className="rounded-xs bg-neutral-800 px-2 py-0.5 text-[8px] font-bold text-stone-200 hover:bg-neutral-700"
                              >
                                Keep
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmCancelId(res.id)}
                            className="w-full flex items-center justify-center gap-1.5 rounded-xs border border-white/10 bg-white/5 py-1.5 px-2.5 text-[10px] font-bold text-red-400 hover:bg-red-950/30 hover:border-red-900/50 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Cancel Booking</span>
                          </button>
                        )}
                      </>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* SOVEREIGN PRINTABLE INVOICE RECEIPT MODAL OVERLAY */}
      {viewInvoiceRes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/93 p-4 backdrop-blur-md animate-fade-in print:bg-white print:p-0 print:absolute print:inset-0">
          <div className="absolute inset-0 print:hidden" onClick={() => setViewInvoiceRes(null)} />
          
          <div className="relative z-10 w-full max-w-2xl rounded-xs bg-stone-900 border border-white/10 p-6 sm:p-8 shadow-2xl print:border-none print:bg-white print:text-black print:p-0 print:shadow-none font-sans print:static max-h-[92vh] overflow-y-auto">
            
            {/* Header / Actions Menu */}
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6 print:hidden">
              <h4 className="font-display text-sm font-bold text-accent-amber flex items-center gap-1.5 italic uppercase tracking-widest">
                <Printer className="h-4 w-4" /> Aventine Official Sovereign Invoice
              </h4>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="rounded-xs bg-white text-neutral-950 font-sans font-bold px-4 py-1.5 text-[10px] uppercase tracking-wider hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={() => setViewInvoiceRes(null)}
                  className="rounded-xs bg-stone-900 border border-white/10 text-stone-300 font-sans font-bold px-4 py-1.5 text-[10px] uppercase tracking-wider hover:bg-white/5 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Printable Paper Document Container */}
            <div className="bg-neutral-950 text-white p-6 sm:p-8 rounded-sm border border-white/10 space-y-6 print:bg-white print:text-black print:p-0 print:border-none print:space-y-6 print:w-full">
              
              {/* Crest Title and Address Details */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 border-b border-dashed border-white/15 pb-5 print:border-neutral-300">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent-amber" />
                    <span className="font-serif italic text-lg font-bold text-white print:text-black tracking-wide">AVENTINE SOVEREIGN STAY</span>
                  </div>
                  <p className="text-[10px] font-sans text-stone-405 font-bold uppercase tracking-widest mt-1">Royal Chauffeur Resorts & Villas LTD</p>
                  <p className="text-[9px] text-stone-500 mt-1 font-mono leading-none">12 Upper Belgrave St, Belgravia, London SW1X • UK Registry Code: #99320</p>
                </div>
                <div className="text-left sm:text-right font-mono text-[9px] text-stone-400 print:text-stone-700 space-y-1">
                  <p><span className="font-sans font-bold text-stone-500 uppercase">DOCUMENT TYPE:</span> INVOICE TICKET</p>
                  <p><span className="font-sans font-bold text-stone-500 uppercase">REFERENCE ID:</span> {viewInvoiceRes.id}</p>
                  <p><span className="font-sans font-bold text-stone-500 uppercase">DATE RENDERED:</span> {new Date().toLocaleDateString('en-GB')}</p>
                  <p><span className="font-sans font-bold text-stone-500 uppercase">STATUS:</span> PAID IN FULL</p>
                </div>
              </div>

              {/* Staying parameters specification grids */}
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-stone-500">Billed Lead Customer</p>
                  <p className="text-white print:text-black font-bold mt-1 text-sm">{viewInvoiceRes.guestName}</p>
                  <p className="text-[10px] text-stone-400 print:text-stone-600 mt-0.5">{viewInvoiceRes.guestEmail}</p>
                  <p className="text-[10px] text-stone-400 print:text-stone-600 font-mono mt-0.5">{viewInvoiceRes.guestPhone}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.15em] text-stone-500">Destination Haven</p>
                  <p className="text-accent-amber font-serif mt-1 text-sm font-bold">{viewInvoiceRes.hotelName}</p>
                  <p className="text-[10px] text-stone-400 print:text-stone-600 mt-0.5">{viewInvoiceRes.hotelCity}, {viewInvoiceRes.hotelCountry}</p>
                  <span className="inline-block mt-1 label bg-stone-900 border border-white/10 px-2 py-0.5 text-[8px] font-bold text-stone-300 print:bg-stone-100 print:text-black print:border-stone-300 rounded-xs">
                    {viewInvoiceRes.roomName}
                  </span>
                </div>
              </div>

              {/* Booking Specifications Calendar */}
              <div className="rounded-xs bg-neutral-900 border border-white/5 p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium print:bg-stone-50 print:border-stone-200">
                <div>
                  <span className="block text-[8px] uppercase font-bold text-stone-500">Check In</span>
                  <span className="block mt-1 text-stone-200 print:text-black font-mono font-bold">{viewInvoiceRes.checkIn}</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase font-bold text-stone-500">Check Out</span>
                  <span className="block mt-1 text-stone-200 print:text-black font-mono font-bold">{viewInvoiceRes.checkOut}</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase font-bold text-stone-500">Total Duration</span>
                  <span className="block mt-1 text-stone-200 print:text-black font-bold">{viewInvoiceRes.totalNights} {viewInvoiceRes.totalNights === 1 ? 'Night' : 'Nights'}</span>
                </div>
                <div>
                  <span className="block text-[8px] uppercase font-bold text-stone-500">Adult Capacity</span>
                  <span className="block mt-1 text-stone-200 print:text-black font-bold">{viewInvoiceRes.guests} Guests</span>
                </div>
              </div>

              {/* Itemized Receipts table */}
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-accent-amber uppercase tracking-widest">Calculated Accounting Details</p>
                <div className="border border-white/10 rounded-xs overflow-hidden print:border-neutral-300">
                  <div className="bg-neutral-900 text-stone-400 p-2.5 text-[9px] font-bold uppercase tracking-wider flex justify-between border-b border-white/5 print:bg-stone-100 print:text-black print:border-neutral-200">
                    <span>Invoiced Item</span>
                    <span>Subtotal Price</span>
                  </div>
                  <div className="p-3 text-xs font-semibold divide-y divide-white/5 print:divide-stone-150 space-y-2">
                    
                    <div className="flex justify-between text-stone-300 print:text-stone-800 pt-1">
                      <span>Room rates lodging ({viewInvoiceRes.totalNights} nights)</span>
                      <span>${Math.round(viewInvoiceRes.totalPrice * 0.83)} USD</span>
                    </div>

                    {viewInvoiceRes.addOnBreakfast && (
                      <div className="flex justify-between text-stone-300 print:text-stone-800 pt-2 pb-1">
                        <span>Lead morning artisan breakfast service</span>
                        <span>$25 USD/day</span>
                      </div>
                    )}

                    {viewInvoiceRes.addOnShuttle && (
                      <div className="flex justify-between text-stone-300 print:text-stone-800 pt-2 pb-1">
                        <span>Airport Tesla transfer airport limousine service</span>
                        <span>$45 USD</span>
                      </div>
                    )}

                    <div className="flex justify-between text-stone-300 print:text-stone-800 pt-2 pb-1">
                      <span>Local Eco-conservation lux tax & VAT (12% factored)</span>
                      <span>Included</span>
                    </div>

                    <div className="flex justify-between border-t border-dashed border-white/10 pt-3 text-sm font-bold text-white print:text-black">
                      <span className="font-serif italic text-base">Grand Total Due Charged</span>
                      <span className="text-base font-extrabold text-accent-amber print:text-black">${viewInvoiceRes.totalPrice} USD</span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Footer Stamp & Dynamic Signature Hash */}
              <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-5 border-t border-white/10 pt-5 print:border-stone-300">
                <div className="flex items-center gap-3">
                  {/* Stylized QR Code placeholder */}
                  <div className="h-14 w-14 shrink-0 bg-white p-1 rounded-sm flex flex-col justify-between items-center shadow-md">
                    {/* Visual QR simulation with nested grid squares */}
                    <div className="w-full h-full border border-black/5 flex flex-wrap gap-[2px] p-[2px]">
                      {[...Array(64)].map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-[4.5px] h-[4.5px] rounded-xs ${
                            (idx * 7 + 13) % 5 === 0 || (idx > 10 && idx < 18) || (idx % 8 === 0) || (idx > 45 && idx < 52)
                              ? 'bg-black' 
                              : 'bg-transparent'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[8px] font-mono font-bold text-stone-400 print:text-stone-700 leading-tight">INVOICE BLOCKCHAIN TICKET HASH</p>
                    <p className="text-[7.5px] font-mono text-stone-500 leading-tight select-all">aventi_{viewInvoiceRes.id.toLowerCase()}_sec777e4e881822d79e55b4c100777_royal</p>
                    <p className="text-[10px] text-emerald-400 print:text-emerald-700 font-bold mt-1 uppercase tracking-wide">✓ Verified Authenticated</p>
                  </div>
                </div>

                {/* Clerical Stamp */}
                <div className="text-center sm:text-right shrink-0">
                  <div className="inline-block border-2 border-dashed border-red-900/40 text-red-405 font-mono uppercase text-[9px] font-extrabold px-3.5 py-1.5 rotate-[-3deg] print:border-red-600 print:text-red-700 tracking-widest rounded-sm">
                    Aventine Clerk APPROVED
                  </div>
                  <p className="text-[7.5px] text-stone-505 font-medium mt-1 uppercase tracking-wider">Certified Carbon-Neutral Gateway</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
