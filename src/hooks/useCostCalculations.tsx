import { useCallback } from 'react';
import { Site } from '@/data/types/site';
import { OnCostsState } from '@/data/types/onCosts';
import { calculateTaskCosts, calculateTotalMonthlyHours } from '@/utils/costingCalculations';
import { useToast } from '@/components/ui/use-toast';

export const useCostCalculations = (
  sites: Site[],
  laborCosts: { hourlyRate: number; onCosts?: OnCostsState },
  setLaborCosts: (costs: any) => void
) => {
  const { toast } = useToast();

  const handleUpdateSite = useCallback((siteId: string, tasks: any[]) => {
    console.log('Updating site tasks:', { siteId, tasks });
    
    const updatedSites = sites.map(site => 
      site.id === siteId ? {
        ...site,
        area: {
          ...site.area,
          selectedTasks: tasks.map(task => ({
            ...task,
            timeRequired: task.timeRequired || 0
          })),
          totalTime: tasks.reduce((total, task) => total + (task.timeRequired || 0), 0)
        }
      } : site
    );

    const totalMonthlyHours = calculateTotalMonthlyHours(updatedSites);
    const taskCosts = calculateTaskCosts(updatedSites, laborCosts.hourlyRate, laborCosts.onCosts);
    
    console.log('Updated calculations:', {
      totalMonthlyHours,
      taskCosts,
      laborRate: laborCosts.hourlyRate
    });

    setLaborCosts(prev => ({
      ...prev,
      totalMonthlyHours,
      taskCosts
    }));

    toast({
      title: "Site Updated",
      description: "Task calculations have been updated successfully.",
    });

    return updatedSites;
  }, [sites, laborCosts, setLaborCosts, toast]);

  const handleMarginChange = useCallback((margin: number) => {
    const totalCosts = sites.reduce((acc, site) => {
      const siteCosts = site.area?.selectedTasks?.reduce((taskAcc, task) => {
        const monthlyHours = (task.timeRequired || 0) * (task.frequency?.timesPerMonth || 4.33);
        return taskAcc + (monthlyHours * laborCosts.hourlyRate);
      }, 0) || 0;
      return acc + siteCosts;
    }, 0);

    const suggestedRevenue = totalCosts / (1 - (margin / 100));
    
    console.log('Margin calculations:', {
      margin,
      totalCosts,
      suggestedRevenue,
      sites
    });

    return suggestedRevenue;
  }, [sites, laborCosts.hourlyRate]);

  return {
    handleUpdateSite,
    handleMarginChange,
    totalMonthlyHours: calculateTotalMonthlyHours(sites),
    taskCosts: calculateTaskCosts(sites, laborCosts.hourlyRate, laborCosts.onCosts)
  };
};