import { useState, useEffect } from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Site } from '@/data/types/site';

export const useSiteSetup = () => {
  const { workflowData, updateWorkflowData, removeSite: removeWorkflowSite, nextStep } = useWorkflow();
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

  // Update project and client name in workflow data
  useEffect(() => {
    updateWorkflowData({ 
      projectName,
      clientName
    });
  }, [projectName, clientName, updateWorkflowData]);

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
    
    removeWorkflowSite(siteId);
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

  const handleNextStep = () => {
    // Save current data before proceeding
    updateWorkflowData({
      projectName,
      clientName,
      sites
    });
    nextStep();
  };

  return {
    projectName,
    setProjectName,
    clientName,
    setClientName,
    sites,
    addSite,
    handleRemoveSite,
    updateSite,
    updateSiteAddress,
    updateSiteIndustry,
    handleNextStep
  };
};
