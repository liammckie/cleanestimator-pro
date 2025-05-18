
import { supabase } from "@/integrations/supabase/client";
import { PeriodicService, PeriodicServiceCategory } from "@/data/types/periodicServices";

export const fetchPeriodicServices = async (): Promise<PeriodicService[]> => {
  const { data, error } = await supabase
    .from('periodic_cleaning_services')
    .select('*')
    .order('category', { ascending: true })
    .order('service_name', { ascending: true });

  if (error) {
    console.error('Error fetching periodic services:', error);
    throw error;
  }

  return data || [];
};

export const getServiceById = async (id: string): Promise<PeriodicService | null> => {
  const { data, error } = await supabase
    .from('periodic_cleaning_services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching periodic service by ID:', error);
    return null;
  }

  return data;
};

export const updateServiceRate = async (id: string, rate: number): Promise<PeriodicService | null> => {
  const { data, error } = await supabase
    .from('periodic_cleaning_services')
    .update({ rate, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating service rate:', error);
    return null;
  }

  return data;
};

export const groupServicesByCategory = (services: PeriodicService[]): PeriodicServiceCategory[] => {
  const groupedServices: Record<string, PeriodicService[]> = {};
  
  services.forEach(service => {
    if (!groupedServices[service.category]) {
      groupedServices[service.category] = [];
    }
    groupedServices[service.category].push(service);
  });
  
  return Object.entries(groupedServices).map(([name, services]) => ({
    name,
    services
  }));
};
