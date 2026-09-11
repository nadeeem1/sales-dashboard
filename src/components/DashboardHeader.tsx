import { LayoutDashboard, Moon, Sun } from 'lucide-react';

export const DashboardHeader = ({ darkMode, setDarkMode }: { darkMode: boolean, setDarkMode: (v: boolean) => void }) => (
  <header className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-600 rounded-lg text-white">
        <LayoutDashboard size={24} />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Sales Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Real-time business performance tracking</p>
      </div>
    </div>
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle dark mode"
      className="p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  </header>
);
