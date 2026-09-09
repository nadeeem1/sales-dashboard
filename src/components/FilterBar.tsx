import { Calendar, Filter } from 'lucide-react';

interface FilterBarProps {
  category: string;
  setCategory: (v: string) => void;
  dateRange: string;
  setDateRange: (v: string) => void;
}

export const FilterBar = ({ category, setCategory, dateRange, setDateRange }: FilterBarProps) => (
  <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
    <div className="flex items-center gap-2 min-w-[200px]">
      <Filter size={18} className="text-slate-400" />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
      >
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Home & Garden">Home & Garden</option>
        <option value="Books">Books</option>
      </select>
    </div>
    <div className="flex items-center gap-2 min-w-[200px] border-l pl-4 border-slate-200 dark:border-slate-700">
      <Calendar size={18} className="text-slate-400" />
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="w-full bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
      >
        <option value="all">All Time</option>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
      </select>
    </div>
  </div>
);
