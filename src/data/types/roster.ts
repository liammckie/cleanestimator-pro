export interface Employee {
  id: string;
  name: string;
  level: 1 | 2 | 3;
  employmentType: 'casual' | 'part-time' | 'full-time';
  certifications: string[];
  availability: {
    [key: string]: { // day of week
      start: string;
      end: string;
    }[];
  };
}

export interface Shift {
  id: string;
  siteId: string;
  siteName: string;
  startTime: string;
  endTime: string;
  date: Date;
  employeeId?: string;
  requiredLevel: 1 | 2 | 3;
  requiredCertifications: string[];
}

export interface RosterEntry {
  employeeId: string;
  employeeName: string;
  shifts: Shift[];
  totalHours: number;
}

export type WeeklyRoster = {
  [key: string]: RosterEntry[]; // key is the date string
};