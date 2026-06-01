import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { ClipboardList, BarChart3, User, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function StudentLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const menuItems = [
    { path: '/student', label: 'Mavjud testlar', icon: ClipboardList, end: true },
    { path: '/student/my-results', label: 'Mening natijalarim', icon: BarChart3 },
    { path: '/student/profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-[8px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sidebar-foreground">EduTest Pro</h2>
              <p className="text-xs text-muted-foreground">Talaba portali</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-[10px] text-sidebar-foreground hover:bg-sidebar-accent transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Chiqish</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
