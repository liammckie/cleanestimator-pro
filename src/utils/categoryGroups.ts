export interface CategoryGroup {
  name: string;
  categories: Array<{
    name: string;
    subcategories: string[];
  }>;
}

export interface IndustryGroup {
  name: string;
  categories: string[];
}

export const categoryGroups: CategoryGroup[] = [
  {
    name: "General Cleaning",
    categories: [
      {
        name: "Floor Care",
        subcategories: [
          "General Floor Sweeping",
          "General Floor Mopping",
          "General Floor Buffing",
          "General Carpet Vacuuming",
          "General Carpet Spotting"
        ]
      },
      {
        name: "Surface Care",
        subcategories: [
          "General Dusting",
          "General Surface Wiping",
          "General Glass Cleaning",
          "General Waste Removal"
        ]
      },
      {
        name: "Common Areas",
        subcategories: [
          "Reception Area Maintenance",
          "Corridor Cleaning",
          "Lobby Maintenance",
          "Common Room Cleaning"
        ]
      }
    ]
  }
];

export const industryGroups: IndustryGroup[] = [
  {
    name: "Healthcare",
    categories: [
      "Patient Room Cleaning",
      "Operating Theater Sanitization",
      "Medical Waste Management",
      "Clinical Area Disinfection",
      "Isolation Room Protocols",
      "Medical Equipment Cleaning"
    ]
  },
  {
    name: "Education",
    categories: [
      "Classroom Cleaning",
      "Laboratory Maintenance",
      "Gymnasium Cleaning",
      "Cafeteria Sanitation",
      "Library Maintenance",
      "Locker Room Cleaning"
    ]
  },
  {
    name: "Commercial Offices",
    categories: [
      "Workstation Cleaning",
      "Meeting Room Maintenance",
      "Break Room Sanitation",
      "Executive Office Cleaning",
      "IT Equipment Cleaning",
      "Filing Area Maintenance"
    ]
  },
  {
    name: "Retail",
    categories: [
      "Sales Floor Maintenance",
      "Fitting Room Cleaning",
      "Display Case Cleaning",
      "Stock Room Maintenance",
      "Entrance/Exit Cleaning",
      "POS Area Sanitation"
    ]
  },
  {
    name: "Industrial",
    categories: [
      "Factory Floor Cleaning",
      "Warehouse Maintenance",
      "Loading Dock Cleaning",
      "Machine Area Sanitation",
      "Industrial Waste Management",
      "Safety Equipment Cleaning"
    ]
  },
  {
    name: "Hospitality",
    categories: [
      "Guest Room Servicing",
      "Restaurant Area Cleaning",
      "Bar/Lounge Maintenance",
      "Pool Area Sanitation",
      "Function Room Cleaning",
      "Spa/Gym Facility Maintenance"
    ]
  },
  {
    name: "Food Service",
    categories: [
      "Kitchen Deep Cleaning",
      "Food Prep Area Sanitation",
      "Storage Area Maintenance",
      "Dining Area Cleaning",
      "Dish Washing Station",
      "Grease Trap Maintenance"
    ]
  }
];