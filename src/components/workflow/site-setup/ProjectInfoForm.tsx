
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProjectInfoFormProps {
  projectName: string;
  clientName: string;
  onProjectNameChange: (value: string) => void;
  onClientNameChange: (value: string) => void;
}

export const ProjectInfoForm: React.FC<ProjectInfoFormProps> = ({
  projectName,
  clientName,
  onProjectNameChange,
  onClientNameChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label htmlFor="project-name">Project Name</Label>
        <Input
          id="project-name"
          name="project-name"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          className="mt-1"
          placeholder="Enter project name"
          aria-label="Project name"
        />
      </div>
      
      <div>
        <Label htmlFor="client-name">Client Name</Label>
        <Input
          id="client-name"
          name="client-name"
          value={clientName}
          onChange={(e) => onClientNameChange(e.target.value)}
          className="mt-1"
          placeholder="Enter client name"
          aria-label="Client name"
        />
      </div>
    </div>
  );
};
