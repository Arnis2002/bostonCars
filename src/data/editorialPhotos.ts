import type { Photo } from '../types/vehicle';

/** Editorial images. None of these show a vehicle offered for sale. */
export const editorialPhotos: Record<'hero' | 'feature' | 'trade' | 'interior', Photo> = {
  hero: {
    file: 'Porsche Taycan 4S Volcano Grey Metallic (3).jpg',
    alt: 'Grey Porsche Taycan parked outdoors',
    width: 3246,
    height: 2435,
    author: 'Damian B Oh'
  },
  feature: {
    file: 'Porsche Taycan 4S 1X7A0337.jpg',
    alt: 'Red Porsche Taycan 4S on a city street in Stuttgart',
    width: 4789,
    height: 2107,
    author: 'Alexander Migl',
    license: 'CC BY-SA 4.0'
  },
  trade: {
    file: 'Volvo XC90 T8 Twin Engine.jpg',
    alt: 'Black Volvo XC90 plug-in hybrid at a charging station beside an Amsterdam canal',
    width: 4200,
    height: 2939,
    author: 'JoachimKohlerBremen',
    license: 'CC BY-SA 4.0'
  },
  interior: {
    file: 'BMW G05 X5 xDrive40i M Sport Merino Leather Coffee (10).jpg',
    alt: 'Brown leather interior of a BMW X5',
    width: 4000,
    height: 3000,
    author: 'Damian B Oh',
    license: 'CC BY-SA 4.0'
  }
};