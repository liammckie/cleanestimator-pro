import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const handleCpiChange = (year: keyof typeof cpiIncreases, value: string) => {
    const newCpiIncreases = {
      ...cpiIncreases,
      [year]: parseFloat(value) || 0,
    };
    setCpiIncreases(newCpiIncreases);
    onContractChange({ lengthYears: contractLength, cpiIncreases: newCpiIncreases });
  };

  const handleContractLengthChange = (value: string) => {
    const length = parseInt(value);
    setContractLength(length);
    onContractChange({ lengthYears: length, cpiIncreases });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contract Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="contractLength">Contract Length</Label>
          <Select
            value={contractLength.toString()}
            onValueChange={handleContractLengthChange}
          >
            <SelectTrigger id="contractLength">
              <SelectValue placeholder="Select contract length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Year</SelectItem>
              <SelectItem value="2">2 Years</SelectItem>
              <SelectItem value="3">3 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>CPI Increases (%)</Label>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearOne">Year One</Label>
              <Input
                id="yearOne"
                type="number"
                step="0.1"
                value={cpiIncreases.yearOne}
                onChange={(e) => handleCpiChange('yearOne', e.target.value)}
                placeholder="Enter Year 1 CPI increase"
              />
            </div>
            {contractLength >= 2 && (
              <div className="space-y-2">
                <Label htmlFor="yearTwo">Year Two</Label>
                <Input
                  id="yearTwo"
                  type="number"
                  step="0.1"
                  value={cpiIncreases.yearTwo}
                  onChange={(e) => handleCpiChange('yearTwo', e.target.value)}
                  placeholder="Enter Year 2 CPI increase"
                />
              </div>
            )}
            {contractLength >= 3 && (
              <div className="space-y-2">
                <Label htmlFor="yearThree">Year Three</Label>
                <Input
                  id="yearThree"
                  type="number"
                  step="0.1"
                  value={cpiIncreases.yearThree}
                  onChange={(e) => handleCpiChange('yearThree', e.target.value)}
                  placeholder="Enter Year 3 CPI increase"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};