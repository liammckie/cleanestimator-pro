
import { supabase } from './client';
import { EmploymentType, ShiftType } from '@/services/awardRatesService';

export const fetchCleaningAwardRates = async () => {
  try {
    const { data, error } = await supabase
      .from('cleaning_award_rates')
      .select('*')
      .order('level', { ascending: true })
      .order('employment_type', { ascending: true })
      .order('shift_type', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching cleaning award rates:', error);
    throw error;
  }
};

export const getCleaningAwardRate = async (
  level: number,
  employmentType: EmploymentType,
  shiftType: ShiftType,
  date: string = new Date().toISOString().split('T')[0]
) => {
  try {
    const { data, error } = await supabase
      .rpc('get_cleaning_award_rate', {
        p_level: level,
        p_employment_type: employmentType,
        p_shift_type: shiftType,
        p_date: date
      });
    
    if (error) throw error;
    return data || 0;
  } catch (error) {
    console.error('Error getting cleaning award rate:', error);
    throw error;
  }
};
