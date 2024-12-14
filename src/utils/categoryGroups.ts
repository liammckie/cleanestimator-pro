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
        name: "Carpet Care",
        subcategories: [
          "Carpet Maintenance - Spraying and Spotting",
          "Carpet Steam Cleaning",
          "Carpet Vacuuming"
        ]
      },
      {
        name: "Surface Care",
        subcategories: [
          "Ceiling and Wall Cleaning",
          "Windows & Glass",
          "Window Blinds"
        ]
      },
      {
        name: "Area Specific",
        subcategories: [
          "Restroom Cleaning",
          "Restroom Deep Clean",
          "Restroom Disinfection",
          "Kitchen Cleaning"
        ]
      },
      {
        name: "Maintenance",
        subcategories: [
          "Restorative",
          "Tool Cleaning",
          "Furniture Maintenance"
        ]
      }
    ]
  }
];

export const industryGroups: IndustryGroup[] = [
  {
    name: "Healthcare",
    categories: [
      "Healthcare - General",
      "Healthcare - Asset Management",
      "Healthcare - Bundled Services"
    ]
  },
  {
    name: "Hospitality",
    categories: [
      "Hotel Cleaning",
      "Dorm Cleaning"
    ]
  },
  {
    name: "Specialized Facilities",
    categories: [
      "Correctional Facility"
    ]
  }
];