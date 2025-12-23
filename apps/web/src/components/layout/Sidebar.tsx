import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  PieChart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dasbor', href: '/', icon: LayoutDashboard },
  { name: 'Transaksi', href: '/transactions', icon: Receipt },
  { name: 'Anggaran', href: '/budget', icon: PieChart },
  { name: 'Vendor & Klien', href: '/contacts', icon: Users },
  { name: 'Manajemen Kategori', href: '/categories', icon: Receipt },
  { name: 'Transaksi Berulang', href: '/recurring', icon: Receipt },
  { name: 'Laporan', href: '/reports', icon: BarChart3 },
  { name: 'Pengaturan', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-border-dark bg-white dark:bg-background-dark flex flex-col justify-between transition-all duration-300">
      <div className="flex flex-col h-full">
        {/* Logo Header */}
        <div className="p-6 pb-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white dark:text-background-dark font-bold text-xl">
                FH
              </div>
              <h1 className="text-gray-900 dark:text-white text-xl font-bold leading-normal tracking-tight">FinancePro</h1>
            </div>
            <p className="text-gray-500 dark:text-[#92c9a4] text-xs font-medium pl-10">Portal Admin</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg border-l-4 transition-all group",
                  isActive
                    ? "bg-primary/10 border-primary"
                    : "hover:bg-gray-100 dark:hover:bg-surface-dark border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={20}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-primary-hover dark:text-primary" : "group-hover:text-gray-900 dark:group-hover:text-white"
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm font-medium leading-normal",
                      isActive ? "text-primary-hover dark:text-primary font-bold" : ""
                    )}
                  >
                    {item.name}
                  </p>
                </>
              )}
            </NavLink>
          ))}
          
          {user?.role === 'ADMIN' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg border-l-4 transition-all group mt-6 border-t border-gray-100 dark:border-border-dark pt-6",
                  isActive
                    ? "bg-purple-50 dark:bg-purple-900/10 border-purple-500"
                    : "hover:bg-gray-100 dark:hover:bg-surface-dark border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <ShieldCheck
                    size={20}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-purple-600 dark:text-purple-400" : "group-hover:text-gray-900 dark:group-hover:text-white"
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm font-medium leading-normal",
                      isActive ? "text-purple-600 dark:text-purple-400 font-bold" : ""
                    )}
                  >
                    Dasbor Admin
                  </p>
                </>
              )}
            </NavLink>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-border-dark">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-surface-dark text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <p className="text-sm font-medium leading-normal">Keluar</p>
          </button>
        </div>
      </div>
    </aside>
  );
}
