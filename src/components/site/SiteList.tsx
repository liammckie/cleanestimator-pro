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
  onUpdateSiteClient: (siteId: string, client: string) => void;
  onUpdateSiteAddress: (siteId: string, field: keyof Site['address'], value: string) => void;
}

export const SiteList: React.FC<SiteListProps> = ({
  sites,
  onAddSite,
  onDeleteSite,
  onUpdateSiteName,
  onUpdateSiteClient,
  onUpdateSiteAddress,
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
          onUpdateClient={onUpdateSiteClient}
          onUpdateAddress={onUpdateSiteAddress}
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