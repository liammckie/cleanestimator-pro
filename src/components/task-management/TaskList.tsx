import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CleaningTask } from '@/data/types/taskManagement';

interface TaskListProps {
  tasks: CleaningTask[];
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
}

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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.taskName}</TableCell>
            <TableCell>{task.category}</TableCell>
            <TableCell>{task.productivityRate}</TableCell>
            <TableCell>{task.measurementUnit}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="w-20 px-2 py-1 border rounded"
                  onChange={(e) => onQuantityChange(task.id, Number(e.target.value))}
                  placeholder="Quantity"
                />
                <input
                  type="number"
                  className="w-20 px-2 py-1 border rounded"
                  onChange={(e) => onFrequencyChange(task.id, Number(e.target.value))}
                  placeholder="Times/week"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};