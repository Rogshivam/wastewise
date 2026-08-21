import type { 
  SmartBin, 
  WasteClassificationResult, 
  EcoReward, 
  LeaderboardUser, 
  CleanupEvent, 
  SortingItem, 
  PickupRequest 
} from '../types';

export const INITIAL_SMART_BINS: SmartBin[] = [
  {
    id: 'BIN-101',
    name: 'Tech Central Smart Pod #1',
    location: 'Cyber Gateway & 4th Ave',
    zone: 'Tech Park',
    wasteType: 'Plastic & Cans',
    fillPercentage: 88,
    status: 'critical',
    temperatureCelsius: 23,
    batteryLevel: 94,
    lastEmptied: '6 hours ago',
    odorIndex: 'Low',
    latitude: 37.7749,
    longitude: -122.4194
  },
  {
    id: 'BIN-102',
    name: 'Downtown Plaza Eco Hub',
    location: 'Civic Center Metro Station',
    zone: 'Downtown Hub',
    wasteType: 'Paper & Cardboard',
    fillPercentage: 45,
    status: 'optimal',
    temperatureCelsius: 21,
    batteryLevel: 88,
    lastEmptied: '2 hours ago',
    odorIndex: 'Low',
    latitude: 37.7793,
    longitude: -122.4182
  },
  {
    id: 'BIN-103',
    name: 'Greenway Market Bio-Bin',
    location: 'Organic Farmers Pavilion',
    zone: 'Residential West',
    wasteType: 'Organic Food',
    fillPercentage: 74,
    status: 'moderate',
    temperatureCelsius: 26,
    batteryLevel: 91,
    lastEmptied: '12 hours ago',
    odorIndex: 'Moderate',
    latitude: 37.7699,
    longitude: -122.4469
  },
  {
    id: 'BIN-104',
    name: 'Harbor Pier E-Depot',
    location: 'Pier 39 Recycling Bay',
    zone: 'Harbor District',
    wasteType: 'E-Waste',
    fillPercentage: 92,
    status: 'critical',
    temperatureCelsius: 22,
    batteryLevel: 79,
    lastEmptied: '1 day ago',
    odorIndex: 'Low',
    latitude: 37.8087,
    longitude: -122.4098
  },
  {
    id: 'BIN-105',
    name: 'Northgate University Quad',
    location: 'Science Library Courtyard',
    zone: 'North District',
    wasteType: 'Plastic & Cans',
    fillPercentage: 35,
    status: 'optimal',
    temperatureCelsius: 20,
    batteryLevel: 98,
    lastEmptied: '4 hours ago',
    odorIndex: 'Low',
    latitude: 37.7885,
    longitude: -122.4072
  },
  {
    id: 'BIN-106',
    name: 'Sunset Community Center',
    location: '24th Ave & Judah St',
    zone: 'Residential West',
    wasteType: 'Mixed Municipal',
    fillPercentage: 62,
    status: 'moderate',
    temperatureCelsius: 22,
    batteryLevel: 85,
    lastEmptied: '18 hours ago',
    odorIndex: 'Low',
    latitude: 37.7615,
    longitude: -122.4820
  }
];

