import React from 'react';
import { SiteManager } from '@/components/SiteManager';
import { Site } from '@/data/types/site';

interface SitesViewProps {
  onSitesChange: (sites: Site[]) => void;
}

export const SitesView: React.FC<SitesViewProps> = ({ onSitesChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Site Details</h1>
      </div>
      <SiteManager onSitesChange={onSitesChange} />
    </div>
  );
};