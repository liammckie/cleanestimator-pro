import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Site } from '@/data/types/site';
import { AreaInput } from './AreaInput';
import { v4 as uuidv4 } from 'uuid';

interface SiteManagerProps {
  onSitesChange: (sites: Site[]) => void;
}

export const SiteManager: React.FC<SiteManagerProps> = ({ onSitesChange }) => {
  const [sites, setSites] = useState<Site[]>([{
    id: uuidv4(),
    name: 'Site 1',
    area: {
      squareMeters: 0,
      spaceType: 'office',
      selectedTasks: [],
      totalTime: 0
    }
  }]);

  const addSite = () => {
    const newSite: Site = {
      id: uuidv4(),
      name: `Site ${sites.length + 1}`,
      area: {
        squareMeters: 0,
        spaceType: 'office',
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

  const updateSiteArea = (siteId: string, area: Site['area']) => {
    const updatedSites = sites.map(site => 
      site.id === siteId ? { ...site, area } : site
    );
    setSites(updatedSites);
    onSitesChange(updatedSites);
  };

  return (
    <div className="space-y-6">
      {sites.map((site) => (
        <Card key={site.id} className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Site Details</CardTitle>
            {sites.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSite(site.id)}
                className="h-8 w-8 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`site-name-${site.id}`}>Site Name</Label>
              <Input
                id={`site-name-${site.id}`}
                value={site.name}
                onChange={(e) => updateSiteName(site.id, e.target.value)}
                placeholder="Enter site name"
              />
            </div>
            <AreaInput onAreaChange={(area) => updateSiteArea(site.id, area)} />
          </CardContent>
        </Card>
      ))}
      
      <Button
        onClick={addSite}
        className="w-full"
        variant="outline"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Site
      </Button>
    </div>
  );
};