export const DEMO_SCAN_PRESETS: WasteClassificationResult[] = [
  {
    id: 'SCAN-01',
    name: 'PET Mineral Water Bottle (500ml)',
    category: 'recyclable',
    confidence: 98.4,
    recyclabilityScore: 95,
    co2SavedKg: 0.28,
    ecoPoints: 25,
    materialType: 'Polyethylene Terephthalate (#1 PET)',
    binColor: 'Blue (Recycle)',
    instructions: [
      'Empty any residual liquid or drink',
      'Remove cap or leave attached according to local curbside policy',
      'Crush bottle lightly to reduce bin volume by 60%',
      'Deposit in the Blue Dry Recyclables Bin'
    ],
    upcycleTip: 'Can be converted into durable planter pots or seedling starter trays.',
    imageThumbnail: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'SCAN-02',
    name: 'Lithium-Ion Rechargeable Battery',
    category: 'hazardous',
    confidence: 96.8,
    recyclabilityScore: 82,
    co2SavedKg: 1.45,
    ecoPoints: 80,
    materialType: 'Lithium-Cobalt Battery (E-Hazard)',
    binColor: 'Red (Hazardous)',
    instructions: [
      'DO NOT put in normal household trash (fire hazard)',
      'Cover positive terminal with transparent tape to prevent short circuits',
      'Store in a cool, non-conductive container',
      'Drop at designated E-Waste kiosk or request doorstep e-pickup'
    ],
    upcycleTip: 'Valuable minerals (cobalt, lithium, nickel) will be extracted in certified pyrometallurgical facilities.',
    imageThumbnail: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'SCAN-03',
    name: 'Organic Fruit & Vegetable Peels',
    category: 'organic',
    confidence: 99.1,
    recyclabilityScore: 100,
    co2SavedKg: 0.62,
    ecoPoints: 35,
    materialType: 'Biodegradable Compostable Biomass',
    binColor: 'Green (Organic)',
    instructions: [
      'Ensure free of plastic stickers or twist ties',
      'Can be composted at home or placed into the Green Organic Bin',
      'Mix with dry leaves/shredded cardboard for optimal nitrogen-carbon balance'
    ],
    upcycleTip: 'Ferment citrus peels with brown sugar and water to make chemical-free organic multi-surface cleaner!',
    imageThumbnail: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'SCAN-04',
    name: 'Corrugated Shipping Box',
    category: 'recyclable',
    confidence: 97.9,
    recyclabilityScore: 98,
    co2SavedKg: 0.85,
    ecoPoints: 40,
    materialType: 'Unbleached Kraft Pulp Cardboard',
    binColor: 'Blue (Recycle)',
    instructions: [
      'Remove packing tape and adhesive shipping labels',
      'Flatten completely before placing into bin',
      'Keep dry; wet cardboard degrades paper fibers and invites mold'
    ],
    upcycleTip: 'Use as weed-suppressing sheet mulch in garden beds underneath woodchips.',
    imageThumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'SCAN-05',
    name: 'Smartphone Logic Board & Chassis',
    category: 'e-waste',
    confidence: 95.2,
    recyclabilityScore: 88,
    co2SavedKg: 3.20,
    ecoPoints: 120,
    materialType: 'Complex Printed Circuit Board & Precious Metals',
    binColor: 'Yellow (E-Waste)',
    instructions: [
      'Factory reset device and perform cryptographic data wipe',
      'Remove SIM card and external micro-SD cards',
      'Schedule a verified e-waste pickup for secure recycling certificates'
    ],
    upcycleTip: 'Recovers gold, copper, silver, and palladium for circular electronics manufacturing.',
    imageThumbnail: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80'
  }
];

export const INITIAL_PICKUPS: PickupRequest[] = [
  {
    id: 'REQ-8902',
    category: 'Electronics & Appliances',
    date: '2026-08-23',
    timeSlot: '10:00 AM - 12:00 PM',
    estimatedWeightKg: 14.5,
    address: '742 Evergreen Terrace, Apt 4B',
    specialNotes: 'Old microwave and 2 broken laptop batteries. Packed in carton box.',
    status: 'Scheduled',
    driverName: 'Marcus Vance',
    driverPhone: '+1 (555) 392-1104',
    ecoPointsEarned: 150,
    createdAt: 'Yesterday'
  },
  {
    id: 'REQ-8751',
    category: 'Bulk Cardboard & Packaging',
    date: '2026-08-19',
    timeSlot: '02:00 PM - 04:00 PM',
    estimatedWeightKg: 28.0,
    address: '742 Evergreen Terrace, Apt 4B',
    specialNotes: 'Moving boxes bundled with jute rope.',
    status: 'Collected',
    driverName: 'Elena Rostova',
    driverPhone: '+1 (555) 829-4412',
    ecoPointsEarned: 220,
    createdAt: '3 days ago'
  }
];

