import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DragHandle } from "lucide-react";

export const builderElements = [
  { id: 'task-list', label: 'Task List' },
  { id: 'scope-sidebar', label: 'Scope Sidebar' },
  { id: 'site-counter', label: 'Site Counter' },
];

export const BuilderMenu = () => {
  return (
    <Card className="p-4 w-64 fixed left-4 top-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <h3 className="font-semibold mb-4">Builder Elements</h3>
      <div className="space-y-2">
        {builderElements.map((element) => (
          <Button
            key={element.id}
            variant="outline"
            className="w-full justify-between group"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', element.id);
            }}
          >
            {element.label}
            <DragHandle className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Button>
        ))}
      </div>
    </Card>
  );
};