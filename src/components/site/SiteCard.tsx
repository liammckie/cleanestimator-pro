import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { Site } from '@/data/types/site';

interface SiteCardProps {
  site: Site;
  canDelete: boolean;
  onDelete: (siteId: string) => void;
  onUpdateName: (siteId: string, name: string) => void;
  onUpdateAddress: (siteId: string, field: keyof Site['address'], value: string) => void;
}

export const SiteCard: React.FC<SiteCardProps> = ({
  site,
  canDelete,
  onDelete,
  onUpdateName,
  onUpdateAddress,
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Site Details</CardTitle>
        {canDelete && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(site.id)}
            className="h-8 w-8 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`site-name-${site.id}`}>Site Name</Label>
          <Input
            id={`site-name-${site.id}`}
            value={site.name}
            onChange={(e) => onUpdateName(site.id, e.target.value)}
            placeholder="Enter site name"
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`street-${site.id}`}>Street Address</Label>
            <Input
              id={`street-${site.id}`}
              value={site.address.street}
              onChange={(e) => onUpdateAddress(site.id, 'street', e.target.value)}
              placeholder="Enter street address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`suburb-${site.id}`}>Suburb</Label>
            <Input
              id={`suburb-${site.id}`}
              value={site.address.suburb}
              onChange={(e) => onUpdateAddress(site.id, 'suburb', e.target.value)}
              placeholder="Enter suburb"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`state-${site.id}`}>State</Label>
            <Input
              id={`state-${site.id}`}
              value={site.address.state}
              onChange={(e) => onUpdateAddress(site.id, 'state', e.target.value)}
              placeholder="Enter state"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`postcode-${site.id}`}>Postcode</Label>
            <Input
              id={`postcode-${site.id}`}
              value={site.address.postcode}
              onChange={(e) => onUpdateAddress(site.id, 'postcode', e.target.value)}
              placeholder="Enter postcode"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};