export const ECO_REWARDS: EcoReward[] = [
  {
    id: 'RWD-01',
    title: '$15 Zero-Waste Supermarket Voucher',
    brand: 'GreenRoots Market',
    costPoints: 350,
    category: 'Vouchers',
    description: 'Valid for organic produce, bulk pantry items, and package-free goods across all 18 store locations.',
    discountCode: 'ECO-ROOTS-15OFF',
    iconName: 'ShoppingBag',
    tag: 'Popular',
    stockAvailable: 42
  },
  {
    id: 'RWD-02',
    title: 'Plant 3 Native Mangrove Trees',
    brand: 'Eden Reforestation Project',
    costPoints: 200,
    category: 'Tree Planting',
    description: 'Directly funds the planting and 5-year monitoring of 3 coastal mangrove trees to capture ~300kg CO₂.',
    discountCode: 'TREE-CERT-89X9',
    iconName: 'Trees',
    tag: 'High Impact',
    stockAvailable: 999
  },
  {
    id: 'RWD-03',
    title: 'Insulated Bamboo Thermal Tumbler (500ml)',
    brand: 'EcoVessel',
    costPoints: 500,
    category: 'Eco Products',
    description: 'Double-walled vacuum insulated bottle made with organic bamboo and food-grade 18/8 stainless steel.',
    discountCode: 'BAMBOO-FREESHIP',
    iconName: 'Coffee',
    tag: 'Bestseller',
    stockAvailable: 18
  },
  {
    id: 'RWD-04',
    title: '1-Month Unlimited Metro Transit Pass',
    brand: 'City Transit Authority',
    costPoints: 850,
    category: 'Clean Energy',
    description: '100% electrified city subway and zero-emission electric bus rides for an entire calendar month.',
    discountCode: 'METRO-CLEAN-PASS',
    iconName: 'Train',
    tag: 'Zero Emission',
    stockAvailable: 12
  },
  {
    id: 'RWD-05',
    title: 'Solar Power Bank 20,000mAh',
    brand: 'SolCore Gear',
    costPoints: 1200,
    category: 'Eco Products',
    description: 'High-efficiency monocrystalline solar panels with dual fast-charging USB-C PD outputs.',
    discountCode: 'SOLAR-20K-GIFT',
    iconName: 'Sun',
    tag: 'Premium',
    stockAvailable: 8
  }
];

export const LEADERBOARD_DATA: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Dr. Sophia Thorne',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    points: 4820,
    streakDays: 48,
    wasteDivertedKg: 312.4,
    badge: '🏆 Planet Champion'
  },
  {
    rank: 2,
    name: 'Kai Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    points: 4150,
    streakDays: 35,
    wasteDivertedKg: 284.1,
    badge: '🥈 Circular Hero'
  },
  {
    rank: 3,
    name: 'Amara Okafor',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    points: 3910,
    streakDays: 29,
    wasteDivertedKg: 245.9,
    badge: '🥉 Zero-Waste Pro'
  },
  {
    rank: 4,
    name: 'Alex Rivera (You)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    points: 2450,
    streakDays: 14,
    wasteDivertedKg: 168.2,
    badge: '🌱 Eco Warrior',
    isCurrentUser: true
  },
  {
    rank: 5,
    name: 'Maya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    points: 2190,
    streakDays: 19,
    wasteDivertedKg: 142.0,
    badge: '🌿 Green Guardian'
  },
  {
    rank: 6,
    name: 'Lucas Dupont',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    points: 1980,
    streakDays: 12,
    wasteDivertedKg: 129.5,
    badge: '♻️ Recycler'
  }
];

export const CLEANUP_EVENTS: CleanupEvent[] = [
  {
    id: 'EVT-01',
    title: 'Ocean Beach Micro-Plastic & Coastal Sweep',
    location: 'Ocean Beach Park Trailhead #4',
    date: 'Saturday, Aug 29, 2026',
    time: '08:30 AM - 12:00 PM',
    organizer: 'Coastal Conservation League',
    participantsCount: 48,
    targetKg: 500,
    isUserRsvp: false,
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
    description: 'Join local marine biologists and eco volunteers to clean debris, count microplastics, and prevent runoff from entering the marine sanctuary.'
  },
  {
    id: 'EVT-02',
    title: 'Presidio Urban Park Trail Restoration',
    location: 'Presidio Main Parade Lawn',
    date: 'Sunday, Sep 6, 2026',
    time: '09:00 AM - 01:00 PM',
    organizer: 'Friends of Urban Parks',
    participantsCount: 32,
    targetKg: 350,
    isUserRsvp: true,
    image: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=600&q=80',
    description: 'Clearing invasive weeds, collecting fallen trash, and installing 4 new solar-powered composting collection bins.'
  },
  {
    id: 'EVT-03',
    title: 'Downtown Alleyways Upcycling Blitz',
    location: 'SOMA Creative Arts District',
    date: 'Saturday, Sep 12, 2026',
    time: '10:00 AM - 02:00 PM',
    organizer: 'Urban Green Initiatives',
    participantsCount: 26,
    targetKg: 400,
    isUserRsvp: false,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    description: 'Targeted e-waste collection drive and alleyway cleanup with mobile recycling drop-off stations and live community music.'
  }
];

