
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  fetchPeriodicServices, 
  groupServicesByCategory, 
  updateServiceRate 
} from '@/services/periodicServicesService';
import { PeriodicService, PeriodicServiceCategory } from '@/data/types/periodicServices';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PeriodicServiceEditor } from './PeriodicServiceEditor';

export const PeriodicServicesPage = () => {
  const [serviceCategories, setServiceCategories] = useState<PeriodicServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<PeriodicService | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const services = await fetchPeriodicServices();
        const grouped = groupServicesByCategory(services);
        setServiceCategories(grouped);
      } catch (error) {
        console.error('Failed to load periodic services:', error);
        toast({
          title: "Error loading services",
          description: "There was a problem loading the periodic services.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [toast]);

  const handleEditRate = (service: PeriodicService) => {
    setEditingService(service);
  };

  const handleSaveRate = async (id: string, newRate: number) => {
    try {
      const updatedService = await updateServiceRate(id, newRate);
      
      if (updatedService) {
        // Update the state with the new rate
        const updatedCategories = serviceCategories.map(category => {
          return {
            ...category,
            services: category.services.map(service => 
              service.id === id ? { ...service, rate: newRate } : service
            )
          };
        });
        
        setServiceCategories(updatedCategories);
        setEditingService(null);
        
        toast({
          title: "Rate updated",
          description: `Rate for ${updatedService.service_name} has been updated.`,
        });
      }
    } catch (error) {
      console.error('Failed to update service rate:', error);
      toast({
        title: "Error updating rate",
        description: "There was a problem updating the service rate.",
        variant: "destructive",
      });
    }
  };

  const handleAddToTasks = (service: PeriodicService) => {
    // Convert the periodic service to a cleaning task format
    const newTask = {
      id: service.id,
      category: service.category as any,
      taskName: service.service_name,
      productivityRate: service.rate,
      measurementUnit: service.unit_of_measure.includes('Sqm') ? 'SQM/hour' : 'Units/hour',
      notes: service.condition || '',
      defaultTool: ''
    };

    // Store in local storage to be accessible by the task management page
    const existingTasks = JSON.parse(localStorage.getItem('cleaning-tasks') || '[]');
    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem('cleaning-tasks', JSON.stringify(updatedTasks));

    toast({
      title: "Service added to tasks",
      description: `${service.service_name} has been added to your task database.`,
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading periodic services...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Periodic Cleaning Services</h1>
      
      <Tabs defaultValue={serviceCategories[0]?.name || "all"}>
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          {serviceCategories.map((category) => (
            <TabsTrigger key={category.name} value={category.name}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Periodic Services</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead className="text-right">Rate</TableHead>
                    <TableHead>Minimum</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceCategories.flatMap((category) =>
                    category.services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.service_name}</TableCell>
                        <TableCell>{service.category}</TableCell>
                        <TableCell>{service.unit_of_measure}</TableCell>
                        <TableCell className="text-right">
                          {editingService?.id === service.id ? (
                            <PeriodicServiceEditor 
                              service={service}
                              onSave={handleSaveRate}
                              onCancel={() => setEditingService(null)}
                            />
                          ) : (
                            `$${service.rate.toFixed(2)}`
                          )}
                        </TableCell>
                        <TableCell>
                          {service.minimum_quantity 
                            ? `${service.minimum_quantity} ${service.unit_of_measure}`
                            : service.minimum_hours 
                              ? `${service.minimum_hours} hours` 
                              : '-'}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {editingService?.id !== service.id && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditRate(service)}
                              >
                                Edit Rate
                              </Button>
                            )}
                            <Button 
                              variant="secondary"
                              size="sm"
                              onClick={() => handleAddToTasks(service)}
                            >
                              Add to Tasks
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {serviceCategories.map((category) => (
          <TabsContent key={category.name} value={category.name}>
            <Card>
              <CardHeader>
                <CardTitle>{category.name} Services</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                      <TableHead>Minimum</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.service_name}</TableCell>
                        <TableCell>{service.unit_of_measure}</TableCell>
                        <TableCell className="text-right">
                          {editingService?.id === service.id ? (
                            <PeriodicServiceEditor 
                              service={service}
                              onSave={handleSaveRate}
                              onCancel={() => setEditingService(null)}
                            />
                          ) : (
                            `$${service.rate.toFixed(2)}`
                          )}
                        </TableCell>
                        <TableCell>
                          {service.minimum_quantity 
                            ? `${service.minimum_quantity} ${service.unit_of_measure}` 
                            : service.minimum_hours 
                              ? `${service.minimum_hours} hours`
                              : '-'}
                        </TableCell>
                        <TableCell>{service.condition || '-'}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {editingService?.id !== service.id && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditRate(service)}
                              >
                                Edit Rate
                              </Button>
                            )}
                            <Button 
                              variant="secondary"
                              size="sm"
                              onClick={() => handleAddToTasks(service)}
                            >
                              Add to Tasks
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
