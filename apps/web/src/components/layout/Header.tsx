import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    onOpenNotifications?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-md dark:bg-background-dark/80 dark:border-border-dark">
            <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-6">
                {/* Search */}
                <div className="mx-4 hidden max-w-md flex-1 justify-center md:flex">
                    <div className="relative w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-text-secondary">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input
                            className="block w-full rounded-lg border-none bg-gray-100 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary dark:bg-card-dark dark:text-white dark:placeholder-text-secondary"
                            placeholder="Cari transaksi, tagihan..."
                            type="text"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onOpenNotifications}
                        title="Notifications"
                        aria-label="Notifications"
                        className="flex size-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:text-text-secondary dark:hover:bg-border-dark"
                    >
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button 
                        onClick={() => navigate('/settings')}
                        title="Settings"
                        aria-label="Settings"
                        className="flex size-10 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 dark:text-text-secondary dark:hover:bg-border-dark"
                    >
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <div className="mx-1 h-8 w-px bg-gray-200 dark:bg-border-dark"></div>
                    <button className="flex items-center gap-2" title="User Profile" aria-label="User Profile">
                        <img
                            className="size-9 rounded-full border border-gray-200 object-cover dark:border-border-dark"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvFiL-GLx5kqikkeviXml8LBA0iNle3eL8FMaqf6I0Qgld4q2nN-rY6pe2fXYyStSKdawmcfd8MBe1WC2U3fd-EokD0BQbX-Nm3FyuSf9q8XAOaq8ZBhtQ53VzURxvoLdqJ4m49VxBUttZh3mdMsI1fLDbIu1YIlskLFGVQslsAwvpodvWO8vcDZZy191UG-KGAwgV9ltoreqmVSZnBdVpxUr4w9vdigt2nd6JvJPRzna8repB8qwAH1EkeV61fhwtO4bRL-1lXu4"
                            alt="User Profile"
                        />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
