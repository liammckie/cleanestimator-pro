
import React, { useState, useEffect } from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';

export const SiteSetupStep: React.FC = () => {
  const { workflowData, updateWorkflowData } = useWorkflow();
  const [projectName, setProjectName] = useState(workflowData.projectName || '');
  const [clientName, setClientName] = useState(workflowData.clientName || '');
  const [sites, setSites] = useState(workflowData.sites);

  // Initialize with one site if none exist
  useEffect(() => {
    if (sites.length === 0) {
      addSite();
    }
  }, []);

  const addSite = () => {
    const newSite = {
      id: uuidv4(),
      name: `Site ${sites.length + 1}`,
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
    
    setSites([...sites, newSite]);
  };

  const updateSite = (index: number, field: string, value: any) => {
    const updatedSites = [...sites];
    updatedSites[index] = {
      ...updatedSites[index],
      [field]: value
    };
    setSites(updatedSites);
  };

  const updateSiteAddress = (index: number, field: string, value: string) => {
    const updatedSites = [...sites];
    updatedSites[index] = {
      ...updatedSites[index],
      address: {
        ...updatedSites[index].address,
        [field]: value
      }
    };
    setSites(updatedSites);
  };

  const handleSave = () => {
    updateWorkflowData({ 
      sites,
      projectName,
      clientName
    });
  };

  useEffect(() => {
    // Auto-save when any data changes
    handleSave();
  }, [sites, projectName, clientName]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="project-name">Project Name</Label>
          <Input
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-1"
            placeholder="Enter project name"
          />
        </div>
        
        <div>
          <Label htmlFor="client-name">Client Name</Label>
          <Input
            id="client-name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="mt-1"
            placeholder="Enter client name"
          />
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Sites</h3>
        
        {sites.map((site, index) => (
          <Card key={site.id} className="mb-4">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`site-name-${index}`}>Site Name</Label>
                  <Input
                    id={`site-name-${index}`}
                    value={site.name}
                    onChange={(e) => updateSite(index, 'name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`days-per-week-${index}`}>Days Per Week</Label>
                  <Input
                    id={`days-per-week-${index}`}
                    type="number"
                    min={1}
                    max={7}
                    value={site.daysPerWeek}
                    onChange={(e) => updateSite(index, 'daysPerWeek', parseInt(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`street-${index}`}>Street Address</Label>
                  <Input
                    id={`street-${index}`}
                    value={site.address.street}
                    onChange={(e) => updateSiteAddress(index, 'street', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`suburb-${index}`}>Suburb/City</Label>
                  <Input
                    id={`suburb-${index}`}
                    value={site.address.suburb}
                    onChange={(e) => updateSiteAddress(index, 'suburb', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`state-${index}`}>State</Label>
                  <Input
                    id={`state-${index}`}
                    value={site.address.state}
                    onChange={(e) => updateSiteAddress(index, 'state', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`postcode-${index}`}>Postcode</Label>
                  <Input
                    id={`postcode-${index}`}
                    value={site.address.postcode}
                    onChange={(e) => updateSiteAddress(index, 'postcode', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button type="button" onClick={addSite} variant="outline" className="mt-2">
          Add Another Site
        </Button>
      </div>
    </div>
  );
};
