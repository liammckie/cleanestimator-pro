import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Task } from '@/data/types/productivity';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TaskTableProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
}

export const TaskTable = ({ tasks, onDeleteTask }: TaskTableProps) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No tasks available. Add tasks using the input form or import them from a CSV file.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task Name</TableHead>
                  <TableHead>Productivity Rate</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.name}</TableCell>
                    <TableCell>{task.productivityRate}</TableCell>
                    <TableCell>{task.unit}</TableCell>
                    <TableCell>{task.notes}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};