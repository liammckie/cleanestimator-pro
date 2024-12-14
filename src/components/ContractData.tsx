import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractLength } from './contract/ContractLength';
import { CPIInputs } from './contract/CPIInputs';

interface ContractDataProps {
  onContractChange: (data: {
    lengthYears: number;
    cpiIncreases: {
      yearOne: number;
      yearTwo: number;
      yearThree: number;
    };
  }) => void;
}

export const ContractData: React.FC<ContractDataProps> = ({ onContractChange }) => {
  const [contractLength, setContractLength] = React.useState<number>(1);
  const [cpiIncreases, setCpiIncreases] = React.useState({
    yearOne: 0,
    yearTwo: 0,
    yearThree: 0,
  });

  const handleCpiChange = (year: keyof typeof cpiIncreases, value: number) => {
    const newCpiIncreases = {
      ...cpiIncreases,
      [year]: value,
    };
    setCpiIncreases(newCpiIncreases);
    onContractChange({ lengthYears: contractLength, cpiIncreases: newCpiIncreases });
  };

  const handleContractLengthChange = (length: number) => {
    setContractLength(length);
    onContractChange({ lengthYears: length, cpiIncreases });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contract Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ContractLength 
          value={contractLength}
          onChange={handleContractLengthChange}
        />
        <CPIInputs
          contractLength={contractLength}
          values={cpiIncreases}
          onChange={handleCpiChange}
        />
      </CardContent>
    </Card>
  );
};