
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building, Home } from 'lucide-react';

export const DatabaseNavigation = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDatabase = location.pathname === '/industry-database';
  
  return (
    <div className="flex gap-2 mb-6">
      <Button 
        variant={isHome ? "default" : "ghost"} 
        asChild 
        className={isHome ? "bg-primary hover:bg-primary/90" : "hover:bg-accent"}
      >
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          Home
        </Link>
      </Button>
      <Button 
        variant={isDatabase ? "default" : "ghost"} 
        asChild 
        className={isDatabase ? "bg-primary hover:bg-primary/90" : "hover:bg-accent"}
      >
        <Link to="/industry-database" className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          Industry Database
        </Link>
      </Button>
    </div>
  );
};
