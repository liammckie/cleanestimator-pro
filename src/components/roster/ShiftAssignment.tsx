import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Employee, Shift } from '@/data/types/roster';
import { format } from 'date-fns';

interface ShiftAssignmentProps {
  unassignedShifts: Shift[];
  employees: Employee[];
  onAssign: (shift: Shift, employeeId: string) => void;
}

export const ShiftAssignment: React.FC<ShiftAssignmentProps> = ({
  unassignedShifts,
  employees,
  onAssign,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Unassigned Shifts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {unassignedShifts.map((shift) => (
            <div key={shift.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{shift.siteName}</p>
                <p className="text-sm text-gray-500">
                  {format(shift.date, 'PPP')} - {shift.startTime} to {shift.endTime}
                </p>
              </div>
              <Select
                onValueChange={(employeeId) => onAssign(shift, employeeId)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Assign Employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees
                    .filter(employee => employee.level >= shift.requiredLevel)
                    .map(employee => (
                      <SelectItem key={employee.id} value={employee.id}>
                        {employee.name} (Level {employee.level})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};