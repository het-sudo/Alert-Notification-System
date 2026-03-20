import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks/useAuth';
import { LogOut, Bell } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Bell className="h-8 w-8 text-primary-500 mr-3" />
            <Link to="/dashboard" className="text-xl font-bold text-gray-900">
              Alerts
            </Link>
          </div>
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">{user.name}</span>
              <button
                onClick={handleLogout}
                className="btn-primary flex items-center space-x-1 px-3 py-1 text-sm"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
