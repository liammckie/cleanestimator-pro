import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTaskContext } from './area/task/TaskContext';
import { CategoryGroup } from '@/data/types/categories';

interface CategoryListProps {
  groups: CategoryGroup[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ groups }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { handleTaskSelection } = useTaskContext();
  const { toast } = useToast();

  const handleAddTask = (taskId: string, taskName: string) => {
    handleTaskSelection(taskId, true);
    toast({
      title: "Task Added",
      description: `${taskName} has been added to your scope of work.`,
    });
  };

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.id} className="space-y-2">
          <h2 className="text-xl font-bold">{group.name}</h2>
          {group.categories?.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                className="w-full text-left p-2 hover:bg-accent rounded-lg"
              >
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </button>
              
              {expandedCategory === category.id && (
                <div className="ml-4 mt-2 space-y-2">
                  {category.subcategories?.map((subcategory) => (
                    <div key={subcategory.id} className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">{subcategory.name}</h4>
                      <div className="space-y-2">
                        {subcategory.tasks?.map((task) => (
                          <Card key={task.id} className="hover:bg-accent/50">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{task.task}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {task.ratePerHour} {task.unit}
                                  </p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleAddTask(task.id, task.task)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};