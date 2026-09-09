export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  category: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  product: string;
}

export interface SalesSummary {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  growthRate: number;
}

export interface ChartData {
  name: string;
  revenue: number;
  sales: number;
}
