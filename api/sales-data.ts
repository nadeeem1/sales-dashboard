import type { VercelRequest, VercelResponse } from '@vercel/node';

const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Beauty'];
const statuses = ['Completed', 'Pending', 'Cancelled'] as const;
const products = [
  'Wireless Headphones',
  'Mechanical Keyboard',
  'USB-C Dock',
  'Smart Monitor',
  'Laptop Stand',
];

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// Generates realistic mock order data
function generateMockData(count = 80) {
  const data = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(now.getDate() - Math.floor(Math.random() * 365));

    data.push({
      id: `ORD-${1000 + i}`,
      customer: `Customer ${i + 1}`,
      date: date.toISOString().split('T')[0],
      amount: parseFloat((Math.random() * 500 + 20).toFixed(2)),
      category: randomItem(categories),
      status: randomItem(statuses),
      product: randomItem(products),
    });
  }
  return data;
}

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json(generateMockData());
}
