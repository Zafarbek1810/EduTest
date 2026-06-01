import { useCallback, useEffect, useState } from 'react';
import { Lock, Unlock, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { Topic } from '../../data/mockData';
import { api } from '../../lib/api';

export function TeacherTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);

  const loadTopics = useCallback(async () => {
    try {
      setTopics(await api.getTopics());
    } catch {
      toast.error('Mavzularni yuklab bo\'lmadi');
    }
  }, []);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  const toggleLock = async (topicId: string) => {
    try {
      const updated = await api.toggleTopicLock(topicId);
      setTopics((prev) => prev.map((t) => (t.id === topicId ? updated : t)));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Xatolik');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Test mavzulari</h1>
        <p className="text-muted-foreground">Test mavzularini va ularning mavjudligini boshqaring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={`relative bg-card rounded-[14px] p-6 border transition-all hover:shadow-lg ${
              topic.status === 'unlocked'
                ? 'border-primary shadow-lg shadow-primary/10'
                : 'border-border opacity-80'
            }`}
          >
            {topic.status === 'locked' && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-[14px] flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Qulflangan</p>
                </div>
              </div>
            )}

            <div
              className={`w-12 h-12 rounded-[10px] flex items-center justify-center mb-4 ${
                topic.status === 'unlocked' ? 'bg-primary/20' : 'bg-muted'
              }`}
            >
              <BookOpen
                className={`w-6 h-6 ${topic.status === 'unlocked' ? 'text-primary' : 'text-muted-foreground'}`}
              />
            </div>

            <h3 className="text-lg text-foreground mb-2">{topic.name}</h3>
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <span>{topic.questions.length} ta savol</span>
              <span>{topic.createdDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  topic.status === 'unlocked'
                    ? 'bg-success/20 text-success'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {topic.status === 'unlocked' ? '🔓 Ochiq' : '🔒 Qulflangan'}
              </span>

              <button
                onClick={() => toggleLock(topic.id)}
                className={`p-2 rounded-[8px] transition-all ${
                  topic.status === 'unlocked'
                    ? 'hover:bg-destructive/10 text-destructive'
                    : 'hover:bg-success/10 text-success'
                }`}
              >
                {topic.status === 'unlocked' ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <Unlock className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
