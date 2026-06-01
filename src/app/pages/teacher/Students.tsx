import { useCallback, useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Student } from '../../data/mockData';
import { api } from '../../lib/api';
import { EduDialog } from '../../components/modals/EduDialog';
import { ConfirmDialog } from '../../components/modals/ConfirmDialog';

const statusLabels: Record<Student['status'], string> = {
  active: 'Faol',
  inactive: 'Nofaol',
};

const inputClass =
  'w-full bg-input-background border border-border rounded-[10px] py-3 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all';

export function TeacherStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [resetStudent, setResetStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [form, setForm] = useState({ fullName: '', username: '', password: '' });
  const [saving, setSaving] = useState(false);

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getStudents();
      setStudents(data);
    } catch {
      toast.error('Talabalarni yuklab bo\'lmadi');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const resetForm = () => setForm({ fullName: '', username: '', password: '' });

  const handleAdd = async () => {
    if (!form.fullName || !form.username || !form.password) {
      toast.error('Barcha maydonlarni to\'ldiring');
      return;
    }
    try {
      setSaving(true);
      await api.createStudent(form);
      toast.success('Talaba qo\'shildi');
      setShowAddModal(false);
      resetForm();
      await loadStudents();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Xatolik');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!editStudent || !form.fullName || !form.username) return;
    try {
      setSaving(true);
      await api.updateStudent(editStudent.id, {
        fullName: form.fullName,
        username: form.username,
      });
      toast.success('Talaba yangilandi');
      setEditStudent(null);
      resetForm();
      await loadStudents();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Xatolik');
    } finally {
      setSaving(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetStudent || !form.password) {
      toast.error('Yangi parolni kiriting');
      return;
    }
    try {
      setSaving(true);
      await api.resetStudentPassword(resetStudent.id, form.password);
      toast.success('Parol yangilandi');
      setResetStudent(null);
      resetForm();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Xatolik');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.deleteStudent(deleteTarget.id);
      toast.success('Talaba o\'chirildi');
      setDeleteTarget(null);
      await loadStudents();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Xatolik');
    }
  };

  const openEdit = (student: Student) => {
    setForm({ fullName: student.fullName, username: student.username, password: '' });
    setEditStudent(student);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl text-foreground mb-2">Talabalarni boshqarish</h1>
        <p className="text-muted-foreground">Talabalaringizni boshqaring va ularning rivojlanishini kuzating</p>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Talabalarni qidirish..."
            className={`${inputClass} pl-12`}
          />
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-[10px] transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-5 h-5" />
          Talaba qo'shish
        </button>
      </div>

      <div className="bg-card rounded-[14px] border border-border overflow-hidden">
        {loading ? (
          <p className="p-8 text-muted-foreground text-center">Yuklanmoqda...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left py-4 px-6 text-muted-foreground">To'liq ism</th>
                  <th className="text-left py-4 px-6 text-muted-foreground">Foydalanuvchi nomi</th>
                  <th className="text-left py-4 px-6 text-muted-foreground">Yaratilgan sana</th>
                  <th className="text-left py-4 px-6 text-muted-foreground">Jami testlar</th>
                  <th className="text-left py-4 px-6 text-muted-foreground">O'rtacha ball</th>
                  <th className="text-left py-4 px-6 text-muted-foreground">Holat</th>
                  <th className="text-left py-4 px-6 text-muted-foreground">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-t border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-6 text-foreground">{student.fullName}</td>
                    <td className="py-4 px-6 text-foreground">{student.username}</td>
                    <td className="py-4 px-6 text-muted-foreground">{student.createdDate}</td>
                    <td className="py-4 px-6 text-foreground">{student.totalTests}</td>
                    <td className="py-4 px-6 text-foreground">{student.averageScore}%</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          student.status === 'active'
                            ? 'bg-success/20 text-success'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {statusLabels[student.status]}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(student)}
                          className="p-2 hover:bg-muted rounded-[8px] transition-colors text-primary"
                          title="Tahrirlash"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setForm({ fullName: '', username: '', password: '' });
                            setResetStudent(student);
                          }}
                          className="p-2 hover:bg-muted rounded-[8px] transition-colors text-secondary"
                          title="Parolni yangilash"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(student)}
                          className="p-2 hover:bg-muted rounded-[8px] transition-colors text-destructive"
                          title="O'chirish"
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
        open={showAddModal}
        onOpenChange={setShowAddModal}
        title="Yangi talaba"
        description="Talaba uchun login ma'lumotlarini kiriting"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2.5 rounded-[10px] bg-muted text-foreground hover:bg-muted/80"
            >
              Bekor qilish
            </button>
            <button
              disabled={saving}
              onClick={handleAdd}
              className="px-6 py-2.5 rounded-[10px] bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
            >
              Saqlash
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-foreground">To'liq ism</label>
            <input
              className={inputClass}
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Masalan: Ali Valiyev"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-foreground">Foydalanuvchi nomi</label>
            <input
              className={inputClass}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="ali.valiyev"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-foreground">Parol</label>
            <input
              type="password"
              className={inputClass}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Kamida 6 belgi"
            />
          </div>
        </div>
      </EduDialog>

      <EduDialog
        open={!!editStudent}
        onOpenChange={(open) => !open && setEditStudent(null)}
        title="Talabani tahrirlash"
        footer={
          <>
            <button
              onClick={() => setEditStudent(null)}
              className="px-4 py-2.5 rounded-[10px] bg-muted text-foreground"
            >
              Bekor qilish
            </button>
            <button
              disabled={saving}
              onClick={handleEdit}
              className="px-6 py-2.5 rounded-[10px] bg-primary text-white hover:bg-primary/90"
            >
              Yangilash
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-foreground">To'liq ism</label>
            <input
              className={inputClass}
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-foreground">Foydalanuvchi nomi</label>
            <input
              className={inputClass}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
        </div>
      </EduDialog>

      <EduDialog
        open={!!resetStudent}
        onOpenChange={(open) => !open && setResetStudent(null)}
        title="Parolni yangilash"
        description={resetStudent ? `${resetStudent.fullName} uchun yangi parol` : ''}
        footer={
          <button
            disabled={saving}
            onClick={handleResetPassword}
            className="px-6 py-2.5 rounded-[10px] bg-secondary text-white hover:bg-secondary/90"
          >
            Parolni saqlash
          </button>
        }
      >
        <input
          type="password"
          className={inputClass}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Yangi parol"
        />
      </EduDialog>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Talabani o'chirish"
        description={`${deleteTarget?.fullName} ni o'chirishni tasdiqlaysizmi? Bu amalni qaytarib bo'lmaydi.`}
        confirmLabel="O'chirish"
        onConfirm={handleDelete}
      />
    </div>
  );
}
