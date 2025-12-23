import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MainLayout from './components/layout/MainLayout';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import Loading from './components/common/Loading';

// Lazy load pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Transactions = lazy(() => import('./pages/Transactions'));
const AddTransaction = lazy(() => import('./pages/AddTransaction'));
const Budget = lazy(() => import('./pages/Budget'));
const Reports = lazy(() => import('./pages/Reports'));
const Vendors = lazy(() => import('./pages/Vendors'));
const Settings = lazy(() => import('./pages/Settings'));
const Categories = lazy(() => import('./pages/Categories'));
const ChartOfAccounts = lazy(() => import('./pages/ChartOfAccounts'));
const BankAccounts = lazy(() => import('./pages/BankAccounts'));
const UsersAndRoles = lazy(() => import('./pages/UsersAndRoles'));
const Notifications = lazy(() => import('./pages/Notifications'));
const AuditLog = lazy(() => import('./pages/AuditLog'));
const RecurringTransactions = lazy(() => import('./pages/RecurringTransactions'));
const DisplaySettings = lazy(() => import('./pages/DisplaySettings'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Wrapper for all authenticated routes to ensure they have the layout (if desired) 
// or at least protection. 
// Currently MainLayout includes the sidebar, so we probably want most pages there.
const AuthenticatedLayout = () => {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="finance-theme">
      <AuthProvider>
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Private Routes (Wrapped in MainLayout) */}
              <Route element={<AuthenticatedLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/add-transaction" element={<AddTransaction />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/contacts" element={<Vendors />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
                <Route path="/bank-accounts" element={<BankAccounts />} />
                <Route path="/users-and-roles" element={<UsersAndRoles />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/audit-log" element={<AuditLog />} />
                <Route path="/recurring" element={<RecurringTransactions />} />
                <Route path="/display-settings" element={<DisplaySettings />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AuthenticatedLayout />}>
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                </Route>
              </Route>

              {/* Catch all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
