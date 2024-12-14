import React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

export const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-primary w-full">
      <div className="flex items-center gap-2 ml-4">
        <img 
          src="/logo.png" 
          alt="SCS Group Logo" 
          className="h-10 w-auto"
        />
        <span className="text-xl font-bold text-white">SCS Group</span>
      </div>
      <NavigationMenu className="absolute left-1/2 transform -translate-x-1/2">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink 
              className="text-white hover:text-secondary transition-colors"
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