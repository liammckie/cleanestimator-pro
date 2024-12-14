import React from 'react';
import { RosterManager } from '@/components/roster/RosterManager';

export const RosterView = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Roster Management</h1>
      </div>
      <RosterManager />
    </div>
  );
};