
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Site } from '@/data/types/site';
import { SiteCard } from './SiteCard';

interface SitesListProps {
  sites: Site[];
  industryTypes: string[];
  onAddSite: () => void;
  onRemoveSite: (siteId: string) => void;
  onUpdateSite: (index: number, field: string, value: any) => void;
  onUpdateSiteAddress: (index: number, field: string, value: string) => void;
  onUpdateSiteIndustry: (index: number, value: string) => void;
}

export const SitesList: React.FC<SitesListProps> = ({
  sites,
  industryTypes,
  onAddSite,
  onRemoveSite,
  onUpdateSite,
  onUpdateSiteAddress,
  onUpdateSiteIndustry,
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Sites</h3>
      
      {sites.map((site, index) => (
        <SiteCard
          key={site.id}
          site={site}
          index={index}
          onRemoveSite={onRemoveSite}
          onUpdateSite={onUpdateSite}
          onUpdateSiteAddress={onUpdateSiteAddress}
          onUpdateSiteIndustry={onUpdateSiteIndustry}
          industryTypes={industryTypes}
        />
      ))}
      
      <Button type="button" onClick={onAddSite} variant="outline" className="mt-2 flex items-center">
        <Plus className="h-4 w-4 mr-1" />
        Add Another Site
      </Button>
    </div>
  );
};
