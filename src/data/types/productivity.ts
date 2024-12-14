export interface ProductivityRate {
  id: string;
  category: string;
  task: string;
  tool: string;
  unit: string;
  ratePerHour: number;
}

export interface IndustryGroup {
  name: string;
  categories: string[];
}

export interface CategoryGroup {
  name: string;
  rates: ProductivityRate[];
}