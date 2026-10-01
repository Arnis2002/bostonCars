import type { SortKey } from '../types/inventory';

export const sortOptions: {value: SortKey;label: string;}[] = [
{ value: 'newest', label: 'Newest added' },
{ value: 'price-asc', label: 'Price: Low to High' },
{ value: 'price-desc', label: 'Price: High to Low' },
{ value: 'mileage-asc', label: 'Mileage: Low to High' },
{ value: 'year-desc', label: 'Year: Newest' },
{ value: 'year-asc', label: 'Year: Oldest' }];


export const priceSteps = [5000, 7500, 10000, 12500, 15000, 20000, 25000];
export const mileageSteps = [75000, 100000, 125000, 150000, 175000, 200000];

export const vehicleTypeOptions = ['Sedan', 'SUV', 'Pickup Truck', 'Minivan', 'Hatchback', 'Not sure yet'];
export const budgetOptions = ['Under $7,500', '$7,500–$10,000', '$10,000–$15,000', '$15,000–$20,000', '$20,000 or more'];
export const mileagePreferenceOptions = ['Under 75,000 miles', 'Under 100,000 miles', 'Under 125,000 miles', 'Under 150,000 miles', 'No preference'];
export const contactMethodOptions = ['Phone call', 'Text message', 'Email'];

export const financePriceRanges = ['Under $7,500', '$7,500–$10,000', '$10,000–$15,000', '$15,000–$20,000', '$20,000 or more', 'Not sure yet'];
export const downPaymentRanges = ['Under $500', '$500–$1,000', '$1,000–$2,500', '$2,500–$5,000', '$5,000 or more', 'Not sure yet'];
export const tradeInOptions = ['Yes, I have a trade-in', 'No trade-in', 'Not sure yet'];
export const employmentOptions = ['Employed full-time', 'Employed part-time', 'Self-employed', 'Retired', 'Other'];
export const incomeRanges = ['Under $2,000 / month', '$2,000–$3,000 / month', '$3,000–$4,500 / month', '$4,500–$6,000 / month', '$6,000+ / month', 'Prefer to discuss'];
export const residenceOptions = ['Own', 'Rent', 'Live with family', 'Other'];
export const timeAtAddressOptions = ['Less than 1 year', '1–2 years', '3–5 years', 'More than 5 years'];

export const conditionOptions = ['Excellent', 'Good', 'Fair', 'Needs work'];
export const accidentOptions = ['No known accidents', 'Minor accident', 'Major accident', 'Not sure'];
export const titleStatusOptions = ['Clean title in my name', 'Lien / financed', 'Rebuilt or salvage', 'Not sure'];
export const loanStatusOptions = ['Paid off', 'Still making payments', 'Leased', 'Not sure'];

export const contactReasons = ['Vehicle Availability', 'Test Drive', 'Financing', 'Trade-In', 'Vehicle Finder', 'General Question'];

export function yearOptions(from = 2004, to = new Date().getFullYear()): string[] {
  const years: string[] = [];
  for (let y = to; y >= from; y -= 1) years.push(String(y));
  return years;
}

export const testDriveTimes = {
  weekday: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
  saturday: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM']
};