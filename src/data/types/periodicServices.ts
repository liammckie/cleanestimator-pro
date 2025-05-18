
export interface PeriodicService {
  id: string;
  service_name: string;
  unit_of_measure: string;
  rate: number;
  minimum_quantity?: number;
  minimum_hours?: number;
  condition?: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export interface PeriodicServiceCategory {
  name: string;
  services: PeriodicService[];
}
