export type BodyStyle = 'SUV' | 'Sedan';
export type FuelType = 'Gasoline' | 'Electric' | 'Plug-in hybrid';
export type Drivetrain = 'AWD' | 'RWD' | 'FWD';

export interface Photo {
  /** Wikimedia Commons file name (or, later, a feed image URL) */
  file: string;
  alt: string;
  width: number;
  height: number;
  author: string;
  /** Only set when the license was verified on the file page */
  license?: string;
}

export interface Vehicle {
  id: string;
  stockNumber: string;
  vin: string | null;
  year: number;
  make: string;
  model: string;
  trim: string | null;
  price: number | null;
  mileage: number;
  bodyStyle: BodyStyle;
  drivetrain: Drivetrain | null;
  fuelType: FuelType;
  engine: string | null;
  transmission: string | null;
  exteriorColor: string | null;
  interiorColor: string | null;
  titleStatus: string | null;
  /** Material disclosures from the source listing — always shown, never hidden */
  disclosures: string[];
  /** Only true when the dealership has verified BFM Certified eligibility */
  bfmCertified: boolean;
  featured: boolean;
  /** True for demo content that is not actual dealership stock */
  isSample: boolean;
  description: string;
  photos: Photo[];
}