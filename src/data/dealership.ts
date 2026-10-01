export interface DealershipHours {
  label: string;
  short: string;
  days: number[];
  open: string | null;
  close: string | null;
  openMinutes: number | null;
  closeMinutes: number | null;
}

const address = {
  street: '2140 Harrisburg Pike',
  city: 'Grove City',
  state: 'OH',
  zip: '43123'
};

const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
const mapsQuery = encodeURIComponent(`Southwest Auto Sales, ${fullAddress}`);

const hours: DealershipHours[] = [
{ label: 'Monday–Friday', short: 'Mon–Fri', days: [1, 2, 3, 4, 5], open: '9:00 AM', close: '5:00 PM', openMinutes: 540, closeMinutes: 1020 },
{ label: 'Saturday', short: 'Sat', days: [6], open: '9:00 AM', close: '2:30 PM', openMinutes: 540, closeMinutes: 870 },
{ label: 'Sunday', short: 'Sun', days: [0], open: null, close: null, openMinutes: null, closeMinutes: null }];


/** Single source of truth for all dealership NAP + hours data. */
export const dealership = {
  name: 'Southwest Auto Sale',
  established: 2014,
  positioning: 'Your local source for dependable pre-owned cars, trucks and SUVs in Grove City.',
  supporting:
  'Browse quality used vehicles, explore financing options and get personal help finding the right vehicle for your needs and budget.',
  address,
  fullAddress,
  phone: {
    display: '(614) 594-2940',
    href: 'tel:+16145942940',
    e164: '+16145942940'
  },
  email: 'southwestautosales@yahoo.com',
  hours,
  serviceAreas: ['Grove City', 'Columbus', 'Lincoln Village', 'Upper Arlington', 'Bexley', 'Hilliard'],
  links: {
    maps: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
    mapEmbed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
    googleReviews: `https://www.google.com/search?q=${encodeURIComponent('Southwest Auto Sales 2140 Harrisburg Pike Grove City OH reviews')}`,
    facebook: `https://www.facebook.com/search/top?q=${encodeURIComponent('Southwest Auto Sales Grove City')}`
  },
  siteUrl: 'https://www.southwestautosalesoh.com',
  ogImage: "/89d9e184-6b2c-4980-8542-68f9f548eb59.jpg"
};