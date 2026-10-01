import { disclaimers, consentCopy } from './legal';

export type LegalDoc = 'privacy' | 'terms' | 'accessibility' | 'disclaimers';

export interface LegalPageContent {
  title: string;
  description: string;
  sections: {heading: string;body: string[];}[];
}

export const legalPages: Record<LegalDoc, LegalPageContent> = {
  privacy: {
    title: 'Privacy Policy',
    description: 'How Southwest Auto Sale collects, uses and protects information submitted through this website.',
    sections: [
    {
      heading: 'Information we collect',
      body: [
      'When you submit a form on this website — such as a vehicle inquiry, test-drive request, financing request, trade-in appraisal or general message — we collect the details you provide, such as your name, phone number, email address and information about the vehicle you are interested in.',
      'Our online financing request collects general information only. It does not ask for your Social Security number, bank account details or identity documents.']

    },
    {
      heading: 'How we use your information',
      body: [
      'We use your information to respond to your request, confirm vehicle availability, schedule visits, review possible financing options and follow up about your inquiry.',
      'If you opt in to marketing communications, we may also send occasional inventory updates and dealership news. You can unsubscribe at any time.']

    },
    {
      heading: 'Calls, texts and email',
      body: [consentCopy.contact, 'Marketing consent is optional and is never a condition of purchase.']
    },
    {
      heading: 'Sharing',
      body: [
      'We do not sell your personal information. If you choose to move forward with financing, information may be shared with lenders or an approved finance provider for the purpose of processing your application.']

    },
    {
      heading: 'Cookies',
      body: ['This site uses essential cookies to function and, with your permission, optional cookies to understand how the site is used. You can change your choice by clearing your browser storage.']
    },
    {
      heading: 'Contact',
      body: ['Questions about this policy? Contact Southwest Auto Sale at (614) 594-2940 or southwestautosales@yahoo.com.']
    }]

  },
  terms: {
    title: 'Terms & Conditions',
    description: 'Terms that apply to your use of the Southwest Auto Sale website.',
    sections: [
    {
      heading: 'Vehicle information',
      body: [
      'We make every effort to keep vehicle listings accurate and up to date, but errors may occur. Vehicle details, features, pricing and availability should be confirmed directly with Southwest Auto Sale before purchase.',
      'Vehicles may be sold at any time. A vehicle appearing on this website does not guarantee it is available.']

    },
    { heading: 'Pricing', body: [disclaimers.price] },
    { heading: 'Financing', body: [disclaimers.financing] },
    { heading: 'Trade-in appraisals', body: [disclaimers.appraisalFull] },
    {
      heading: 'Use of this website',
      body: ['Content on this website is provided for general information about Southwest Auto Sale and its vehicles. You agree not to misuse the website or submit false information through its forms.']
    }]

  },
  accessibility: {
    title: 'Accessibility Statement',
    description: 'Southwest Auto Sale is committed to making this website usable by everyone.',
    sections: [
    {
      heading: 'Our commitment',
      body: [
      'We want every visitor to be able to browse vehicles, contact our team and start a request with ease. This website is designed with the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA in mind, including keyboard navigation, visible focus states, descriptive labels, sufficient color contrast and support for reduced-motion preferences.']

    },
    {
      heading: 'Need help?',
      body: [
      'If you have difficulty using any part of this website, please call us at (614) 594-2940 or email southwestautosales@yahoo.com. We’re happy to help you find a vehicle or complete a request by phone.']

    }]

  },
  disclaimers: {
    title: 'Disclaimers',
    description: 'Important information about pricing, financing, appraisals and communications.',
    sections: [
    { heading: 'Vehicle pricing', body: [disclaimers.price] },
    { heading: 'Financing', body: [disclaimers.financing, 'Southwest Auto Sale does not guarantee approval, rates or terms. Any terms offered are determined by the lender.'] },
    { heading: 'Trade-in and appraisal', body: [disclaimers.appraisalFull] },
    { heading: 'Vehicle finder', body: [disclaimers.vehicleFinder] },
    { heading: 'Contact consent', body: [consentCopy.contact, consentCopy.marketing] }]

  }
};