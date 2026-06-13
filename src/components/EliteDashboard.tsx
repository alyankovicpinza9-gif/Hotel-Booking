/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Calendar, TrendingUp, DollarSign, Leaf, Award, Compass, ShieldCheck } from 'lucide-react';
import { Reservation } from '../types';
import { HOTELS } from '../data';

interface EliteDashboardProps {
  reservations: Reservation[];
  onExploreClick: () => void;
  theme: 'dark' | 'light';
}

export default function EliteDashboard({ reservations, onExploreClick, theme }: EliteDashboardProps) {
  const isDark = theme === 'dark';

  // Calculate live stats
  const activeBookings = reservations.filter(r => r.status === 'confirmed');
  const cancelledBookings = reservations.filter(r => r.status === 'cancelled');
  const totalNights = activeBookings.reduce((sum, r) => sum + r.totalNights, 0);
  const totalSpend = activeBookings.reduce((sum, r) => sum + r.totalPrice, 0);
  
  // Calculate average night investment
  const averageNightlyPrice = totalNights > 0 ? Math.round(totalSpend / totalNights) : 0;
  
  // Eco calculations: 1.5kg CO2 offset per night; $5 eco-tax contribution per night
  const carbonOffsetKg = (totalNights * 1.5).toFixed(1);
  const ecoContributions = totalNights * 5;

  // Determine loyalty level tier inside elite community
  let loyaltyLevel = 'Standard Guest';
  let loyaltySubtext = 'Book 1 more night to reach Bronze privilege status';
  let badgeColor = 'bg-stone-800 text-stone-300';
  let tierIconClass = 'text-stone-400';

  if (activeBookings.length >= 4) {
    loyaltyLevel = 'Diamond Elite Sanctum';
    loyaltySubtext = 'Enjoy complimentary private butler service and spa priorities';
    badgeColor = 'bg-accent-amber/25 text-white border border-accent-amber/40';
    tierIconClass = 'text-accent-amber animate-pulse';
  } else if (activeBookings.length >= 2) {
    loyaltyLevel = 'Gold Sovereign Class';
    loyaltySubtext = 'Access complimentary private airport chauffeur shuttles';
    badgeColor = 'bg-white/15 text-stone-200 border border-white/20';
    tierIconClass = 'text-stone-200';
  } else if (activeBookings.length === 1) {
    loyaltyLevel = 'Bronze Voyager Class';
    loyaltySubtext = 'Access complimentary artisan pastry morning baskets';
    badgeColor = 'bg-amber-950/40 text-amber-300 border border-amber-900/40';
    tierIconClass = 'text-amber-500';
  }

  // Generate vector points for an elegant, glowing reservation cost path
  // If there are no reservations, fall back to a beautiful baseline wave representation
  const chartPoints = activeBookings.length > 0 
    ? activeBookings.slice().reverse().map((r, i) => ({ x: i, y: r.totalPrice, label: r.id }))
    : [
        { x: 0, y: 180, label: 'Base' },
        { x: 1, y: 280, label: 'Standard' },
        { x: 2, y: 220, label: 'Promo' },
        { x: 3, y: 350, label: 'Deluxe' },
        { x: 4, y: 310, label: 'Suite' },
        { x: 5, y: 480, label: 'Penthouse' }
      ];

  const svgWidth = 500;
  const svgHeight = 150;
  const paddingX = 40;
  const paddingY = 25;

  const minVal = Math.min(...chartPoints.map(p => p.y)) * 0.8;
  const maxVal = Math.max(...chartPoints.map(p => p.y)) * 1.2 || 500;

  const getSvgCoordinates = () => {
    if (chartPoints.length === 1) {
      return `M ${paddingX} ${svgHeight / 2} L ${svgWidth - paddingX} ${svgHeight / 2}`;
    }
    return chartPoints.map((p, index) => {
      const x = paddingX + (index / (chartPoints.length - 1)) * (svgWidth - 2 * paddingX);
      const y = svgHeight - paddingY - ((p.y - minVal) / (maxVal - minVal)) * (svgHeight - 2 * paddingY);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const getSvgAreaPath = () => {
    if (chartPoints.length < 2) return '';
    const pointsStr = getSvgCoordinates();
    const finalX = paddingX + (chartPoints.length - 1) * (svgWidth - 2 * paddingX) / (chartPoints.length - 1);
    const startX = paddingX;
    const bottomY = svgHeight - paddingY;
    return `${pointsStr} L ${finalX} ${bottomY} L ${startX} ${bottomY} Z`;
  };

  return (
    <div className="space-y-8 animate-fade-in" id="elite-dashboard-container">
      
      {/* 1. Header Information Grid */}
      <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-accent-amber">
            AventineStay Executive Suite
          </span>
          <h2 className={`font-display text-2.5xl font-light italic tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            Your Sovereign Travel Ledger
          </h2>
          <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'} font-medium mt-1`}>
            A real-time overview of your hospitality investments, verified carbon offset metrics, and elite program privileges.
          </p>
        </div>

        <button
          onClick={onExploreClick}
          className={`flex items-center gap-2 rounded-xs px-5 py-2.5 text-[11px] font-sans tracking-widest uppercase font-bold transition-all border shrink-0 ${
            isDark 
              ? 'bg-white text-black border-transparent hover:bg-neutral-200' 
              : 'bg-neutral-900 text-white border-transparent hover:bg-neutral-800'
          }`}
        >
          <Compass className="h-4 w-4" />
          <span>Discover escapes</span>
        </button>
      </div>

      {/* 2. Bento Stat Grid with stunning Glassmorphism cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* STAT 1: LOYALTY TIER */}
        <div className={`p-6 rounded-xl border backdrop-blur-md shadow-lg transition-transform hover:-translate-y-0.5 duration-300 flex flex-col justify-between ${
          isDark 
            ? 'bg-neutral-900/40 border-white/10 text-white' 
            : 'bg-white/70 border-zinc-200/80 text-neutral-950'
        }`}>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className={`text-[9px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                Privilege Level
              </span>
              <p className="font-display text-lg font-bold italic truncate">{loyaltyLevel}</p>
            </div>
            <div className={`h-10 w-10 rounded-xs flex items-center justify-center border ${
              isDark ? 'bg-neutral-950 border-white/10' : 'bg-stone-50 border-zinc-200'
            }`}>
              <Award className={`h-5 w-5 ${tierIconClass}`} />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-dashed border-stone-500/15">
            <p className={`text-[10px] font-medium leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              {loyaltySubtext}
            </p>
          </div>
        </div>

        {/* STAT 2: TOTAL LODGING STAYED */}
        <div className={`p-6 rounded-xl border backdrop-blur-md shadow-lg transition-transform hover:-translate-y-0.5 duration-300 flex flex-col justify-between ${
          isDark 
            ? 'bg-neutral-900/40 border-white/10 text-white' 
            : 'bg-white/70 border-zinc-200/80 text-neutral-950'
        }`}>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className={`text-[9px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                Sojourn Invested
              </span>
              <p className="font-display text-2.5xl font-extrabold tracking-tight mt-0.5">
                ${totalSpend} <span className="text-xs font-medium text-stone-500 font-sans tracking-normal">USD</span>
              </p>
            </div>
            <div className={`h-10 w-10 rounded-xs flex items-center justify-center border ${
              isDark ? 'bg-neutral-950 border-white/10' : 'bg-stone-50 border-zinc-200'
            }`}>
              <DollarSign className="h-5 w-5 text-accent-amber" />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-dashed border-stone-500/15 flex items-center justify-between text-[10px]">
            <span className={`${isDark ? 'text-stone-400' : 'text-stone-650'}`}>Avg Chamber night rate:</span>
            <strong className="font-mono text-accent-amber font-bold">${averageNightlyPrice}/night</strong>
          </div>
        </div>

        {/* STAT 3: STAYS SECURED */}
        <div className={`p-6 rounded-xl border backdrop-blur-md shadow-lg transition-transform hover:-translate-y-0.5 duration-300 flex flex-col justify-between ${
          isDark 
            ? 'bg-neutral-900/40 border-white/10 text-white' 
            : 'bg-white/70 border-zinc-200/80 text-neutral-950'
        }`}>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className={`text-[9px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                Nights Secured
              </span>
              <p className="font-display text-2.5xl font-extrabold tracking-tight mt-0.5">
                {totalNights} <span className="text-xs font-medium text-stone-500 font-sans tracking-normal">Nights Booked</span>
              </p>
            </div>
            <div className={`h-10 w-10 rounded-xs flex items-center justify-center border ${
              isDark ? 'bg-neutral-950 border-white/10' : 'bg-stone-50 border-zinc-200'
            }`}>
              <Calendar className="h-5 w-5 text-accent-amber" />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-dashed border-stone-500/15 flex items-center justify-between text-[10px]">
            <span className={`${isDark ? 'text-stone-400' : 'text-stone-600'}`}>Total stays:</span>
            <span className="font-bold">{activeBookings.length} Active / {cancelledBookings.length} Cancelled</span>
          </div>
        </div>

        {/* STAT 4: CARBON REDUCTION CO2 HERO */}
        <div className={`p-6 rounded-xl border backdrop-blur-md shadow-lg transition-transform hover:-translate-y-0.5 duration-300 flex flex-col justify-between ${
          isDark 
            ? 'bg-neutral-900/40 border-white/10 text-white' 
            : 'bg-white/70 border-zinc-200/80 text-neutral-950'
        }`}>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className={`text-[9px] font-bold uppercase tracking-[0.15em] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                Eco Offset Volume
              </span>
              <p className="font-display text-2.5xl font-extrabold tracking-tight mt-0.5 text-emerald-500">
                {carbonOffsetKg} <span className="text-xs font-medium text-stone-500 font-sans tracking-normal">kg CO²</span>
              </p>
            </div>
            <div className={`h-10 w-10 rounded-xs flex items-center justify-center border ${
              isDark ? 'bg-neutral-950 border-white/10' : 'bg-stone-50 border-zinc-200'
            }`}>
              <Leaf className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-dashed border-stone-500/15 flex items-center justify-between text-[10px]">
            <span className={`${isDark ? 'text-stone-400' : 'text-stone-600'}`}>Eco Tax Funded:</span>
            <span className="font-bold text-emerald-500">${ecoContributions} collected</span>
          </div>
        </div>

      </div>

      {/* 3. Detailed Analytics Visual Layout: Cost Trend & Hotel Demographics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        {/* Reservation pricing developments trajectory wave */}
        <div className={`p-6 rounded-xl border backdrop-blur-md lg:col-span-8 overflow-hidden flex flex-col justify-between ${
          isDark 
            ? 'bg-neutral-900/40 border-white/10 text-white' 
            : 'bg-white/70 border-zinc-200/80 text-neutral-950'
        }`}>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold flex items-center gap-1.5 italic">
                  <TrendingUp className="h-4 w-4 text-accent-amber" /> Booking Investment Curvature
                </h3>
                <p className="text-[11px] text-stone-400 mt-0.5 font-medium">Trajectory of spend curves per reservation invoice</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold font-mono">
                <span className="inline-block h-2 w-2 rounded-full bg-accent-amber" />
                <span>Confirmed Rates</span>
              </div>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="mt-6 w-full flex items-center justify-center" id="svg-cost-chart">
              <svg 
                viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                className="w-full h-auto max-h-[160px] overflow-visible rounded-xs"
              >
                <defs>
                  <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d4af37" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity="0.0" />
                  </linearGradient>
                  <filter id="svg-glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Grid guidelines */}
                <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeDasharray="3" />
                <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeDasharray="3" />
                <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} strokeDasharray="3" />

                {/* Area paths */}
                {chartPoints.length > 1 && (
                  <path 
                    d={getSvgAreaPath()} 
                    fill="url(#chart-area-grad)" 
                  />
                )}

                {/* Curving lines */}
                <path 
                  d={getSvgCoordinates()} 
                  fill="none" 
                  stroke="#d4af37" 
                  strokeWidth="2.5" 
                  filter="url(#svg-glow)" 
                />

                {/* Point indicators */}
                {chartPoints.map((p, index) => {
                  const x = paddingX + (index / (chartPoints.length - 1)) * (svgWidth - 2 * paddingX);
                  const y = svgHeight - paddingY - ((p.y - minVal) / (maxVal - minVal)) * (svgHeight - 2 * paddingY);
                  return (
                    <g key={index} className="group/dot cursor-pointer">
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="5" 
                        fill="#0c0c0c" 
                        stroke="#d4af37" 
                        strokeWidth="2" 
                      />
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="14" 
                        fill="#d4af37" 
                        fillOpacity="0.0" 
                        className="hover:fill-opacity-15 transition-all" 
                      />
                      <text 
                        x={x} 
                        y={y - 12} 
                        fill={isDark ? "#ffffff" : "#0f0f0f"} 
                        fontSize="9" 
                        fontWeight="bold" 
                        textAnchor="middle"
                        className="font-mono bg-black"
                      >
                        ${p.y}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <p className="text-[10px] text-stone-500 font-mono mt-2 text-center">
              {activeBookings.length > 0 
                ? 'Displaying timeline curve of stays. Horizontal node reflects sequential reservations' 
                : 'Sample demonstration curves. Secure a room reservation to activate live analytics tracking'}
            </p>
          </div>
        </div>

        {/* ECO INITIATIVES CREDENTIALS TRACKER */}
        <div className={`p-6 rounded-xl border backdrop-blur-md lg:col-span-4 flex flex-col justify-between ${
          isDark 
            ? 'bg-neutral-900/40 border-white/10 text-white' 
            : 'bg-white/70 border-zinc-200/80 text-neutral-950'
        }`}>
          <div>
            <h3 className="font-display text-base font-bold flex items-center gap-1.5 italic">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Aventine Green Compliance
            </h3>
            <p className="text-[11px] text-stone-400 mt-0.5 font-medium">Carbon offsets and sustainability ratings checklist</p>
            
            <div className="mt-5 space-y-4">
              {/* Eco Target 1 */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Carbon-Neutral Lodging Offset</span>
                  <span className="text-emerald-500">{(totalNights > 0) ? '100% Complete' : 'Incomplete'}</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-950 rounded-full mt-1.5 overflow-hidden border border-white/5">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: totalNights > 0 ? '100%' : '15%' }} />
                </div>
              </div>

              {/* Eco Target 2 */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Eco-Tax Reinvestment Points</span>
                  <span>{ecoContributions} / $250</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-950 rounded-full mt-1.5 overflow-hidden border border-white/5">
                  <div className="h-full bg-accent-amber rounded-full transition-all" style={{ width: `${Math.min(100, (ecoContributions / 250) * 100)}%` }} />
                </div>
              </div>

              {/* Eco Target 3 */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Local Community Integration</span>
                  <span className="text-emerald-500">Verified Activations</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-950 rounded-full mt-1.5 overflow-hidden border border-white/5">
                  <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-stone-500 font-mono space-y-1">
            <p>• Verified: United Nations Carbon Offset Standards</p>
            <p>• Verified: FSC Certified Organic Linens & Woods</p>
          </div>
        </div>

      </div>

    </div>
  );
}
