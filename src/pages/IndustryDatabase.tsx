
import React from 'react';
import { IndustryRatesBrowser } from '@/components/industry-rates/IndustryRatesBrowser';

const IndustryDatabase = () => {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Industry Database</h1>
      <p className="text-muted-foreground">
        Browse productivity rates for different industries and areas. The database includes floor productivity rates 
        and restroom fixture cleaning times by industry.
      </p>

      <IndustryRatesBrowser />
    </div>
  );
};

export default IndustryDatabase;
