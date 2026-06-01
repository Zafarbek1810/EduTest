import { User, Mail, Calendar, Award, Target, TrendingUp } from 'lucide-react';

export function StudentProfile() {
  const studentData = {
    fullName: 'Dilnoza Karimova',
    username: 'dilnoza.k',
    email: 'dilnoza.karimova@talaba.com',
    joinedDate: '2026-03-15',
    totalTests: 12,
    averageScore: 87.5,
    bestScore: 95,
    totalCorrect: 185,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Mening profilim</h1>
        <p className="text-muted-foreground">Profilingizni boshqaring va statistikangizni ko'ring</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-card rounded-[14px] p-6 border border-border text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl text-foreground mb-1">{studentData.fullName}</h2>
            <p className="text-muted-foreground mb-4">@{studentData.username}</p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              <span>Qo'shilgan: {studentData.joinedDate}</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-[14px] p-6 border border-border">
            <h3 className="text-foreground mb-4">Tezkor statistika</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-warning" />
                  <span className="text-muted-foreground">Eng yuqori ball</span>
                </div>
                <span className="text-foreground">{studentData.bestScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <span className="text-muted-foreground">O'rtacha</span>
                </div>
                <span className="text-foreground">{studentData.averageScore}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Jami to'g'ri</span>
                </div>
                <span className="text-foreground">{studentData.totalCorrect}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Edit Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-card rounded-[14px] p-6 border border-border">
            <h3 className="text-foreground mb-6">Shaxsiy ma'lumotlar</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-foreground">To'liq ism</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    defaultValue={studentData.fullName}
                    className="w-full bg-input-background border border-border rounded-[10px] py-3 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-foreground">Foydalanuvchi nomi</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    defaultValue={studentData.username}
                    className="w-full bg-input-background border border-border rounded-[10px] py-3 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2 text-foreground">Elektron pochta</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    defaultValue={studentData.email}
                    className="w-full bg-input-background border border-border rounded-[10px] py-3 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-card rounded-[14px] p-6 border border-border">
            <h3 className="text-foreground mb-6">Parolni o'zgartirish</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-foreground">Joriy parol</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-foreground">Yangi parol</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-foreground">Parolni tasdiqlash</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-[10px] transition-all shadow-lg shadow-primary/20">
            O'zgarishlarni saqlash
          </button>
        </div>
      </div>
    </div>
  );
}
