import { ProductivityRate } from '../types';

export const dormRates: ProductivityRate[] = [
  {
    id: "RDC-1M",
    category: "Dorms & Residence Halls",
    task: "Clean bathroom without showers",
    tool: "Restroom cart, trash liners, consumable supplies, chemical, cleaning cloths, broom, and dustpan",
    unit: "Fixture",
    ratePerHour: 20 // 60 min / 3 min per unit
  },
  {
    id: "RDC-2M",
    category: "Dorms & Residence Halls",
    task: "Clean corridor with carpeted flooring",
    tool: "Trash barrel, liners, duster, duster sleeve, chemical, cloth, grabber device, and vacuum",
    unit: "m²",
    ratePerHour: 371.52 // 60 min / 16.15 min per 100m² * 100
  },
  {
    id: "RDC-3M",
    category: "Dorms & Residence Halls",
    task: "Clean corridor with hard-surface flooring",
    tool: "Trash barrel, liners, duster, duster sleeve, chemical, cloth, grabber device, vacuum, mop, bucket",
    unit: "m²",
    ratePerHour: 185.87 // 60 min / 32.28 min per 100m² * 100
  },
  {
    id: "RDC-4M",
    category: "Dorms & Residence Halls",
    task: "Clean exterior stairs",
    tool: "8\" / 203 mm broom, dustpan, chemical, and cloth",
    unit: "Flight",
    ratePerHour: 7.66 // 60 min / 7.83 min per flight
  },
  {
    id: "RDC-5M",
    category: "Dorms & Residence Halls",
    task: "Clean interior stairs",
    tool: "Cordless backpack vacuum, chemical, and cloth",
    unit: "Flight",
    ratePerHour: 20.55 // 60 min / 2.92 min per flight
  },
  {
    id: "RDC-6M",
    category: "Dorms & Residence Halls",
    task: "Clean kitchen",
    tool: "Trash barrel, liners, duster, duster sleeve, chemical, cloth, grabber device, vacuum, mop, bucket",
    unit: "m²",
    ratePerHour: 18.59 // 60 min / 32.28 min per 10m² * 10
  },
  {
    id: "RDC-7M",
    category: "Dorms & Residence Halls",
    task: "Clean laundry room",
    tool: "Trash barrel, liners, duster, duster sleeve, chemical, cloth, grabber device, vacuum, mop, bucket",
    unit: "m²",
    ratePerHour: 32.79 // 60 min / 91.5 min per 50m² * 50
  },
  {
    id: "RDC-8M",
    category: "Dorms & Residence Halls",
    task: "Clean lobby",
    tool: "Trash barrel, liners, duster, duster sleeve, chemical, cloth, grabber device, vacuum, mop, bucket",
    unit: "m²",
    ratePerHour: 132.71 // 60 min / 45.21 min per 100m² * 100
  },
  {
    id: "RDC-9M",
    category: "Dorms & Residence Halls",
    task: "Clean lounge",
    tool: "Trash barrel, liners, duster, duster sleeve, chemical, cloth, grabber device, vacuum, mop, bucket",
    unit: "m²",
    ratePerHour: 159.28 // 60 min / 37.67 min per 100m² * 100
  },
  {
    id: "RDC-10M",
    category: "Dorms & Residence Halls",
    task: "Clean parlor",
    tool: "Trash barrel, liners, duster, duster sleeve, chemical, cloth, grabber device, vacuum",
    unit: "m²",
    ratePerHour: 159.28 // 60 min / 37.67 min per 100m² * 100
  },
  {
    id: "RDC-11M",
    category: "Dorms & Residence Halls",
    task: "Clean vending area",
    tool: "Trash barrel, liners, duster, duster sleeve, chemical, cloth, grabber device, vacuum, mop, bucket",
    unit: "m²",
    ratePerHour: 42.86 // 60 min / 7 min per 5m² * 5
  },
  {
    id: "RDC-12M",
    category: "Dorms & Residence Halls",
    task: "Clean showers",
    tool: "Chemical, cleaning cloths, squeegee, and scrub pad",
    unit: "Fixture",
    ratePerHour: 8.33 // 60 min / 7.2 min per fixture
  },
  {
    id: "RDC-13M",
    category: "Dorms & Residence Halls",
    task: "Remove trash in building without elevators",
    tool: "Tilt truck dumpster, trash liners, and barrel",
    unit: "m²",
    ratePerHour: 371.52 // 60 min / 16.15 min per 100m² * 100
  }
];
