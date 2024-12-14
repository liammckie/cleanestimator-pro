import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Employee } from '@/data/types/roster';

interface EmployeeListProps {
  employees: Employee[];
  onEmployeeUpdate: (employees: Employee[]) => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ 
  employees, 
  onEmployeeUpdate 
}) => {
  const getNextEmployeeNumber = () => {
    const existingNumbers = employees
      .map(emp => {
        const match = emp.name.match(/Cleaner(\d+)/);
        return match ? parseInt(match[1]) : 0;
      })
      .filter(num => !isNaN(num));

    return existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
  };

  const addEmployee = () => {
    const newEmployee: Employee = {
      id: crypto.randomUUID(),
      name: `Cleaner${getNextEmployeeNumber()}`,
      level: 1,
      employmentType: 'casual',
      isContractor: false,
      contractorRate: 0,
      certifications: [],
      availability: {}
    };
    onEmployeeUpdate([...employees, newEmployee]);
  };

  const updateEmployee = (index: number, updates: Partial<Employee>) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index] = { ...updatedEmployees[index], ...updates };
    onEmployeeUpdate(updatedEmployees);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Employees</h3>
      <div className="space-y-4">
        {employees.map((employee, index) => (
          <Card key={employee.id}>
            <CardContent className="pt-4 space-y-4">
              <Input
                placeholder="Employee Name"
                value={employee.name}
                onChange={(e) => updateEmployee(index, { name: e.target.value })}
              />
              
              <Select
                value={employee.isContractor ? 'contractor' : 'direct'}
                onValueChange={(value) => {
                  updateEmployee(index, { 
                    isContractor: value === 'contractor',
                    employmentType: value === 'contractor' ? 'contractor' : 'casual'
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Employment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">Direct Employee</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                </SelectContent>
              </Select>

              {employee.isContractor ? (
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Contractor Rate ($)"
                    value={employee.contractorRate || ''}
                    onChange={(e) => updateEmployee(index, { 
                      contractorRate: parseFloat(e.target.value) || 0 
                    })}
                  />
                </div>
              ) : (
                <>
                  <Select
                    value={employee.level.toString()}
                    onValueChange={(value) => updateEmployee(index, { 
                      level: parseInt(value) as 1 | 2 | 3 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Level 1</SelectItem>
                      <SelectItem value="2">Level 2</SelectItem>
                      <SelectItem value="3">Level 3</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={employee.employmentType}
                    onValueChange={(value) => updateEmployee(index, { 
                      employmentType: value as 'casual' | 'part-time' | 'full-time' 
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Employment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="part-time">Part Time</SelectItem>
                      <SelectItem value="full-time">Full Time</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Button onClick={addEmployee}>Add Employee</Button>
    </div>
  );
};