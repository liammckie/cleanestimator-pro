import React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

export const Header = () => {
  return (
    <header className="h-16 border-b bg-primary shadow-md">
      <div className="h-full max-w-screen-2xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="SCS Group Logo" 
            className="h-8 w-auto"
          />
          <span className="text-lg font-semibold text-primary-foreground">
            SCS Group
          </span>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className="text-primary-foreground hover:text-secondary transition-colors px-4 py-2"
                href="/"
              >
                Dashboard
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="w-[200px]" /> {/* Spacer for symmetry */}
      </div>
    </header>
  );
};