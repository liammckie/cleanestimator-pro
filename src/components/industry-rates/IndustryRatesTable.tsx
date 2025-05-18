
import React, { useState, useEffect } from 'react';
import { getRatesByIndustry, IndustryProductivityRate } from '@/services/industryRatesService';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';

interface IndustryRatesTableProps {
  industryType: string;
}

export const IndustryRatesTable: React.FC<IndustryRatesTableProps> = ({ industryType }) => {
  const [rates, setRates] = useState<IndustryProductivityRate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("floor-productivity");

  useEffect(() => {
    const loadRates = async () => {
      try {
        setIsLoading(true);
        const data = await getRatesByIndustry(industryType);
        setRates(data);
      } catch (error) {
        console.error('Error loading rates:', error);
        toast({
          title: "Error",
          description: `Failed to load rates for ${industryType}`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadRates();
  }, [industryType]);

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="floor-productivity">Floor Productivity</TabsTrigger>
          <TabsTrigger value="restroom-fixtures">Restroom Fixtures</TabsTrigger>
        </TabsList>

        <TabsContent value="floor-productivity">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area</TableHead>
                  <TableHead className="text-right">Soft Floor (SQM/hour)</TableHead>
                  <TableHead className="text-right">Hard Floor (SQM/hour)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
                      Loading rates...
                    </TableCell>
                  </TableRow>
                ) : rates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                      No rates found for this industry
                    </TableCell>
                  </TableRow>
                ) : (
                  rates.map((rate) => (
                    <TableRow key={rate.id}>
                      <TableCell className="font-medium">{rate.area_name}</TableCell>
                      <TableCell className="text-right">{rate.prod_rate_soft_floor}</TableCell>
                      <TableCell className="text-right">{rate.prod_rate_hard_floor}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="restroom-fixtures">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Area</TableHead>
                  <TableHead className="text-right">Pans (mins)</TableHead>
                  <TableHead className="text-right">Basin (mins)</TableHead>
                  <TableHead className="text-right">SS Urinal (mins)</TableHead>
                  <TableHead className="text-right">Ceramic Urinal (mins)</TableHead>
                  <TableHead className="text-right">Shower (mins)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      Loading rates...
                    </TableCell>
                  </TableRow>
                ) : rates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No restroom fixture rates found for this industry
                    </TableCell>
                  </TableRow>
                ) : (
                  rates
                    .filter(rate => 
                      rate.pans_min !== null || 
                      rate.basin_min !== null || 
                      rate.ss_urinal_min !== null || 
                      rate.ceramic_urinal_min !== null || 
                      rate.shower_min !== null
                    )
                    .map((rate) => (
                      <TableRow key={rate.id}>
                        <TableCell className="font-medium">{rate.area_name}</TableCell>
                        <TableCell className="text-right">{rate.pans_min}</TableCell>
                        <TableCell className="text-right">{rate.basin_min}</TableCell>
                        <TableCell className="text-right">{rate.ss_urinal_min}</TableCell>
                        <TableCell className="text-right">{rate.ceramic_urinal_min}</TableCell>
                        <TableCell className="text-right">{rate.shower_min}</TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
