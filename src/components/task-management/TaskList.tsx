import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CleaningTask } from '@/data/types/taskManagement';

interface TaskListProps {
  tasks: CleaningTask[];
  selectedTasks: Array<CleaningTask & { quantity: number }>;
  onTaskSelect: (task: CleaningTask) => void;
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectedTasks,
  onTaskSelect,
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTaskSelect(task)}
                disabled={selectedTasks.some(t => t.id === task.id)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Scope
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};