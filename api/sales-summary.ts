import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  // Portfolio demo: realistic static KPIs (swap for real DB aggregation in production)
  const summary = {
    totalRevenue: 125430.5,
    totalOrders: 1420,
    avgOrderValue: 88.33,
    growthRate: 12.5,
  };
  res.status(200).json(summary);
}
