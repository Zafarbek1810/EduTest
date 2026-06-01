import { User, Bell, Lock, Globe } from 'lucide-react';

export function TeacherSettings() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Sozlamalar</h1>
        <p className="text-muted-foreground">Hisobingiz va afzalliklaringizni boshqaring</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Profile Settings */}
        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Profil sozlamalari</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-foreground">To'liq ism</label>
              <input
                type="text"
                defaultValue="Dr. Sarvar Qodirov"
                className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-foreground">Elektron pochta</label>
              <input
                type="email"
                defaultValue="sarvar.qodirov@edutest.com"
                className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-foreground">Bio</label>
              <textarea
                rows={3}
                defaultValue="10 yildan ortiq tajribaga ega kompyuter fanlari o'qituvchisi."
                className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Bildirishnomalar</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Elektron pochta bildirishnomalari</p>
                <p className="text-sm text-muted-foreground">Elektron pochta orqali yangilanishlar olish</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground">Test topshirishlari</p>
                <p className="text-sm text-muted-foreground">Talabalar test topshirganda xabar berish</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Xavfsizlik</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-foreground">Joriy parol</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-foreground">Yangi parol</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm mb-2 text-foreground">Parolni tasdiqlash</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="text-foreground">Til va mintaqa</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2 text-foreground">Til</label>
              <select className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                <option>O'zbek</option>
                <option>Русский</option>
                <option>English</option>
                <option>Qoraqalpoq</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-foreground">Vaqt mintaqasi</label>
              <select className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all">
                <option>UTC+5 (Toshkent)</option>
                <option>UTC+5 (Samarqand)</option>
                <option>UTC+0 (London)</option>
                <option>UTC+3 (Moskva)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-[10px] transition-all shadow-lg shadow-primary/20">
          O'zgarishlarni saqlash
        </button>
      </div>
    </div>
  );
}
