/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RoomType {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number; // multiplies base rate
  capacity: number;
  bedType: string;
  size: string; // e.g. "35 m²"
  amenities: string[];
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  description: string;
  basePrice: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  galleryUrls: string[];
  amenities: string[];
  rooms: RoomType[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SearchCriteria {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface FilterState {
  priceRange: [number, number];
  minRating: number;
  selectedAmenities: string[];
  sortBy: 'recommended' | 'priceLowToHigh' | 'priceHighToLow' | 'rating';
}

export interface Reservation {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelCity: string;
  hotelCountry: string;
  hotelImageUrl: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
  addOnBreakfast: boolean;
  addOnShuttle: boolean;
  totalNights: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
}
