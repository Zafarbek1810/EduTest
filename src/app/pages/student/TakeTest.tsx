import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../../lib/api';
import { ConfirmDialog } from '../../components/modals/ConfirmDialog';

interface TestQuestion {
  id: string;
  type: 'multiple-choice' | 'open-answer';
  questionText: string;
  options?: string[];
}

export function StudentTakeTest() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [topicName, setTopicName] = useState('');
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!topicId) return;
    api
      .getTopicForTest(topicId)
      .then((data) => {
        setTopicName(data.name);
        setQuestions(data.questions);
      })
      .catch(() => {
        toast.error('Test yuklanmadi');
        navigate('/student');
      })
      .finally(() => setLoading(false));
  }, [topicId, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = useCallback(async () => {
    if (!topicId || submitting) return;
    const elapsed = 1800 - timeRemaining;
    const timeUsed = formatTime(elapsed);
    try {
      setSubmitting(true);
      const result = await api.submitTest({ topicId, answers, timeUsed });
      navigate(`/student/test-result/${result.id}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Topshirishda xatolik');
    } finally {
      setSubmitting(false);
      setShowSubmitConfirm(false);
    }
  }, [topicId, answers, timeRemaining, navigate, submitting]);

  useEffect(() => {
    if (loading) return;
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          void handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, handleSubmit]);

  if (loading) {
    return <div className="p-8 text-foreground">Test yuklanmoqda...</div>;
  }

  if (!questions.length) {
    return <div className="p-8 text-foreground">Savollar topilmadi</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-card border-b border-border z-50">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl text-foreground">{topicName}</h1>
            <div className="flex items-center gap-2 bg-destructive/20 text-destructive px-4 py-2 rounded-[10px]">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-mono">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-card rounded-[14px] p-8 border border-border mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white">{currentQuestionIndex + 1}</span>
            </div>
            <span className="text-muted-foreground">{currentQuestionIndex + 1}-savol</span>
          </div>

          <h2 className="text-2xl text-foreground mb-8">{currentQuestion.questionText}</h2>

          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-5 rounded-[10px] border-2 transition-all ${
                    answers[currentQuestion.id] === option
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion.id] === option
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {answers[currentQuestion.id] === option && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-lg text-foreground">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'open-answer' && (
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="Javobingizni shu yerga yozing..."
              rows={6}
              className="w-full bg-input-background border border-border rounded-[10px] py-4 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
            />
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-[10px] border border-border text-foreground hover:bg-muted transition-all disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
            Oldingi
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={() => setShowSubmitConfirm(true)}
              disabled={submitting}
              className="flex items-center gap-2 bg-success hover:bg-success/90 text-white px-8 py-3 rounded-[10px] transition-all shadow-lg shadow-success/20 disabled:opacity-50"
            >
              Testni topshirish
              <CheckCircle2 className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() =>
                setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))
              }
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-[10px] transition-all shadow-lg shadow-primary/20"
            >
              Keyingi
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={showSubmitConfirm}
        onOpenChange={setShowSubmitConfirm}
        title="Testni topshirish"
        description="Javoblaringizni yuborishni tasdiqlaysizmi?"
        confirmLabel={submitting ? 'Yuborilmoqda...' : 'Topshirish'}
        variant="default"
        onConfirm={() => void handleSubmit()}
      />
    </div>
  );
}
