import React from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { cleaningTaskGroups } from '@/data/tasks/taskDatabase';
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

  // Ensure we have valid task groups
  const taskGroups = cleaningTaskGroups || [];

  // Flatten all tasks for search functionality
  const allTasks = React.useMemo(() => {
    return taskGroups.flatMap(group => 
      (group.categories || []).flatMap(category => 
        (category.tasks || [])
      )
    );
  }, [taskGroups]);

  // Filter tasks based on search query
  const filteredTasks = React.useMemo(() => {
    if (!searchQuery) return [];
    
    return allTasks.filter(task => 
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.notes?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allTasks, searchQuery]);

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput 
        placeholder="Search tasks..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandEmpty>No tasks found.</CommandEmpty>
      
      {searchQuery ? (
        // Show search results
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
      ) : (
        // Show categorized view
        <>
          {taskGroups.map((group) => (
            <React.Fragment key={group.id}>
              {(group.categories || []).map((category) => (
                <CommandGroup key={category.id} heading={category.name}>
                  {(category.tasks || []).map((task) => (
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
              ))}
            </React.Fragment>
          ))}
        </>
      )}
    </Command>
  );
};