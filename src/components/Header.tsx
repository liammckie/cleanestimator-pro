import React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

export const Header = () => {
  return (
    <div className="flex items-center h-16 px-6 bg-primary border-b border-primary/20">
      <div className="flex items-center gap-3">
        <img 
          src="/logo.png" 
          alt="SCS Group Logo" 
          className="h-8 w-auto"
        />
        <span className="text-lg font-semibold text-white">SCS Group</span>
      </div>
      <NavigationMenu className="mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink 
              className="text-white hover:text-secondary transition-colors px-4 py-2"
              href="/"
            >
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};