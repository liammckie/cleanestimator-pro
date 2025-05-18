
import React, { useState } from 'react';
import { PeriodicService } from '@/data/types/periodicServices';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface PeriodicServiceEditorProps {
  service: PeriodicService;
  onSave: (id: string, rate: number) => void;
  onCancel: () => void;
}

export const PeriodicServiceEditor: React.FC<PeriodicServiceEditorProps> = ({
  service,
  onSave,
  onCancel
}) => {
  const [rate, setRate] = useState(service.rate.toString());
  
  const handleSave = () => {
    const numRate = parseFloat(rate);
    if (!isNaN(numRate) && numRate >= 0) {
      onSave(service.id, numRate);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="number"
        min="0"
        step="0.01"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        className="w-24"
      />
      <Button 
        size="icon" 
        variant="ghost" 
        onClick={handleSave}
        className="h-8 w-8 text-green-500"
      >
        <Check className="h-4 w-4" />
      </Button>
      <Button 
        size="icon" 
        variant="ghost" 
        onClick={onCancel}
        className="h-8 w-8 text-red-500"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
