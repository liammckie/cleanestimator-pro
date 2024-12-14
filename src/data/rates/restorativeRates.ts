import { ProductivityRate } from '../types';

export const restorativeRates: ProductivityRate[] = [
  {
    id: 'RES-1M',
    category: 'Restorative',
    task: 'Set up dehumidifier',
    tool: 'Dehumidifier, hose, drain or barrel',
    unit: 'Each',
    ratePerHour: 34.29, // 60/1.75 units per hour
  },
  {
    id: 'RES-2M',
    category: 'Restorative',
    task: 'Wheel dehumidifier to drying area',
    tool: 'Dehumidifier with wheels',
    unit: 'm',
    ratePerHour: 2727.27, // (60/1.1) * 50 meters per hour
  },
  {
    id: 'RES-3M',
    category: 'Restorative',
    task: 'Monitor operations of drying equipment—onsite',
    tool: 'Dehumidifier, tablets, pen, and thermohygrometer',
    unit: 'Each',
    ratePerHour: 20, // 60/3 units per hour
  },
  {
    id: 'RES-4M',
    category: 'Restorative',
    task: 'Monitor operations of drying equipment—offsite',
    tool: 'Onboard sensor',
    unit: 'Each',
    ratePerHour: 240, // 60/0.25 units per hour
  },
  {
    id: 'RES-5M',
    category: 'Restorative',
    task: 'Roll suction hose onto manual hose reel',
    tool: 'Hose reel and hose',
    unit: 'm',
    ratePerHour: 782.61, // (60/1.15) * 15 meters per hour
  },
  {
    id: 'RES-6M',
    category: 'Restorative',
    task: 'Roll solution hose onto manual crank reel',
    tool: 'Hose reel and hose',
    unit: 'm',
    ratePerHour: 1343.28, // (60/0.67) * 15 meters per hour
  },
  {
    id: 'RES-7M',
    category: 'Restorative',
    task: 'Coil garden hose onto hose hanger',
    tool: 'Garden hose and hose hanger',
    unit: 'm',
    ratePerHour: 1058.82, // (60/0.85) * 15 meters per hour
  },
  {
    id: 'RES-8M',
    category: 'Restorative',
    task: 'Don full PPE for category 3 cleanup',
    tool: 'Nitrile gloves, neoprene gloves, full face respirator, protective bodysuit, hood/tape gloves, rubber boots',
    unit: 'Person',
    ratePerHour: 12, // 60/5 persons per hour
  },
  {
    id: 'RES-9M',
    category: 'Restorative',
    task: 'Test wall with moisture meter for wetness',
    tool: 'Moisture meter and data collection device',
    unit: 'm²',
    ratePerHour: 29.78, // (60/4.03) * 2 m² per hour
  },
  {
    id: 'RES-10M',
    category: 'Restorative',
    task: 'Test wet carpet with wet check tool',
    tool: 'Wet check tool',
    unit: 'm²',
    ratePerHour: 382.17, // (60/1.57) * 10 m² per hour
  },
  {
    id: 'RES-11M',
    category: 'Restorative',
    task: 'Extract wet carpet (Small)',
    tool: '12-gallon/45 L extractor with 2" / 51 mm hose and 12" / 305 mm wand with carpet glide',
    unit: 'm²',
    ratePerHour: 27.87, // (60/64.58) * 30 m² per hour
  },
  {
    id: 'RES-12M',
    category: 'Restorative',
    task: 'Extract wet carpet (Large)',
    tool: 'Truck mount extractor with 2" / 51 mm hose and 12" / 305 mm wand with carpet glide',
    unit: 'm²',
    ratePerHour: 106.85, // (60/61.77) * 110 m² per hour
  },
  {
    id: 'RES-13M',
    category: 'Restorative',
    task: 'Determine what\'s wet—multilevel',
    tool: 'Moisture meters and PPE',
    unit: 'm²',
    ratePerHour: 14.48, // (60/41.44) * 10 m² per hour
  },
  {
    id: 'RES-14M',
    category: 'Restorative',
    task: 'Swap and test with ATP Meter',
    tool: 'ATP meter and swabs',
    unit: 'Each',
    ratePerHour: 120, // 60/0.5 units per hour
  },
  {
    id: 'RES-15M',
    category: 'Restorative',
    task: 'Determine what\'s wet—flooring only',
    tool: 'Moisture meters and PPE',
    unit: 'm²',
    ratePerHour: 45.11, // (60/13.3) * 10 m² per hour
  },
  {
    id: 'RES-16M',
    category: 'Restorative',
    task: 'Install portable air scrubber',
    tool: 'Portable airscrubber',
    unit: 'Each',
    ratePerHour: 48, // 60/1.25 units per hour
  },
  {
    id: 'RES-17M',
    category: 'Restorative',
    task: 'Install low profile air mover',
    tool: 'Low profile airmover',
    unit: 'Each',
    ratePerHour: 57.14, // 60/1.05 units per hour
  },
  {
    id: 'RES-18M',
    category: 'Restorative',
    task: 'Install large air mover',
    tool: 'Air mover',
    unit: 'Each',
    ratePerHour: 48, // 60/1.25 units per hour
  },
  {
    id: 'RES-19M',
    category: 'Restorative',
    task: 'Install compact floor dryer',
    tool: 'Stackable speed drying unit',
    unit: 'Each',
    ratePerHour: 127.66, // 60/0.47 units per hour
  },
];