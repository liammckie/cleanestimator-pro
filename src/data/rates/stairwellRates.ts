import { ProductivityRate } from '../types';

export const stairwellRates: ProductivityRate[] = [
  {
    id: 'STC-1M',
    category: 'Stairwells',
    task: 'Clean',
    tool: 'Spray-and-vacuum machine',
    unit: 'Minutes per 4\'/1.22m stair',
    ratePerHour: 214.29 // 60/0.28 minutes
  },
  {
    id: 'STC-2M',
    category: 'Stairwells',
    task: 'Clean escalator steps',
    tool: '18" / 457 mm brush machine and chemical',
    unit: 'Minutes per 4\'/1.22m stair',
    ratePerHour: 2000 // 60/0.03 minutes
  },
  {
    id: 'STC-3M',
    category: 'Stairwells',
    task: 'Damp mop',
    tool: '14" / 356 mm flat mop, chemical, and bucket',
    unit: 'Minutes per 4\'/1.22m stair',
    ratePerHour: 300 // 60/0.2 minutes
  },
  {
    id: 'STC-4M',
    category: 'Stairwells',
    task: 'Damp mop',
    tool: '16 oz. / 454 g string mop, chemical, and bucket',
    unit: 'Minutes per 4\'/1.22m stair',
    ratePerHour: 120 // 60/0.5 minutes
  },
  {
    id: 'STC-5M',
    category: 'Stairwells',
    task: 'Dust mop',
    tool: '24" / 610 mm dust mop, dustpan, and broom',
    unit: 'Minutes per 4\'/1.22m stair',
    ratePerHour: 240 // 60/0.25 minutes
  },
  {
    id: 'STC-6M',
    category: 'Stairwells',
    task: 'Pick up debris',
    tool: '36" / 914 mm ergonomic pickup tool and trash bag',
    unit: 'Minutes per 4\'/1.22m stair',
    ratePerHour: 450 // 60/0.08 minutes
  },
  {
    id: 'STC-7M',
    category: 'Stairwells',
    task: 'Sweep',
    tool: '12" / 305 mm push broom, dustpan, and broom',
    unit: 'Minutes per 4\'/1.22m stair',
    ratePerHour: 157.89 // 60/0.38 minutes
  },
  {
    id: 'STC-8M',
    category: 'Stairwells',
    task: 'Sweep',
    tool: '8" / 203 mm corn-type broom and dustpan',
    unit: 'Minutes per 4\'/1.22m stair',
    ratePerHour: 181.82 // 60/0.33 minutes
  },
  {
    id: 'STC-9M',
    category: 'Stairwells',
    task: 'Vacuum',
    tool: 'Corded backpack vacuum with 14" / 356 mm orifice',
    unit: 'Minutes per 4\'/1.22m stair',
    ratePerHour: 300 // 60/0.2 minutes
  },
  {
    id: 'STC-10M',
    category: 'Stairwells',
    task: 'Vacuum',
    tool: 'Cordless backpack vacuum with 14" / 356 mm orifice',
    unit: 'Minutes per 4\'/1.22m stair',
    ratePerHour: 461.54 // 60/0.13 minutes
  }
];

export const railingRates: ProductivityRate[] = [
  {
    id: 'SRC-1M',
    category: 'Railings',
    task: 'Damp wipe',
    tool: 'Trigger sprayer, chemical, and cloth',
    unit: 'Linear m',
    ratePerHour: 200 // 60/0.3 minutes
  },
  {
    id: 'SRC-2M',
    category: 'Railings',
    task: 'Dust',
    tool: 'Small hand duster',
    unit: 'Linear m',
    ratePerHour: 260.87 // 60/0.23 minutes
  },
  {
    id: 'SRC-3M',
    category: 'Railings',
    task: 'Dust',
    tool: 'Adjustable duster with sleeve',
    unit: 'Linear m',
    ratePerHour: 375 // 60/0.16 minutes
  },
  {
    id: 'SRC-4M',
    category: 'Railings',
    task: 'Polish',
    tool: 'Trigger sprayer, chemical, and cloth',
    unit: 'Linear m',
    ratePerHour: 180 // 60/0.33 minutes
  }
];

export const escalatorRailRates: ProductivityRate[] = [
  {
    id: 'ERC-1M',
    category: 'Escalator Rails',
    task: 'Clean',
    tool: 'Trigger sprayer, chemical, and cloth',
    unit: 'Linear m',
    ratePerHour: 200 // 60/0.3 minutes
  },
  {
    id: 'ERC-2M',
    category: 'Escalator Rails',
    task: 'Seal',
    tool: 'Sealant and cleaning cloth',
    unit: 'Linear m',
    ratePerHour: 139.53 // 60/0.43 minutes
  }
];
