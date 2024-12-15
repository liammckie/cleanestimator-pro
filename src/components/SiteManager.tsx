import React, { useState } from 'react';
import { Site } from '@/data/types/site';
import { v4 as uuidv4 } from 'uuid';
import { SiteList } from './site/SiteList';

interface SiteManagerProps {
  onSitesChange: (sites: Site[]) => void;
}

export const SiteManager: React.FC<SiteManagerProps> = ({ onSitesChange }) => {
  const [sites, setSites] = useState<Site[]>([
    {
      id: uuidv4(),
      name: 'Corporate Office Building',
      address: {
        street: '123 Business Avenue',
        suburb: 'Central Business District',
        state: 'NSW',
        postcode: '2000'
      },
      area: {
        squareMeters: 2500,
        spaceType: 'office',
        industryType: 'corporate',
        selectedTasks: [
          {
            taskId: 'vacuum-carpet',
            quantity: 1,
            timeRequired: 2,
            frequency: {
              timesPerWeek: 5,
              timesPerMonth: 20
            }
          },
          {
            taskId: 'clean-bathrooms',
            quantity: 4,
            timeRequired: 1.5,
            frequency: {
              timesPerWeek: 5,
              timesPerMonth: 20
            }
          }
        ],
        totalTime: 70
      }
    }
  ]);

  const addSite = () => {
    const newSite: Site = {
      id: uuidv4(),
      name: `Site ${sites.length + 1}`,
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

  const updateSiteArea = (siteId: string, area: Site['area']) => {
    const updatedSites = sites.map(site => 
      site.id === siteId ? { ...site, area } : site
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
      onUpdateSiteAddress={updateSiteAddress}
      onUpdateSiteArea={updateSiteArea}
    />
  );
};