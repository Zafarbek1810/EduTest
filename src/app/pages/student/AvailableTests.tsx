import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, BookOpen, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Topic } from '../../data/mockData';
import { api } from '../../lib/api';

export function StudentAvailableTests() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    api
      .getTopics()
      .then(setTopics)
      .catch(() => toast.error('Testlarni yuklab bo\'lmadi'));
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Mavjud testlar</h1>
        <p className="text-muted-foreground">Boshlash uchun testni tanlang</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`relative bg-card rounded-[14px] p-6 border transition-all ${
              topic.status === 'unlocked'
                ? 'border-primary hover:shadow-xl hover:shadow-primary/20 hover:scale-105 cursor-pointer'
                : 'border-border opacity-60'
            }`}
            onClick={() => {
              if (topic.status === 'unlocked') {
                navigate(`/student/take-test/${topic.id}`);
              }
            }}
          >
            {topic.status === 'locked' && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm rounded-[14px] flex items-center justify-center z-10">
                <div className="text-center">
                  <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Qulflangan</p>
                </div>
              </div>
            )}

            <div
              className={`w-14 h-14 rounded-[12px] flex items-center justify-center mb-4 ${
                topic.status === 'unlocked'
                  ? 'bg-gradient-to-br from-primary to-secondary'
                  : 'bg-muted'
              }`}
            >
              <BookOpen className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-xl text-foreground mb-2">{topic.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{topic.questions.length} ta savol</p>

            {topic.status === 'unlocked' && (
              <button className="flex items-center justify-between w-full bg-primary/10 hover:bg-primary hover:text-white text-primary py-3 px-4 rounded-[10px] transition-all group">
                <span>Testni boshlash</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
