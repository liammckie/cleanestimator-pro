
import React, { useState, useEffect } from 'react';
import { Site } from '@/data/types/site';
import { v4 as uuidv4 } from 'uuid';
import { SiteList } from './site/SiteList';
import { useTaskContext } from './area/task/TaskContext';

interface SiteManagerProps {
  onSitesChange: (sites: Site[]) => void;
  sites?: Site[];
}

export const SiteManager: React.FC<SiteManagerProps> = ({ onSitesChange, sites: initialSites = [] }) => {
  const { selectedTasks } = useTaskContext();
  const [sites, setSites] = useState<Site[]>(initialSites);

  // Initialize sites if none are provided
  useEffect(() => {
    if (initialSites.length > 0) {
      setSites(initialSites);
    } else if (sites.length === 0) {
      const defaultSite: Site = {
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
      };
      setSites([defaultSite]);
      onSitesChange([defaultSite]);
    }
  }, [initialSites]);

  // Update sites when selectedTasks change
  useEffect(() => {
    if (selectedTasks.length > 0 && sites.length > 0) {
      // Create a map to group tasks by siteId
      const tasksBySite = selectedTasks.reduce((acc, task) => {
        const siteId = task.siteId || sites[0].id; // Default to first site if no siteId
        if (!acc[siteId]) acc[siteId] = [];
        acc[siteId].push(task);
        return acc;
      }, {} as Record<string, typeof selectedTasks>);
      
      // Update each site with its tasks
      const updatedSites = sites.map(site => {
        const siteTasks = tasksBySite[site.id] || [];
        const totalTime = siteTasks.reduce((total, task) => 
          total + (task.timeRequired * task.frequency.timesPerMonth), 0);
          
        return {
          ...site,
          area: {
            ...site.area,
            selectedTasks: siteTasks.map(task => ({
              taskId: task.id,
              quantity: task.quantity,
              timeRequired: task.timeRequired,
              frequency: task.frequency,
              productivityOverride: task.productivityOverride
            })),
            totalTime
          }
        };
      });
      
      setSites(updatedSites);
      onSitesChange(updatedSites);
    }
  }, [selectedTasks]);

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
