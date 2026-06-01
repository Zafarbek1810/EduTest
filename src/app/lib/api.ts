const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '/api';

export type ApiRole = 'teacher' | 'student';

export interface AuthUser {
  id: string;
  username: string;
  fullName: string;
  role: ApiRole;
}

class ApiClient {
  private token: string | null = localStorage.getItem('edutest_token');

  setToken(token: string | null) {
    this.token = token;
    if (token) localStorage.setItem('edutest_token', token);
    else localStorage.removeItem('edutest_token');
  }

  getToken() {
    return this.token;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };
    if (this.token) headers.Authorization = `Bearer ${this.token}`;

    const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
    const json = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(json.message || 'So\'rov bajarilmadi');
    }
    return json.data as T;
  }

  login(username: string, password: string, role: ApiRole) {
    return this.request<{ token: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, role }),
    });
  }

  getStudents() {
    return this.request<import('../data/mockData').Student[]>('/students');
  }

  createStudent(body: { fullName: string; username: string; password: string }) {
    return this.request<import('../data/mockData').Student>('/students', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  updateStudent(id: string, body: Partial<{ fullName: string; username: string; status: 'active' | 'inactive' }>) {
    return this.request<import('../data/mockData').Student>(`/students/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  resetStudentPassword(id: string, password: string) {
    return this.request<void>(`/students/${id}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  }

  deleteStudent(id: string) {
    return this.request<void>(`/students/${id}`, { method: 'DELETE' });
  }

  getTopics() {
    return this.request<import('../data/mockData').Topic[]>('/topics');
  }

  getTopicForTest(id: string) {
    return this.request<{
      id: string;
      name: string;
      questions: Array<{
        id: string;
        type: 'multiple-choice' | 'open-answer';
        questionText: string;
        options?: string[];
      }>;
    }>(`/topics/${id}/test`);
  }

  createTopic(body: {
    name: string;
    status?: 'locked' | 'unlocked';
    questions: Array<{
      type: 'multiple-choice' | 'open-answer';
      questionText: string;
      options?: string[];
      correctAnswer: string;
    }>;
  }) {
    return this.request<import('../data/mockData').Topic>('/topics', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  toggleTopicLock(id: string) {
    return this.request<import('../data/mockData').Topic>(`/topics/${id}/toggle-lock`, {
      method: 'PATCH',
    });
  }

  deleteTopic(id: string) {
    return this.request<void>(`/topics/${id}`, { method: 'DELETE' });
  }

  getResults() {
    return this.request<import('../data/mockData').TestResult[]>('/results');
  }

  getResult(id: string) {
    return this.request<import('../data/mockData').TestResult>(`/results/${id}`);
  }

  submitTest(body: { topicId: string; answers: Record<string, string>; timeUsed: string }) {
    return this.request<import('../data/mockData').TestResult>('/results', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  getTeacherDashboard() {
    return this.request<{
      totalStudents: number;
      totalTopics: number;
      totalTests: number;
      activeTests: number;
      averageScore: number;
      todayParticipants: number;
      recentActivity: Array<{
        id: string;
        studentName: string;
        topicName: string;
        score: number;
        date: string;
        status: 'passed' | 'failed';
      }>;
    }>('/dashboard/teacher');
  }
}

export const api = new ApiClient();
