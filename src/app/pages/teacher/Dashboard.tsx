import { useEffect, useState } from 'react';
import { Users, BookOpen, ClipboardList, Activity, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../../lib/api';

const performanceData = [
  { month: 'Yan', score: 75 },
  { month: 'Fev', score: 78 },
  { month: 'Mar', score: 82 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 88 },
  { month: 'Iyn', score: 90 },
];

const activityData = [
  { day: 'Dush', tests: 12 },
  { day: 'Sesh', tests: 15 },
  { day: 'Chor', tests: 18 },
  { day: 'Pay', tests: 14 },
  { day: 'Jum', tests: 20 },
  { day: 'Shan', tests: 8 },
  { day: 'Yak', tests: 5 },
];

export function TeacherDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTopics: 0,
    totalTests: 0,
    activeTests: 0,
    averageScore: 0,
    todayParticipants: 0,
    recentActivity: [] as Array<{
      id: string;
      studentName: string;
      topicName: string;
      score: number;
      date: string;
      status: 'passed' | 'failed';
    }>,
  });

  useEffect(() => {
    api.getTeacherDashboard().then(setStats).catch(() => undefined);
  }, []);

  const {
    totalStudents,
    totalTopics,
    totalTests,
    activeTests,
    averageScore,
    todayParticipants,
    recentActivity,
  } = stats;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">O'qituvchi boshqaruv paneli</h1>
        <p className="text-muted-foreground">Xush kelibsiz! Mana sizning umumiy ko'rinishingiz</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Jami</span>
          </div>
          <div className="text-2xl text-foreground mb-1">{totalStudents}</div>
          <div className="text-sm text-muted-foreground">Jami talabalar</div>
        </div>

        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <BookOpen className="w-5 h-5 text-secondary" />
            <span className="text-xs text-muted-foreground">Mavzular</span>
          </div>
          <div className="text-2xl text-foreground mb-1">{totalTopics}</div>
          <div className="text-sm text-muted-foreground">Jami mavzular</div>
        </div>

        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <ClipboardList className="w-5 h-5 text-success" />
            <span className="text-xs text-muted-foreground">Testlar</span>
          </div>
          <div className="text-2xl text-foreground mb-1">{totalTests}</div>
          <div className="text-sm text-muted-foreground">Jami testlar</div>
        </div>

        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-5 h-5 text-warning" />
            <span className="text-xs text-muted-foreground">Faol</span>
          </div>
          <div className="text-2xl text-foreground mb-1">{activeTests}</div>
          <div className="text-sm text-muted-foreground">Faol testlar</div>
        </div>

        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Ball</span>
          </div>
          <div className="text-2xl text-foreground mb-1">{averageScore ? `${averageScore}%` : '0%'}</div>
          <div className="text-sm text-muted-foreground">O'rtacha ball</div>
        </div>

        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <Calendar className="w-5 h-5 text-secondary" />
            <span className="text-xs text-muted-foreground">Bugun</span>
          </div>
          <div className="text-2xl text-foreground mb-1">{todayParticipants}</div>
          <div className="text-sm text-muted-foreground">Bugungi ishtirokchilar</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Student Performance Chart */}
        <div className="bg-card rounded-[14px] p-6 border border-border">
          <h3 className="text-foreground mb-6">Talabalar natijalari</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e2535',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f9cf9"
                strokeWidth={3}
                dot={{ fill: '#4f9cf9', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Test Activity Chart */}
        <div className="bg-card rounded-[14px] p-6 border border-border">
          <h3 className="text-foreground mb-6">Test faolligi</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e2535',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="tests" fill="#7c5fe6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-card rounded-[14px] p-6 border border-border">
        <h3 className="text-foreground mb-6">So'nggi faollik</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground">Talaba</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Mavzu</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Ball</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Sana</th>
                <th className="text-left py-3 px-4 text-muted-foreground">Holat</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity) => (
                <tr key={activity.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-foreground">{activity.studentName}</td>
                  <td className="py-4 px-4 text-foreground">{activity.topicName}</td>
                  <td className="py-4 px-4 text-foreground">{activity.score}%</td>
                  <td className="py-4 px-4 text-muted-foreground">{activity.date}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        activity.status === 'passed'
                          ? 'bg-success/20 text-success'
                          : 'bg-destructive/20 text-destructive'
                      }`}
                    >
                      {activity.status === 'passed' ? 'O\'tdi' : 'O\'tmadi'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
