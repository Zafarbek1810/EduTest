import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Target, Clock } from 'lucide-react';
import { TestResult } from '../../data/mockData';
import { api } from '../../lib/api';

const performanceData = [
  { test: 'Test 1', score: 76 },
  { test: 'Test 2', score: 82 },
  { test: 'Test 3', score: 85 },
  { test: 'Test 4', score: 88 },
  { test: 'Test 5', score: 88 },
];

export function StudentMyResults() {
  const [studentResults, setStudentResults] = useState<TestResult[]>([]);

  useEffect(() => {
    api.getResults().then(setStudentResults).catch(() => setStudentResults([]));
  }, []);

  const averageScore =
    studentResults.length > 0
      ? studentResults.reduce((sum, result) => sum + result.score, 0) / studentResults.length
      : 0;
  const totalTests = studentResults.length;
  const bestScore = studentResults.length > 0 ? Math.max(...studentResults.map((r) => r.score)) : 0;
  const totalCorrect = studentResults.reduce((sum, result) => sum + result.correctAnswers, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Mening natijalarim</h1>
        <p className="text-muted-foreground">Natijalaringiz va rivojlanishingizni kuzating</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <Trophy className="w-6 h-6 text-warning" />
            <span className="text-xs text-muted-foreground">Eng yaxshi</span>
          </div>
          <div className="text-3xl text-foreground mb-1">{bestScore}%</div>
          <div className="text-sm text-muted-foreground">Eng yuqori ball</div>
        </div>

        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-6 h-6 text-success" />
            <span className="text-xs text-muted-foreground">O'rtacha</span>
          </div>
          <div className="text-3xl text-foreground mb-1">{averageScore.toFixed(1)}%</div>
          <div className="text-sm text-muted-foreground">O'rtacha ball</div>
        </div>

        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <Target className="w-6 h-6 text-primary" />
            <span className="text-xs text-muted-foreground">To'g'ri</span>
          </div>
          <div className="text-3xl text-foreground mb-1">{totalCorrect}</div>
          <div className="text-sm text-muted-foreground">Jami to'g'ri javoblar</div>
        </div>

        <div className="bg-card rounded-[14px] p-6 border border-border">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-6 h-6 text-secondary" />
            <span className="text-xs text-muted-foreground">Testlar</span>
          </div>
          <div className="text-3xl text-foreground mb-1">{totalTests}</div>
          <div className="text-sm text-muted-foreground">Topshirilgan testlar</div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-card rounded-[14px] p-6 border border-border mb-8">
        <h3 className="text-foreground mb-6">Natijalar dinamikasi</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="test" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" domain={[0, 100]} />
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
              dot={{ fill: '#4f9cf9', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Results Table */}
      <div className="bg-card rounded-[14px] border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-foreground">Testlar tarixi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left py-4 px-6 text-muted-foreground">Mavzu</th>
                <th className="text-left py-4 px-6 text-muted-foreground">Sana</th>
                <th className="text-left py-4 px-6 text-muted-foreground">Ball</th>
                <th className="text-left py-4 px-6 text-muted-foreground">To'g'ri</th>
                <th className="text-left py-4 px-6 text-muted-foreground">Noto'g'ri</th>
                <th className="text-left py-4 px-6 text-muted-foreground">Vaqt</th>
                <th className="text-left py-4 px-6 text-muted-foreground">Holat</th>
              </tr>
            </thead>
            <tbody>
              {studentResults.map((result) => (
                <tr key={result.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-6 text-foreground">{result.topicName}</td>
                  <td className="py-4 px-6 text-muted-foreground">{result.date}</td>
                  <td className="py-4 px-6">
                    <span className="text-lg text-primary">{result.score}%</span>
                  </td>
                  <td className="py-4 px-6 text-success">{result.correctAnswers}</td>
                  <td className="py-4 px-6 text-destructive">{result.wrongAnswers}</td>
                  <td className="py-4 px-6 text-muted-foreground">{result.timeUsed}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        result.status === 'passed'
                          ? 'bg-success/20 text-success'
                          : 'bg-destructive/20 text-destructive'
                      }`}
                    >
                      {result.status === 'passed' ? 'O\'tdi' : 'O\'tmadi'}
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
