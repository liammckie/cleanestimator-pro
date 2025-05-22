
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRates } from '@/contexts/RatesContext';
import { OnCostsManager } from '../OnCostsManager';
import { ProductivityRatesManager } from './ProductivityRatesManager';
import { LaborRatesManager } from './LaborRatesManager';
import { ProfitRatesManager } from './ProfitRatesManager';
import { ChargeoutRatesManager } from './ChargeoutRatesManager';
import { ContractorRatesManager } from './ContractorRatesManager';

export const RatesManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("labor");
  const { onCosts, updateOnCost } = useRates();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Rates Management</h1>
        <p className="text-muted-foreground">
          Configure and manage all rates used throughout the application.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="labor">Labor Rates</TabsTrigger>
          <TabsTrigger value="oncosts">On-costs</TabsTrigger>
          <TabsTrigger value="productivity">Productivity Rates</TabsTrigger>
          <TabsTrigger value="profit">Profit Margins</TabsTrigger>
          <TabsTrigger value="chargeout">Charge-out Rates</TabsTrigger>
          <TabsTrigger value="contractor">Contractor Rates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="labor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Labor Rates</CardTitle>
              <CardDescription>
                Manage award rates and custom labor rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LaborRatesManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="oncosts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>On-costs Configuration</CardTitle>
              <CardDescription>
                Configure statutory and optional on-cost percentages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OnCostsManager
                onCosts={onCosts}
                onOnCostsChange={(newOnCosts) => {
                  // For each category and item, update using the updateOnCost method
                  Object.entries(newOnCosts).forEach(([categoryKey, items]) => {
                    const category = categoryKey.replace('OnCosts', '');
                    items.forEach(item => {
                      updateOnCost(category, item.name, item.rate, item.isEnabled);
                    });
                  });
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="productivity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Productivity Rates</CardTitle>
              <CardDescription>
                Configure task productivity rates by tool and industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductivityRatesManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profit Margins</CardTitle>
              <CardDescription>
                Configure profit margins by industry and client type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfitRatesManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chargeout" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Charge-out Rates</CardTitle>
              <CardDescription>
                Configure customer pricing for different services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChargeoutRatesManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contractor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contractor Rates</CardTitle>
              <CardDescription>
                Configure contractor rates by task and industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContractorRatesManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
