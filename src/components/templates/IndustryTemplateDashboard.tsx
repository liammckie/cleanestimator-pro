
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Clock, CalendarDays } from "lucide-react";
import { TemplateTask } from '@/data/types/industryRates';

interface IndustryTemplateDashboardProps {
  tasks: TemplateTask[];
  industryType: string;
}

export const IndustryTemplateDashboard: React.FC<IndustryTemplateDashboardProps> = ({
  tasks,
  industryType
}) => {
  // Calculate totals and metrics
  const totalTasks = tasks.length;
  const totalWeeklyHours = tasks.reduce((sum, task) => {
    const frequency = parseInt(task.frequency || '0');
    return sum + (task.timeRequired || 0) * frequency;
  }, 0);
  const totalMonthlyHours = totalWeeklyHours * 4.33;
  const totalAnnualHours = totalMonthlyHours * 12;

  const areaBasedTasks = tasks.filter(task => task.isArea && task.measurement);
  const unitBasedTasks = tasks.filter(task => !task.isArea || !task.measurement);
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {industryType} Template Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-muted/50 p-3 rounded-md space-y-1">
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-bold">{totalTasks}</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-md space-y-1">
              <p className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Weekly Hours
              </p>
              <p className="text-2xl font-bold">{totalWeeklyHours.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-md space-y-1">
              <p className="text-sm text-muted-foreground flex items-center">
                <CalendarDays className="h-4 w-4 mr-1" />
                Monthly Hours
              </p>
              <p className="text-2xl font-bold">{totalMonthlyHours.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-md space-y-1">
              <p className="text-sm text-muted-foreground">Annual Hours</p>
              <p className="text-2xl font-bold">{totalAnnualHours.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Tasks Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Measurement</TableHead>
                <TableHead>Weekly Frequency</TableHead>
                <TableHead className="text-right">Hours/Week</TableHead>
                <TableHead className="text-right">Hours/Month</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map(task => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>{task.isArea ? (task.areaType || 'Area') : 'Custom'}</TableCell>
                  <TableCell>
                    {task.measurement ? `${task.measurement} ${task.unitType}` : 'N/A'}
                  </TableCell>
                  <TableCell>{task.frequency}x</TableCell>
                  <TableCell className="text-right">
                    {task.timeRequired ? (task.timeRequired * parseInt(task.frequency)).toFixed(2) : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    {task.timeRequired ? (task.timeRequired * parseInt(task.frequency) * 4.33).toFixed(2) : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
