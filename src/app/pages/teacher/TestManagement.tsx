import { useCallback, useEffect, useState } from 'react';
import { Edit, Trash2, Lock, Unlock, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Topic } from '../../data/mockData';
import { api } from '../../lib/api';
import { ConfirmDialog } from '../../components/modals/ConfirmDialog';
import { EduDialog } from '../../components/modals/EduDialog';

export function TeacherTestManagement() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Topic | null>(null);
  const [viewTopic, setViewTopic] = useState<Topic | null>(null);

  const loadTopics = useCallback(async () => {
    try {
      setLoading(true);
      setTopics(await api.getTopics());
    } catch {
      toast.error('Mavzularni yuklab bo\'lmadi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  const toggleLock = async (topicId: string) => {
    try {
      const updated = await api.toggleTopicLock(topicId);
      setTopics((prev) => prev.map((t) => (t.id === topicId ? updated : t)));
      toast.success(updated.status === 'unlocked' ? 'Mavzu ochildi' : 'Mavzu qulflandi');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Xatolik');
    }
  };

  const deleteTopic = async () => {
    if (!deleteTarget) return;
    try {
      await api.deleteTopic(deleteTarget.id);
      toast.success('Mavzu o\'chirildi');
      setDeleteTarget(null);
      await loadTopics();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Xatolik');
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Testlarni boshqarish</h1>
        <p className="text-muted-foreground">Barcha test mavzulari va savollarini boshqaring</p>
      </div>

      <div className="bg-card rounded-[14px] border border-border overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-muted-foreground">Yuklanmoqda...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left py-4 px-6 text-muted-foreground">Mavzu nomi</th>
                  <th className="text-left py-4 px-6 text-muted-foreground">Savollar</th>
                  <th className="text-left py-4 px-6 text-muted-foreground">Yaratilgan sana</th>
                  <th className="text-left py-4 px-6 text-muted-foreground">Holat</th>
                  <th className="text-left py-4 px-6 text-muted-foreground">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => (
                  <tr
                    key={topic.id}
                    className="border-t border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-6 text-foreground">{topic.name}</td>
                    <td className="py-4 px-6 text-foreground">{topic.questions.length}</td>
                    <td className="py-4 px-6 text-muted-foreground">{topic.createdDate}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          topic.status === 'unlocked'
                            ? 'bg-success/20 text-success'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {topic.status === 'unlocked' ? '🔓 Ochiq' : '🔒 Qulflangan'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewTopic(topic)}
                          title="Savollarni ko'rish"
                          className="p-2 hover:bg-muted rounded-[8px] transition-colors text-primary"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          title="Tahrirlash"
                          className="p-2 hover:bg-muted rounded-[8px] transition-colors text-secondary opacity-50 cursor-not-allowed"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleLock(topic.id)}
                          title={topic.status === 'unlocked' ? 'Qulflash' : 'Ochish'}
                          className="p-2 hover:bg-muted rounded-[8px] transition-colors text-warning"
                        >
                          {topic.status === 'unlocked' ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Unlock className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => setDeleteTarget(topic)}
                          title="O'chirish"
                          className="p-2 hover:bg-muted rounded-[8px] transition-colors text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <EduDialog
        open={!!viewTopic}
        onOpenChange={(open) => !open && setViewTopic(null)}
        title={viewTopic?.name ?? 'Savollar'}
        description={`${viewTopic?.questions.length ?? 0} ta savol`}
        className="sm:max-w-lg"
      >
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {viewTopic?.questions.map((q, i) => (
            <div key={q.id} className="p-4 bg-muted rounded-[10px]">
              <p className="text-sm text-muted-foreground mb-1">Savol {i + 1}</p>
              <p className="text-foreground">{q.questionText}</p>
              {q.options && (
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {q.options.map((opt, j) => (
                    <li key={j} className={opt === q.correctAnswer ? 'text-success' : ''}>
                      {String.fromCharCode(65 + j)}. {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </EduDialog>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Mavzuni o'chirish"
        description={`"${deleteTarget?.name}" mavzusini o'chirishni tasdiqlaysizmi?`}
        confirmLabel="O'chirish"
        onConfirm={deleteTopic}
      />
    </div>
  );
}
