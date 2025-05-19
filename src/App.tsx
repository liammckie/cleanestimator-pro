<think>

</think>

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { TaskProvider } from './components/area/task/TaskContext';
import { TemplatesPage } from './components/templates/TemplatesPage';
import { MainNavigation } from './components/navigation/MainNavigation';
import { menuOptions } from './components/navigation/MenuOptions';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 border-r bg-gray-900 dark:bg-gray-900 dark:border-gray-800">
        <MainNavigation />
      </div>
      <div className="flex-1 overflow-auto p-6 bg-background text-foreground">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/templates" replace />} />
          <Route path="/templates" element={
            <AppLayout>
              <TemplatesPage />
            </AppLayout>
          } />
          {menuOptions.map((option) => (
            <Route
              key={option.id}
              path={`/${option.id}`}
              element={
                <AppLayout>
                  <div className="mt-4">
                    <h1 className="text-2xl font-bold mb-6">{option.label}</h1>
                    {option.id === 'settings' ? (
                      <div>Settings Content</div>
                    ) : option.id === 'sites' ? (
                      <div>Site Manager Content</div>
                    ) : option.id === 'scope' ? (
                      <div>Scope of Work Content</div>
                    ) : option.id === 'task-management' ? (
                      <div>Task Management Content</div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <p>This page is currently under development.</p>
                      </div>
                    )}
                  </div>
                </AppLayout>
              }
            />
          ))}
        </Routes>
      </TaskProvider>
    </Router>
  );
};

export default App;
