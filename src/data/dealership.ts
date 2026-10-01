export const dealership = {
  name: 'Boston Foreign Motor',
  shortName: 'BFM',
  phoneDisplay: '(617) 254-6700',
  phoneHref: 'tel:+16172546700',
  address: {
    street: '411 Cambridge St',
    city: 'Allston',
    state: 'MA',
    zip: '02134'
  },
  directionsUrl:
  'https://www.google.com/maps/dir/?api=1&destination=411+Cambridge+St%2C+Allston%2C+MA+02134',
  mapEmbedUrl:
  'https://maps.google.com/maps?q=411%20Cambridge%20St%2C%20Allston%2C%20MA%2002134&z=15&output=embed',
  reviewsUrl: 'https://www.google.com/search?q=Boston+Foreign+Motor+Allston+MA+reviews',
  officialSite: 'https://www.bostonforeignmotor.com/',
  hours: [
  { days: 'Monday – Thursday', time: '9:30 AM – 7:00 PM' },
  { days: 'Friday', time: '9:30 AM – 6:00 PM' },
  { days: 'Saturday', time: '9:30 AM – 5:00 PM' },
  { days: 'Sunday', time: '10:00 AM – 3:00 PM' }],

  appointmentNote: 'Every day is by appointment. Call or send a request before you come in.'
};

export const addressLine = `${dealership.address.street}, ${dealership.address.city}, ${dealership.address.state} ${dealership.address.zip}`;