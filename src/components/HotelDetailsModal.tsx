/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, MapPin, Coffee, ShieldAlert, ArrowRight, Bed, Maximize2, Users, CheckCircle, Flame } from 'lucide-react';
import { Hotel, RoomType } from '../types';

interface HotelDetailsModalProps {
  hotel: Hotel | null;
  onClose: () => void;
  onSelectRoom: (room: RoomType) => void;
}

export default function HotelDetailsModal({ hotel, onClose, onSelectRoom }: HotelDetailsModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!hotel) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-neutral-950/80 p-4 backdrop-blur-xs"
      id="hotel-details-modal"
    >
      {/* Absolute Backdrop Close Trigger */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container - Responsive sliding panel */}
      <div 
        className="relative z-10 flex h-full max-h-[90vh] w-full max-w-5xl flex-col rounded-xs bg-neutral-950 border border-white/15 shadow-2xl overflow-hidden animate-fade-in"
        id="details-card"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-neutral-900 text-white">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-white flex items-center gap-2 italic">
              <span>{hotel.name}</span>
            </h2>
            <p className="text-xs text-stone-400 flex items-center gap-1.5 font-medium mt-1">
              <MapPin className="h-3.5 w-3.5 text-accent-amber" />
              <span>{hotel.address}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            id="btn-close-details"
            className="rounded-xs bg-white/5 p-2 text-white hover:bg-white/10 border border-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Main Content Pane */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-neutral-950 text-white">
          
          {/* Top Row: Gallery Layout and Key Core Attributes */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            
            {/* Left Column: Multi-Image Interactive Gallery Carousel */}
            <div className="md:col-span-7 flex flex-col gap-3" id="details-gallery">
              <div className="relative aspect-video w-full overflow-hidden rounded-xs bg-neutral-900 shadow-xl border border-white/10">
                <img
                  src={hotel.galleryUrls[activeImageIndex] || hotel.imageUrl}
                  alt={`${hotel.name} View`}
                  className="h-full w-full object-cover transition-opacity duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Thumbnails Row */}
              <div className="flex gap-2 bg-neutral-900 p-2 rounded-xs border border-white/10">
                {hotel.galleryUrls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-video w-20 overflow-hidden rounded-xs border-2 transition-all ${
                      activeImageIndex === idx 
                        ? 'border-accent-amber scale-95 shadow-md' 
                        : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={url}
                      alt="Thumbnail"
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Hotel Synopsis and Base Metrics */}
            <div className="md:col-span-5 flex flex-col justify-between" id="details-overview text">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1 rounded-xs bg-stone-900 px-3 py-1 text-xs font-bold text-accent-amber border border-white/15">
                    <Star className="h-3.5 w-3.5 fill-accent-amber text-accent-amber" />
                    <span>{hotel.rating.toFixed(2)} Rating</span>
                  </div>
                  <span className="text-xs text-stone-400 font-medium">{hotel.reviewCount} verified guest visits</span>
                </div>

                <p className="text-sm font-light leading-relaxed text-stone-300">
                  {hotel.description}
                </p>

                {/* Simulated Eco badge */}
                <div className="flex items-center gap-3 rounded-xs bg-neutral-900 border border-white/5 p-3.5 text-xs text-stone-300">
                  <Flame className="h-4.5 w-4.5 text-accent-amber shrink-0" />
                  <p className="leading-relaxed">
                    <strong className="text-white font-bold block mb-0.5">Carbon Conscious Sanctuary.</strong>
                    AventineStay contributes a portion of this bookable rate directly to sustainable green initiatives.
                  </p>
                </div>
              </div>

              {/* All Hotel Amenities Checklist Group */}
              <div className="mt-6">
                <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent-amber mb-3">
                  Property Highlights & Services
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {hotel.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-xs font-medium text-stone-300">
                      <CheckCircle className="h-4 w-4 text-accent-amber shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Grid: Room selection (The Chambers of AventineStay) */}
          <div className="border-t border-white/10 pt-8" id="details-rooms-section">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white italic">
                  Select Your Chamber
                </h3>
                <p className="text-xs text-stone-400 font-medium">
                  Curate your retreat. Specific layout configurations and privileges listed below.
                </p>
              </div>
              <div className="rounded-xs bg-stone-900 border border-white/10 px-3.5 py-1.5 text-xs text-stone-300">
                Base hotel rate: <strong className="text-white font-bold">${hotel.basePrice}</strong>/night
              </div>
            </div>

            {/* Rooms Cards Stack */}
            <div className="grid grid-cols-1 gap-5" id="chambers-container">
              {hotel.rooms.map((room) => {
                const roomPrice = Math.round(hotel.basePrice * room.priceMultiplier);
                
                // Bespoke Suite Luxury Tier Labeling
                let tierBadge = "";
                let tierColor = "";
                if (room.priceMultiplier >= 2.0) {
                  tierBadge = "👑 Emperor Signature Tier";
                  tierColor = "bg-accent-amber/25 text-white border border-accent-amber/40";
                } else if (room.priceMultiplier >= 1.3) {
                  tierBadge = "✨ Curated Elite Collection";
                  tierColor = "bg-white/10 text-stone-200 border border-white/10";
                } else {
                  tierBadge = "✦ Original Classic Suite";
                  tierColor = "bg-neutral-950 text-stone-400 border border-white/5";
                }

                return (
                  <div 
                    key={room.id}
                    className="group relative flex flex-col overflow-hidden rounded-xs border border-white/10 bg-neutral-900/30 p-5 transition-all hover:border-white/20 hover:bg-neutral-900/60 whitespace-normal md:flex-row md:items-center justify-between"
                    id={`room-option-${room.id}`}
                  >
                    {/* Room Attributes */}
                    <div className="flex-1 space-y-3 md:max-w-[70%]">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex px-2 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-wider ${tierColor}`}>
                          {tierBadge}
                        </span>
                        
                        {/* Elite perks summary tag */}
                        <span className="text-[10px] text-accent-amber font-semibold font-mono bg-stone-900/50 px-2 py-0.5 rounded-xs">
                          Free Cancellation
                        </span>
                      </div>

                      <div className="mt-1">
                        <h4 className="font-display text-xl font-bold text-white group-hover:text-accent-amber transition-colors italic">
                          {room.name}
                        </h4>
                        <p className="text-xs leading-relaxed text-stone-400 font-light mt-1">
                          {room.description}
                        </p>
                      </div>

                      {/* Technical Specs Tags */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-[11px] text-stone-400 font-medium font-mono">
                        <span className="flex items-center gap-1.5 text-stone-300">
                          <Users className="h-3.5 w-3.5 text-accent-amber shrink-0" />
                          <span>Cap: {room.capacity} Guests</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-stone-300">
                          <Bed className="h-3.5 w-3.5 text-accent-amber shrink-0" />
                          <span>{room.bedType}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-stone-300">
                          <Maximize2 className="h-3.5 w-3.5 text-accent-amber shrink-0" />
                          <span>{room.size}</span>
                        </span>
                      </div>

                      {/* Inclusions Row */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {room.amenities.map(inc => (
                          <span 
                            key={inc} 
                            className="inline-flex items-center rounded-xs bg-neutral-950 border border-white/5 px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold text-stone-300"
                          >
                            + {inc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Room Booking Price and Active Button */}
                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 md:mt-0 md:flex-col md:items-end md:border-t-0 md:pt-0 shrink-0">
                      <div className="text-left md:text-right md:mb-3.5">
                        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-500 font-sans">Nightly Rate</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-extrabold text-white">${roomPrice}</span>
                          <span className="text-xs text-stone-400 font-semibold font-sans">USD</span>
                        </div>
                        <p className="text-[9px] text-stone-500 font-medium font-sans -mt-0.5">Standard inclusions applied</p>
                      </div>

                      <button
                        id={`btn-select-room-${room.id}`}
                        onClick={() => onSelectRoom(room)}
                        className="flex items-center gap-2 rounded-xs bg-white px-5.5 py-3 text-[10px] uppercase tracking-wider font-bold text-neutral-950 hover:bg-stone-200 transition-colors"
                      >
                        <span>Select & Reserve</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer warning */}
        <div className="border-t border-white/10 bg-neutral-950 px-6 py-4 flex items-center gap-2 text-xs text-stone-400 font-medium">
          <ShieldAlert className="h-4 w-4 text-accent-amber shrink-0" />
          <span>AventineStay Best Rate Guarantee: Found a lower public rate elsewhere? We will beat it by 10%.</span>
        </div>

      </div>
    </div>
  );
}
