
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Clock, Ruler } from 'lucide-react';

interface PeriodicalTaskInputProps {
  task: {
    id: string;
    name: string;
    frequency: string;
    isArea?: boolean;
    areaType?: string;
    floorType?: 'soft' | 'hard';
    measurement?: number;
    unitType: 'sqm' | 'units';
    timeRequired?: number;
    productivityRate?: {
      softFloor?: number;
      hardFloor?: number;
      toiletFixtures?: {
        pans?: number;
        basins?: number;
        ssUrinals?: number;
        ceramicUrinals?: number;
        showers?: number;
      };
    };
  };
  onRemove: (id: string) => void;
  onUpdateMeasurement?: (id: string, value: number) => void;
  onUpdateFloorType?: (id: string, type: 'soft' | 'hard') => void;
}

export const PeriodicalTaskInput: React.FC<PeriodicalTaskInputProps> = ({ 
  task, 
  onRemove,
  onUpdateMeasurement,
  onUpdateFloorType
}) => {
  const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onUpdateMeasurement) {
      const value = parseFloat(e.target.value);
      if (!isNaN(value)) {
        onUpdateMeasurement(task.id, value);
      }
    }
  };

  const handleFloorTypeChange = (value: string) => {
    if (onUpdateFloorType && (value === 'soft' || value === 'hard')) {
      onUpdateFloorType(task.id, value as 'soft' | 'hard');
    }
  };

  // Calculate time required for display
  const getTimeRequired = () => {
    if (task.timeRequired) {
      return task.timeRequired.toFixed(2);
    }
    return '-';
  };

  return (
    <div className="flex flex-col bg-background p-3 rounded-md border">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="font-medium">{task.name}</span>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {task.frequency}x per week
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onRemove(task.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {task.isArea && task.productivityRate && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
          {(task.productivityRate.softFloor || task.productivityRate.hardFloor) && (
            <>
              <div className="col-span-1">
                <Select
                  value={task.floorType || 'soft'}
                  onValueChange={handleFloorTypeChange}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Floor Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soft">Soft Floor</SelectItem>
                    <SelectItem value="hard">Hard Floor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-1">
                <div className="flex items-center h-8 space-x-1">
                  <Input
                    type="number"
                    value={task.measurement || ''}
                    onChange={handleMeasurementChange}
                    placeholder="SQM"
                    className="h-8 text-xs"
                  />
                  <span className="text-xs text-muted-foreground">{task.unitType}</span>
                </div>
              </div>

              <div className="col-span-1 flex items-center h-8">
                <span className="text-xs flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {getTimeRequired()} hours
                </span>
              </div>
            </>
          )}

          {task.productivityRate.toiletFixtures && (
            <div className="col-span-3 grid grid-cols-5 gap-2 mt-1">
              {task.productivityRate.toiletFixtures.pans && (
                <div className="text-xs">
                  <span className="block text-muted-foreground">Pans</span>
                  <span>{task.productivityRate.toiletFixtures.pans}</span>
                </div>
              )}
              {task.productivityRate.toiletFixtures.basins && (
                <div className="text-xs">
                  <span className="block text-muted-foreground">Basins</span>
                  <span>{task.productivityRate.toiletFixtures.basins}</span>
                </div>
              )}
              {task.productivityRate.toiletFixtures.ssUrinals && (
                <div className="text-xs">
                  <span className="block text-muted-foreground">SS Urinals</span>
                  <span>{task.productivityRate.toiletFixtures.ssUrinals}</span>
                </div>
              )}
              {task.productivityRate.toiletFixtures.ceramicUrinals && (
                <div className="text-xs">
                  <span className="block text-muted-foreground">Ceramic Urinals</span>
                  <span>{task.productivityRate.toiletFixtures.ceramicUrinals}</span>
                </div>
              )}
              {task.productivityRate.toiletFixtures.showers && (
                <div className="text-xs">
                  <span className="block text-muted-foreground">Showers</span>
                  <span>{task.productivityRate.toiletFixtures.showers}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {!task.isArea && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <div className="flex items-center h-8 space-x-1">
              <Input
                type="number"
                value={task.measurement || ''}
                onChange={handleMeasurementChange}
                placeholder={task.unitType === 'sqm' ? "SQM" : "Units"}
                className="h-8 text-xs"
              />
              <span className="text-xs text-muted-foreground">{task.unitType}</span>
            </div>
          </div>

          <div className="flex items-center h-8">
            <span className="text-xs flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {getTimeRequired()} hours
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
