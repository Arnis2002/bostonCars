export interface NavItem {
  label: string;
  to: string;
}

export const primaryNav: NavItem[] = [
{ label: 'Home', to: '/' },
{ label: 'Inventory', to: '/inventory' },
{ label: 'Financing', to: '/financing' },
{ label: 'Sell or Trade', to: '/sell-trade' },
{ label: 'About', to: '/about' },
{ label: 'Reviews', to: '/reviews' },
{ label: 'Contact', to: '/contact' }];


export const legalNav: NavItem[] = [
{ label: 'Privacy Policy', to: '/privacy' },
{ label: 'Terms & Conditions', to: '/terms' },
{ label: 'Accessibility', to: '/accessibility' },
{ label: 'Disclaimers', to: '/disclaimers' }];