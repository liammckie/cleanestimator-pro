import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ContractForecastProps {
  baseRevenue: number;
  laborCost: number;
  equipmentCost: number;
  overhead: number;
  contractLength: number;
  cpiIncreases: {
    yearOne: number;
    yearTwo: number;
    yearThree: number;
  };
}

export const ContractForecast: React.FC<ContractForecastProps> = ({
  baseRevenue,
  laborCost,
  equipmentCost,
  overhead,
  contractLength,
  cpiIncreases,
}) => {
  const calculateYearlyValues = (year: number) => {
    let multiplier = 1;
    if (year === 2) {
      multiplier = 1 + (cpiIncreases.yearOne / 100);
    } else if (year === 3) {
      multiplier = (1 + (cpiIncreases.yearOne / 100)) * (1 + (cpiIncreases.yearTwo / 100));
    }

    const yearlyRevenue = baseRevenue * 12 * multiplier;
    const yearlyLaborCost = laborCost * 12 * multiplier;
    const yearlyEquipmentCost = equipmentCost * 12;
    const yearlyOverhead = overhead * 12 * multiplier;
    const yearlyProfit = yearlyRevenue - yearlyLaborCost - yearlyEquipmentCost - yearlyOverhead;
    const profitMargin = (yearlyProfit / yearlyRevenue) * 100;

    return {
      revenue: yearlyRevenue,
      laborCost: yearlyLaborCost,
      equipmentCost: yearlyEquipmentCost,
      overhead: yearlyOverhead,
      profit: yearlyProfit,
      margin: profitMargin,
    };
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contract Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              {Array.from({ length: contractLength }, (_, i) => (
                <TableHead key={i} className="text-right">Year {i + 1}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {['Revenue', 'Labor Cost', 'Equipment Cost', 'Overhead', 'Profit', 'Margin (%)'].map((metric, index) => (
              <TableRow key={metric}>
                <TableCell className="font-medium">{metric}</TableCell>
                {Array.from({ length: contractLength }, (_, year) => {
                  const yearlyValues = calculateYearlyValues(year + 1);
                  let value = 0;
                  switch (index) {
                    case 0: value = yearlyValues.revenue; break;
                    case 1: value = yearlyValues.laborCost; break;
                    case 2: value = yearlyValues.equipmentCost; break;
                    case 3: value = yearlyValues.overhead; break;
                    case 4: value = yearlyValues.profit; break;
                    case 5: value = yearlyValues.margin; break;
                  }
                  return (
                    <TableCell key={year} className="text-right">
                      {index === 5 ? 
                        `${value.toFixed(1)}%` : 
                        `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      }
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};