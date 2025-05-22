
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ProjectInfoForm } from './site-setup/ProjectInfoForm';
import { SitesList } from './site-setup/SitesList';
import { useSiteSetup } from './site-setup/useSiteSetup';

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
  const {
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
  } = useSiteSetup();

  return (
    <div className="space-y-6">
      <ProjectInfoForm
        projectName={projectName}
        clientName={clientName}
        onProjectNameChange={setProjectName}
        onClientNameChange={setClientName}
      />
      
      <SitesList
        sites={sites}
        industryTypes={industryTypes}
        onAddSite={addSite}
        onRemoveSite={handleRemoveSite}
        onUpdateSite={updateSite}
        onUpdateSiteAddress={updateSiteAddress}
        onUpdateSiteIndustry={updateSiteIndustry}
      />
      
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
