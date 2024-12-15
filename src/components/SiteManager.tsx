import React, { useState } from 'react';
import { Site } from '@/data/types/site';
import { v4 as uuidv4 } from 'uuid';
import { SiteList } from './site/SiteList';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SiteManagerProps {
  onSitesChange: (sites: Site[]) => void;
}

export const SiteManager: React.FC<SiteManagerProps> = ({ onSitesChange }) => {
  const [sites, setSites] = useState<Site[]>([
    {
      id: uuidv4(),
      name: 'New Site',
      client: '',
      daysPerWeek: 5,
      address: {
        street: '',
        suburb: '',
        state: '',
        postcode: ''
      },
      area: {
        squareMeters: 0,
        spaceType: 'office',
        industryType: 'corporate',
        selectedTasks: [],
        totalTime: 0
      }
    }
  ]);

  const addSite = () => {
    const clientName = sites[0]?.client || '';
    const newSite: Site = {
      id: uuidv4(),
      name: `New Site ${sites.length + 1}`,
      client: clientName,
      daysPerWeek: 5,
      address: {
        street: '',
        suburb: '',
        state: '',
        postcode: ''
      },
      area: {
        squareMeters: 0,
        spaceType: 'office',
        industryType: 'corporate',
        selectedTasks: [],
        totalTime: 0
      }
    };
    const updatedSites = [...sites, newSite];
    setSites(updatedSites);
    onSitesChange(updatedSites);
  };

  const removeSite = (siteId: string) => {
    const updatedSites = sites.filter(site => site.id !== siteId);
    setSites(updatedSites);
    onSitesChange(updatedSites);
  };

  const updateSiteName = (siteId: string, name: string) => {
    const updatedSites = sites.map(site => 
      site.id === siteId ? { ...site, name } : site
    );
    setSites(updatedSites);
    onSitesChange(updatedSites);
  };

  const updateSiteClient = (siteId: string, client: string) => {
    const updatedSites = sites.map(site => 
      site.id === siteId ? { ...site, client } : 
      sites[0].id === siteId ? { ...site, client } : 
      { ...site, client }
    );
    setSites(updatedSites);
    onSitesChange(updatedSites);
  };

  const updateSiteDaysPerWeek = (siteId: string, daysPerWeek: number) => {
    const updatedSites = sites.map(site => 
      site.id === siteId ? { ...site, daysPerWeek } : site
    );
    setSites(updatedSites);
    onSitesChange(updatedSites);
  };

  const updateSiteAddress = (siteId: string, field: keyof Site['address'], value: string) => {
    const updatedSites = sites.map(site => 
      site.id === siteId ? {
        ...site,
        address: {
          ...site.address,
          [field]: value
        }
      } : site
    );
    setSites(updatedSites);
    onSitesChange(updatedSites);
  };

  return (
    <SiteList
      sites={sites}
      onAddSite={addSite}
      onDeleteSite={removeSite}
      onUpdateSiteName={updateSiteName}
      onUpdateSiteClient={updateSiteClient}
      onUpdateSiteAddress={updateSiteAddress}
      onUpdateSiteDaysPerWeek={updateSiteDaysPerWeek}
    />
  );
};