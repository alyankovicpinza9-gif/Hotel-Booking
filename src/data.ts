/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hotel } from './types';

export const POPULAR_LOCATIONS = [
  'Bali, Indonesia',
  'Zermatt, Switzerland',
  'Paris, France',
  'New York, USA',
  'Kyoto, Japan',
  'Cotswolds, UK'
];

export const ALL_AMENITIES = [
  'Pool',
  'Spa',
  'Gym',
  'WiFi',
  'Restaurant',
  'Beach Access',
  'Ski-in/Ski-out',
  'Rooftop Bar',
  'Room Service',
  'Onsen',
  'Tea Room',
  'Free Parking'
];

export const HOTELS: Hotel[] = [
  {
    id: 'grand-horizon-bali',
    name: 'The Grand Horizon Resort',
    city: 'Bali',
    country: 'Indonesia',
    address: 'Jl. Raya Nusa Dua No. 8, Nusa Dua, Bali',
    description: 'Immerse yourself in pure luxury where the turquoise ocean meets white sands. The Grand Horizon offers exquisite private clifftop infinity pools, revitalizing holistic spa therapies, and gourmet seaside culinary experiences under the tropical stars.',
    basePrice: 280,
    rating: 4.9,
    reviewCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Pool', 'Spa', 'Gym', 'WiFi', 'Beach Access', 'Restaurant', 'Room Service'],
    rooms: [
      {
        id: 'bali-standard',
        name: 'Garden Terrace Suite',
        description: 'Vibrant, handcrafted Balinese wood finishes with glass-walled views of lush private tropical gardens, completed with a rain-shower.',
        priceMultiplier: 1.0,
        capacity: 2,
        bedType: 'King bed',
        size: '42 m²',
        amenities: ['Private Balcony', 'Mini-bar', 'Espresso Machine', 'Air Conditioning']
      },
      {
        id: 'bali-deluxe',
        name: 'Oceanfront Club Room',
        description: 'Wake up to the sounds of waves. Offers an expansive private balcony, marble freestanding bathtub, and club lounge access.',
        priceMultiplier: 1.4,
        capacity: 2,
        bedType: 'Club King bed',
        size: '56 m²',
        amenities: ['Ocean View', 'Freestanding Tub', 'Club Lounge Access', 'Daybed']
      },
      {
        id: 'bali-penthouse',
        name: 'Horizon Overwater Villa',
        description: 'The ultimate sanctuary. Built on stilts above the calm lagoon, featuring a private plunge pool, glass floor panels, and 24-hour butler service.',
        priceMultiplier: 2.2,
        capacity: 4,
        bedType: '2 King beds',
        size: '120 m²',
        amenities: ['Private Pool', 'Butler Service', 'Glass Flooring', 'Hammock', 'Overwater Deck']
      }
    ],
    coordinates: {
      lat: -8.8034,
      lng: 115.2286
    }
  },
  {
    id: 'aura-chalet-zermatt',
    name: 'Aura Chalet & Alpine Spa',
    city: 'Zermatt',
    country: 'Switzerland',
    address: 'Riedstrasse 54, 3920 Zermatt',
    description: 'A cozy boutique chalet nestled snugly at the foot of the magnificent Matterhorn. Embrace rustic modern wood interiors, warmth by stone fireplaces, high-altitude infinity pools, and ski-in/ski-out Alpine accessibility.',
    basePrice: 350,
    rating: 4.8,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Spa', 'Gym', 'WiFi', 'Ski-in/Ski-out', 'Restaurant', 'Free Parking', 'Room Service'],
    rooms: [
      {
        id: 'zermatt-standard',
        name: 'Alpine Superior Room',
        description: 'Soft wool textiles and fragrant larch wood panelling. Spotlights premium views of Zermatt village roofs and a comfortable lounge corner.',
        priceMultiplier: 1.0,
        capacity: 2,
        bedType: 'Queen bed',
        size: '34 m²',
        amenities: ['Floor Heating', 'Smart TV', 'Premium Teas', 'Mountain-view Balcony']
      },
      {
        id: 'zermatt-deluxe',
        name: 'Matterhorn Panorama Suite',
        description: 'Stellar, unobstructed views of the Matterhorn Peak from your bed. Features a beautiful open-concept stone fireplace and private steam shower.',
        priceMultiplier: 1.5,
        capacity: 2,
        bedType: 'King bed',
        size: '50 m²',
        amenities: ['Fireplace', 'Steam Shower', 'Bose Sound System', 'Tasting Wine Bar']
      },
      {
        id: 'zermatt-penthouse',
        name: 'Summit Family Loft',
        description: 'Multi-level penthouse loft with double cathedral ceilings, a personal outdoor hot tub on the terrace, and exquisite designer kitchen.',
        priceMultiplier: 2.5,
        capacity: 6,
        bedType: '2 King beds, 2 Twin beds',
        size: '145 m²',
        amenities: ['Hot Tub on Balcony', 'Full Kitchen', 'Cathedral Ceilings', 'Loft Library', 'Private Chef Optional']
      }
    ],
    coordinates: {
      lat: 46.0207,
      lng: 7.7491
    }
  },
  {
    id: 'opera-boutique-paris',
    name: 'L’Opéra Boutique Hotel',
    city: 'Paris',
    country: 'France',
    address: '12 Rue de la Paix, 75002 Paris',
    description: 'A masterpiece of Parisian neoclassical architecture located steps from the Palais Garnier. Marrying rich velvets, golden brass details, and handpicked artwork, L’Opéra is an classic setting of Parisian elegance, complete with courtyard espresso bars.',
    basePrice: 210,
    rating: 4.7,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1549294413-26f195afcbce?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1549294413-26f195afcbce?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['WiFi', 'Room Service', 'Restaurant', 'Spa', 'Tea Room'],
    rooms: [
      {
        id: 'paris-standard',
        name: 'Classic Boudoir Room',
        description: 'Quaint and intimate French-styled room overlooking the internal cobblestone courtyard. Traditional crystal chandelier and silk drapes.',
        priceMultiplier: 1.0,
        capacity: 2,
        bedType: 'Double bed',
        size: '22 m²',
        amenities: ['L’Occitane Toiletries', 'Nespresso Machine', 'Courtyard View', 'Writing Desk']
      },
      {
        id: 'paris-deluxe',
        name: 'Opera Balcony Room',
        description: 'Authentic Parisian wrought-iron balcony looking over the lively Rue de la Paix, excellent for enjoying breakfast at sunrise.',
        priceMultiplier: 1.35,
        capacity: 2,
        bedType: 'King bed',
        size: '32 m²',
        amenities: ['French Balcony', 'Plush Bathrobes', 'Bespoke Artworks', 'Satin Slip sheets']
      },
      {
        id: 'paris-penthouse',
        name: 'The Imperial Parisian Suite',
        description: 'Stretching atop the building with spectacular views of the Eiffel Tower, featuring historic gilded mouldings, separate salon, and baby grand piano.',
        priceMultiplier: 2.1,
        capacity: 3,
        bedType: 'King bed, 1 Single daybed',
        size: '75 m²',
        amenities: ['Eiffel Tower View', 'Private Salon', 'Baby Grand Piano', 'Chambermaid Service']
      }
    ],
    coordinates: {
      lat: 48.8693,
      lng: 2.3304
    }
  },
  {
    id: 'metropolitan-suites-ny',
    name: 'Metropolitan Luxury Suites',
    city: 'New York',
    country: 'USA',
    address: '522 Fifth Avenue, New York, NY 10036',
    description: 'Elevated high above dynamic Midtown Manhattan, Metropolitan Luxury Suites provides dramatic floor-to-ceiling skyline panoramas. Boasting a striking brutalist design, a private member rooftop lounge, and highly personalized executive workspaces.',
    basePrice: 310,
    rating: 4.6,
    reviewCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Gym', 'WiFi', 'Rooftop Bar', 'Restaurant', 'Room Service'],
    rooms: [
      {
        id: 'ny-standard',
        name: 'Urban Studio Room',
        description: 'Sleek industrial loft vibes with exposed brick layout and steel grid windows overlooking Fifth Avenue traffic lights.',
        priceMultiplier: 1.0,
        capacity: 2,
        bedType: 'Queen bed',
        size: '28 m²',
        amenities: ['Smart Workspace', 'Rain shower', 'Blackout Shades', 'Vocal Controller/Alexa']
      },
      {
        id: 'ny-deluxe',
        name: 'Empire Premium Suite',
        description: 'Corner suite with jaw-dropping dual-aspect panoramas of the Empire State Building. Beautifully fitted with leather sofas and marble wet-bar.',
        priceMultiplier: 1.45,
        capacity: 2,
        bedType: 'King bed',
        size: '48 m²',
        amenities: ['Skyline Panorama', 'Marble Wet-bar', 'Walk-in Closet', 'Home Theater Soundbar']
      },
      {
        id: 'ny-penthouse',
        name: 'Billionaire Skyline Penthouse',
        description: 'Occupies the entire 42nd floor, showcasing wraparound 360° views of Manhattan, a private pool-table, personal exercise gym, and helipad-shuttle service.',
        priceMultiplier: 3.2,
        capacity: 4,
        bedType: '2 King beds',
        size: '200 m²',
        amenities: ['360° View', 'Private Gym Room', 'Pool Table', 'Wine Cellar Cabinet', 'VIP Concierge']
      }
    ],
    coordinates: {
      lat: 40.7553,
      lng: -73.9808
    }
  },
  {
    id: 'komorebi-onsen-kyoto',
    name: 'Komorebi Onsen & Ryokan',
    city: 'Kyoto',
    country: 'Japan',
    address: 'Kyoto-shi, Higashiyama-ku, Yasaka-dori 34',
    description: 'An oasis of profound mindfulness and peace in Kyoto. Komorebi features traditional tatami sleeping mats, peaceful stone gardens layered in maple trees, authentic multi-course kaiseki dining, and healing warm natural mineral onsen therapeutic waters.',
    basePrice: 260,
    rating: 4.95,
    reviewCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Spa', 'Onsen', 'WiFi', 'Restaurant', 'Tea Room'],
    rooms: [
      {
        id: 'kyoto-standard',
        name: 'Traditional Tatami Room',
        description: 'Authentic Japanese rush-grass floor mats, sliding paper fusuma screens, and high-quality premium hand-pressed futon bedding.',
        priceMultiplier: 1.0,
        capacity: 2,
        bedType: '2 Futon beds',
        size: '36 m²',
        amenities: ['Matcha Tea Set', 'Yukata Robes', 'Garden View Courtyard', 'Soaking Cedar Tub']
      },
      {
        id: 'kyoto-deluxe',
        name: 'Bamboo Path Pavilion',
        description: 'Spacious pavilion featuring sliding glass panels that open directly onto a secret bamboo forest pathway, with private outdoor cedar wood onsen tub.',
        priceMultiplier: 1.45,
        capacity: 2,
        bedType: '2 Premium Futon beds',
        size: '52 m²',
        amenities: ['Private Outdoor Hot Spring', 'Private Zen Veranda', 'Kaiseki Dinner In-Room', 'Yukata & Geta Sets']
      },
      {
        id: 'kyoto-penthouse',
        name: 'Imperial Zen Garden Villa',
        description: 'Full detached ancestral guest-villa containing an exquisite moss garden, deep private natural hot-spring rock pool, separate tea pavilion, and private Koto master performances.',
        priceMultiplier: 2.4,
        capacity: 4,
        bedType: '4 Futon beds / 2 Master chambers',
        size: '110 m²',
        amenities: ['Private Mineral Rock Onsen', 'Tea Pavilion Room', 'Moss Garden View', 'Dedicated Okami-san Butler']
      }
    ],
    coordinates: {
      lat: 34.9961,
      lng: 135.7772
    }
  },
  {
    id: 'amberwood-manor-cotswolds',
    name: 'The Amberwood Estates Manor',
    city: 'Cotswolds',
    country: 'UK',
    address: 'Chipping Campden, Cotswolds, Gloucestershire, GL55 6BT',
    description: 'An exquisite, honey-colored Elizabethan stone manor estate dating from 1580. Spanning rolling green British estates, manicured rose bushes, cozy afternoon tea drawing chambers, and hearty traditional woodfire dining tables.',
    basePrice: 180,
    rating: 4.5,
    reviewCount: 64,
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    galleryUrls: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549294413-26f195afcbce?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['WiFi', 'Tea Room', 'Free Parking', 'Restaurant'],
    rooms: [
      {
        id: 'cotswolds-standard',
        name: 'The Coach House Room',
        description: 'Charming country cottage aesthetic with exposed oak beams, floral wallpaper trims, and warm fireside armchairs.',
        priceMultiplier: 1.0,
        capacity: 2,
        bedType: 'Four-poster Queen bed',
        size: '30 m²',
        amenities: ['Antique Wardrobe', 'Sherry Decanter', 'Rose Garden View', 'Organic Wool Blankets']
      },
      {
        id: 'cotswolds-deluxe',
        name: 'Lord Amberwood Chamber',
        description: 'The manor’s original master bedroom, with a grand four-poster mahogany king bed, copper rolltop bath, and stone fireplace.',
        priceMultiplier: 1.4,
        capacity: 2,
        bedType: 'Four-poster King bed',
        size: '46 m²',
        amenities: ['Copper Rolltop Bathtub', 'Open Fireplace', 'Estate Panoramic View', 'Complimentary Evening Port']
      }
    ],
    coordinates: {
      lat: 52.0519,
      lng: -1.7828
    }
  }
];
