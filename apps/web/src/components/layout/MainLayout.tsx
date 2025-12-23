
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import NotificationPanel from '../notifications/NotificationPanel';

export default function MainLayout() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 antialiased dark:text-white">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <Header onOpenNotifications={() => setIsNotificationOpen(true)} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto p-6 md:p-8 flex flex-col gap-8">
            <Outlet />
          </div>
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 pb-8">
            <footer className="pt-8 border-t border-gray-200 dark:border-border-dark flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-[#92c9a4]">
              <div>
                <p>© 2023 FinanceHub Inc. All rights reserved.</p>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-primary transition-colors">Help Center</a>
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              </div>
            </footer>
          </div>
        </main>
      </div>
      <NotificationPanel isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </div>
  );
}
