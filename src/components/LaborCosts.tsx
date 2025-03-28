import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cleaningAwardLevels } from '@/data/award/cleaningAward';
import { OnCostsManager } from './OnCostsManager';
import { OnCostsState } from '@/data/types/onCosts';
import { EmploymentTypeSelector } from './labor/EmploymentTypeSelector';
import { DirectEmploymentOptions } from './labor/DirectEmploymentOptions';
import { AwardIncreaseManager } from './labor/AwardIncreaseManager';
import { useTaskContext } from './area/task/TaskContext';
import { useCostContext } from '@/contexts/CostContext';
import { MonthlyHoursDisplay } from './labor/MonthlyHoursDisplay';
import { ContractedRateInput } from './labor/ContractedRateInput';

interface LaborCostsProps {
  onLaborCostChange: (costs: { 
    hourlyRate: number;
    employmentType: 'contracted' | 'direct';
    awardLevel?: number;
    shiftType?: string;
    onCosts?: OnCostsState;
  }) => void;
}

const defaultOnCosts: OnCostsState = {
  statutoryOnCosts: [
    { name: 'Superannuation Guarantee', rate: 11.5, isEnabled: true, category: 'statutory', isMandatory: true },
    { name: 'Workers Compensation', rate: 5, isEnabled: true, category: 'statutory', isMandatory: true },
    { name: 'Payroll Tax', rate: 4.75, isEnabled: true, category: 'statutory', isMandatory: true },
    { name: 'Leave Entitlements', rate: 8.33, isEnabled: true, category: 'statutory', isMandatory: true },
  ],
  employmentOnCosts: [
    { name: 'Casual Loading', rate: 25, isEnabled: false, category: 'employment' },
    { name: 'Training Allowance', rate: 2, isEnabled: false, category: 'employment' },
  ],
  recruitmentOnCosts: [
    { name: 'Recruitment & Advertising', rate: 3, isEnabled: false, category: 'recruitment' },
    { name: 'Training & Induction', rate: 2, isEnabled: false, category: 'recruitment' },
  ],
  overheadOnCosts: [
    { name: 'Uniforms & PPE', rate: 2, isEnabled: false, category: 'overhead' },
    { name: 'Equipment & Tools', rate: 3, isEnabled: false, category: 'overhead' },
  ],
  miscellaneousOnCosts: [
    { name: 'Insurance', rate: 2, isEnabled: false, category: 'miscellaneous' },
    { name: 'Administrative Costs', rate: 3, isEnabled: false, category: 'miscellaneous' },
  ],
};

export const LaborCosts: React.FC<LaborCostsProps> = ({ onLaborCostChange }) => {
  const { totalWeeklyHours = 0, totalMonthlyHours = 0 } = useTaskContext();
  const { updateLaborRate } = useCostContext();
  const [employmentType, setEmploymentType] = useState<'contracted' | 'direct'>('contracted');
  const [contractedRate, setContractedRate] = useState<number>(38);
  const [awardLevel, setAwardLevel] = useState<number>(1);
  const [shiftType, setShiftType] = useState<string>('standard');
  const [onCosts, setOnCosts] = useState<OnCostsState>(defaultOnCosts);
  const [awardIncrease, setAwardIncrease] = useState<number>(0);

  useEffect(() => {
    console.log('Labor costs component mounted with hours:', {
      totalWeeklyHours,
      totalMonthlyHours
    });
    updateLaborCosts('contracted');
  }, []);

  useEffect(() => {
    console.log('Hours updated:', {
      totalWeeklyHours,
      totalMonthlyHours
    });
    updateLaborCosts(employmentType);
  }, [totalWeeklyHours, totalMonthlyHours]);

  const handleEmploymentTypeChange = (value: 'contracted' | 'direct') => {
    setEmploymentType(value);
    updateLaborCosts(value);
  };

  const handleContractedRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setContractedRate(value);
    if (employmentType === 'contracted') {
      updateLaborRate(value);
      onLaborCostChange({
        hourlyRate: value,
        employmentType
      });
    }
  };

  const calculateAdjustedRate = (baseRate: number): number => {
    return baseRate * (1 + (awardIncrease / 100));
  };

  const updateLaborCosts = (type: 'contracted' | 'direct' = employmentType) => {
    if (type === 'contracted') {
      updateLaborRate(contractedRate);
      onLaborCostChange({
        hourlyRate: contractedRate,
        employmentType: type
      });
    } else {
      const selectedLevel = cleaningAwardLevels.find(level => level.level === awardLevel);
      const baseRate = selectedLevel?.payRates[shiftType as keyof typeof selectedLevel.payRates] || 0;
      const adjustedRate = calculateAdjustedRate(baseRate);
      
      updateLaborRate(adjustedRate);
      onLaborCostChange({
        hourlyRate: adjustedRate,
        employmentType: type,
        awardLevel,
        shiftType,
        onCosts
      });
    }
  };

  const handleAwardLevelChange = (value: string) => {
    const level = parseInt(value);
    setAwardLevel(level);
    if (employmentType === 'direct') {
      updateLaborCosts();
    }
  };

  const handleShiftTypeChange = (value: string) => {
    setShiftType(value);
    if (employmentType === 'direct') {
      updateLaborCosts();
    }
  };

  const handleOnCostsChange = (newOnCosts: OnCostsState) => {
    setOnCosts(newOnCosts);
    if (employmentType === 'direct') {
      updateLaborCosts();
    }
  };

  const handleAwardIncreaseChange = (increase: number) => {
    setAwardIncrease(increase);
    if (employmentType === 'direct') {
      updateLaborCosts();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Labor Costs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <MonthlyHoursDisplay 
              totalWeeklyHours={totalWeeklyHours} 
              totalMonthlyHours={totalMonthlyHours}
            />

            <EmploymentTypeSelector
              value={employmentType}
              onChange={handleEmploymentTypeChange}
            />

            {employmentType === 'contracted' ? (
              <ContractedRateInput
                contractedRate={contractedRate}
                onChange={handleContractedRateChange}
              />
            ) : (
              <>
                <DirectEmploymentOptions
                  awardLevel={awardLevel}
                  shiftType={shiftType}
                  onAwardLevelChange={handleAwardLevelChange}
                  onShiftTypeChange={handleShiftTypeChange}
                />
                <AwardIncreaseManager
                  currentIncrease={awardIncrease}
                  onAwardIncreaseChange={handleAwardIncreaseChange}
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {employmentType === 'direct' && (
        <OnCostsManager
          onCosts={onCosts}
          onOnCostsChange={handleOnCostsChange}
        />
      )}
    </div>
  );
};