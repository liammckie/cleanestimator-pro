
import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Database, Users, Settings, Activity, Clock, FileText, Building2, Calculator, Briefcase, FileCog } from "lucide-react";

interface MainNavigationProps {
  className?: string;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({ className }) => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const linkClasses = cn(
    "group flex gap-2 rounded-md p-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground",
    "transition-colors duration-200 ease-in-out",
    "data-[active=true]:bg-accent data-[active=true]:text-accent-foreground",
  );

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="px-4 py-2 flex justify-between items-center border-b border-gray-800">
        <span className="font-bold text-lg text-white">TaskMaster</span>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-300 hover:text-white">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      
      <nav className="space-y-2 p-4">
        <Link
          to="/dashboard"
          className={cn(linkClasses, {
            "data-[active=true]": pathname === "/dashboard",
          }, "text-gray-300")}
        >
          <CalendarDays className="h-4 w-4 mr-2" />
          Dashboard
        </Link>

        <Link
          to="/task-management"
          className={cn(linkClasses, {
            "data-[active=true]": pathname.startsWith("/task-management"),
          }, "text-gray-300")}
        >
          <Briefcase className="h-4 w-4 mr-2" />
          Task Management
        </Link>

        <Link
          to="/sites"
          className={cn(linkClasses, {
            "data-[active=true]": pathname.startsWith("/sites"),
          }, "text-gray-300")}
        >
          <Building2 className="h-4 w-4 mr-2" />
          Sites
        </Link>

        <Link
          to="/areas"
          className={cn(linkClasses, {
            "data-[active=true]": pathname.startsWith("/areas"),
          }, "text-gray-300")}
        >
          <Calculator className="h-4 w-4 mr-2" />
          Areas
        </Link>

        <Link
          to="/employees"
          className={cn(linkClasses, {
            "data-[active=true]": pathname === "/employees",
          }, "text-gray-300")}
        >
          <Users className="h-4 w-4 mr-2" />
          Employees
        </Link>

        <Link
          to="/activity"
          className={cn(linkClasses, {
            "data-[active=true]": pathname === "/activity",
          }, "text-gray-300")}
        >
          <Activity className="h-4 w-4 mr-2" />
          Activity
        </Link>

        <Link
          to="/settings"
          className={cn(linkClasses, {
            "data-[active=true]": pathname === "/settings",
          }, "text-gray-300")}
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Link>
        
        <Link
          to="/templates"
          className={cn(linkClasses, {
            "data-[active=true]": pathname === "/templates",
          }, "text-gray-300 bg-primary/10")}
        >
          <FileCog className="h-4 w-4 mr-2" />
          Task Templates
        </Link>
      </nav>
      
      <div className="mt-auto px-4 py-2 text-center text-muted-foreground">
        <p className="text-xs text-gray-400">
          Powered by TaskMaster
        </p>
      </div>
    </div>
  );
};
