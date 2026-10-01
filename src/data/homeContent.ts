import { CalendarCheck, CarFront, HandCoins, Headset } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { InventoryFilters } from '../types/inventory';

export interface TrustPoint {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const trustPoints: TrustPoint[] = [
{ icon: CalendarCheck, title: 'Serving Central Ohio since 2014', text: 'A Grove City dealership on Harrisburg Pike for over a decade.' },
{ icon: CarFront, title: 'Cars, trucks and SUVs', text: 'Practical pre-owned vehicles for commuting, work and family.' },
{ icon: HandCoins, title: 'Financing options', text: 'We work with customers across a range of credit situations.' },
{ icon: Headset, title: 'Local customer support', text: 'Talk with a real person on our team, by phone or in person.' }];


export const financeProfiles = [
{ title: 'Good credit', text: 'Established credit history? We’ll help you explore financing options that fit your budget.' },
{ title: 'Rebuilding credit', text: 'Past credit challenges don’t have to stop the conversation. We work with customers across a range of credit situations.' },
{ title: 'First-time buyers', text: 'Buying your first vehicle or building credit for the first time? We’ll walk you through each step.' },
{ title: 'Different down-payment situations', text: 'Tell us what you’re comfortable putting down and our team will review the options available to you.' }];


export interface ProcessStep {
  title: string;
  text: string;
  action: {label: string;to?: string;href?: string;};
}

export const processSteps: ProcessStep[] = [
{
  title: 'Browse available vehicles',
  text: 'Search current inventory, save favorites and compare up to three vehicles side by side.',
  action: { label: 'Shop inventory', to: '/inventory' }
},
{
  title: 'Submit an inquiry or financing request',
  text: 'Check availability on a vehicle or start a financing request — it takes just a few minutes.',
  action: { label: 'Start a request', to: '/financing' }
},
{
  title: 'Speak with the Southwest Auto Sale team',
  text: 'We’ll reach out to answer questions, confirm details and review the options available to you.',
  action: { label: 'Call (614) 594-2940', href: 'tel:+16145942940' }
},
{
  title: 'Visit the dealership and complete the purchase',
  text: 'Stop by 2140 Harrisburg Pike in Grove City for a test drive and to finalize your purchase.',
  action: { label: 'Get directions', href: 'https://www.google.com/maps/dir/?api=1&destination=2140%20Harrisburg%20Pike%2C%20Grove%20City%2C%20OH%2043123' }
}];


export interface VehicleCategory {
  id: string;
  label: string;
  blurb: string;
  image: string;
  imageAlt: string;
  filters: Partial<InventoryFilters>;
}

export const vehicleCategories: VehicleCategory[] = [
{
  id: 'suvs',
  label: 'SUVs',
  blurb: 'Room for family, cargo and Ohio winters.',
  image: "/7fcaa40c-33b2-437a-ac90-1b65d3aa7bf6.jpg",
  imageAlt: 'Red three-row SUV parked on the lot',
  filters: { bodyStyles: ['SUV'] }
},
{
  id: 'trucks',
  label: 'Pickup Trucks',
  blurb: 'Crew and extended cabs ready for work.',
  image: "/a7c02107-6d7c-4e46-b03c-976fa69cafb3.jpg",
  imageAlt: 'Black full-size crew cab pickup truck',
  filters: { bodyStyles: ['Pickup Truck'] }
},
{
  id: 'sedans',
  label: 'Sedans',
  blurb: 'Comfortable daily commuters.',
  image: "/1c0ad33f-7f64-460e-86ba-4fdfcebd4a24.jpg",
  imageAlt: 'Gray midsize sedan',
  filters: { bodyStyles: ['Sedan'] }
},
{
  id: 'family',
  label: 'Family Vehicles',
  blurb: 'Minivans and SUVs with space.',
  image: "/1eb40034-af4a-4f37-a286-628e8bdfe6d9.jpg",
  imageAlt: 'Blue minivan with sliding doors',
  filters: { tags: ['family'] }
},
{
  id: 'under-10k',
  label: 'Vehicles Under $10K',
  blurb: 'Dependable and budget-friendly.',
  image: "/f355fd72-a429-4bc2-b6ef-5de9a8329165.jpg",
  imageAlt: 'Blue compact sedan',
  filters: { tags: ['under-10k'] }
},
{
  id: 'fuel-efficient',
  label: 'Fuel-Efficient Vehicles',
  blurb: '32+ highway MPG.',
  image: "/fae95221-8267-4a1a-94f6-943cea1c5bd5.jpg",
  imageAlt: 'White hybrid hatchback',
  filters: { tags: ['fuel-efficient'] }
}];