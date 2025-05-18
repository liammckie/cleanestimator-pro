
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIndustryTypes } from '@/services/industryRatesService';
import { IndustryRatesTable } from './IndustryRatesTable';
import { Buildings, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const IndustryRatesBrowser = () => {
  const [industryTypes, setIndustryTypes] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadIndustryTypes = async () => {
      try {
        setIsLoading(true);
        const types = await getIndustryTypes();
        setIndustryTypes(types);
        
        if (types.length > 0) {
          setSelectedIndustry(types[0]);
        }
      } catch (error) {
        console.error('Error loading industry types:', error);
        toast({
          title: "Error",
          description: "Failed to load industry types",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadIndustryTypes();
  }, []);

  return (
    <Card>
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Buildings className="h-5 w-5" />
          Industry Productivity Rates
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-6 text-center">Loading industry data...</div>
        ) : industryTypes.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <Info className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No industry data available</p>
          </div>
        ) : (
          <Tabs 
            value={selectedIndustry} 
            onValueChange={setSelectedIndustry}
            className="w-full"
          >
            <div className="border-b px-4 overflow-auto">
              <TabsList className="h-auto my-1 bg-transparent gap-2 w-full flex-wrap justify-start">
                {industryTypes.map((type) => (
                  <TabsTrigger
                    key={type}
                    value={type}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {industryTypes.map((type) => (
              <TabsContent key={type} value={type} className="mt-0">
                <IndustryRatesTable industryType={type} />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};
