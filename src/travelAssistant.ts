/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hotel, RoomType } from './types';
import { HOTELS } from './data';

export interface AssistantMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  recommendedHotels?: Hotel[];
  itinerary?: {
    day: string;
    title: string;
    morning: string;
    afternoon: string;
    evening: string;
    diningSpot: string;
    insiderTip: string;
  }[];
}

/**
 * Intelligent client-side AI Butler service
 * Tailors custom hotel recommendations, weather advice, and daily luxury itineraries.
 */
export function getAIButlerResponse(userInput: string, activeHotelContext?: Hotel | null): AssistantMessage {
  const query = userInput.toLowerCase();
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const responseId = `msg-${Date.now()}`;
  
  // Base structures
  let text = '';
  let recommendedHotels: Hotel[] = [];
  let itinerary: AssistantMessage['itinerary'] = undefined;

  // 1. RECOMMENDATION TRIGGERS ("recommend", "suggest", "where should I stay", "spa", "pool", "onsen")
  if (
    query.includes('recommend') || 
    query.includes('suggest') || 
    query.includes('where') || 
    query.includes('spend') || 
    query.includes('trip') ||
    query.includes('onsen') ||
    query.includes('spa') ||
    query.includes('pool') ||
    query.includes('beach') ||
    query.includes('mountain') ||
    query.includes('ski')
  ) {
    if (query.includes('onsen') || query.includes('japan') || query.includes('kyoto') || query.includes('mindful')) {
      recommendedHotels = HOTELS.filter(h => h.id === 'komorebi-onsen-kyoto');
      text = `As your personal Aventine concierge, I highly advise **Komorebi Onsen & Ryokan** in Kyoto, Japan. It is an extraordinary sanctuary centered on mindfulness, showcasing cedar hot spring baths, exquisite Zen gardens, and Kaiseki fine dining. Here is a recommended luxury layout for you:`;
    } else if (query.includes('snow') || query.includes('ski') || query.includes('mountain') || query.includes('zermatt') || query.includes('swiss')) {
      recommendedHotels = HOTELS.filter(h => h.id === 'aura-chalet-zermatt');
      text = `For an unmatched high-altitude resort, I recommend **Aura Chalet & Alpine Spa** in Zermatt, Switzerland. Wake up directly facing the historic Matterhorn Peak, enjoy ski-in/ski-out Alpine luxury, and relax in stone fireplaces. Here is your tailored recommendation:`;
    } else if (query.includes('beach') || query.includes('tropical') || query.includes('bali') || query.includes('ocean')) {
      recommendedHotels = HOTELS.filter(h => h.id === 'grand-horizon-bali');
      text = `For coastal paradise, nothing compares to the pristine **Grand Horizon Resort** in Bali, Indonesia. This clifftop sanctuary features spectacular overwater bungalows, holistic seaside wellness treatment, and infinity pools mirroring the Indian Ocean.`;
    } else if (query.includes('romantic') || query.includes('paris') || query.includes('france') || query.includes('classical')) {
      recommendedHotels = HOTELS.filter(h => h.id === 'opera-boutique-paris');
      text = `If romance and historical architecture call to you, I present **L’Opéra Boutique Hotel** on Rue de la Paix, Paris. neoclassical gold trims, velvet salons, and private balconies overlooking historical opera rooftops compose the perfect romantic retreat.`;
    } else if (query.includes('history') || query.includes('manor') || query.includes('england') || query.includes('cotswolds') || query.includes('tea')) {
      recommendedHotels = HOTELS.filter(h => h.id === 'amberwood-manor-cotswolds');
      text = `Step back to Tudor heritage with **The Amberwood Estates Manor** in the Cotswolds, UK. This honey-stoned 1580 Manor features copper rolltop baths, complimentary vintage evening port, and manicured private rose gardens.`;
    } else if (query.includes('city') || query.includes('shopping') || query.includes('ny') || query.includes('york') || query.includes('skyline')) {
      recommendedHotels = HOTELS.filter(h => h.id === 'metropolitan-suites-ny');
      text = `Embrace urban energy with **Metropolitan Luxury Suites** overlooking Fifth Avenue, New York. Featuring towering floor-to-ceiling skylines, brutalist velvet living, and private member rooftop lounge workspaces.`;
    } else {
      // General match based on budget or rating
      recommendedHotels = HOTELS.slice(0, 2);
      text = `I have selected our absolute highest-rated retreats: **The Grand Horizon Resort** in Bali and **Komorebi Onsen Ryokan** in Kyoto. Both feature verified perfect scores of 4.9+ stars and pristine wellness programs:`;
    }
    return { id: responseId, sender: 'ai', text, timestamp: now, recommendedHotels };
  }

  // 2. ITINERARY SEARCH TRIGGERS ("itinerary", "plan", "schedule", "days", "guide")
  if (query.includes('itinerary') || query.includes('plan') || query.includes('schedule') || query.includes('days') || query.includes('guide')) {
    let locationName = activeHotelContext ? activeHotelContext.city : 'Bali, Indonesia';
    if (query.includes('zermatt') || query.includes('swiss') || query.includes('switzerland')) locationName = 'Zermatt';
    if (query.includes('paris') || query.includes('france')) locationName = 'Paris';
    if (query.includes('kyoto') || query.includes('japan')) locationName = 'Kyoto';
    if (query.includes('york') || query.includes('ny')) locationName = 'New York';
    if (query.includes('cotswolds') || query.includes('uk') || query.includes('england')) locationName = 'Cotswolds';

    text = `I have custom-designed a 3-Day Luxury Itinerary for **${locationName}** tailored precisely for a high-end, slow-travel schedule:`;
    
    if (locationName === 'Zermatt') {
      itinerary = [
        {
          day: 'Day 1',
          title: 'Arrival & Matterhorn Glow',
          morning: 'VIP transfer to Zermatt (car-free zone), greet by chalet butler with organic Swiss hot chocolate.',
          afternoon: 'Stroll through historical wooden Riedstrasse rooftops, check-in to your Matterhorn Panorama Suite.',
          evening: 'Private high-altitude alpine sauna bath, followed by warm Swiss fondue in front of your stone fireplace.',
          diningSpot: 'L’Alpage Alpine Bistro',
          insiderTip: 'Request premium cedar firewood at 5:00 PM for a prolonged bedtime fireside ash-glow.'
        },
        {
          day: 'Day 2',
          title: 'Summit Skiing & Spa Healing',
          morning: 'Direct ski-in path from chalet doorstep up to Matterhorn Glacier Paradise; fresh dry powder ski.',
          afternoon: 'Herbal glacier-water massage therapy at the Alpine Spa, followed by mountain-view heated whirlpool relaxation.',
          evening: 'Multi-course Michelin dining matching local organic cheeses and premium Swiss wines.',
          diningSpot: 'Chalet Aura Garden Lodge',
          insiderTip: 'The outdoor dynamic hot tub provides the best vantage point for Matterhorn photos at exactly 3:45 PM.'
        },
        {
          day: 'Day 3',
          title: 'Sunrise Snowshoeing & Farewell Port',
          morning: 'Strap in for a private snowshoe walk through snow-laden pine forest with local naturalist guide.',
          afternoon: 'Afternoon high tea accompanied by warm Swiss pastries in the library fireside.',
          evening: 'VIP express shuttle transfer back to Zurich airport, pre-stocked with artisan chocolates.',
          diningSpot: 'Riedstrasse Tearoom',
          insiderTip: 'Ask the butler to vacuum-compress your ski gear so your luggage remains lightweight.'
        }
      ];
    } else if (locationName === 'Kyoto') {
      itinerary = [
        {
          day: 'Day 1',
          title: 'Bamboo Forest Entry & Cedar Onsen Soaking',
          morning: 'Private chauffeur collection from Kyoto Station. Arrival at ryokan; presented traditional matcha tea by your Okami-san.',
          afternoon: 'Check-in to your Bamboo Path Pavilion. Enjoy a private moss garden stroll with forest breeze.',
          evening: 'Slow therapeutic cedar bath soak in mineral-rich hot spring onsen, wearing yukata robes.',
          diningSpot: 'In-Room kaiseki pavilion',
          insiderTip: 'Add seasonal yuzu peels to your cedar wood tub to elevate fragrance and blood warmth.'
        },
        {
          day: 'Day 2',
          title: 'Historical Temples & Matcha Whisking',
          morning: 'Private sunup guide visit to Yasaka Temple to beat crowds, capturing morning mist photos.',
          afternoon: 'Private tea whisker masterclass inside our 15th-century ancestral tea pavilion.',
          evening: 'Traditional 9-course Kaiseki gastronomer banquet highlighting handpicked local ingredients and gold-leaf sake.',
          diningSpot: 'Komorebi Dining Chamber',
          insiderTip: 'For temple photography, the 6:00 AM light filtering through bamboo paths creates perfect silhouettes.'
        },
        {
          day: 'Day 3',
          title: 'Zen Stone Meditation & Departure Blessing',
          morning: 'Dawn Zen calligraphy session guided by resident monk; learn slow ink brush rhythms.',
          afternoon: 'Indulge in a hot stone massage blended with Kyoto pine essential oils.',
          evening: 'Farewell bento receipt, high-speed Shinkansen VIP transfer tickets presented by concierge.',
          diningSpot: 'Yasaka Shofu Bistro',
          insiderTip: 'Ask the butler to ship any purchased ancestral ceramics ahead directly to your home country.'
        }
      ];
    } else {
      // General tropical / Balinese default itinerary
      itinerary = [
        {
          day: 'Day 1',
          title: 'Tropical Sanctuary Welcome',
          morning: 'Luxury limousine airport pickup with iced coconut towels. Welcome by private resort butler.',
          afternoon: 'Check-in to Horizon Overwater Villa. Welcome custom mocktail on the private sun deck.',
          evening: 'Candlelight seafood banquet under Balinese stars on a private white sand jetty.',
          diningSpot: 'The Wave Clifftop Seafood',
          insiderTip: 'The resort glass floor panels reflect stunning turquoise lagoon fish under custom blue night lights at 9:00 PM.'
        },
        {
          day: 'Day 2',
          title: 'Holistic Spa & Surfing Lagoon',
          morning: 'Private surfing session with pro champion at Nusa Dua beach lagoon.',
          afternoon: '3-hour Balinese floral aromatherapy massage and traditional organic skin wrap treatment.',
          evening: 'Fine Balinese dining featuring wild spices and local dancers in the tropical gardens.',
          diningSpot: 'The Grand Horizon Pavilion',
          insiderTip: 'Request organic papaya smoothie bowls brought by butler to your villa pool at 8:00 AM.'
        },
        {
          day: 'Day 3',
          title: 'Sacred Temple Tour & Departure Blessing',
          morning: 'Private guided sunset temple walk with traditional flower lei blessing.',
          afternoon: 'Souvenir curation in local creative woodcarving boutiques, accompanied by chauffeur.',
          evening: 'Check-out receipt service, transfer back with premium luggage tags.',
          diningSpot: 'Nusa Dua Botanical Garden Grill',
          insiderTip: 'Save your customized room booking confirmation code to unlock a double room upgrade for future trips.'
        }
      ];
    }
    return { id: responseId, sender: 'ai', text, timestamp: now, itinerary };
  }

  // 3. WEATHER / PACKING TIPS
  if (query.includes('weather') || query.includes('climate') || query.includes('pack') || query.includes('clothes') || query.includes('temperature')) {
    text = `🌿 **AventineStay Travel & Weather Outlook**:
    \n- **Kyoto / Bali**: Mild subtropical weather. Unmatched for garden sunset strolling. Pack premium relaxed linens, cotton yukatas, luxury sandals, and lightweight UV protectors.
    \n- **Zermatt Alps**: Fresh crisp winds. Sunny skies with glacier cool breezes. We recommend a cashmere knit scarf, premium moisture-wicking layers, robust polarized eyewear, and outdoor walking boots.
    \n- **Manhattan / Paris / Cotswolds**: Beautiful seasonal climate. Perfect for street walking. Bring an elegant woolen coat, leather ankle boots, and a matching umbrella.
    \n*All Aventine rooms are fully climate-controlled via automatic air purifiers for deep bedroom peace.*`;
    return { id: responseId, sender: 'ai', text, timestamp: now };
  }

  // 4. PRICE / COST / REFUNDS
  if (query.includes('price') || query.includes('cost') || query.includes('expensive') || query.includes('cheap') || query.includes('refund') || query.includes('cancel')) {
    text = `💳 **AventineStay Absolute Pricing Guard**:
    \n- **Rates**: Standard chamber rates range from **$180 to $350 per night**, and upgrade to multiplier scales for luxurious executive suites and overwater villas.
    \n- **Taxation**: Includes local sustainability eco-support and luxury resort lodging tax set at a flat 12% to offset local impacts.
    \n- **Cancellation Guarantee**: Free cancellation up to **24 hours prior to check-in** with 100% money back to your original payment method. Absolutely zero hidden penalty sheets or service charges.`;
    return { id: responseId, sender: 'ai', text, timestamp: now };
  }

  // 5. DEFAULT HELPFUL BUTLER RESPONSES
  text = `Good day! I am your Aventine concierge, here to craft a flawless stay. 
  \nHow can I serve you today? You might ask me to:
  \n- 🌴 **"Recommend a romantic spot in Paris or Zen Onsen in Kyoto"**
  \n- 📅 **"Design a custom 3-day travel itinerary for Zermatt"**
  \n- 🧥 **"What should I pack for hiking in the Swiss mountains?"**
  \n- ✨ **"Explain the eco-tax and cancellation benefits"**`;

  return { id: responseId, sender: 'ai', text, timestamp: now };
}
