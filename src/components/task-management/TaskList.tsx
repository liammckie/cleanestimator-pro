import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CleaningTask } from '@/data/types/taskManagement';

interface TaskListProps {
  tasks: CleaningTask[];
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
}

const frequencyOptions = [
  { label: 'Monthly', value: '0.25', timesPerMonth: 1 },
  { label: 'Fortnightly', value: '0.5', timesPerMonth: 2.17 },
  { label: 'Weekly', value: '1', timesPerMonth: 4.33 },
  { label: '2x Weekly', value: '2', timesPerMonth: 8.66 },
  { label: '3x Weekly', value: '3', timesPerMonth: 13 },
  { label: '4x Weekly', value: '4', timesPerMonth: 17.33 },
  { label: '5x Weekly', value: '5', timesPerMonth: 21.66 },
  { label: '6x Weekly', value: '6', timesPerMonth: 26 },
  { label: '7x Weekly', value: '7', timesPerMonth: 30.33 }
];

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onQuantityChange,
  onFrequencyChange
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Productivity Rate</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Min Qty</TableHead>
          <TableHead>Charge Rate</TableHead>
          <TableHead className="w-[300px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.taskName}</TableCell>
            <TableCell>{task.category}</TableCell>
            <TableCell>{task.productivityRate}</TableCell>
            <TableCell>{task.measurementUnit}</TableCell>
            <TableCell>{task.minimumQuantity ?? '-'}</TableCell>
            <TableCell>{task.chargeRate ?? '-'}</TableCell>
            <TableCell>
              <div className="flex gap-4">
                <div className="w-32">
                  <Input
                    type="number"
                    className="w-full px-2 py-1 border rounded bg-background"
                    onChange={(e) => onQuantityChange(task.id, Number(e.target.value))}
                    placeholder="Quantity"
                  />
                </div>
                <div className="w-40">
                  <Select
                    onValueChange={(value) => onFrequencyChange(task.id, Number(value))}
                    defaultValue="1"
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {frequencyOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};