import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { CleaningTask } from '@/data/types/taskManagement';

interface CsvImportProps {
  onImport: (tasks: Omit<CleaningTask, 'id'>[]) => void;
}

export const CsvImport: React.FC<CsvImportProps> = ({ onImport }) => {
  const [csvText, setCsvText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const parseCsvText = (text: string): Omit<CleaningTask, 'id'>[] => {
    const lines = text.trim().split('\n');
    const tasks: Omit<CleaningTask, 'id'>[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const [category, taskName, productivityRate, measurementUnit, minimumQuantity = '', chargeRate = '', notes = ''] = line.split(',').map(item => item.trim());

      if (!category || !taskName || !productivityRate || !measurementUnit) {
        throw new Error(`Invalid format in line ${i + 1}. Expected: Category,TaskName,ProductivityRate,MeasurementUnit[,MinimumQuantity,ChargeRate,Notes]`);
      }

      if (!['Core Cleaning', 'Specialized Cleaning', 'Industry-Specific Cleaning'].includes(category)) {
        throw new Error(`Invalid category "${category}" in line ${i + 1}. Must be one of: Core Cleaning, Specialized Cleaning, Industry-Specific Cleaning`);
      }

      if (!['SQM/hour', 'Units/hour'].includes(measurementUnit)) {
        throw new Error(`Invalid measurement unit "${measurementUnit}" in line ${i + 1}. Must be either SQM/hour or Units/hour`);
      }

      const rate = parseFloat(productivityRate);
      if (isNaN(rate) || rate <= 0) {
        throw new Error(`Invalid productivity rate "${productivityRate}" in line ${i + 1}. Must be a positive number`);
      }

      tasks.push({
        category: category as CleaningTask['category'],
        taskName,
        productivityRate: rate,
        measurementUnit: measurementUnit as 'SQM/hour' | 'Units/hour',
        minimumQuantity: minimumQuantity ? parseFloat(minimumQuantity) : undefined,
        chargeRate: chargeRate ? parseFloat(chargeRate) : undefined,
        notes
      });
    }

    return tasks;
  };

  const handleImport = () => {
    try {
      setError(null);
      const tasks = parseCsvText(csvText);
      if (tasks.length === 0) {
        throw new Error('No valid tasks found in the CSV text');
      }
      onImport(tasks);
      setCsvText('');
      toast({
        title: "Tasks Imported",
        description: `Successfully imported ${tasks.length} tasks`,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse CSV text');
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Import Tasks from CSV</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Paste CSV data in the format: Category,TaskName,ProductivityRate,MeasurementUnit[,MinimumQuantity,ChargeRate,Notes]
        </p>
      </div>
      <Textarea
        value={csvText}
        onChange={(e) => setCsvText(e.target.value)}
        placeholder="Core Cleaning,Vacuum Carpets,200,SQM/hour,10,5,Regular vacuuming of carpeted areas"
        className="min-h-[200px]"
      />
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button onClick={handleImport} disabled={!csvText.trim()}>
        Import Tasks
      </Button>
    </div>
  );
};