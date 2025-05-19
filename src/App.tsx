
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { TaskProvider } from './components/area/task/TaskContext';
import { TemplatesPage } from './components/templates/TemplatesPage';
import { MainNavigation } from './components/navigation/MainNavigation';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-64 border-r bg-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <MainNavigation />
      </div>
      <div className="flex-1 overflow-auto p-6">
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
          <Route path="*" element={
            <AppLayout>
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-4">Page Under Construction</h1>
                  <p className="text-muted-foreground mb-4">
                    This section is currently being developed.
                  </p>
                  <p className="text-muted-foreground">
                    Please check back later or use the available navigation options.
                  </p>
                </div>
              </div>
            </AppLayout>
          } />
        </Routes>
      </TaskProvider>
    </Router>
  );
};

export default App;
