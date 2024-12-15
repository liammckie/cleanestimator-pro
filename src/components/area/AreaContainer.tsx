import React, { useState } from 'react';
import { CategoryPanel } from './CategoryPanel';
import { TaskManager } from './TaskManager';

export const AreaContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="space-y-6">
      <CategoryPanel
        value={selectedCategory}
        onValueChange={setSelectedCategory}
      />
      <TaskManager category={selectedCategory} />
    </div>
  );
};