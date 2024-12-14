import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Employee, Shift, WeeklyRoster } from '@/data/types/roster';
import { EmployeeList } from './EmployeeList';
import { ShiftAssignment } from './ShiftAssignment';
import { WeeklyView } from './WeeklyView';
import { addDays, startOfWeek, format } from 'date-fns';

export const RosterManager = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [weeklyRoster, setWeeklyRoster] = useState<WeeklyRoster>({});
  const [unassignedShifts, setUnassignedShifts] = useState<Shift[]>([]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const generateWeeklyShifts = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    
    const newShifts: Shift[] = weekDays.flatMap(date => {
      // Generate two shifts per day as an example
      return [
        {
          id: crypto.randomUUID(),
          siteId: 'site1',
          siteName: 'Main Office',
          startTime: '09:00',
          endTime: '17:00',
          date: date,
          requiredLevel: 1,
          requiredCertifications: []
        },
        {
          id: crypto.randomUUID(),
          siteId: 'site2',
          siteName: 'Medical Center',
          startTime: '14:00',
          endTime: '22:00',
          date: date,
          requiredLevel: 2,
          requiredCertifications: ['Medical Cleaning']
        }
      ];
    });

    setUnassignedShifts(newShifts);
  };

  const assignShift = (shift: Shift, employeeId: string) => {
    const dateKey = format(shift.date, 'yyyy-MM-dd');
    const employee = employees.find(emp => emp.id === employeeId);
    
    if (!employee) return;

    const newWeeklyRoster = { ...weeklyRoster };
    if (!newWeeklyRoster[dateKey]) {
      newWeeklyRoster[dateKey] = [];
    }

    // Update or add the roster entry
    const existingEntryIndex = newWeeklyRoster[dateKey].findIndex(
      entry => entry.employeeId === employeeId
    );

    if (existingEntryIndex >= 0) {
      newWeeklyRoster[dateKey][existingEntryIndex].shifts.push(shift);
    } else {
      newWeeklyRoster[dateKey].push({
        employeeId: employeeId,
        employeeName: employee.name,
        shifts: [shift],
        totalHours: 8 // This should be calculated based on shift duration
      });
    }

    setWeeklyRoster(newWeeklyRoster);
    setUnassignedShifts(unassignedShifts.filter(s => s.id !== shift.id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Roster Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Week</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
              />
              <Button 
                onClick={generateWeeklyShifts}
                className="mt-4"
              >
                Generate Weekly Shifts
              </Button>
            </div>
            <EmployeeList 
              employees={employees} 
              onEmployeeUpdate={setEmployees}
            />
          </div>
        </CardContent>
      </Card>

      <ShiftAssignment
        unassignedShifts={unassignedShifts}
        employees={employees}
        onAssign={assignShift}
      />

      <WeeklyView
        weeklyRoster={weeklyRoster}
        startDate={startOfWeek(selectedDate)}
      />
    </div>
  );
};