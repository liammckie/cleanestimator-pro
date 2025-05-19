
import { supabase } from "@/integrations/supabase/client";

export type EmploymentType = 'full-time' | 'part-time' | 'casual';
export type ShiftType = 'mon-fri-day' | 'mon-fri-evening' | 'mon-fri-night' | 'saturday' | 'sunday' | 'public-holiday';

export interface AwardRate {
  id: string;
  level: number;
  employment_type: EmploymentType;
  shift_type: ShiftType;
  hourly_rate: number;
  effective_date: string;
}

export const fetchAwardRates = async (): Promise<AwardRate[]> => {
  try {
    const { data, error } = await supabase
      .from('cleaning_award_rates')
      .select('*')
      .order('level', { ascending: true })
      .order('employment_type', { ascending: true })
      .order('shift_type', { ascending: true });
    
    if (error) {
      console.error('Error fetching award rates:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchAwardRates:', error);
    return [];
  }
};

export const getAwardRate = async (
  level: number,
  employmentType: EmploymentType,
  shiftType: ShiftType,
  date: Date = new Date()
): Promise<number> => {
  try {
    const { data, error } = await supabase
      .rpc('get_cleaning_award_rate', {
        p_level: level,
        p_employment_type: employmentType,
        p_shift_type: shiftType,
        p_date: date.toISOString().split('T')[0]
      });
    
    if (error) {
      console.error('Error getting award rate:', error);
      return 0;
    }
    
    return data || 0;
  } catch (error) {
    console.error('Error in getAwardRate:', error);
    return 0;
  }
};
