import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Order } from '../types';

interface Props {
  data: Order[];
  sortConfig: { key: keyof Order, direction: 'asc' | 'desc' } | null;
  requestSort: (key: keyof Order) => void;
  currentPage: number;
  totalPages: number;
  setPage: (updater: (p: number) => number) => void;
}

export const OrdersTable = ({ data, sortConfig, requestSort, currentPage, totalPages, setPage }: Props) => {
  const getSortIcon = (key: keyof Order) => {
    if (sortConfig?.key !== key) return <ArrowUpDown size={14} className="text-slate-400 inline" />;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
              <th className="p-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => requestSort('id')} aria-label="Sort by Order ID">
                <div className="flex items-center gap-2">Order ID {getSortIcon('id')}</div>
              </th>
              <th className="p-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => requestSort('customer')} aria-label="Sort by Customer">
                <div className="flex items-center gap-2">Customer {getSortIcon('customer')}</div>
              </th>
              <th className="p-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => requestSort('date')} aria-label="Sort by Date">
                <div className="flex items-center gap-2">Date {getSortIcon('date')}</div>
              </th>
              <th className="p-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => requestSort('amount')} aria-label="Sort by Amount">
                <div className="flex items-center gap-2">Amount {getSortIcon('amount')}</div>
              </th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-300 text-sm divide-y divide-slate-100 dark:divide-slate-700">
            {data.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="p-4 font-medium text-slate-900 dark:text-white">{order.id}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.date}</td>
                <td className="p-4 font-semibold">${order.amount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Page <span className="font-semibold text-slate-900 dark:text-white">{currentPage}</span> of <span className="font-semibold text-slate-900 dark:text-white">{totalPages || 1}</span>
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            aria-label="Next page"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
