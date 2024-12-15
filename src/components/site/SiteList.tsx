import React from 'react';
import { Site } from '@/data/types/site';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SiteListProps {
  sites: Site[];
  onAddSite: () => void;
  onDeleteSite: (id: string) => void;
  onUpdateSiteName: (id: string, name: string) => void;
  onUpdateSiteClient: (id: string, client: string) => void;
  onUpdateSiteAddress: (id: string, field: keyof Site['address'], value: string) => void;
  onUpdateSiteDaysPerWeek: (id: string, days: number) => void;
}

export const SiteList: React.FC<SiteListProps> = ({
  sites,
  onAddSite,
  onDeleteSite,
  onUpdateSiteName,
  onUpdateSiteClient,
  onUpdateSiteAddress,
  onUpdateSiteDaysPerWeek
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sites</h2>
        <Button onClick={onAddSite} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Site
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sites.map((site) => (
          <Card key={site.id} className="w-full">
            <CardHeader>
              <CardTitle>
                <Input
                  value={site.name}
                  onChange={(e) => onUpdateSiteName(site.id, e.target.value)}
                  className="font-bold"
                  placeholder="Site Name"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Client Name</Label>
                <Input
                  value={site.client}
                  onChange={(e) => onUpdateSiteClient(site.id, e.target.value)}
                  placeholder="Client Name"
                />
              </div>

              <div className="space-y-2">
                <Label>Days Per Week</Label>
                <Select
                  value={site.daysPerWeek?.toString()}
                  onValueChange={(value) => onUpdateSiteDaysPerWeek(site.id, parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select days per week" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} {days === 1 ? 'day' : 'days'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Input
                  value={site.address.street}
                  onChange={(e) => onUpdateSiteAddress(site.id, 'street', e.target.value)}
                  placeholder="Street"
                  className="mb-2"
                />
                <Input
                  value={site.address.suburb}
                  onChange={(e) => onUpdateSiteAddress(site.id, 'suburb', e.target.value)}
                  placeholder="Suburb"
                  className="mb-2"
                />
                <Input
                  value={site.address.state}
                  onChange={(e) => onUpdateSiteAddress(site.id, 'state', e.target.value)}
                  placeholder="State"
                  className="mb-2"
                />
                <Input
                  value={site.address.postcode}
                  onChange={(e) => onUpdateSiteAddress(site.id, 'postcode', e.target.value)}
                  placeholder="Postcode"
                />
              </div>

              <Button
                variant="destructive"
                onClick={() => onDeleteSite(site.id)}
                className="w-full"
              >
                Delete Site
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};