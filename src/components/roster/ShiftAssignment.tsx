import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Employee, Shift } from '@/data/types/roster';
import { format, parseISO } from 'date-fns';

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
  const shiftTimes = [
    { label: 'Early Morning', value: '06:00-14:00' },
    { label: 'Day', value: '09:00-17:00' },
    { label: 'Afternoon', value: '14:00-22:00' },
    { label: 'Night', value: '22:00-06:00' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unassigned Shifts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {unassignedShifts.map((shift) => (
            <div key={shift.id} className="flex flex-col gap-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{shift.siteName}</p>
                  <p className="text-sm text-gray-500">
                    {format(shift.date, 'EEEE, MMMM do')}
                  </p>
                </div>
                <Select
                  value={`${shift.startTime}-${shift.endTime}`}
                  onValueChange={(value) => {
                    const [start, end] = value.split('-');
                    const updatedShift = {
                      ...shift,
                      startTime: start,
                      endTime: end
                    };
                    onAssign(updatedShift, shift.employeeId || '');
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select shift time" />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftTimes.map((time) => (
                      <SelectItem key={time.value} value={time.value}>
                        {time.label} ({time.value})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-4">
                <Select
                  value={shift.employeeId || ''}
                  onValueChange={(employeeId) => onAssign(shift, employeeId)}
                >
                  <SelectTrigger className="w-full">
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};