export const SORTING_ENCYCLOPEDIA: SortingItem[] = [
  {
    id: 'SRT-01',
    name: 'Aluminum Soda & Beverage Cans',
    category: 'recyclable',
    binColor: 'Blue (Recycle)',
    canRecycle: true,
    tips: '100% endlessly recyclable without degradation. Rinse lightly and drop in the blue bin.',
    searchTags: ['can', 'tin', 'coke', 'beer', 'soda', 'aluminum', 'metal']
  },
  {
    id: 'SRT-02',
    name: 'Pizza Delivery Boxes (Greasy base)',
    category: 'organic',
    binColor: 'Green (Compost)',
    canRecycle: false,
    tips: 'Grease and cheese contaminate paper recycling. Tear clean lid for paper recycling; compost the oily bottom half.',
    searchTags: ['pizza', 'box', 'cardboard', 'oil', 'food', 'paper']
  },
  {
    id: 'SRT-03',
    name: 'Fluorescent CFL & LED Lightbulbs',
    category: 'hazardous',
    binColor: 'Red (Hazardous)',
    canRecycle: true,
    tips: 'Contains toxic mercury vapor and delicate phosphor powder. Must be dropped off at hazardous e-waste hubs.',
    searchTags: ['bulb', 'light', 'lamp', 'cfl', 'fluorescent', 'glass', 'mercury']
  },
  {
    id: 'SRT-04',
    name: 'Coffee Grounds & Paper Filters',
    category: 'organic',
    binColor: 'Green (Organic)',
    canRecycle: true,
    tips: 'High in nitrogen and organic minerals. Great for home compost piles and natural slug deterrent.',
    searchTags: ['coffee', 'filter', 'grounds', 'espresso', 'compost']
  },
  {
    id: 'SRT-05',
    name: 'Styrofoam / Expanded Polystyrene (EPS)',
    category: 'landfill',
    binColor: 'Black (Landfill)',
    canRecycle: false,
    tips: 'Most municipal plants cannot process EPS due to low density. Check local specialized drop-offs or reuse as packing buffer.',
    searchTags: ['styrofoam', 'foam', 'eps', 'packing peanuts', 'takeout']
  },
  {
    id: 'SRT-06',
    name: 'Glass Wine & Sauce Bottles',
    category: 'recyclable',
    binColor: 'Blue (Recycle)',
    canRecycle: true,
    tips: 'Remove metal/cork caps. Glass is 100% recyclable infinitely with zero quality loss.',
    searchTags: ['glass', 'bottle', 'wine', 'sauce', 'jar']
  },
  {
    id: 'SRT-07',
    name: 'Old USB Cables & Phone Chargers',
    category: 'e-waste',
    binColor: 'Yellow (E-Waste)',
    canRecycle: true,
    tips: 'Copper inside wires is high value. Never throw in curbside recycling where cords tangle machinery.',
    searchTags: ['cable', 'charger', 'usb', 'wire', 'phone', 'lightning', 'cord']
  },
  {
    id: 'SRT-08',
    name: 'Expired Prescription Medications & Pills',
    category: 'hazardous',
    binColor: 'Red (Hazardous / Pharmacy Drop)',
    canRecycle: false,
    tips: 'NEVER flush down toilets or sinks as they contaminate municipal aquifers. Return to pharmacy safe dropboxes.',
    searchTags: ['medicine', 'pills', 'drug', 'pharmacy', 'prescription', 'syrup']
  }
];
