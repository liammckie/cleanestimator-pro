import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Site } from '@/data/types/site';
import { SiteCard } from './SiteCard';

interface SiteListProps {
  sites: Site[];
  onAddSite: () => void;
  onDeleteSite: (siteId: string) => void;
  onUpdateSiteName: (siteId: string, name: string) => void;
  onUpdateSiteAddress: (siteId: string, field: keyof Site['address'], value: string) => void;
  onUpdateSiteArea: (siteId: string, area: Site['area']) => void;
}

export const SiteList: React.FC<SiteListProps> = ({
  sites,
  onAddSite,
  onDeleteSite,
  onUpdateSiteName,
  onUpdateSiteAddress,
  onUpdateSiteArea
}) => {
  return (
    <div className="space-y-6">
      {sites.map((site) => (
        <SiteCard
          key={site.id}
          site={site}
          canDelete={sites.length > 1}
          onDelete={onDeleteSite}
          onUpdateName={onUpdateSiteName}
          onUpdateAddress={onUpdateSiteAddress}
          onUpdateArea={onUpdateSiteArea}
        />
      ))}
      
      <Button
        onClick={onAddSite}
        className="w-full"
        variant="outline"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Site
      </Button>
    </div>
  );
};