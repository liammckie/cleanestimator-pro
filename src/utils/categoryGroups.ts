export interface CategoryGroup {
  name: string;
  categories: string[];
}

export const categoryGroups: CategoryGroup[] = [
  {
    name: "Carpet Care",
    categories: [
      "Carpet Maintenance - Spraying and Spotting",
      "Carpet Steam Cleaning",
      "Carpet Vacuuming"
    ]
  },
  {
    name: "Surface Cleaning",
    categories: [
      "Ceiling and Wall Cleaning",
      "Windows & Glass",
      "Window Blinds"
    ]
  },
  {
    name: "Specialized Areas",
    categories: [
      "Restroom Cleaning",
      "Restroom Deep Clean",
      "Restroom Disinfection",
      "Kitchen Cleaning"
    ]
  },
  {
    name: "Healthcare",
    categories: [
      "Healthcare - General",
      "Healthcare - Asset Management",
      "Healthcare - Bundled Services"
    ]
  },
  {
    name: "Facility Types",
    categories: [
      "Hotel Cleaning",
      "Dorm Cleaning",
      "Correctional Facility"
    ]
  },
  {
    name: "Maintenance",
    categories: [
      "Restorative",
      "Tool Cleaning",
      "Furniture Maintenance"
    ]
  }
];