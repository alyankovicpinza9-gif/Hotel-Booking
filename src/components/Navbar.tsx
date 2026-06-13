/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Palmtree, Compass, Bookmark, History, Sparkles, LayoutDashboard, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: 'explore' | 'my-bookings' | 'dashboard';
  setActiveTab: (tab: 'explore' | 'my-bookings' | 'dashboard') => void;
  bookingCount: number;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export default function Navbar({ activeTab, setActiveTab, bookingCount, theme, setTheme }: NavbarProps) {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 ${
      theme === 'dark' 
        ? 'border-white/10 bg-neutral-950/90 text-white' 
        : 'border-neutral-200 bg-white/90 text-neutral-800 shadow-xs'
    } backdrop-blur-md`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <div 
          onClick={() => setActiveTab('explore')} 
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
          id="nav-logo"
        >
          <div className={`flex h-11 w-11 items-center justify-center rounded-xs transition-colors ${
            theme === 'dark' ? 'bg-white text-black' : 'bg-neutral-950 text-white'
          }`}>
            <Palmtree className="h-5 w-5" />
          </div>
          <div>
            <h1 className={`font-display text-2xl font-semibold tracking-tight transition-colors italic ${
              theme === 'dark' ? 'text-white' : 'text-neutral-950'
            }`}>
              Aventine<span className="text-accent-amber font-light not-italic font-sans text-lg tracking-wide ml-0.5">Stay</span>
            </h1>
            <p className="font-sans text-[8px] uppercase tracking-[0.4em] text-stone-400 font-bold -mt-1">
              Luxury Hotels & Escapes
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-2 sm:gap-4" id="nav-actions">
          <button
            id="nav-btn-explore"
            onClick={() => setActiveTab('explore')}
            className={`group flex items-center gap-2.5 rounded-full px-4 sm:px-5 py-2 font-sans text-[11px] tracking-wider uppercase font-semibold transition-all duration-300 ${
              activeTab === 'explore'
                ? theme === 'dark' ? 'bg-white text-black' : 'bg-neutral-950 text-white'
                : 'text-stone-400 hover:bg-stone-500/10'
            }`}
          >
            <Compass className={`h-4 w-4 transition-transform group-hover:rotate-12 ${
              activeTab === 'explore' ? theme === 'dark' ? 'text-neutral-950' : 'text-white' : 'text-accent-amber'
            }`} />
            <span>Find Escapes</span>
          </button>

          <button
            id="nav-btn-bookings"
            onClick={() => setActiveTab('my-bookings')}
            className={`group relative flex items-center gap-2.5 rounded-full px-4 sm:px-5 py-2 font-sans text-[11px] tracking-wider uppercase font-semibold transition-all duration-300 ${
              activeTab === 'my-bookings'
                ? theme === 'dark' ? 'bg-white text-black' : 'bg-neutral-950 text-white'
                : 'text-stone-400 hover:bg-stone-500/10'
            }`}
          >
            <History className={`h-4 w-4 transition-transform group-hover:scale-110 ${
              activeTab === 'my-bookings' ? theme === 'dark' ? 'text-neutral-950' : 'text-white' : 'text-accent-amber'
            }`} />
            <span>My Bookings</span>
            
            {bookingCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-amber text-[10px] font-bold text-neutral-950 ring-2 ring-neutral-950 animate-bounce">
                {bookingCount}
              </span>
            )}
          </button>

          <button
            id="nav-btn-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`group flex items-center gap-2.5 rounded-full px-4 sm:px-5 py-2 font-sans text-[11px] tracking-wider uppercase font-semibold transition-all duration-300 ${
              activeTab === 'dashboard'
                ? theme === 'dark' ? 'bg-white text-black' : 'bg-neutral-950 text-white'
                : 'text-stone-400 hover:bg-stone-500/10'
            }`}
          >
            <LayoutDashboard className={`h-4 w-4 transition-transform group-hover:scale-105 ${
              activeTab === 'dashboard' ? theme === 'dark' ? 'text-neutral-950' : 'text-white' : 'text-accent-amber'
            }`} />
            <span>Dashboard</span>
          </button>
        </nav>

        {/* Theme select & Butler indicators */}
        <div className="flex items-center gap-3" id="nav-perks">
          
          {/* Light/Dark mode switcher toggle button */}
          <button
            onClick={toggleTheme}
            id="theme-toggler-btn"
            className={`p-2.5 rounded-full border transition-all cursor-pointer ${
              theme === 'dark' 
                ? 'border-white/10 bg-white/5 text-stone-300 hover:text-white hover:bg-white/10' 
                : 'border-neutral-200 bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-accent-amber" /> : <Moon className="h-4 w-4 text-neutral-800" />}
          </button>

          <div className="hidden items-center gap-2 md:flex">
            <div className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] tracking-widest uppercase font-semibold text-accent-amber ${
              theme === 'dark' ? 'bg-stone-900 border-white/10' : 'bg-stone-100 border-neutral-200'
            }`}>
              <Sparkles className="h-3.5 w-3.5 text-accent-amber animate-spin-pulse" />
              <span>ELITE</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
