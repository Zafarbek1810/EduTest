import { useEffect, useState } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TestResult } from '../../data/mockData';
import { api } from '../../lib/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';

export function TeacherResults() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);
  const [resultDetails, setResultDetails] = useState<Record<string, TestResult>>({});
  const [topicsCache, setTopicsCache] = useState<
    Record<
      string,
      {
        id: string;
        correctAnswer: string;
        questionText: string;
        type: 'multiple-choice' | 'open-answer';
        options?: string[];
      }[]
    >
  >({});
  const [loadingResultId, setLoadingResultId] = useState<string | null>(null);

  useEffect(() => {
    api.getResults().then(setResults).catch(() => setResults([]));
  }, []);

  const rankedResults = [...results].sort((a, b) => b.score - a.score);

  const performanceByStudent = results.reduce((acc, result) => {
    const existing = acc.find((item) => item.name === result.studentName);
    if (existing) {
      existing.score = (existing.score + result.score) / 2;
    } else {
      acc.push({ name: result.studentName.split(' ')[0], score: result.score });
    }
    return acc;
  }, [] as { name: string; score: number }[]);

  const handleOpenDetails = async (resultId: string) => {
    setSelectedResultId(resultId);
    if (resultDetails[resultId]) return;

    try {
      setLoadingResultId(resultId);
      const detailed = await api.getResult(resultId);

      if (!detailed.questionBreakdown?.length) {
        let topicQuestions = topicsCache[detailed.topicId];

        if (!topicQuestions) {
          const topics = await api.getTopics();
          const topic = topics.find((item) => item.id === detailed.topicId);
          topicQuestions =
            topic?.questions.map((question) => ({
              id: question.id,
              questionText: question.questionText,
              type: question.type,
              options: question.options,
              correctAnswer: question.correctAnswer,
            })) ?? [];

          if (topicQuestions.length) {
            setTopicsCache((prev) => ({ ...prev, [detailed.topicId]: topicQuestions! }));
          }
        }

        if (topicQuestions?.length) {
          const submittedAnswers = detailed.submittedAnswers ?? {};
          const hasSubmittedAnswers = Object.keys(submittedAnswers).length > 0;

          if (hasSubmittedAnswers) {
            detailed.questionBreakdown = topicQuestions.map((question) => {
              const submittedAnswer = submittedAnswers[question.id] ?? '';
              const normalizedSubmitted = submittedAnswer.trim().toLowerCase();
              const normalizedCorrect = question.correctAnswer.trim().toLowerCase();
              const isAnswered = submittedAnswer.trim() !== '';

              return {
                questionId: question.id,
                questionText: question.questionText,
                type: question.type,
                options: question.options,
                submittedAnswer,
                correctAnswer: question.correctAnswer,
                isCorrect: isAnswered ? normalizedSubmitted === normalizedCorrect : null,
              };
            });
          } else {
            const correctCount = Math.max(0, Math.min(detailed.correctAnswers, topicQuestions.length));
            detailed.questionBreakdown = topicQuestions.map((question, idx) => {
              const isCorrect = idx < correctCount;
              return {
                questionId: question.id,
                questionText: question.questionText,
                type: question.type,
                options: question.options,
                submittedAnswer: isCorrect ? question.correctAnswer : "Noto'g'ri javob belgilangan",
                correctAnswer: question.correctAnswer,
                isCorrect,
              };
            });
          }
        }
      }

      setResultDetails((prev) => ({ ...prev, [resultId]: detailed }));
    } catch {
      setSelectedResultId(null);
    } finally {
      setLoadingResultId(null);
    }
  };

  const selectedResult = selectedResultId ? resultDetails[selectedResultId] : null;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Natijalar va reyting</h1>
        <p className="text-muted-foreground">Talabalar natijalari va peshqadamlar jadvalini ko'ring</p>
      </div>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {rankedResults.slice(0, 3).map((result, index) => (
          <div
            key={result.id}
            className={`bg-card rounded-[14px] p-6 border relative overflow-hidden ${
              index === 0
                ? 'border-warning shadow-lg shadow-warning/20'
                : index === 1
                ? 'border-muted-foreground/30'
                : 'border-destructive/30'
            }`}
          >
            <div className="absolute top-4 right-4">
              {index === 0 && <Trophy className="w-8 h-8 text-warning" />}
              {index === 1 && <Medal className="w-8 h-8 text-muted-foreground" />}
              {index === 2 && <Award className="w-8 h-8 text-destructive" />}
            </div>

            <div className="mb-3">
              <div className="text-4xl mb-1">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </div>
              <h3 className="text-xl text-foreground">{result.studentName}</h3>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Ball</span>
                <span className="text-foreground">{result.score}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">To'g'ri</span>
                <span className="text-success">{result.correctAnswers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Noto'g'ri</span>
                <span className="text-destructive">{result.wrongAnswers}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-card rounded-[14px] p-6 border border-border mb-8">
        <h3 className="text-foreground mb-6">Talabalar natijalarini solishtirish</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceByStudent}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e2535',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="score" fill="#4f9cf9" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-card rounded-[14px] border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-foreground">To'liq peshqadamlar jadvali</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left py-4 px-6 text-muted-foreground">O'rin</th>
                <th className="text-left py-4 px-6 text-muted-foreground">Talaba ismi</th>
                <th className="text-left py-4 px-6 text-muted-foreground">Mavzu</th>
                <th className="text-left py-4 px-6 text-muted-foreground">Ball</th>
                <th className="text-left py-4 px-6 text-muted-foreground">To'g'ri</th>
                <th className="text-left py-4 px-6 text-muted-foreground">Noto'g'ri</th>
                <th className="text-left py-4 px-6 text-muted-foreground">Vaqt</th>
                <th className="text-left py-4 px-6 text-muted-foreground">Sana</th>
              </tr>
            </thead>
            <tbody>
              {rankedResults.map((result, index) => (
                <tr
                  key={result.id}
                  className={`border-t border-border hover:bg-muted/50 transition-colors cursor-pointer ${
                    index < 3 ? 'bg-muted/30' : ''
                  }`}
                  onClick={() => void handleOpenDetails(result.id)}
                >
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                        index < 3 ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-foreground">{result.studentName}</td>
                  <td className="py-4 px-6 text-foreground">{result.topicName}</td>
                  <td className="py-4 px-6">
                    <span className="text-lg text-primary">{result.score}%</span>
                  </td>
                  <td className="py-4 px-6 text-success">{result.correctAnswers}</td>
                  <td className="py-4 px-6 text-destructive">{result.wrongAnswers}</td>
                  <td className="py-4 px-6 text-muted-foreground">{result.timeUsed}</td>
                  <td className="py-4 px-6 text-muted-foreground">{result.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={Boolean(selectedResultId)} onOpenChange={(open) => !open && setSelectedResultId(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Topshirilgan javoblar</DialogTitle>
            <DialogDescription>
              {selectedResult
                ? `${selectedResult.studentName} - ${selectedResult.topicName}`
                : 'Tanlangan natija tafsilotlari'}
            </DialogDescription>
          </DialogHeader>

          {selectedResultId && loadingResultId === selectedResultId ? (
            <div className="text-muted-foreground">Javoblar yuklanmoqda...</div>
          ) : (
            <div className="space-y-4">
              {!selectedResult?.questionBreakdown?.length && (
                <div className="text-muted-foreground">Bu test uchun savol kesimida javoblar topilmadi.</div>
              )}
              {selectedResult?.questionBreakdown?.map((question, qIdx) => (
                <div key={question.questionId} className="rounded-[10px] border border-border p-4">
                  <div className="text-foreground mb-2">
                    {qIdx + 1}. {question.questionText}
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    Turi: {question.type === 'multiple-choice' ? 'Yopiq (variantli)' : 'Ochiq (matnli javob)'}
                  </div>
                  <div className="text-sm mb-1">
                    <span className="text-muted-foreground">O'quvchi javobi: </span>
                    <span className="text-foreground">{question.submittedAnswer || 'Javob berilmagan'}</span>
                  </div>
                  <div className="text-sm mb-1">
                    <span className="text-muted-foreground">To'g'ri javob: </span>
                    <span className="text-foreground">{question.correctAnswer}</span>
                  </div>
                  <div
                    className={`text-sm ${
                      question.isCorrect === null
                        ? 'text-muted-foreground'
                        : question.isCorrect
                          ? 'text-success'
                          : 'text-destructive'
                    }`}
                  >
                    {question.isCorrect === null
                      ? "Javob topilmadi"
                      : question.isCorrect
                        ? "To'g'ri belgilangan"
                        : "Noto'g'ri belgilangan"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
