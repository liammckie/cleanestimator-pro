import React from 'react';
import { Site } from '@/data/types/site';
import { SiteMetricsGrid } from './SiteMetricsGrid';
import { SiteStatusCard } from './SiteStatusCard';

interface SiteOverviewProps {
  sites: Site[];
}

export const SiteOverview: React.FC<SiteOverviewProps> = ({ sites = [] }) => {
  const validSites = Array.isArray(sites) ? sites : [];
  
  return (
    <div className="space-y-6">
      <SiteMetricsGrid sites={validSites} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {validSites.map((site) => (
          <SiteStatusCard key={site.id} site={site} />
        ))}
      </div>
      
      {validSites.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No sites have been added yet.</p>
        </div>
      )}
    </div>
  );
};