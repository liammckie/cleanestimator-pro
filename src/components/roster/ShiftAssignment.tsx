import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const shiftId = result.draggableId;
    const employeeId = result.destination.droppableId;
    const shift = unassignedShifts.find(s => s.id === shiftId);

    if (shift) {
      onAssign(shift, employeeId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unassigned Shifts</CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="space-y-4">
            <Droppable droppableId="unassigned-shifts">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {unassignedShifts.map((shift, index) => (
                    <Draggable
                      key={shift.id}
                      draggableId={shift.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex items-center gap-4 p-4 border rounded-lg bg-white 
                            ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                        >
                          <div className="flex-1">
                            <p className="font-medium">{shift.siteName}</p>
                            <p className="text-sm text-gray-500">
                              {format(shift.date, 'PPP')} - {shift.startTime} to {shift.endTime}
                            </p>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {employees.map((employee) => (
                <Droppable key={employee.id} droppableId={employee.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-4 border rounded-lg min-h-[100px] 
                        ${snapshot.isDraggingOver ? 'bg-gray-50' : 'bg-white'}`}
                    >
                      <h3 className="font-medium mb-2">{employee.name}</h3>
                      <p className="text-sm text-gray-500">Level {employee.level}</p>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </div>
        </DragDropContext>
      </CardContent>
    </Card>
  );
};