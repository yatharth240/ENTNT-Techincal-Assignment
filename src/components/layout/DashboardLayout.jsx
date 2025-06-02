import { Link, Outlet, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const links = [
  { label: 'Dashboard', to: '/' },
  { label: 'Equipment', to: '/equipment' },
  { label: 'Orders',    to: '/orders' },
  { label: 'Maintenance', to: '/maintenance' },
];

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { dark, setDark } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-gradient-to-b from-primary to-primary-dark text-white flex flex-col">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">ENTNT</h1>
          <button
            onClick={() => setDark(!dark)}
            className="hover:scale-110 transition transform"
            title="Toggle theme"
          >
            {dark ? '🌙' : '☀️'}
          </button>
        </div>
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`px-6 py-3 hover:bg-white/10 transition ${
              pathname === l.to ? 'bg-white/10' : ''
            }`}
          >
            {l.label}
          </Link>
        ))}
        <button
          onClick={logout}
          className="mt-auto m-4 bg-white/20 hover:bg-white/30 text-white rounded px-4 py-2"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
}
