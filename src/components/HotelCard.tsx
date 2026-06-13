/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { Hotel } from '../types';

interface HotelCardProps {
  key?: string | number;
  hotel: Hotel;
  onClick: () => void;
}

export default function HotelCard({ hotel, onClick }: HotelCardProps) {
  // Highlight premium properties
  const isSuperb = hotel.rating >= 4.8;

  return (
    <div 
      className="group flex flex-col overflow-hidden rounded-xs border border-white/10 bg-neutral-900 shadow-2xl transition-all duration-300 hover:border-white/30 cursor-pointer"
      onClick={onClick}
      id={`hotel-card-${hotel.id}`}
    >
      {/* Hotel Image & Badge Overlay */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        
        {/* Rating Floating Badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-xs bg-neutral-950/90 border border-white/10 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-sm">
          <Star className="h-3.5 w-3.5 fill-accent-amber text-accent-amber" />
          <span>{hotel.rating.toFixed(2)}</span>
          <span className="text-[10px] text-stone-400 font-medium">({hotel.reviewCount})</span>
        </div>

        {/* Superb Badge */}
        {isSuperb && (
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1 rounded-xs bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-neutral-950 shadow-xs">
            <ShieldCheck className="h-3 w-3 text-neutral-950" />
            <span>Collector's Pick</span>
          </div>
        )}

        {/* Location Floating Ribbon */}
        <div className="absolute bottom-3 left-3.5 flex items-center gap-1 rounded-xs bg-neutral-950/80 border border-white/10 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white">
          <MapPin className="h-3.5 w-3.5 text-accent-amber" />
          <span>{hotel.city}, {hotel.country}</span>
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-accent-amber font-sans">
            {hotel.rooms.length} Exquisite Room Tiers
          </p>
          <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white group-hover:text-accent-amber transition-colors italic">
            {hotel.name}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-stone-400 font-light line-clamp-2">
            {hotel.description}
          </p>

          {/* Luxury Curated Inclusions Tag Line */}
          <div className="mt-2.5 rounded-xs bg-neutral-950/60 border border-white/5 py-1 px-2.5 text-[10px] font-medium text-accent-amber/90 italic font-serif">
            {hotel.id === 'grand-horizon-bali' && "✦ Includes Ocean Sunset Massage & Private Beach Lounger"}
            {hotel.id === 'aura-chalet-zermatt' && "✦ Includes Alpine Mulled Wine & Reserved Ski Chair Pass"}
            {hotel.id === 'opera-boutique-paris' && "✦ Includes Complimentary Courtyard Macarons & Tea"}
            {hotel.id === 'metropolitan-suites-ny' && "✦ Includes Skyline Lounge High-Altitude Welcome Drinks"}
            {hotel.id === 'komorebi-onsen-kyoto' && "✦ Includes Sacred Bamboo Bath Access & Private Matcha Ceremony"}
            {hotel.id === 'amberwood-manor-cotswolds' && "✦ Includes Traditional Afternoon Royal Tea Set"}
          </div>

          {/* Core Amenities Quick Row */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <span 
                key={amenity}
                className="rounded-xs bg-neutral-950 px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold text-stone-300 border border-white/5"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="rounded-xs bg-neutral-950 px-2.5 py-1 text-[9px] uppercase tracking-wider font-semibold text-stone-500 border border-white/5">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Card Pricing & Action footer */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-500 font-sans">From</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-extrabold text-white">${hotel.basePrice}</span>
              <span className="text-xs text-stone-400 font-medium font-sans">/ night</span>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 rounded-xs bg-stone-950 border border-white/10 px-3.5 py-2 text-[10px] uppercase tracking-wider font-bold text-stone-200 group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all duration-300"
          >
            <span>Details</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
