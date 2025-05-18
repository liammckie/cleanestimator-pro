
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Buildings, Home } from 'lucide-react';

export const DatabaseNavigation = () => {
  return (
    <div className="flex gap-2 mb-6">
      <Button variant="outline" asChild>
        <Link to="/" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          Home
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link to="/industry-database" className="flex items-center gap-2">
          <Buildings className="h-4 w-4" />
          Industry Database
        </Link>
      </Button>
    </div>
  );
};
