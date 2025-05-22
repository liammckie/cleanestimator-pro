import React, { useState, useEffect } from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { v4 as uuidv4 } from 'uuid';
import { Trash2, Plus, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const industryTypes = [
  "Corporate Office",
  "Healthcare",
  "Education",
  "Retail",
  "Industrial",
  "Hospitality",
  "Government",
  "Food Service",
  "Other"
];

export const SiteSetupStep: React.FC = () => {
  const { workflowData, updateWorkflowData, removeSite, nextStep } = useWorkflow();
  const [projectName, setProjectName] = useState(workflowData.projectName || '');
  const [clientName, setClientName] = useState(workflowData.clientName || '');
  const [sites, setSites] = useState(workflowData.sites);
  const { toast } = useToast();

  // Initialize with one site if none exist
  useEffect(() => {
    if (sites.length === 0) {
      addSite();
    }
  }, []);

  // Keep sites in sync with workflowData
  useEffect(() => {
    setSites(workflowData.sites);
  }, [workflowData.sites]);

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
    
    const updatedSites = [...sites, newSite];
    setSites(updatedSites);
    updateWorkflowData({ sites: updatedSites });
  };

  const handleRemoveSite = (siteId: string) => {
    if (sites.length <= 1) {
      toast({
        title: "Cannot remove site",
        description: "You must have at least one site in your project.",
        variant: "destructive"
      });
      return;
    }
    
    removeSite(siteId);
    toast({
      title: "Site removed",
      description: "Site has been removed from your project."
    });
  };

  const updateSite = (index: number, field: string, value: any) => {
    const updatedSites = [...sites];
    updatedSites[index] = {
      ...updatedSites[index],
      [field]: value
    };
    setSites(updatedSites);
    updateWorkflowData({ sites: updatedSites });
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
    updateWorkflowData({ sites: updatedSites });
  };

  const updateSiteIndustry = (index: number, value: string) => {
    const updatedSites = [...sites];
    updatedSites[index] = {
      ...updatedSites[index],
      area: {
        ...updatedSites[index].area,
        industryType: value.toLowerCase()
      }
    };
    setSites(updatedSites);
    updateWorkflowData({ sites: updatedSites });
  };

  useEffect(() => {
    // Update project and client name in workflow data
    updateWorkflowData({ 
      projectName,
      clientName
    });
  }, [projectName, clientName]);

  const handleNextStep = () => {
    // Save current data before proceeding
    updateWorkflowData({
      projectName,
      clientName,
      sites
    });
    nextStep();
  };

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
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Site Details</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveSite(site.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
                <span className="ml-1">Remove</span>
              </Button>
            </CardHeader>
            
            <CardContent className="pt-0">
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
                  <Label htmlFor={`industry-type-${index}`}>Industry Type</Label>
                  <Select 
                    value={site.area.industryType.charAt(0).toUpperCase() + site.area.industryType.slice(1)}
                    onValueChange={(value) => updateSiteIndustry(index, value)}
                  >
                    <SelectTrigger id={`industry-type-${index}`} className="mt-1">
                      <SelectValue placeholder="Select industry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryTypes.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
        
        <Button type="button" onClick={addSite} variant="outline" className="mt-2 flex items-center">
          <Plus className="h-4 w-4 mr-1" />
          Add Another Site
        </Button>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleNextStep}
          variant="default"
          size="lg"
          className="flex items-center"
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
