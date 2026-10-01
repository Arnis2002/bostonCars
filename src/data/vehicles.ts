import type { Vehicle } from '../types/vehicle';

/**
 * SAMPLE INVENTORY — demo content only.
 * These are not Boston Foreign Motor vehicles. Prices, mileage, and stock numbers are illustrative.
 * Photos are licensed Wikimedia Commons images matched to each model/generation.
 * Replace this array with the dealership inventory feed before launch.
 */
export const vehicles: Vehicle[] = [
{
  id: 'sample-2021-bmw-x5',
  stockNumber: 'DEMO-102',
  vin: null,
  year: 2021,
  make: 'BMW',
  model: 'X5',
  trim: 'xDrive40i M Sport',
  price: 45500,
  mileage: 39870,
  bodyStyle: 'SUV',
  drivetrain: 'AWD',
  fuelType: 'Gasoline',
  engine: '3.0L turbocharged inline-6',
  transmission: '8-speed automatic',
  exteriorColor: 'Mineral White Metallic',
  interiorColor: null,
  titleStatus: null,
  disclosures: [],
  bfmCertified: false,
  featured: true,
  isSample: true,
  description:
  'BMW’s mid-size SUV with the 3.0-liter turbocharged inline-six and xDrive all-wheel drive. The M Sport package brings its own bumpers, wheels, and steering wheel. Two rows of seating.',
  photos: [1, 2, 3, 4].map((n) => ({
    file: `BMW G05 X5 xDrive40i M Sport Mineral White Metallic (${n}).jpg`,
    alt: `White BMW X5 xDrive40i M Sport, photo ${n}`,
    width: 4000,
    height: 3000,
    author: 'Damian B Oh'
  }))
},
{
  id: 'sample-2023-mercedes-eqe-suv',
  stockNumber: 'DEMO-105',
  vin: null,
  year: 2023,
  make: 'Mercedes-Benz',
  model: 'EQE SUV',
  trim: '350 4MATIC',
  price: 47500,
  mileage: 9960,
  bodyStyle: 'SUV',
  drivetrain: 'AWD',
  fuelType: 'Electric',
  engine: 'Dual electric motors',
  transmission: '1-speed direct drive',
  exteriorColor: 'Polar White',
  interiorColor: null,
  titleStatus: null,
  disclosures: [],
  bfmCertified: false,
  featured: true,
  isSample: true,
  description:
  'The SUV version of the EQE, with a motor on each axle and 4MATIC all-wheel drive. Two rows of seating and a hatch-style cargo area. Ask about charging equipment and battery details before you visit.',
  photos: [
  { n: 1, w: 3991, h: 2993 },
  { n: 2, w: 3963, h: 2972 },
  { n: 4, w: 4000, h: 3000 }].
  map(({ n, w, h }) => ({
    file: `Mercedes-Benz X294 EQE 350 4MATIC SUV Polar White (${n}).jpg`,
    alt: `White Mercedes-Benz EQE 350 4MATIC SUV, photo ${n}`,
    width: w,
    height: h,
    author: 'Damian B Oh'
  }))
},
{
  id: 'sample-2018-bmw-540i',
  stockNumber: 'DEMO-103',
  vin: null,
  year: 2018,
  make: 'BMW',
  model: '540i',
  trim: 'xDrive M Sport',
  price: 24900,
  mileage: 61200,
  bodyStyle: 'Sedan',
  drivetrain: 'AWD',
  fuelType: 'Gasoline',
  engine: '3.0L turbocharged inline-6',
  transmission: '8-speed automatic',
  exteriorColor: 'Alpine White',
  interiorColor: null,
  titleStatus: null,
  disclosures: [],
  bfmCertified: false,
  featured: true,
  isSample: true,
  description:
  'The 5 Series sedan with BMW’s 3.0-liter turbocharged inline-six. xDrive all-wheel drive helps through a New England winter, and the M Sport package changes the styling and suspension tuning.',
  photos: [
  {
    file: '2018 BMW 540i xDrive with M Sport package in Alpine White, front left, 2025-10-06.jpg',
    alt: 'White BMW 540i xDrive M Sport, front three-quarter view',
    width: 5007,
    height: 3192,
    author: 'Mr.choppers'
  },
  {
    file: '2018 BMW 540i xDrive with M Sport package in Alpine White, rear left, 2025-10-06.jpg',
    alt: 'White BMW 540i xDrive M Sport, rear three-quarter view',
    width: 4566,
    height: 2925,
    author: 'Mr.choppers'
  }]

},
{
  id: 'sample-2021-porsche-taycan',
  stockNumber: 'DEMO-106',
  vin: null,
  year: 2021,
  make: 'Porsche',
  model: 'Taycan',
  trim: '4S',
  price: 71900,
  mileage: 22300,
  bodyStyle: 'Sedan',
  drivetrain: 'AWD',
  fuelType: 'Electric',
  engine: 'Dual electric motors',
  transmission: '2-speed (rear axle)',
  exteriorColor: 'Black, matte finish',
  interiorColor: null,
  titleStatus: null,
  disclosures: [],
  bfmCertified: false,
  featured: true,
  isSample: true,
  description:
  'Porsche’s electric sedan in 4S form, with a motor on each axle. The paint has a matte finish, which needs different care from gloss paint, so ask about it when you call.',
  photos: [
  { n: 1, w: 3863, h: 2897 },
  { n: 2, w: 3749, h: 2811 }].
  map(({ n, w, h }) => ({
    file: `Porsche Taycan 4S matte black (${n}).jpg`,
    alt: `Matte black Porsche Taycan 4S, photo ${n}`,
    width: w,
    height: h,
    author: 'Damian B Oh'
  }))
},
{
  id: 'sample-2022-audi-q5',
  stockNumber: 'DEMO-101',
  vin: null,
  year: 2022,
  make: 'Audi',
  model: 'Q5',
  trim: '45 TFSI quattro Premium Plus',
  price: 36900,
  mileage: 28410,
  bodyStyle: 'SUV',
  drivetrain: 'AWD',
  fuelType: 'Gasoline',
  engine: '2.0L turbocharged 4-cylinder',
  transmission: '7-speed S tronic dual-clutch',
  exteriorColor: 'Silver',
  interiorColor: null,
  titleStatus: null,
  disclosures: [],
  bfmCertified: false,
  featured: true,
  isSample: true,
  description:
  'A compact luxury SUV with Audi’s 2.0-liter turbocharged engine and quattro all-wheel drive. Premium Plus sits in the middle of the 2022 Q5 lineup.',
  photos: [
  {
    file: '2022 Audi Q5 quattro Premium Plus 45TFSI in Silver, front right.jpg',
    alt: 'Silver Audi Q5 Premium Plus, front three-quarter view',
    width: 5263,
    height: 3123,
    author: 'Mr.choppers',
    license: 'CC BY-SA 3.0'
  }]

},
{
  id: 'sample-2020-porsche-macan',
  stockNumber: 'DEMO-109',
  vin: null,
  year: 2020,
  make: 'Porsche',
  model: 'Macan',
  trim: null,
  price: 39800,
  mileage: 33700,
  bodyStyle: 'SUV',
  drivetrain: 'AWD',
  fuelType: 'Gasoline',
  engine: '2.0L turbocharged 4-cylinder',
  transmission: '7-speed PDK dual-clutch',
  exteriorColor: null,
  interiorColor: null,
  titleStatus: null,
  disclosures: [],
  bfmCertified: false,
  featured: true,
  isSample: true,
  description:
  'Porsche’s compact SUV with the 2.0-liter turbocharged four and the PDK dual-clutch transmission. All-wheel drive is standard.',
  photos: [
  { n: 1, w: 2355, h: 1884 },
  { n: 3, w: 2700, h: 2160 }].
  map(({ n, w, h }) => ({
    file: `Porsche Macan (95B) Washington DC Metro Area, USA (${n}).jpg`,
    alt: `Porsche Macan photographed in the Washington, DC area, photo ${n}`,
    width: w,
    height: h,
    author: 'Wikimedia Commons contributor'
  }))
},
{
  id: 'sample-2023-mercedes-eqe',
  stockNumber: 'DEMO-104',
  vin: null,
  year: 2023,
  make: 'Mercedes-Benz',
  model: 'EQE',
  trim: '350+ Sedan',
  price: 41900,
  mileage: 12480,
  bodyStyle: 'Sedan',
  drivetrain: 'RWD',
  fuelType: 'Electric',
  engine: 'Single rear electric motor',
  transmission: '1-speed direct drive',
  exteriorColor: 'Selenite Grey Metallic',
  interiorColor: null,
  titleStatus: null,
  disclosures: [],
  bfmCertified: false,
  featured: false,
  isSample: true,
  description:
  'Mercedes-Benz’s mid-size electric sedan. The 350+ uses a single motor driving the rear wheels. Ask about charging equipment and battery details before you visit.',
  photos: [
  {
    file: 'Mercedes-Benz V295 EQE 350+ Selenite Grey Metallic (1).jpg',
    alt: 'Grey Mercedes-Benz EQE 350+ sedan',
    width: 3656,
    height: 2742,
    author: 'Damian B Oh',
    license: 'CC BY-SA 4.0'
  }]

},
{
  id: 'sample-2021-mercedes-cla',
  stockNumber: 'DEMO-107',
  vin: null,
  year: 2021,
  make: 'Mercedes-Benz',
  model: 'CLA',
  trim: '250 4MATIC',
  price: 27400,
  mileage: 34150,
  bodyStyle: 'Sedan',
  drivetrain: 'AWD',
  fuelType: 'Gasoline',
  engine: '2.0L turbocharged 4-cylinder',
  transmission: '8-speed dual-clutch',
  exteriorColor: 'Obsidian Black',
  interiorColor: null,
  titleStatus: null,
  disclosures: [],
  bfmCertified: false,
  featured: false,
  isSample: true,
  description:
  'A compact four-door coupe with a 2.0-liter turbocharged four and 4MATIC all-wheel drive. One of the more affordable ways into a recent Mercedes-Benz.',
  photos: [
  { n: 1, w: 3859, h: 2895 },
  { n: 2, w: 3972, h: 2979 },
  { n: 3, w: 3945, h: 2959 }].
  map(({ n, w, h }) => ({
    file: `Mercedes-Benz C118 CLA 250 4MATIC AMG Line Obsidian Black (${n}).jpg`,
    alt: `Black Mercedes-Benz CLA 250 4MATIC, photo ${n}`,
    width: w,
    height: h,
    author: 'Damian B Oh'
  }))
},
{
  id: 'sample-2020-mercedes-gle',
  stockNumber: 'DEMO-110',
  vin: null,
  year: 2020,
  make: 'Mercedes-Benz',
  model: 'GLE',
  trim: '350 4MATIC',
  price: 38900,
  mileage: 47250,
  bodyStyle: 'SUV',
  drivetrain: 'AWD',
  fuelType: 'Gasoline',
  engine: '2.0L turbocharged 4-cylinder',
  transmission: '9-speed automatic',
  exteriorColor: null,
  interiorColor: null,
  titleStatus: null,
  disclosures: [],
  bfmCertified: false,
  featured: false,
  isSample: true,
  description:
  'Mercedes-Benz’s mid-size SUV with a 2.0-liter turbocharged four-cylinder and 4MATIC all-wheel drive.',
  photos: [
  {
    file: '2020 Mercedes-Benz GLE 350 4Matic front 6.16.19.jpg',
    alt: 'Mercedes-Benz GLE 350 4MATIC, front three-quarter view',
    width: 4844,
    height: 2941,
    author: 'Kevauto'
  },
  {
    file: '2020 Mercedes-Benz GLE 350 4Matic rear 6.16.19.jpg',
    alt: 'Mercedes-Benz GLE 350 4MATIC, rear three-quarter view',
    width: 4843,
    height: 2963,
    author: 'Kevauto'
  }]

},
{
  id: 'sample-2017-volvo-xc90',
  stockNumber: 'DEMO-108',
  vin: null,
  year: 2017,
  make: 'Volvo',
  model: 'XC90',
  trim: 'T8 Inscription',
  price: 23900,
  mileage: 78600,
  bodyStyle: 'SUV',
  drivetrain: 'AWD',
  fuelType: 'Plug-in hybrid',
  engine: '2.0L 4-cylinder plug-in hybrid',
  transmission: '8-speed automatic',
  exteriorColor: null,
  interiorColor: null,
  titleStatus: null,
  disclosures: [
  'Sample disclosure: the vehicle history report lists one reported accident. Ask for the full report before you visit.'],

  bfmCertified: false,
  featured: false,
  isSample: true,
  description:
  'Volvo’s three-row SUV in plug-in hybrid form, pairing a 2.0-liter four-cylinder with an electric motor on the rear axle. Inscription is the comfort-focused trim.',
  photos: [
  {
    file: '2017 Volvo XC90 T8 Inscription PRO Phev 2.0.jpg',
    alt: 'Volvo XC90 T8 Inscription, three-quarter view',
    width: 3536,
    height: 2001,
    author: 'Makizox'
  }]

}];


export function getVehicle(id: string | undefined): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}