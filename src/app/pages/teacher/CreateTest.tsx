import { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { api } from '../../lib/api';
import { EduDialog } from '../../components/modals/EduDialog';

type QuestionType = 'multiple-choice' | 'open-answer';

interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  options?: string[];
  correctAnswer: string;
}

export function TeacherCreateTest() {
  const [topicName, setTopicName] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>('multiple-choice');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [publishOpen, setPublishOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveQuestion = () => {
    const normalizedCorrectAnswer =
      questionType === 'open-answer'
        ? (correctAnswer.trim() || '__OPEN_ANSWER__')
        : correctAnswer;

    const newQuestion: Question = {
      id: Date.now().toString(),
      type: questionType,
      questionText,
      options: questionType === 'multiple-choice' ? options : undefined,
      correctAnswer: normalizedCorrectAnswer,
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  const saveTopic = async (publish: boolean) => {
    if (!topicName.trim()) {
      toast.error('Mavzu nomini kiriting');
      return;
    }
    if (questions.length === 0) {
      toast.error('Kamida bitta savol qo\'shing');
      return;
    }
    try {
      setSaving(true);
      await api.createTopic({
        name: topicName,
        status: publish ? 'unlocked' : 'locked',
        questions: questions.map((q) => ({
          type: q.type,
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
        })),
      });
      toast.success(publish ? 'Mavzu nashr qilindi' : 'Mavzu saqlandi');
      setTopicName('');
      setQuestions([]);
      setPublishOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Saqlashda xatolik');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Test yaratish</h1>
        <p className="text-muted-foreground">Savollar bilan yangi test mavzusini yarating</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Topic Name */}
          <div className="bg-card rounded-[14px] p-6 border border-border">
            <label className="block text-sm mb-2 text-foreground">Mavzu nomi</label>
            <input
              type="text"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              placeholder="Mavzu nomini kiriting"
              className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Question Type */}
          <div className="bg-card rounded-[14px] p-6 border border-border">
            <label className="block text-sm mb-3 text-foreground">Savol turi</label>
            <div className="flex gap-3">
              <button
                onClick={() => setQuestionType('multiple-choice')}
                className={`flex-1 py-3 px-4 rounded-[10px] transition-all ${
                  questionType === 'multiple-choice'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Ko'p tanlovli
              </button>
              <button
                onClick={() => setQuestionType('open-answer')}
                className={`flex-1 py-3 px-4 rounded-[10px] transition-all ${
                  questionType === 'open-answer'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Ochiq javob
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-card rounded-[14px] p-6 border border-border">
            <label className="block text-sm mb-2 text-foreground">Savol matni</label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Savolingizni kiriting"
              rows={3}
              className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
            />
          </div>

          {/* Multiple Choice Options */}
          {questionType === 'multiple-choice' && (
            <div className="bg-card rounded-[14px] p-6 border border-border space-y-4">
              <label className="block text-sm text-foreground">Javob variantlari</label>
              {options.map((option, index) => (
                <div key={index}>
                  <label className="block text-xs mb-1 text-muted-foreground">
                    Variant {String.fromCharCode(65 + index)}
                  </label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    placeholder={`${String.fromCharCode(65 + index)} variantini kiriting`}
                    className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              ))}

              <div className="pt-2">
                <label className="block text-sm mb-2 text-foreground">To'g'ri javob</label>
                <select
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                >
                  <option value="">To'g'ri javobni tanlang</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {String.fromCharCode(65 + index)}: {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Open Answer */}
          {questionType === 'open-answer' && (
            <div className="bg-card rounded-[14px] p-6 border border-border">
              <label className="block text-sm mb-2 text-foreground">Namuna javob (ixtiyoriy)</label>
              <textarea
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Xohlasangiz namuna javob kiriting"
                rows={3}
                className="w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary transition-all resize-none"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSaveQuestion}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-[10px] transition-all shadow-lg shadow-secondary/20"
            >
              <Plus className="w-5 h-5" />
              Savolni saqlash
            </button>
            <button
              disabled={saving}
              onClick={() => saveTopic(false)}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-[10px] transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              Mavzuni saqlash
            </button>
            <button
              disabled={saving}
              onClick={() => setPublishOpen(true)}
              className="flex items-center gap-2 bg-success hover:bg-success/90 text-white px-6 py-3 rounded-[10px] transition-all shadow-lg shadow-success/20 disabled:opacity-50"
            >
              Mavzuni nashr qilish
            </button>
          </div>
        </div>

        {/* Right - Preview */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-[14px] p-6 border border-border sticky top-8">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <h3 className="text-foreground">Talaba ko'rinishi</h3>
            </div>

            {questionText ? (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-[10px]">
                  <p className="text-foreground mb-3">{questionText}</p>

                  {questionType === 'multiple-choice' && (
                    <div className="space-y-2">
                      {options.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-card rounded-[8px] border border-border"
                        >
                          <div className="w-5 h-5 rounded-full border-2 border-primary"></div>
                          <span className="text-foreground">{option || `${String.fromCharCode(65 + index)} varianti`}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {questionType === 'open-answer' && (
                    <textarea
                      placeholder="Talaba javobini shu yerga yozadi..."
                      rows={3}
                      className="w-full bg-input-background border border-border rounded-[8px] py-2 px-3 text-foreground placeholder:text-muted-foreground resize-none"
                      disabled
                    />
                  )}
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-8">
                Savol ko'rinishi shu yerda paydo bo'ladi
              </p>
            )}

            {/* Saved Questions */}
            {questions.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm text-foreground mb-3">Saqlangan savollar: {questions.length}</h4>
                <div className="space-y-2">
                  {questions.map((q, index) => (
                    <div key={q.id} className="p-3 bg-muted rounded-[8px] text-sm">
                      <span className="text-muted-foreground">S{index + 1}: </span>
                      <span className="text-foreground">{q.questionText.substring(0, 40)}...</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <EduDialog
        open={publishOpen}
        onOpenChange={setPublishOpen}
        title="Mavzuni nashr qilish"
        description="Nashr qilingan mavzu talabalar uchun ochiq bo'ladi. Davom etasizmi?"
        footer={
          <>
            <button
              onClick={() => setPublishOpen(false)}
              className="px-4 py-2.5 rounded-[10px] bg-muted text-foreground"
            >
              Bekor qilish
            </button>
            <button
              disabled={saving}
              onClick={() => saveTopic(true)}
              className="px-6 py-2.5 rounded-[10px] bg-success text-white hover:bg-success/90"
            >
              Nashr qilish
            </button>
          </>
        }
      >
        <p className="text-muted-foreground text-sm">
          <strong className="text-foreground">{topicName || 'Mavzu'}</strong> — {questions.length} ta savol
        </p>
      </EduDialog>
    </div>
  );
}
