import React from 'react';
import { TaskStack } from '../task/TaskStack';
import { CategoryList } from '../CategoryList';

export const ScopeOfWork = () => {
  return (
    <div className="grid grid-cols-[1fr,auto]">
      <div className="p-6">
        <CategoryList />
      </div>
      <TaskStack />
    </div>
  );
};