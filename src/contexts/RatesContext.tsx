
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BaseRate, 
  ProductivityRate, 
  LaborRate, 
  OnCostRate, 
  ProfitRate,
  ChargeoutRate,
  ContractorRate
} from '@/data/types/rates';
import { OnCostsState } from '@/data/types/onCosts';
import { calculateTotalOnCostPercentage } from '@/utils/onCostsCalculations';
import { supabase } from "@/integrations/supabase/client";

interface RatesContextType {
  // Productivity rates
  productivityRates: ProductivityRate[];
  setProductivityRate: (taskId: string, rate: number, toolId?: string) => void;
  getProductivityRate: (taskId: string, toolId?: string) => number | undefined;
  
  // Labor rates
  laborRates: LaborRate[];
  getDefaultLaborRate: () => number;
  setLaborRate: (rate: LaborRate) => void;
  
  // On-costs
  onCosts: OnCostsState;
  updateOnCost: (category: string, name: string, rate: number, isEnabled: boolean) => void;
  getTotalOnCostPercentage: () => number;
  
  // Profit margins
  profitRates: ProfitRate[];
  getDefaultProfitRate: () => number;
  setProfitRate: (rate: ProfitRate) => void;
  
  // Charge-out rates
  chargeoutRates: ChargeoutRate[];
  setChargeoutRate: (taskId: string, rate: number) => void;
  getChargeoutRate: (taskId: string) => number | undefined;
  
  // Contractor rates
  contractorRates: ContractorRate[];
  setContractorRate: (contractorId: string, rate: number) => void;
  getContractorRate: (contractorId: string) => number | undefined;

  // Calculation methods
  calculateFullyLoadedRate: (baseRate: number) => number;
  calculateProfitMargin: (cost: number, profitRate?: number) => number;
}

const defaultLaborRate = 38;
const defaultProfitRate = 15; // 15% profit margin

const defaultOnCosts: OnCostsState = {
  statutoryOnCosts: [
    { name: 'Superannuation Guarantee', rate: 12.0, isEnabled: true, category: 'statutory', isMandatory: true },
    { name: 'Workers Compensation', rate: 2.5, isEnabled: true, category: 'statutory', isMandatory: true },
    { name: 'Payroll Tax', rate: 4.85, isEnabled: true, category: 'statutory', isMandatory: true },
    { name: 'Annual Leave & Loading', rate: 8.44, isEnabled: true, category: 'statutory', isMandatory: true },
    { name: 'Sick/Personal Leave', rate: 3.85, isEnabled: true, category: 'statutory', isMandatory: true },
    { name: 'Portable Long Service Leave', rate: 1.8, isEnabled: true, category: 'statutory', isMandatory: true },
  ],
  employmentOnCosts: [
    { name: 'Uniform & PPE', rate: 0.5, isEnabled: true, category: 'employment' },
    { name: 'Training Allowance', rate: 1.5, isEnabled: false, category: 'employment' },
  ],
  recruitmentOnCosts: [
    { name: 'Recruitment & Training', rate: 1.5, isEnabled: true, category: 'recruitment' },
    { name: 'Administrative & Payroll Costs', rate: 2.0, isEnabled: true, category: 'recruitment' },
  ],
  overheadOnCosts: [
    { name: 'Equipment & Tools', rate: 2.0, isEnabled: false, category: 'overhead' },
  ],
  miscellaneousOnCosts: [
    { name: 'Insurance', rate: 1.0, isEnabled: false, category: 'miscellaneous' },
  ],
};

const RatesContext = createContext<RatesContextType | undefined>(undefined);

