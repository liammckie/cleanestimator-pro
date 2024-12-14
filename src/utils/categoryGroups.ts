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
      }
    ]
  }
];

export const industryGroups: IndustryGroup[] = [
  {
    name: "Office and Corporate",
    categories: [
      "Corporate Offices",
      "Shared Workspaces",
      "Business Parks",
      "Call Centers",
      "Legal and Corporate Offices"
    ]
  },
  {
    name: "Healthcare",
    categories: [
      "Hospitals",
      "Dental Clinics",
      "Veterinary Clinics",
      "Aged Care Centers",
      "Medical Laboratories",
      "Research Labs",
      "Cleanrooms"
    ]
  },
  {
    name: "Education",
    categories: [
      "Primary Schools",
      "Secondary Schools",
      "Universities",
      "Colleges",
      "Childcare Centers",
      "Vocational Training Centers"
    ]
  },
  {
    name: "Industrial and Manufacturing",
    categories: [
      "Factories",
      "Workshops",
      "Assembly Lines",
      "Food Processing Plants",
      "Pharmaceutical Manufacturing",
      "Warehouses",
      "Distribution Centers"
    ]
  },
  {
    name: "Retail and Commercial",
    categories: [
      "Shopping Malls",
      "Retail Stores",
      "Supermarkets",
      "Convenience Stores",
      "Car Dealerships",
      "Showrooms"
    ]
  },
  {
    name: "Hospitality and Entertainment",
    categories: [
      "Hotels and Resorts",
      "Restaurants and Cafes",
      "Event Venues",
      "Conference Centers",
      "Cinemas",
      "Theaters",
      "Casinos"
    ]
  },
  {
    name: "Government and Public Facilities",
    categories: [
      "Local Council Offices",
      "Government Buildings",
      "Police Stations",
      "Post Offices",
      "Military Bases",
      "Defense Facilities"
    ]
  },
  {
    name: "Food and Beverage",
    categories: [
      "Bakeries",
      "Breweries",
      "Wineries",
      "Bottling Plants",
      "Commercial Kitchens"
    ]
  },
  {
    name: "Sports and Recreation",
    categories: [
      "Gyms",
      "Fitness Centers",
      "Sports Stadiums",
      "Aquatic Centers",
      "Golf Clubs",
      "Recreation Centers"
    ]
  },
  {
    name: "Transport and Logistics",
    categories: [
      "Airports",
      "Terminals",
      "Train Stations",
      "Bus Depots",
      "Shipping Yards",
      "Fleet Facilities"
    ]
  },
  {
    name: "Specialized Facilities",
    categories: [
      "Data Centers",
      "Server Rooms",
      "Research Facilities",
      "Art Galleries",
      "Museums",
      "Cultural Centers"
    ]
  },
  {
    name: "Construction and Industrial",
    categories: [
      "Construction Sites",
      "Post-Construction",
      "Demolition Sites",
      "Mining Facilities",
      "Power Plants",
      "Manufacturing Plants"
    ]
  }
];