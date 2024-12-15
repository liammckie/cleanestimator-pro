import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { cleaningTasks } from '@/data/tasks/taskDatabase';
import { CleaningTask } from '@/data/types/tasks';

interface TaskSelectorProps {
  onTaskSelect: (taskId: string) => void;
  selectedTasks: string[];
}

export const TaskSelector: React.FC<TaskSelectorProps> = ({
  onTaskSelect,
  selectedTasks,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Core Cleaning');

  const filteredTasks = cleaningTasks.filter(task => 
    task.category === activeCategory &&
    (task.taskName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     task.notes.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Select Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Core Cleaning" onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="Core Cleaning">Core</TabsTrigger>
            <TabsTrigger value="Specialized Cleaning">Specialized</TabsTrigger>
            <TabsTrigger value="Industry-Specific">Industry</TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory}>
            <Command>
              <CommandInput 
                placeholder="Search tasks..." 
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandEmpty>No tasks found.</CommandEmpty>
              <CommandGroup>
                {filteredTasks.map((task: CleaningTask) => (
                  <CommandItem
                    key={task.id}
                    value={task.taskName}
                    onSelect={() => onTaskSelect(task.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTasks.includes(task.id) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{task.taskName}</span>
                      <span className="text-sm text-muted-foreground">
                        {task.productivityRate} {task.measurementUnit}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};