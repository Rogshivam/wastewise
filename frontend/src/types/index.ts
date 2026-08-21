export type WasteCategory = 'recyclable' | 'organic' | 'e-waste' | 'hazardous' | 'landfill';

export interface WasteClassificationResult {
  id: string;
  name: string;
  category: WasteCategory;
  confidence: number;
  recyclabilityScore: number; // 0 - 100
  co2SavedKg: number;
  ecoPoints: number;
  materialType: string;
  binColor: 'Blue (Recycle)' | 'Green (Organic)' | 'Yellow (E-Waste)' | 'Red (Hazardous)' | 'Black (General)';
  instructions: string[];
  upcycleTip?: string;
  imageThumbnail: string;
}

export type BinStatus = 'optimal' | 'moderate' | 'critical' | 'collecting';

export interface SmartBin {
  id: string;
  name: string;
  location: string;
  zone: 'North District' | 'Downtown Hub' | 'Tech Park' | 'Residential West' | 'Harbor District';
  wasteType: 'Plastic & Cans' | 'Paper & Cardboard' | 'Organic Food' | 'E-Waste' | 'Mixed Municipal';
  fillPercentage: number; // 0 - 100
  status: BinStatus;
  temperatureCelsius: number;
  batteryLevel: number;
  lastEmptied: string;
  odorIndex: 'Low' | 'Moderate' | 'High';
  latitude: number;
  longitude: number;
}

export type PickupStatus = 'Scheduled' | 'Driver Assigned' | 'En Route' | 'Collected';

export interface PickupRequest {
  id: string;
  category: string;
  date: string;
  timeSlot: string;
  estimatedWeightKg: number;
  address: string;
  specialNotes?: string;
  status: PickupStatus;
  driverName?: string;
  driverPhone?: string;
  ecoPointsEarned: number;
  createdAt: string;
}

export interface EcoReward {
  id: string;
  title: string;
  brand: string;
  costPoints: number;
  category: 'Vouchers' | 'Eco Products' | 'Tree Planting' | 'Clean Energy';
  description: string;
  discountCode: string;
  iconName: string;
  tag: string;
  stockAvailable: number;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  streakDays: number;
  wasteDivertedKg: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface CleanupEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
  participantsCount: number;
  targetKg: number;
  isUserRsvp: boolean;
  image: string;
  description: string;
}

export interface SortingItem {
  id: string;
  name: string;
  category: WasteCategory;
  binColor: string;
  canRecycle: boolean;
  tips: string;
  searchTags: string[];
}

export interface NotificationToast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
