/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Calendar, Users, SlidersHorizontal, Trash2, MapPin, X, ChevronDown, Check } from 'lucide-react';
import { SearchCriteria, FilterState } from '../types';
import { POPULAR_LOCATIONS, ALL_AMENITIES } from '../data';

interface SearchFiltersProps {
  search: SearchCriteria;
  setSearch: React.Dispatch<React.SetStateAction<SearchCriteria>>;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearchSubmit: () => void;
}

export default function SearchFilters({
  search,
  setSearch,
  filters,
  setFilters,
  onSearchSubmit
}: SearchFiltersProps) {
  const [showLocationDrawer, setShowLocationDrawer] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Suggested locations filtering
  const filteredSuggestions = POPULAR_LOCATIONS.filter(loc =>
    loc.toLowerCase().includes(search.location.toLowerCase())
  );

  const handleLocationSelect = (location: string) => {
    setSearch(prev => ({ ...prev, location }));
    setShowLocationDrawer(false);
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => {
      const alreadySelected = prev.selectedAmenities.includes(amenity);
      const selectedAmenities = alreadySelected
        ? prev.selectedAmenities.filter(a => a !== amenity)
        : [...prev.selectedAmenities, amenity];
      return { ...prev, selectedAmenities };
    });
  };

  const handleResetFilters = () => {
    setFilters({
      priceRange: [100, 500],
      minRating: 0,
      selectedAmenities: [],
      sortBy: 'recommended'
    });
    setSearch({
      location: '',
      checkIn: '2026-06-13',
      checkOut: '2026-06-16',
      guests: 2
    });
  };

  const handleRatingSelect = (rating: number) => {
    setFilters(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating
    }));
  };

  return (
    <div className="w-full rounded-xl bg-neutral-900 border border-white/10 shadow-2xl p-5 sm:p-6 text-white" id="search-container">
      
      {/* 1. Main Search Console */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12" id="search-main-grid">
        
        {/* DESTINATION */}
        <div className="relative lg:col-span-4" id="search-field-location">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-amber mb-2 font-sans flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-accent-amber" /> Destination
            </span>
            <span className="text-[9px] text-stone-500 font-light normal-case font-mono">City, Country or Resort</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Where are you traveling to?"
              value={search.location}
              onChange={(e) => {
                setSearch(prev => ({ ...prev, location: e.target.value }));
                setShowLocationDrawer(true);
              }}
              onFocus={() => setShowLocationDrawer(true)}
              className="w-full rounded-xs border border-white/15 bg-neutral-950/80 py-3.5 pl-11 pr-10 text-sm font-semibold text-white placeholder-stone-500 transition-colors focus:border-accent-amber focus:bg-stone-900/40 focus:outline-hidden"
            />
            <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-accent-amber" />
            
            {search.location && (
              <button
                onClick={() => setSearch(prev => ({ ...prev, location: '' }))}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Quick Destination Hotkeys block */}
          <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
            <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold mr-1">Hotspots:</span>
            {['Bali', 'Kyoto', 'Paris', 'Zermatt', 'New York'].map((city) => {
              const isSelected = search.location.toLowerCase() === city.toLowerCase();
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSearch(prev => ({ ...prev, location: city }))}
                  className={`px-2 py-0.5 rounded-xs text-[10px] font-medium transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-accent-amber text-neutral-950 font-bold' 
                      : 'bg-stone-950 border border-white/5 text-stone-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>

          {/* Location Drawer Suggestions */}
          {showLocationDrawer && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowLocationDrawer(false)}
              />
              <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-60 overflow-y-auto rounded-xs border border-white/15 bg-neutral-900 p-2.5 shadow-25 animate-fade-in">
                <p className="px-3.5 py-2 text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-accent-amber">
                  Popular Escapes
                </p>
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLocationSelect(loc)}
                      className="flex w-full items-center gap-2.5 rounded-xs px-3.5 py-2.5 text-left text-sm font-semibold text-stone-300 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
                    >
                      <MapPin className="h-4 w-4 text-accent-amber/70" />
                      <span>{loc} // Luxury Retreat</span>
                    </button>
                  ))
                ) : (
                  <p className="px-3.5 py-4 text-center text-xs text-stone-500 font-medium font-sans">
                    No matching locations found.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* CHECK IN */}
        <div className="relative sm:col-span-1 lg:col-span-3" id="search-field-checkin">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-amber mb-2 font-sans flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent-amber" /> Check In
          </label>
          <div className="relative">
            <input
              type="date"
              value={search.checkIn}
              min="2026-06-13"
              onChange={(e) => setSearch(prev => ({ ...prev, checkIn: e.target.value }))}
              className="w-full rounded-xs border border-white/15 bg-neutral-950/80 py-3.5 px-4 text-sm font-semibold text-white transition-colors focus:border-accent-amber focus:bg-stone-900/40 focus:outline-hidden [color-scheme:dark]"
            />
          </div>
        </div>

        {/* CHECK OUT */}
        <div className="relative sm:col-span-1 lg:col-span-3" id="search-field-checkout">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-amber mb-2 font-sans flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-accent-amber" /> Check Out
          </label>
          <div className="relative">
            <input
              type="date"
              value={search.checkOut}
              min={search.checkIn || "2026-06-13"}
              onChange={(e) => setSearch(prev => ({ ...prev, checkOut: e.target.value }))}
              className="w-full rounded-xs border border-white/15 bg-neutral-950/80 py-3.5 px-4 text-sm font-semibold text-white transition-colors focus:border-accent-amber focus:bg-stone-900/40 focus:outline-hidden [color-scheme:dark]"
            />
          </div>
        </div>

        {/* GUESTS */}
        <div className="relative lg:col-span-2" id="search-field-guests">
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-amber mb-2 font-sans flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-accent-amber" /> Guests
          </label>
          <div className="relative">
            <select
              value={search.guests}
              onChange={(e) => setSearch(prev => ({ ...prev, guests: Number(e.target.value) }))}
              className="w-full appearance-none rounded-xs border border-white/15 bg-neutral-950/80 py-3.5 pl-11 pr-10 text-sm font-semibold text-white transition-colors focus:border-accent-amber focus:bg-stone-900/40 focus:outline-hidden"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map(num => (
                <option key={num} value={num} className="bg-neutral-900 text-white">
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
            <Users className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-stone-400" />
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-stone-400" />
          </div>
        </div>

      </div>

      {/* ACTIVE FILTERS CHIPS BAR */}
      {(search.location || filters.selectedAmenities.length > 0 || filters.minRating > 0 || filters.priceRange[1] < 500) && (
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 animate-fade-in text-[11px]" id="search-active-chips">
          <span className="text-stone-500 font-bold uppercase tracking-wider text-[9px] mr-1">Active Criteria:</span>
          
          {search.location && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-stone-200">
              <span>Location: "{search.location}"</span>
              <button 
                onClick={() => setSearch(prev => ({ ...prev, location: '' }))}
                className="text-stone-500 hover:text-white transition-colors font-bold ml-1 cursor-pointer text-xs"
                title="Clear location filter"
              >
                ×
              </button>
            </span>
          )}

          {filters.priceRange[1] < 500 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-stone-200">
              <span>Rate Limit Under: ${filters.priceRange[1]}</span>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], 500] }))}
                className="text-stone-500 hover:text-white transition-colors font-bold ml-1 cursor-pointer text-xs"
                title="Clear price filter"
              >
                ×
              </button>
            </span>
          )}

          {filters.minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-stone-200">
              <span>★ {filters.minRating}+</span>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, minRating: 0 }))}
                className="text-stone-500 hover:text-white transition-colors font-bold ml-1 cursor-pointer text-xs"
                title="Clear rating filter"
              >
                ×
              </button>
            </span>
          )}

          {filters.selectedAmenities.map((amenity) => (
            <span key={amenity} className="inline-flex items-center gap-1.5 rounded-full bg-accent-amber/10 border border-accent-amber/20 px-3 py-1 text-accent-amber animate-fade-in">
              <span>+{amenity}</span>
              <button 
                onClick={() => handleAmenityToggle(amenity)}
                className="text-accent-amber/54 hover:text-white transition-colors font-bold ml-1 cursor-pointer text-xs"
                title={`Remove ${amenity}`}
              >
                ×
              </button>
            </span>
          ))}

          <button
            onClick={handleResetFilters}
            className="text-[10px] text-accent-amber hover:underline uppercase tracking-widest font-bold ml-auto cursor-pointer"
          >
            Clear All Criteria
          </button>
        </div>
      )}

      {/* 2. Dynamic Control Actions Row */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5" id="search-actions">
        <div className="flex gap-2.5">
          {/* Advanced Sliders Toggle */}
          <button
            id="btn-toggle-filters"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] tracking-wider uppercase font-bold transition-all ${
              showAdvancedFilters 
                ? 'bg-white text-black border border-transparent' 
                : 'bg-stone-950 hover:bg-neutral-800 text-stone-300 border border-white/10'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>{showAdvancedFilters ? 'Hide Filters' : 'Show Advanced Filters'}</span>
            
            {/* Filter Activations Count Badge */}
            {(filters.minRating > 0 || filters.selectedAmenities.length > 0 || filters.priceRange[0] !== 100 || filters.priceRange[1] !== 500) && (
              <span className={`flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[9px] font-extrabold ${showAdvancedFilters ? 'bg-neutral-950 text-white' : 'bg-accent-amber text-neutral-950'}`}>
                {Number(filters.minRating > 0) + filters.selectedAmenities.length + Number(filters.priceRange[0] !== 100 || filters.priceRange[1] !== 500)}
              </span>
            )}
          </button>

          {/* Reset Action */}
          <button
            id="btn-clear-filters"
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 rounded-full border border-white/5 bg-transparent px-4 py-2 text-[11px] tracking-wider uppercase font-bold text-stone-400 transition-colors hover:text-red-400"
            title="Reset Filters"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>
        </div>

        {/* Dynamic Sort Option */}
        <div className="flex items-center gap-2.5" id="search-sorting">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="rounded-xs border border-white/15 bg-stone-950 px-3.5 py-2 text-xs font-bold text-stone-200 transition-colors focus:border-accent-amber focus:outline-hidden"
          >
            <option value="recommended" className="bg-neutral-900">Highly Recommended</option>
            <option value="priceLowToHigh" className="bg-neutral-900">Price: Low to High</option>
            <option value="priceHighToLow" className="bg-neutral-900">Price: High to Low</option>
            <option value="rating" className="bg-neutral-900">Top Rated</option>
          </select>
        </div>
      </div>

      {/* 3. Collapsible Advanced Filters Section */}
      {showAdvancedFilters && (
        <div className="mt-6 grid grid-cols-1 gap-6 border-t border-white/10 pt-6 md:grid-cols-12 animate-fade-in" id="advanced-filters">
          
          {/* PRICE RANGE SLIDER */}
          <div className="md:col-span-4" id="filter-price">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent-amber mb-3">
              Base Price Range (per night)
            </h4>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-400">Min: ${filters.priceRange[0]}</span>
                <span className="text-xs font-semibold text-white">Max limit: ${filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="20"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], Number(e.target.value)] }))}
                className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-neutral-800 accent-white transition-all"
              />
              
              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                {[200, 300, 400, 500].map((limit) => {
                  const isActive = filters.priceRange[1] === limit;
                  return (
                    <button
                      key={limit}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], limit] }))}
                      className={`text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-xs transition-colors cursor-pointer ${
                        isActive 
                          ? 'bg-accent-amber text-black' 
                          : 'bg-stone-950 border border-white/5 text-stone-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {limit === 500 ? 'Any amount' : `< $${limit}`}
                    </button>
                  );
                })}
              </div>
              <p className="text-[9px] text-stone-400 font-medium font-mono">Shows escapes priced up to <strong className="text-white font-bold">${filters.priceRange[1]}/night</strong></p>
            </div>
          </div>

          {/* MINIMUM GUEST RATING */}
          <div className="md:col-span-3" id="filter-rating">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent-amber mb-3">
              Average Guest Rating
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[0, 4.5, 4.7, 4.9].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingSelect(rating)}
                  className={`flex items-center gap-1.5 rounded-xs px-3 py-2 text-xs font-semibold transition-all ${
                    filters.minRating === rating
                      ? 'bg-white text-neutral-950 font-bold ring-2 ring-white/20'
                      : 'bg-stone-950 hover:bg-neutral-800 text-stone-300 border border-white/10'
                  }`}
                >
                  {rating === 0 ? 'Any standard' : `★ ${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* AMENITIES SELECTION LIST */}
          <div className="md:col-span-5" id="filter-amenities">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-accent-amber mb-3">
              Filter by Amenities
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {ALL_AMENITIES.map((amenity) => {
                const isSelected = filters.selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                      isSelected
                        ? 'bg-white text-neutral-950 font-bold ring-2 ring-white/20'
                        : 'border border-white/15 bg-neutral-950 text-stone-300 hover:border-white/30 hover:bg-neutral-900'
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