export const RatesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productivityRates, setProductivityRates] = useState<ProductivityRate[]>([]);
  const [laborRates, setLaborRates] = useState<LaborRate[]>([]);
  const [onCosts, setOnCosts] = useState<OnCostsState>(defaultOnCosts);
  const [profitRates, setProfitRates] = useState<ProfitRate[]>([]);
  const [chargeoutRates, setChargeoutRates] = useState<ChargeoutRate[]>([]);
  const [contractorRates, setContractorRates] = useState<ContractorRate[]>([]);

  useEffect(() => {
    // Load rates from database or local storage on component mount
    loadRates();
  }, []);

  const loadRates = async () => {
    try {
      // Here we would fetch rates from the database
      // For now, we'll use default values
      console.log('Loading rates from storage...');
      
      // Try to load from localStorage first
      const savedOnCosts = localStorage.getItem('onCosts');
      if (savedOnCosts) {
        setOnCosts(JSON.parse(savedOnCosts));
      }
      
      // In a real implementation, fetch from Supabase
      // const { data: productivityData } = await supabase.from('productivity_rates').select('*');
      // if (productivityData) setProductivityRates(productivityData);
      // etc...
    } catch (error) {
      console.error('Error loading rates:', error);
    }
  };

  const saveRates = () => {
    // Save rates to localStorage for persistence
    localStorage.setItem('onCosts', JSON.stringify(onCosts));
    
    // In a real implementation, also save to Supabase
    // supabase.from('on_costs').upsert(onCostsToArray(onCosts))
    // etc...
  };

  // Productivity rate methods
  const setProductivityRate = (taskId: string, rate: number, toolId?: string) => {
    const now = new Date();
    const newRate: ProductivityRate = {
      id: `${taskId}-${toolId || 'default'}-${now.getTime()}`,
      name: `Productivity rate for task ${taskId}`,
      type: 'productivity',
      value: rate,
      effectiveDate: now,
      isActive: true,
      taskId,
      toolId,
      unit: 'sqm/hour',
      createdAt: now,
      updatedAt: now
    };
    
    setProductivityRates(prev => {
      // Deactivate any existing rate for this task/tool
      const updated = prev.map(r => 
        (r.taskId === taskId && r.toolId === toolId) 
          ? { ...r, isActive: false } 
          : r
      );
      return [...updated, newRate];
    });
    
    saveRates();
  };
  
  const getProductivityRate = (taskId: string, toolId?: string): number | undefined => {
    const rate = productivityRates.find(r => 
      r.taskId === taskId && 
      r.toolId === toolId && 
      r.isActive
    );
    return rate?.value;
  };
  
  // Labor rate methods
  const getDefaultLaborRate = (): number => {
    const defaultRate = laborRates.find(r => r.isDefault && r.isActive);
    return defaultRate?.value || defaultLaborRate;
  };
  
  const setLaborRate = (rate: LaborRate) => {
    setLaborRates(prev => {
      // If this is a default rate, deactivate any other default rate
      const updated = rate.isDefault 
        ? prev.map(r => r.isDefault ? { ...r, isDefault: false } : r)
        : [...prev];
        
      // Add new rate
      return [...updated, { ...rate, updatedAt: new Date() }];
    });
    
    saveRates();
  };
  
  // On-cost methods
  const updateOnCost = (category: string, name: string, rate: number, isEnabled: boolean) => {
    setOnCosts(prev => {
      const categoryKey = `${category}OnCosts` as keyof OnCostsState;
      const categoryItems = [...(prev[categoryKey] || [])];
      
      const updatedCategory = categoryItems.map(item => 
        item.name === name ? { ...item, rate, isEnabled } : item
      );
      
      return {
        ...prev,
        [categoryKey]: updatedCategory
      };
    });
    
    saveRates();
  };
  
  const getTotalOnCostPercentage = (): number => {
    return calculateTotalOnCostPercentage(onCosts);
  };
  
  // Profit rate methods
  const getDefaultProfitRate = (): number => {
    const defaultRate = profitRates.find(r => r.isDefault && r.isActive);
    return defaultRate?.value || defaultProfitRate;
  };
  
  const setProfitRate = (rate: ProfitRate) => {
    setProfitRates(prev => {
      // If this is a default rate, deactivate any other default rate
      const updated = rate.isDefault 
        ? prev.map(r => r.isDefault ? { ...r, isDefault: false } : r)
        : [...prev];
        
      // Add new rate
      return [...updated, { ...rate, updatedAt: new Date() }];
    });
    
    saveRates();
  };
  
  // Charge-out rate methods
  const setChargeoutRate = (taskId: string, rate: number) => {
    const now = new Date();
    const newRate: ChargeoutRate = {
      id: `chargeout-${taskId}-${now.getTime()}`,
      name: `Charge-out rate for task ${taskId}`,
      type: 'chargeout',
      value: rate,
      effectiveDate: now,
      isActive: true,
      taskId,
      createdAt: now,
      updatedAt: now
    };
    
    setChargeoutRates(prev => {
      // Deactivate any existing rate for this task
      const updated = prev.map(r => 
        (r.taskId === taskId) ? { ...r, isActive: false } : r
      );
      return [...updated, newRate];
    });
    
    saveRates();
  };
  
  const getChargeoutRate = (taskId: string): number | undefined => {
    const rate = chargeoutRates.find(r => 
      r.taskId === taskId && r.isActive
    );
    return rate?.value;
  };
  
  // Contractor rate methods
  const setContractorRate = (contractorId: string, rate: number) => {
    const now = new Date();
    const newRate: ContractorRate = {
      id: `contractor-${contractorId}-${now.getTime()}`,
      name: `Contractor rate for ${contractorId}`,
      type: 'contractor',
      value: rate,
      effectiveDate: now,
      isActive: true,
      contractorId,
      createdAt: now,
      updatedAt: now
    };
    
    setContractorRates(prev => {
      // Deactivate any existing rate for this contractor
      const updated = prev.map(r => 
        (r.contractorId === contractorId) ? { ...r, isActive: false } : r
      );
      return [...updated, newRate];
    });
    
    saveRates();
  };
  
  const getContractorRate = (contractorId: string): number | undefined => {
    const rate = contractorRates.find(r => 
      r.contractorId === contractorId && r.isActive
    );
    return rate?.value;
  };
  
  // Calculation methods
  const calculateFullyLoadedRate = (baseRate: number): number => {
    const onCostPercentage = getTotalOnCostPercentage();
    return baseRate * (1 + (onCostPercentage / 100));
  };
  
  const calculateProfitMargin = (cost: number, profitRate?: number): number => {
    const rateToUse = profitRate || getDefaultProfitRate();
    return cost * (1 + (rateToUse / 100)) - cost;
  };

  const contextValue: RatesContextType = {
    productivityRates,
    setProductivityRate,
    getProductivityRate,
    
    laborRates,
    getDefaultLaborRate,
    setLaborRate,
    
    onCosts,
    updateOnCost,
    getTotalOnCostPercentage,
    
    profitRates,
    getDefaultProfitRate,
    setProfitRate,
    
    chargeoutRates,
    setChargeoutRate,
    getChargeoutRate,
    
    contractorRates,
    setContractorRate,
    getContractorRate,
    
    calculateFullyLoadedRate,
    calculateProfitMargin
  };

  return (
    <RatesContext.Provider value={contextValue}>
      {children}
    </RatesContext.Provider>
  );
};

export const useRates = () => {
  const context = useContext(RatesContext);
  if (context === undefined) {
    throw new Error('useRates must be used within a RatesProvider');
  }
  return context;
};
