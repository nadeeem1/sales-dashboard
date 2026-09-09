import { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp, ShoppingBag, DollarSign, Package,
  AlertCircle, Loader2
} from 'lucide-react';
import { DashboardHeader } from './components/DashboardHeader';
import { FilterBar } from './components/FilterBar';
import { KpiCard } from './components/KpiCard';
import { RevenueChart } from './components/RevenueChart';
import { ProductsChart } from './components/ProductsChart';
import { OrdersTable } from './components/OrdersTable';
import { Order, SalesSummary, ChartData } from './types';

// Fallback data for portfolio demo if the API is unreachable
const FALLBACK_ORDERS: Order[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `ORD-10${i}`,
  customer: `Guest User ${i + 1}`,
  date: `2026-0${Math.floor(Math.random() * 9) + 1}-15`,
  amount: Math.random() * 500 + 50,
  category: ['Electronics', 'Clothing', 'Books'][Math.floor(Math.random() * 3)],
  status: (['Completed', 'Pending', 'Cancelled'] as const)[Math.floor(Math.random() * 3)],
  product: `Product ${i + 1}`,
}));

const FALLBACK_SUMMARY: SalesSummary = {
  totalRevenue: 45200,
  totalOrders: 320,
  avgOrderValue: 141.25,
  growthRate: 12.5,
};

export default function App() {
  // --- States ---
  const [orders, setOrders] = useState<Order[]>([]);
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Filters, sorting & pagination
  const [category, setCategory] = useState('All');
  const [dateRange, setDateRange] = useState('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order, direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Data fetching ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resData, resSum] = await Promise.all([
          fetch('/api/sales-data'),
          fetch('/api/sales-summary'),
        ]);

        if (!resData.ok || !resSum.ok) throw new Error('Fetch failed');

        setOrders(await resData.json());
        setSummary(await resSum.json());
        setError(false);
      } catch (err) {
        console.error('Using fallback data due to API error', err);
        setOrders(FALLBACK_ORDERS);
        setSummary(FALLBACK_SUMMARY);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Filtering & sorting ---
  const processedData = useMemo(() => {
    let filtered = [...orders];

    if (category !== 'All') {
      filtered = filtered.filter((o) => o.category === category);
    }

    if (dateRange !== 'all') {
      const now = new Date();
      const daysLimit = parseInt(dateRange, 10);
      filtered = filtered.filter((o) => {
        const orderDate = new Date(o.date);
        const diffDays = Math.ceil(Math.abs(now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays <= daysLimit;
      });
    }

    if (sortConfig) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [orders, category, dateRange, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedData.slice(start, start + itemsPerPage);
  }, [processedData, currentPage]);

  const totalPages = Math.max(1, Math.ceil(processedData.length / itemsPerPage));

  // --- Chart aggregation ---
  const revenueData = useMemo((): ChartData[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const totals = new Array(12).fill(0);

    processedData.forEach((o) => {
      const monthIdx = new Date(o.date).getMonth();
      if (!Number.isNaN(monthIdx)) totals[monthIdx] += o.amount;
    });

    return months.map((name, i) => ({ name, revenue: totals[i], sales: 0 }));
  }, [processedData]);

  const productData = useMemo((): ChartData[] => {
    const productMap: Record<string, number> = {};
    processedData.forEach((o) => {
      productMap[o.product] = (productMap[o.product] || 0) + 1;
    });

    return Object.entries(productMap)
      .map(([name, sales]) => ({ name, sales, revenue: 0 }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);
  }, [processedData]);

  // --- Loading state ---
  if (loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-900">
      <Loader2 className="animate-spin text-blue-600" size={48} />
      <p className="text-slate-500 dark:text-slate-400 font-medium">Loading your analytics...</p>
    </div>
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">

          <DashboardHeader darkMode={darkMode} setDarkMode={setDarkMode} />

          {error && (
            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center gap-3 text-amber-700 dark:text-amber-400 text-sm">
              <AlertCircle size={18} />
              <span>API connection failed. Showing demonstration data for portfolio purposes.</span>
            </div>
          )}

          <FilterBar
            category={category} setCategory={setCategory}
            dateRange={dateRange} setDateRange={setDateRange}
          />

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KpiCard
              title="Total Revenue"
              value={`$${(summary?.totalRevenue ?? 0).toLocaleString()}`}
              trend="12%" isPositive={true}
              icon={DollarSign} colorClass="bg-blue-600"
            />
            <KpiCard
              title="Total Orders"
              value={(summary?.totalOrders ?? 0).toLocaleString()}
              trend="5%" isPositive={true}
              icon={ShoppingBag} colorClass="bg-indigo-600"
            />
            <KpiCard
              title="Avg. Order Value"
              value={`$${(summary?.avgOrderValue ?? 0).toFixed(2)}`}
              trend="2%" isPositive={false}
              icon={TrendingUp} colorClass="bg-emerald-600"
            />
            <KpiCard
              title="Growth Rate"
              value={`${summary?.growthRate ?? 0}%`}
              trend="8%" isPositive={true}
              icon={Package} colorClass="bg-violet-600"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <RevenueChart data={revenueData} />
            <ProductsChart data={productData} />
          </div>

          {/* Data Table */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Recent Transactions</h3>
            <OrdersTable
              data={paginatedData}
              sortConfig={sortConfig}
              requestSort={(key) => setSortConfig({
                key,
                direction: sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
              })}
              currentPage={currentPage}
              totalPages={totalPages}
              setPage={(updater) => setCurrentPage((p) => updater(p))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
