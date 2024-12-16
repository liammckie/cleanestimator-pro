export const FREQUENCY_OPTIONS = [
  { label: 'Monthly', value: '0.25', timesPerMonth: 1 },
  { label: 'Fortnightly', value: '0.5', timesPerMonth: 2.17 },
  { label: 'Weekly', value: '1', timesPerMonth: 4.33 },
  { label: '2x Weekly', value: '2', timesPerMonth: 8.66 },
  { label: '3x Weekly', value: '3', timesPerMonth: 13 },
  { label: '4x Weekly', value: '4', timesPerMonth: 17.33 },
  { label: '5x Weekly', value: '5', timesPerMonth: 21.66 },
  { label: '6x Weekly', value: '6', timesPerMonth: 26 },
  { label: '7x Weekly', value: '7', timesPerMonth: 30.33 },
] as const;

export type FrequencyOption = typeof FREQUENCY_OPTIONS[number];