import { dealership } from '../data/dealership';
import type { Vehicle } from '../types/vehicle';
import { vehicleFullTitle } from './format';

const DEALER_ID = `${dealership.siteUrl}/#dealer`;

const DAY_MAP: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
};

function to24h(time: string): string {
  const [clock, meridiem] = time.split(' ');
  const [h, m] = clock.split(':').map(Number);
  const hour = meridiem === 'PM' && h !== 12 ? h + 12 : meridiem === 'AM' && h === 12 ? 0 : h;
  return `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function dealerSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['AutoDealer', 'LocalBusiness'],
    '@id': DEALER_ID,
    name: dealership.name,
    url: dealership.siteUrl,
    telephone: dealership.phone.e164,
    email: dealership.email,
    foundingDate: String(dealership.established),
    image: dealership.ogImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: dealership.address.street,
      addressLocality: dealership.address.city,
      addressRegion: dealership.address.state,
      postalCode: dealership.address.zip,
      addressCountry: 'US'
    },
    openingHoursSpecification: dealership.hours.
    filter((h) => h.open && h.close).
    map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => DAY_MAP[d]),
      opens: to24h(h.open as string),
      closes: to24h(h.close as string)
    })),
    areaServed: dealership.serviceAreas.map((city) => ({ '@type': 'City', name: `${city}, OH` }))
  };
}

export function vehicleSchema(v: Vehicle) {
  const url = `${dealership.siteUrl}/inventory/${v.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: vehicleFullTitle(v),
    url,
    image: v.images.map((i) => i.src),
    description: v.description,
    brand: { '@type': 'Brand', name: v.make },
    model: v.model,
    vehicleConfiguration: v.trim,
    vehicleModelDate: String(v.year),
    vehicleIdentificationNumber: v.vin,
    sku: v.stockNumber,
    bodyType: v.bodyStyle,
    fuelType: v.fuelType,
    vehicleEngine: { '@type': 'EngineSpecification', name: v.engine },
    vehicleTransmission: v.transmission,
    driveWheelConfiguration: v.drivetrain,
    color: v.exteriorColor,
    vehicleInteriorColor: v.interiorColor,
    seatingCapacity: v.seating,
    itemCondition: 'https://schema.org/UsedCondition',
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: v.mileage, unitCode: 'SMI' },
    ...(v.price !== null && {
      offers: {
        '@type': 'Offer',
        price: v.price,
        priceCurrency: 'USD',
        availability: v.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
        url,
        seller: { '@id': DEALER_ID }
      }
    })
  };
}

export function breadcrumbSchema(items: {name: string;path: string;}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${dealership.siteUrl}${item.path}`
    }))
  };
}