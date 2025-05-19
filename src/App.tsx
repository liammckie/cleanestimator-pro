import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { TaskManagementPage } from './components/task-management/TaskManagementPage';
import { SitesPage } from './components/sites/SitesPage';
import { AreasPage } from './components/areas/AreasPage';
import { EmployeesPage } from './components/employees/EmployeesPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { OverviewPage } from './components/overview/OverviewPage';
import { ClientsPage } from './components/clients/ClientsPage';
import { BillingPage } from './components/billing/BillingPage';
import { ReportsPage } from './components/reports/ReportsPage';
import { TaskProvider } from './components/area/task/TaskContext';
import { TemplatesPage } from './components/templates/TemplatesPage';

const App = () => {
  const linkClasses = "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium hover:bg-secondary hover:text-accent focus:bg-secondary focus:text-accent data-[state=active]:bg-secondary data-[state=active]:text-accent";
  
  return (
    <Router>
      <div className="flex">
        <div className="w-64 flex-shrink-0 border-r bg-gray-100 dark:bg-gray-900 dark:border-gray-800 h-screen">
          <div className="p-4">
            <Link to="/" className="block text-lg font-semibold">Cleaning Management</Link>
          </div>
          
          <nav className="space-y-2">
            <NavLink to="/" className={linkClasses} end>
              Dashboard
            </NavLink>
            <NavLink to="/overview" className={linkClasses}>
              Overview
            </NavLink>
            <NavLink to="/task-management" className={linkClasses}>
              Task Management
            </NavLink>
            <NavLink to="/sites" className={linkClasses}>
              Sites
            </NavLink>
            <NavLink to="/areas" className={linkClasses}>
              Areas
            </NavLink>
            <NavLink to="/employees" className={linkClasses}>
              Employees
            </NavLink>
            <NavLink to="/clients" className={linkClasses}>
              Clients
            </NavLink>
          </nav>
          
          <div className="mt-auto p-4">
            <NavLink to="/billing" className={linkClasses}>
              Billing
            </NavLink>
            <NavLink to="/reports" className={linkClasses}>
              Reports
            </NavLink>
            <NavLink to="/settings" className={linkClasses}>
              Settings
            </NavLink>
            <NavLink to="/templates" className={linkClasses}>
              Task Templates
            </NavLink>
          </div>
        </div>
        
        <div className="flex-1 min-h-screen">
          <Routes>
            <Route path="/" element={<MainLayout><DashboardPage /></MainLayout>} />
            <Route path="/overview" element={<MainLayout><OverviewPage /></MainLayout>} />
            <Route path="/task-management" element={<MainLayout><TaskManagementPage /></MainLayout>} />
            <Route path="/sites" element={<MainLayout><SitesPage /></MainLayout>} />
            <Route path="/areas" element={<MainLayout><TaskProvider><AreasPage /></TaskProvider></MainLayout>} />
            <Route path="/employees" element={<MainLayout><EmployeesPage /></MainLayout>} />
            <Route path="/clients" element={<MainLayout><ClientsPage /></MainLayout>} />
            <Route path="/billing" element={<MainLayout><BillingPage /></MainLayout>} />
            <Route path="/reports" element={<MainLayout><ReportsPage /></MainLayout>} />
            <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />
            <Route path="/templates" element={<MainLayout><TemplatesPage /></MainLayout>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
