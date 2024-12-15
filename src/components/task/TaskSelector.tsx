import React from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { cleaningTaskGroups, getAllTasks } from '@/data/tasks/taskDatabase';
import { CleaningTask } from '@/data/types/tasks';

interface TaskSelectorProps {
  onTaskSelect: (taskId: string) => void;
  selectedTasks: string[];
}

export const TaskSelector: React.FC<TaskSelectorProps> = ({
  onTaskSelect,
  selectedTasks = []
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredTasks = React.useMemo(() => {
    const allTasks = getAllTasks();

    if (!searchQuery) return allTasks;

    return allTasks.filter(task => 
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.notes?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Ensure we have valid task groups
  const taskGroups = React.useMemo(() => {
    return cleaningTaskGroups || [];
  }, []);

  // If we're searching, show filtered tasks
  if (searchQuery) {
    return (
      <Command className="rounded-lg border shadow-md">
        <CommandInput 
          placeholder="Search tasks..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandEmpty>No tasks found.</CommandEmpty>
        <CommandGroup heading="Search Results">
          {filteredTasks.map((task) => (
            <CommandItem
              key={task.id}
              value={task.name}
              onSelect={() => onTaskSelect(task.id)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedTasks.includes(task.id) ? "opacity-100" : "opacity-0"
                )}
              />
              <div className="flex flex-col">
                <span>{task.name}</span>
                <span className="text-sm text-muted-foreground">
                  {task.rate} {task.unit}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    );
  }

  // Show categorized view when not searching
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput 
        placeholder="Search tasks..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandEmpty>No tasks found.</CommandEmpty>
      {taskGroups.map(group => (
        <CommandGroup key={group.id} heading={group.name}>
          {(group.categories || []).map(category => (
            (category.tasks || []).map((task) => (
              <CommandItem
                key={task.id}
                value={task.name}
                onSelect={() => onTaskSelect(task.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedTasks.includes(task.id) ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span>{task.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {task.rate} {task.unit}
                  </span>
                </div>
              </CommandItem>
            ))
          ))}
        </CommandGroup>
      ))}
    </Command>
  );
};