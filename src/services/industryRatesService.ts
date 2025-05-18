
import { supabase } from "@/integrations/supabase/client";

export type IndustryProductivityRate = {
  id: string;
  industry_type: string;
  area_name: string;
  prod_rate_soft_floor: number | null;
  prod_rate_hard_floor: number | null;
  pans_min: number | null;
  basin_min: number | null;
  ss_urinal_min: number | null;
  ceramic_urinal_min: number | null;
  shower_min: number | null;
  created_at: string;
  updated_at: string;
};

export const getIndustryTypes = async (): Promise<string[]> => {
  // Instead of distinctOn which isn't available, we'll use a different approach
  const { data, error } = await supabase
    .from('industry_productivity_rates')
    .select('industry_type')
    .order('industry_type');
  
  if (error) {
    console.error('Error fetching industry types:', error);
    return [];
  }
  
  // Filter unique industry_types manually
  const uniqueTypes = [...new Set(data.map(item => item.industry_type))];
  return uniqueTypes;
};

export const getRatesByIndustry = async (industryType: string): Promise<IndustryProductivityRate[]> => {
  const { data, error } = await supabase
    .from('industry_productivity_rates')
    .select('*')
    .eq('industry_type', industryType)
    .order('area_name');
  
  if (error) {
    console.error('Error fetching rates for industry:', error);
    return [];
  }
  
  return data as IndustryProductivityRate[];
};

export const getAllRates = async (): Promise<IndustryProductivityRate[]> => {
  const { data, error } = await supabase
    .from('industry_productivity_rates')
    .select('*')
    .order('industry_type')
    .order('area_name');
  
  if (error) {
    console.error('Error fetching all rates:', error);
    return [];
  }
  
  return data as IndustryProductivityRate[];
};
