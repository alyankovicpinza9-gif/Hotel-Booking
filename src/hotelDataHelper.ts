/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hotel } from './types';

export interface Review {
  id: string;
  guestName: string;
  guestType: 'Solo' | 'Couple' | 'Family' | 'Business';
  rating: number;
  date: string;
  comment: string;
  hotelId: string;
}

export interface OfferCode {
  code: string;
  label: string;
  discountPercent: number;
  description: string;
}

export const INSTANT_OFFERS: OfferCode[] = [
  {
    code: 'AVENTINE20',
    label: 'Grand Launch Promo',
    discountPercent: 20,
    description: 'Enjoy 20% off lodging rates for our brand launch event.'
  },
  {
    code: 'LUXESCAPE',
    label: 'VIP Villa Discount',
    discountPercent: 15,
    description: 'Get 15% discount on all premium suites and private overwater villas.'
  },
  {
    code: 'SOJOURN',
    label: 'Sojourn Package',
    discountPercent: 10,
    description: 'Save 10% on stay durations of 3 nights or more.'
  }
];

export const HOTEL_REVIEWS: Record<string, Review[]> = {
  'grand-horizon-bali': [
    {
      id: 'r1',
      guestName: 'Countess Alexandra',
      guestType: 'Couple',
      rating: 5,
      date: 'May 14, 2026',
      comment: 'One of the most absolute pristine settings of hospitality I have experienced in Nusa Dua. The private clifftop infinity pool felt like drifting directly into the Indian Ocean. Unmatched organic spa therapy.',
      hotelId: 'grand-horizon-bali'
    },
    {
      id: 'r2',
      guestName: 'Richard Sterling',
      guestType: 'Business',
      rating: 4.8,
      date: 'June 01, 2026',
      comment: 'Superb high-speed WiFi facilities despite the private clifftop location. The restaurant serves world-class local seafood. Recommended.',
      hotelId: 'grand-horizon-bali'
    },
    {
      id: 'r3',
      guestName: 'Miyu Tanaka',
      guestType: 'Solo',
      rating: 5,
      date: 'April 20, 2026',
      comment: 'Pure peace. The butler arranged everything from my sunset tea ceremony to beachside daybed arrangements. Outstanding!',
      hotelId: 'grand-horizon-bali'
    }
  ],
  'aura-chalet-zermatt': [
    {
      id: 'r4',
      guestName: 'Dr. Lukas Meier',
      guestType: 'Solo',
      rating: 5,
      date: 'February 12, 2026',
      comment: 'The Matterhorn view directly from the bedroom is breathtaking. Skiing directly to the door is an unbelievable experience. Alpine spa with natural glacier pool is absolute luxury.',
      hotelId: 'aura-chalet-zermatt'
    },
    {
      id: 'r5',
      guestName: 'The Harrington Family',
      guestType: 'Family',
      rating: 4.6,
      date: 'March 18, 2026',
      comment: 'Incredible warm atmosphere. Kids loved the loft library and mountain-view terrace hot tub. Very generous breakfast included.',
      hotelId: 'aura-chalet-zermatt'
    }
  ],
  'opera-boutique-paris': [
    {
      id: 'r6',
      guestName: 'Emilie Laurent',
      guestType: 'Couple',
      rating: 5,
      date: 'April 09, 2026',
      comment: 'Perfect luxury layout. Neoclassical Paris at its finest. Opening the wrought-iron balcony doors combined with fresh croissants is elite.',
      hotelId: 'opera-boutique-paris'
    },
    {
      id: 'r7',
      guestName: 'William Thornton',
      guestType: 'Solo',
      rating: 4.5,
      date: 'May 28, 2026',
      comment: 'Stunning art details. Centered perfectly on Rue de la Paix. Neoclassical elegance matched with high-fidelity sound. Classic master design.',
      hotelId: 'opera-boutique-paris'
    }
  ],
  'metropolitan-suites-ny': [
    {
      id: 'r8',
      guestName: 'Devon Carter',
      guestType: 'Business',
      rating: 4.6,
      date: 'May 30, 2026',
      comment: 'The Fifth Avenue skyline view is phenomenal. Perfect remote workstation desk set up. The rooftop bar is highly exclusive and busy with dynamic conversations.',
      hotelId: 'metropolitan-suites-ny'
    },
    {
      id: 'r9',
      guestName: 'Isabella & Sophia',
      guestType: 'Family',
      rating: 4.8,
      date: 'June 05, 2026',
      comment: 'A true high-end Manhattan bento box. Gorgeous leather finishings, electric shades, and magnificent dual-aspect panoramas.',
      hotelId: 'metropolitan-suites-ny'
    }
  ],
  'komorebi-onsen-kyoto': [
    {
      id: 'r10',
      guestName: 'Sir Kenji Sato',
      guestType: 'Couple',
      rating: 5,
      date: 'April 15, 2026',
      comment: 'A profound spiritual and sensory escape. The bamboo forest private natural hot-spring outdoor cedar wood bath is deeply therapeutic. Sublime Kaiseki service.',
      hotelId: 'komorebi-onsen-kyoto'
    },
    {
      id: 'r11',
      guestName: 'Lady Beatrice',
      guestType: 'Solo',
      rating: 5,
      date: 'March 22, 2026',
      comment: 'Pure peace. Tatami grass scent, beautiful Zen stone garden, and dedicated Okami-san butler. Words cannot describe this level of craft.',
      hotelId: 'komorebi-onsen-kyoto'
    }
  ],
  'amberwood-manor-cotswolds': [
    {
      id: 'r12',
      guestName: 'Lord Alistair',
      guestType: 'Family',
      rating: 4.8,
      date: 'May 02, 2026',
      comment: 'A gorgeous step back into 1580 Tudor history without losing any modern luxury comfort. Copper rolltop baths and complimentary port felt extraordinarily warm.',
      hotelId: 'amberwood-manor-cotswolds'
    }
  ]
};

/**
 * Generate mock custom calendar statuses for a given month/year context
 * To allow guests to select stay dates, see rate spikes, and check availability
 */
export function getRoomAvailability(roomId: string, monthOffset = 0): {
  date: string;
  status: 'available' | 'booked' | 'limited';
  rateFactor: number;
}[] {
  const dates = [];
  const start = new Date('2026-06-12');
  
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Deterministic rules based on date digits to keep mock calendar consistent
    const day = d.getDate();
    let status: 'available' | 'booked' | 'limited' = 'available';
    let rateFactor = 1.0;
    
    if (day % 7 === 0 || day % 9 === 0) {
      status = 'booked';
    } else if (day % 5 === 0) {
      status = 'limited';
      rateFactor = 1.25; // Surge rate on high-demand dates
    } else if (day % 6 === 0) {
      rateFactor = 1.15; // Semi surge
    } else if (day % 4 === 0) {
      rateFactor = 0.90; // Special low season discount day
    }
    
    dates.push({
      date: dateStr,
      status,
      rateFactor
    });
  }
  return dates;
}
