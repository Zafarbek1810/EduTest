import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [role, setRole] = useState<'teacher' | 'student'>('teacher');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Login va parolni kiriting');
      return;
    }
    try {
      setLoading(true);
      await login(username, password, role);
      toast.success('Muvaffaqiyatli kirdingiz');
      navigate(role === 'teacher' ? '/teacher' : '/student');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Kirish amalga oshmadi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&fit=crop&auto=format"
              alt="Talabalar onlayn ta'limda hamkorlik qilmoqda"
              className="relative rounded-[14px] w-[500px] h-[500px] object-cover"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-[440px] bg-card rounded-[14px] p-8 border border-border">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-[10px] flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl text-foreground mb-2">EduTest Pro</h1>
              <p className="text-muted-foreground">Onlayn test platformasi</p>
            </div>

            <div className="flex gap-2 mb-6 p-1 bg-muted rounded-[10px]">
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`flex-1 py-2.5 px-4 rounded-[8px] transition-all ${
                  role === 'teacher'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                O'qituvchi
              </button>
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-2.5 px-4 rounded-[8px] transition-all ${
                  role === 'student'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Talaba
              </button>
            </div>

            {/* <p className="text-xs text-muted-foreground mb-4 text-center">
              Demo: o'qituvchi <code className="text-primary">teacher</code> /{' '}
              <code className="text-primary">teacher123</code> · talaba{' '}
              <code className="text-primary">dilnoza.k</code> / <code className="text-primary">pass123</code>
            </p> */}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm mb-2 text-foreground">Foydalanuvchi nomi</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Foydalanuvchi nomingizni kiriting"
                    className="w-full bg-input-background border border-border rounded-[10px] py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-foreground">Parol</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parolingizni kiriting"
                    className="w-full bg-input-background border border-border rounded-[10px] py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-[10px] transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
              >
                {loading ? 'Kirish...' : 'Kirish'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
