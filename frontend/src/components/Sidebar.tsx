import { Library, LayoutDashboard, BookOpen, Settings, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const mainNav = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { label: 'All Books', icon: BookOpen, href: '/books' },
];

const bottomNav = [
  { label: 'Settings', icon: Settings, href: '/' },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const isActive = (href: string, label: string) => {
    if (label === 'Dashboard' || label === 'Books') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 h-16 shrink-0">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#6c5ce7] text-white">
            <Library className="w-4 h-4" />
          </div>
          <span className="text-[16px] font-bold text-[#1a1d26] dark:text-[#e2e4e9] tracking-tight">
            LibraryMS
          </span>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-wider text-[#a0a3b1] dark:text-[#4a4d5e]">
          Main Menu
        </p>
        <div className="space-y-1">
          {mainNav.map(({ label, icon: Icon, href }) => {
            const active = isActive(href, label);
            return (
              <Link
                key={label}
                to={href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150
                  ${
                    active
                      ? 'bg-[#f0edff] dark:bg-[#6c5ce7]/15 text-[#6c5ce7] dark:text-[#a29bfe]'
                      : 'text-[#6b7084] dark:text-[#8b8fa3] hover:bg-[#f4f5f7] dark:hover:bg-[#1c1f2e] hover:text-[#1a1d26] dark:hover:text-[#e2e4e9]'
                  }`}
              >
                <Icon className={`w-[18px] h-[18px] shrink-0 ${active ? 'text-[#6c5ce7] dark:text-[#a29bfe]' : 'text-[#a0a3b1] dark:text-[#5a5d6e]'}`} />
                {label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6c5ce7] dark:bg-[#a29bfe]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-[#edeef1] dark:border-[#1c1f2e] space-y-0.5">
        {bottomNav.map(({ label, icon: Icon, href }) => (
          <Link
            key={label}
            to={href}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-[#6b7084] dark:text-[#8b8fa3] hover:bg-[#f4f5f7] dark:hover:bg-[#1c1f2e] hover:text-[#1a1d26] dark:hover:text-[#e2e4e9] transition-all duration-150"
          >
            <Icon className="w-[18px] h-[18px] shrink-0" />
            {label}
          </Link>
        ))}

        <button
          id="logout-btn"
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-[13px] font-medium text-[#6b7084] dark:text-[#8b8fa3] hover:bg-[#fef2f2] dark:hover:bg-[#2d0a0a] hover:text-[#e74c3c] dark:hover:text-[#f87171] transition-all duration-150"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
