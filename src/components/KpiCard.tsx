import { LucideIcon } from 'lucide-react';

interface KpiProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: LucideIcon;
  colorClass: string;
}

export const KpiCard = ({ title, value, trend, isPositive, icon: Icon, colorClass }: KpiProps) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-slate-900 dark:text-white">{value}</h3>
        <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '↑' : '↓'} {trend} <span className="text-slate-400 font-normal ml-1">vs last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${colorClass} text-white`}>
        <Icon size={22} />
      </div>
    </div>
  </div>
);
