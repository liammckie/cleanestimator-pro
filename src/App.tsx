
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./components/area/task/TaskContext";
import { CostProvider } from "./contexts/CostContext";
import Index from "./pages/Index";
import IndustryDatabase from "./pages/IndustryDatabase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TaskProvider>
        <CostProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/industry-database" element={<IndustryDatabase />} />
            </Routes>
          </TooltipProvider>
        </CostProvider>
      </TaskProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
