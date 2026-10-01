export type VehicleStatus = 'available' | 'pending' | 'sold';
export type BodyStyle = 'Sedan' | 'Hatchback' | 'SUV' | 'Pickup Truck' | 'Minivan';
export type Transmission = 'Automatic' | 'CVT' | 'Manual';
export type Drivetrain = 'FWD' | 'RWD' | 'AWD' | '4WD';
export type FuelType = 'Gasoline' | 'Flex Fuel' | 'Hybrid' | 'Diesel';
export type ColorFamily = 'Black' | 'White' | 'Silver' | 'Gray' | 'Red' | 'Blue' | 'Green' | 'Brown';

export interface VehicleImage {
  src: string;
  alt: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  status: VehicleStatus;
  year: number;
  make: string;
  model: string;
  trim: string;
  /** null = no published price → render "Contact for Price", never $0 */
  price: number | null;
  previousPrice: number | null;
  mileage: number;
  vin: string;
  stockNumber: string;
  bodyStyle: BodyStyle;
  engine: string;
  transmission: Transmission;
  drivetrain: Drivetrain;
  fuelType: FuelType;
  cityMPG: number | null;
  highwayMPG: number | null;
  exteriorColor: string;
  exteriorColorFamily: ColorFamily;
  interiorColor: string;
  seating: number;
  description: string;
  features: string[];
  images: VehicleImage[];
  historyReportUrl: string | null;
  dateAdded: string;
  featured: boolean;
  /** Internal flag — demo placeholder record, must be replaced by verified feed data before launch. */
  isPlaceholder: boolean;
}