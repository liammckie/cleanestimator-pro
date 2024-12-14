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
    name: "Floor Care",
    categories: [
      {
        name: "Carpet Care",
        subcategories: [
          "Carpet Maintenance - Spraying and Spotting",
          "Carpet Maintenance - Vacuum",
          "Carpet Maintenance - Steam Cleaning",
          "Carpet Deep Clean"
        ]
      },
      {
        name: "Hard Floors",
        subcategories: [
          "Hard Floor Sweeping",
          "Hard Floor Mopping",
          "Hard Floor Buffing",
          "Hard Floor Stripping",
          "Hard Floor Sealing"
        ]
      }
    ]
  },
  {
    name: "Surface Care",
    categories: [
      {
        name: "General Surfaces",
        subcategories: [
          "Dusting",
          "Wiping",
          "Sanitizing",
          "Polishing"
        ]
      },
      {
        name: "Special Surfaces",
        subcategories: [
          "Glass Cleaning",
          "Stainless Steel Care",
          "Wood Care",
          "Stone Care"
        ]
      }
    ]
  },
  {
    name: "Specialized Areas",
    categories: [
      {
        name: "Washrooms",
        subcategories: [
          "Restroom Cleaning",
          "Restroom Sanitizing",
          "Restroom Deep Clean"
        ]
      },
      {
        name: "Kitchen Areas",
        subcategories: [
          "Kitchen Surface Cleaning",
          "Kitchen Equipment Cleaning",
          "Kitchen Deep Clean"
        ]
      }
    ]
  }
];

export const industryGroups: IndustryGroup[] = [
  {
    name: "Healthcare",
    categories: [
      "Hospitals",
      "Medical Clinics",
      "Dental Offices",
      "Aged Care Facilities",
      "Medical Laboratories"
    ]
  },
  {
    name: "Commercial",
    categories: [
      "Office Buildings",
      "Retail Stores",
      "Shopping Centers",
      "Banks",
      "Hotels"
    ]
  },
  {
    name: "Education",
    categories: [
      "Primary Schools",
      "High Schools",
      "Universities",
      "Training Centers",
      "Libraries"
    ]
  },
  {
    name: "Industrial",
    categories: [
      "Warehouses",
      "Manufacturing Plants",
      "Food Processing",
      "Pharmaceutical",
      "Distribution Centers"
    ]
  }
];