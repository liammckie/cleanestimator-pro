import React from 'react';
import { Button } from "@/components/ui/button";
import { List, Grid, Settings } from "lucide-react";

interface MainNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const MainNav = ({ activeView, onViewChange }: MainNavProps) => {
  const navItems = [
    { id: 'sites', label: 'Sites', icon: List },
    { id: 'scope', label: 'Scope', icon: Grid },
    { id: 'costs', label: 'Costs', icon: Settings },
    { id: 'roster', label: 'Roster', icon: List },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="h-16 container flex items-center">
        <div className="relative flex w-full justify-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                className="w-40 justify-start"
                onClick={() => onViewChange(item.id)}
              >
                <Icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};