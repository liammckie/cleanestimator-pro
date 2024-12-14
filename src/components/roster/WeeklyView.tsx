import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeeklyRoster } from '@/data/types/roster';
import { addDays, format } from 'date-fns';

interface WeeklyViewProps {
  weeklyRoster: WeeklyRoster;
  startDate: Date;
}

export const WeeklyView: React.FC<WeeklyViewProps> = ({
  weeklyRoster,
  startDate,
}) => {
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Employee</th>
                {weekDays.map((day) => (
                  <th key={day.toISOString()} className="px-4 py-2">
                    {format(day, 'EEE dd/MM')}
                  </th>
                ))}
                <th className="px-4 py-2">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(weeklyRoster).flat().map((entry) => (
                <tr key={entry.employeeId}>
                  <td className="px-4 py-2">{entry.employeeName}</td>
                  {weekDays.map((day) => {
                    const dayShifts = entry.shifts.filter(
                      shift => format(shift.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
                    );
                    return (
                      <td key={day.toISOString()} className="px-4 py-2">
                        {dayShifts.map(shift => (
                          <div key={shift.id} className="text-sm">
                            {shift.startTime}-{shift.endTime}
                            <br />
                            {shift.siteName}
                          </div>
                        ))}
                      </td>
                    );
                  })}
                  <td className="px-4 py-2">{entry.totalHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};