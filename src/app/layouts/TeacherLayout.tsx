import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  PlusCircle,
  ClipboardList,
  BarChart3,
  Settings,
  GraduationCap,
  LogOut,
} from 'lucide-react';

export function TeacherLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const menuItems = [
    { path: '/teacher', label: 'Boshqaruv paneli', icon: LayoutDashboard, end: true },
    { path: '/teacher/students', label: 'Talabalar', icon: Users },
    { path: '/teacher/topics', label: 'Test mavzulari', icon: BookOpen },
    { path: '/teacher/create-test', label: 'Test yaratish', icon: PlusCircle },
    { path: '/teacher/test-management', label: 'Testlarni boshqarish', icon: ClipboardList },
    { path: '/teacher/results', label: 'Natijalar va reyting', icon: BarChart3 },
    { path: '/teacher/settings', label: 'Sozlamalar', icon: Settings },
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
              <p className="text-xs text-muted-foreground">O'qituvchi portali</p>
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
