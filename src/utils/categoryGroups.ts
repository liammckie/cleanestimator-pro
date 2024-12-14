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
          "Carpet Maintenance - Spraying and Spotting",
          "Carpet Steam Cleaning",
          "Carpet Vacuuming",
          "Hard Floor Cleaning",
          "Floor Stripping and Sealing"
        ]
      },
      {
        name: "Surface Care",
        subcategories: [
          "Ceiling and Wall Cleaning",
          "Windows & Glass",
          "Window Blinds",
          "Glass Cleaning",
          "Surface Disinfection"
        ]
      },
      {
        name: "Specialized Areas",
        subcategories: [
          "Restroom Cleaning",
          "Kitchen Cleaning",
          "Office Space Cleaning",
          "Reception Area Maintenance",
          "Common Area Cleaning"
        ]
      },
      {
        name: "Equipment & Furniture",
        subcategories: [
          "Furniture Maintenance",
          "Tool Cleaning",
          "Equipment Sanitization",
          "Trash and Recycle Management"
        ]
      }
    ]
  }
];

export const industryGroups: IndustryGroup[] = [
  {
    name: "Healthcare",
    categories: [
      "Healthcare - Patient Rooms",
      "Healthcare - Operating Theaters",
      "Healthcare - Common Areas",
      "Healthcare - Asset Management",
      "Healthcare - Bundled Services",
      "Healthcare - Clinical Areas",
      "Healthcare - Isolation Rooms",
      "Healthcare - Emergency Departments"
    ]
  },
  {
    name: "Hospitality",
    categories: [
      "Hotel Rooms",
      "Hotel Common Areas",
      "Restaurant Cleaning",
      "Event Spaces",
      "Dorm Cleaning",
      "Food Service Areas",
      "Entertainment Venues",
      "Lobby Maintenance"
    ]
  },
  {
    name: "Commercial & Industrial",
    categories: [
      "Office Buildings",
      "Retail Spaces",
      "Industrial Facilities",
      "Educational Institutions",
      "Correctional Facilities",
      "Manufacturing Plants",
      "Warehouses",
      "Data Centers"
    ]
  },
  {
    name: "Specialized Facilities",
    categories: [
      "Clean Rooms",
      "Laboratories",
      "Sports Facilities",
      "Transportation Hubs",
      "Religious Facilities",
      "Government Buildings",
      "Museums & Galleries",
      "Child Care Centers"
    ]
  }
];