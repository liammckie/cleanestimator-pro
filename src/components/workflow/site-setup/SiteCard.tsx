
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Site } from '@/data/types/site';

interface SiteCardProps {
  site: Site;
  index: number;
  onRemoveSite: (siteId: string) => void;
  onUpdateSite: (index: number, field: string, value: any) => void;
  onUpdateSiteAddress: (index: number, field: string, value: string) => void;
  onUpdateSiteIndustry: (index: number, value: string) => void;
  industryTypes: string[];
}

export const SiteCard: React.FC<SiteCardProps> = ({
  site,
  index,
  onRemoveSite,
  onUpdateSite,
  onUpdateSiteAddress,
  onUpdateSiteIndustry,
  industryTypes,
}) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Site Details</CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onRemoveSite(site.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          <span className="ml-1">Remove</span>
        </Button>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`site-name-${index}`}>Site Name</Label>
            <Input
              id={`site-name-${index}`}
              value={site.name}
              onChange={(e) => onUpdateSite(index, 'name', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`days-per-week-${index}`}>Days Per Week</Label>
            <Input
              id={`days-per-week-${index}`}
              type="number"
              min={1}
              max={7}
              value={site.daysPerWeek}
              onChange={(e) => onUpdateSite(index, 'daysPerWeek', parseInt(e.target.value))}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`industry-type-${index}`}>Industry Type</Label>
            <Select 
              value={site.area.industryType.charAt(0).toUpperCase() + site.area.industryType.slice(1)}
              onValueChange={(value) => onUpdateSiteIndustry(index, value)}
            >
              <SelectTrigger id={`industry-type-${index}`} className="mt-1">
                <SelectValue placeholder="Select industry type" />
              </SelectTrigger>
              <SelectContent>
                {industryTypes.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor={`street-${index}`}>Street Address</Label>
            <Input
              id={`street-${index}`}
              value={site.address.street}
              onChange={(e) => onUpdateSiteAddress(index, 'street', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`suburb-${index}`}>Suburb/City</Label>
            <Input
              id={`suburb-${index}`}
              value={site.address.suburb}
              onChange={(e) => onUpdateSiteAddress(index, 'suburb', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`state-${index}`}>State</Label>
            <Input
              id={`state-${index}`}
              value={site.address.state}
              onChange={(e) => onUpdateSiteAddress(index, 'state', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor={`postcode-${index}`}>Postcode</Label>
            <Input
              id={`postcode-${index}`}
              value={site.address.postcode}
              onChange={(e) => onUpdateSiteAddress(index, 'postcode', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
