import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, Award, Home } from 'lucide-react';
import { api } from '../../lib/api';
import type { TestResult } from '../../data/mockData';

export function StudentTestResult() {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    if (!resultId) return;
    api.getResult(resultId).then(setResult).catch(() => navigate('/student'));
  }, [resultId, navigate]);

  if (!result) {
    return <div className="p-8 text-foreground">Natija yuklanmoqda...</div>;
  }

  const percentage = (result.correctAnswers / result.totalQuestions) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <div className="bg-card rounded-[14px] p-12 border border-border text-center">
          <div className="mb-6">
            {result.status === 'passed' ? (
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12 text-success" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-12 h-12 text-destructive" />
              </div>
            )}
          </div>

          <h1 className="text-4xl text-foreground mb-2">
            {result.status === 'passed' ? 'Tabriklaymiz!' : "O'tmadingiz"}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {result.status === 'passed'
              ? 'Siz testni muvaffaqiyatli topshirdingiz'
              : "Mashq qiling va qayta urinib ko'ring"}
          </p>

          <div className="relative inline-flex items-center justify-center mb-8">
            <svg width="280" height="280" className="transform -rotate-90">
              <circle cx="140" cy="140" r="120" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
              <circle
                cx="140"
                cy="140"
                r="120"
                fill="none"
                stroke={result.status === 'passed' ? '#22d3a0' : '#ef4444'}
                strokeWidth="20"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl text-foreground mb-2">{result.score}%</span>
              <span className="text-muted-foreground">{result.topicName}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-muted rounded-[10px] p-4">
              <CheckCircle2 className="w-6 h-6 text-success mx-auto mb-2" />
              <div className="text-2xl text-foreground">{result.correctAnswers}</div>
              <div className="text-sm text-muted-foreground">To'g'ri</div>
            </div>
            <div className="bg-muted rounded-[10px] p-4">
              <XCircle className="w-6 h-6 text-destructive mx-auto mb-2" />
              <div className="text-2xl text-foreground">{result.wrongAnswers}</div>
              <div className="text-sm text-muted-foreground">Noto'g'ri</div>
            </div>
            <div className="bg-muted rounded-[10px] p-4">
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl text-foreground">{result.timeUsed}</div>
              <div className="text-sm text-muted-foreground">Vaqt</div>
            </div>
          </div>

          {result.status === 'passed' && (
            <div className="flex items-center justify-center gap-2 bg-warning/20 text-warning px-4 py-3 rounded-[10px] mb-8">
              <Award className="w-5 h-5" />
              <span>Ajoyib natija! Davom eting</span>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/student')}
              className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3.5 rounded-[10px] transition-all"
            >
              <Home className="w-5 h-5" />
              Bosh sahifa
            </button>
            <button
              onClick={() => navigate('/student/my-results')}
              className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-3.5 rounded-[10px] transition-all"
            >
              Barcha natijalar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
