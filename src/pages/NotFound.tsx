import React from 'react';
import { Link } from 'react-router-dom';
import { SignpostIcon } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { EmptyState } from '../components/ui/EmptyState';
import { useSeo } from '../hooks/useSeo';
import { btn, cn, container } from '../utils/styles';

export function NotFoundPage() {
  useSeo({ title: 'Page Not Found | Southwest Auto Sale', description: 'The page you’re looking for could not be found.', path: '/404', noindex: true });
  return (
    <PageTransition>
      <div className={cn(container, 'py-16 lg:py-24')}>
        <EmptyState icon={SignpostIcon} title="We couldn’t find that page" message="The link may be outdated or the page may have moved. Try browsing our inventory or head back to the homepage.">
          <Link to="/inventory" className={btn.primary}>
            Browse Inventory
          </Link>
          <Link to="/" className={btn.outline}>
            Go to homepage
          </Link>
        </EmptyState>
      </div>
    </PageTransition>);

}