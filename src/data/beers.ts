
export interface Beer {
  id: number;
  name: string;
  brewery: string;
  style: string;
  description: string;
  imageUrl: string;
  abv: number; // Alcohol by volume percentage
  ibu: number; // International Bitterness Units
  rating: number; // On a scale of 1-5
  origin: string;
  color: string; // CSS color code or Tailwind color class
}

export const beers: Beer[] = [
  {
    id: 1,
    name: "Hazy Wonder",
    brewery: "Craft Heights",
    style: "New England IPA",
    description: "A juicy, hazy IPA with notes of tropical fruit, citrus, and a smooth finish. Low bitterness with a pillowy mouthfeel.",
    imageUrl: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=800&auto=format&fit=crop",
    abv: 6.8,
    ibu: 45,
    rating: 4.7,
    origin: "California, USA",
    color: "beer-gold"
  },
  {
    id: 2,
    name: "Midnight Stout",
    brewery: "Dark Horse",
    style: "Imperial Stout",
    description: "A rich, complex imperial stout with notes of dark chocolate, espresso, and roasted malt. Silky smooth with a warming finish.",
    imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=800&auto=format&fit=crop",
    abv: 9.2,
    ibu: 70,
    rating: 4.5,
    origin: "Michigan, USA",
    color: "beer-stout"
  },
  {
    id: 3,
    name: "Sunset Amber",
    brewery: "Coastal Brewing",
    style: "Amber Ale",
    description: "A balanced amber ale with caramel malt sweetness and a subtle hop presence. Clean, crisp, and exceptionally drinkable.",
    imageUrl: "https://images.unsplash.com/photo-1555658636-6e4a36218be7?q=80&w=800&auto=format&fit=crop",
    abv: 5.4,
    ibu: 28,
    rating: 4.2,
    origin: "Oregon, USA",
    color: "beer-amber"
  },
  {
    id: 4,
    name: "Citrus Peak",
    brewery: "Alpine Craft",
    style: "West Coast IPA",
    description: "A crisp, bitter West Coast IPA with prominent pine and citrus hop character. Clear and refreshing with a dry finish.",
    imageUrl: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?q=80&w=800&auto=format&fit=crop",
    abv: 7.2,
    ibu: 65,
    rating: 4.4,
    origin: "Washington, USA",
    color: "beer-gold"
  },
  {
    id: 5,
    name: "Farmhouse Saison",
    brewery: "Heritage Fields",
    style: "Saison",
    description: "A traditional farmhouse ale with notes of spice, fruit, and a dry, effervescent finish. Complex yet refreshing.",
    imageUrl: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?q=80&w=800&auto=format&fit=crop",
    abv: 6.1,
    ibu: 25,
    rating: 4.3,
    origin: "Vermont, USA",
    color: "beer-pale"
  },
  {
    id: 6,
    name: "Hoppy Trails",
    brewery: "Mountain View",
    style: "Double IPA",
    description: "A bold double IPA with intense hop aroma and flavor. Notes of pine, tropical fruit, and a firm bitterness.",
    imageUrl: "https://images.unsplash.com/photo-1587582345426-bf07d532efd1?q=80&w=800&auto=format&fit=crop",
    abv: 8.5,
    ibu: 85,
    rating: 4.6,
    origin: "Colorado, USA",
    color: "beer-ipa"
  },
  {
    id: 7,
    name: "Golden Horizon",
    brewery: "Sunny Fields",
    style: "Belgian Tripel",
    description: "A golden Belgian-style tripel with complex fruity esters, spicy phenols, and a deceptively high alcohol content.",
    imageUrl: "https://images.unsplash.com/photo-1600788886212-5c96aabe3756?q=80&w=800&auto=format&fit=crop",
    abv: 8.7,
    ibu: 32,
    rating: 4.5,
    origin: "California, USA",
    color: "beer-gold"
  },
  {
    id: 8,
    name: "Chocolate Porter",
    brewery: "Riverbank",
    style: "Robust Porter",
    description: "A smooth, full-bodied porter with rich chocolate notes, subtle coffee, and a hint of vanilla. Velvety mouthfeel.",
    imageUrl: "https://images.unsplash.com/photo-1614313511387-1a61f0718718?q=80&w=800&auto=format&fit=crop",
    abv: 6.5,
    ibu: 30,
    rating: 4.4,
    origin: "Massachusetts, USA",
    color: "beer-stout"
  }
];

export const getRandomBeer = (): Beer => {
  const randomIndex = Math.floor(Math.random() * beers.length);
  return beers[randomIndex];
};
