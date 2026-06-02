export interface Student {
  id: string;
  fullName: string;
  username: string;
  password: string;
  createdDate: string;
  totalTests: number;
  averageScore: number;
  status: 'active' | 'inactive';
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'open-answer';
  questionText: string;
  options?: string[];
  correctAnswer: string;
}

export interface Topic {
  id: string;
  name: string;
  questions: Question[];
  createdDate: string;
  status: 'locked' | 'unlocked';
}

export interface TestResult {
  id: string;
  studentId: string;
  studentName: string;
  topicId: string;
  topicName: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  totalQuestions: number;
  timeUsed: string;
  date: string;
  status: 'passed' | 'failed';
  submittedAnswers?: Record<string, string>;
  questionBreakdown?: Array<{
    questionId: string;
    questionText: string;
    type: 'multiple-choice' | 'open-answer';
    options?: string[];
    submittedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean | null;
  }>;
}

export const mockStudents: Student[] = [
  {
    id: '1',
    fullName: 'Dilnoza Karimova',
    username: 'dilnoza.k',
    password: 'pass123',
    createdDate: '2026-03-15',
    totalTests: 12,
    averageScore: 87.5,
    status: 'active',
  },
  {
    id: '2',
    fullName: 'Bekzod Mirziyoyev',
    username: 'bekzod.m',
    password: 'pass123',
    createdDate: '2026-03-18',
    totalTests: 15,
    averageScore: 92.3,
    status: 'active',
  },
  {
    id: '3',
    fullName: 'Nigora Rahimova',
    username: 'nigora.r',
    password: 'pass123',
    createdDate: '2026-03-20',
    totalTests: 10,
    averageScore: 78.4,
    status: 'active',
  },
  {
    id: '4',
    fullName: 'Jasur Toshmatov',
    username: 'jasur.t',
    password: 'pass123',
    createdDate: '2026-04-02',
    totalTests: 8,
    averageScore: 85.6,
    status: 'active',
  },
  {
    id: '5',
    fullName: 'Madina Yusupova',
    username: 'madina.y',
    password: 'pass123',
    createdDate: '2026-04-05',
    totalTests: 11,
    averageScore: 89.2,
    status: 'inactive',
  },
];

export const mockTopics: Topic[] = [
  {
    id: '1',
    name: 'React bilan tanishuv',
    createdDate: '2026-05-10',
    status: 'unlocked',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        questionText: 'React nima?',
        options: [
          'Foydalanuvchi interfeyslarini yaratish uchun JavaScript kutubxonasi',
          'Dasturlash tili',
          'Ma\'lumotlar bazasini boshqarish tizimi',
          'Operatsion tizim',
        ],
        correctAnswer: 'Foydalanuvchi interfeyslarini yaratish uchun JavaScript kutubxonasi',
      },
      {
        id: '2',
        type: 'multiple-choice',
        questionText: 'JSX qisqartmasi nimani anglatadi?',
        options: [
          'JavaScript XML',
          'Java sintaksis kengaytmasi',
          'JSON kengaytirilgan',
          'JavaScript bajarilishi',
        ],
        correctAnswer: 'JavaScript XML',
      },
      {
        id: '3',
        type: 'open-answer',
        questionText: 'Reactda useState hookining vazifasi nima?',
        correctAnswer: 'Funksional komponentlarga holat boshqaruvini qo\'shish',
      },
    ],
  },
  {
    id: '2',
    name: 'JavaScript asoslari',
    createdDate: '2026-05-12',
    status: 'unlocked',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        questionText: 'JavaScriptda closure (yopilma) nima?',
        options: [
          'Tashqi doiradagi o\'zgaruvchilarga kirish huquqiga ega funksiya',
          'Sikl tuzilmasi',
          'Ma\'lumotlar turi',
          'Xatolarni boshqarish mexanizmi',
        ],
        correctAnswer: 'Tashqi doiradagi o\'zgaruvchilarga kirish huquqiga ega funksiya',
      },
      {
        id: '2',
        type: 'multiple-choice',
        questionText: 'Doimiy o\'zgaruvchini e\'lon qilish uchun qaysi kalit so\'z ishlatiladi?',
        options: ['const', 'let', 'var', 'static'],
        correctAnswer: 'const',
      },
    ],
  },
  {
    id: '3',
    name: 'TypeScript ilg\'or darajasi',
    createdDate: '2026-05-15',
    status: 'locked',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        questionText: 'TypeScriptda generic nima?',
        options: [
          'Tur parametrlari bilan qayta foydalaniladigan komponentlar yaratish usuli',
          'O\'rnatilgan ma\'lumotlar turi',
          'Metod dekoratori',
          'Xato turi',
        ],
        correctAnswer: 'Tur parametrlari bilan qayta foydalaniladigan komponentlar yaratish usuli',
      },
    ],
  },
  {
    id: '4',
    name: 'Veb-dizayn tamoyillari',
    createdDate: '2026-05-18',
    status: 'unlocked',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        questionText: 'UI qisqartmasi nimani anglatadi?',
        options: ['Foydalanuvchi interfeysi', 'Universal kirish', 'Yagona integratsiya', 'Noyob identifikator'],
        correctAnswer: 'Foydalanuvchi interfeysi',
      },
    ],
  },
  {
    id: '5',
    name: 'Ma\'lumotlar bazasini boshqarish',
    createdDate: '2026-05-20',
    status: 'locked',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        questionText: 'SQL nima?',
        options: [
          'Strukturalangan so\'rov tili',
          'Oddiy savol mantig\'i',
          'Ketma-ket so\'rov ro\'yxati',
          'Standart sifat darajasi',
        ],
        correctAnswer: 'Strukturalangan so\'rov tili',
      },
    ],
  },
  {
    id: '6',
    name: 'Node.js asoslari',
    createdDate: '2026-05-22',
    status: 'unlocked',
    questions: [
      {
        id: '1',
        type: 'multiple-choice',
        questionText: 'Node.js nima?',
        options: [
          'Chrome V8 dvigatelida qurilgan JavaScript muhiti',
          'Frontend freymvork',
          'Ma\'lumotlar bazasi',
          'CSS preprocessor',
        ],
        correctAnswer: 'Chrome V8 dvigatelida qurilgan JavaScript muhiti',
      },
    ],
  },
];

export const mockTestResults: TestResult[] = [
  {
    id: '1',
    studentId: '2',
    studentName: 'Bekzod Mirziyoyev',
    topicId: '1',
    topicName: 'React bilan tanishuv',
    score: 95,
    correctAnswers: 19,
    wrongAnswers: 1,
    totalQuestions: 20,
    timeUsed: '15:23',
    date: '2026-05-28',
    status: 'passed',
  },
  {
    id: '2',
    studentId: '1',
    studentName: 'Dilnoza Karimova',
    topicId: '1',
    topicName: 'React bilan tanishuv',
    score: 88,
    correctAnswers: 17,
    wrongAnswers: 3,
    totalQuestions: 20,
    timeUsed: '18:45',
    date: '2026-05-28',
    status: 'passed',
  },
  {
    id: '3',
    studentId: '4',
    studentName: 'Jasur Toshmatov',
    topicId: '2',
    topicName: 'JavaScript asoslari',
    score: 85,
    correctAnswers: 17,
    wrongAnswers: 3,
    totalQuestions: 20,
    timeUsed: '22:10',
    date: '2026-05-29',
    status: 'passed',
  },
  {
    id: '4',
    studentId: '3',
    studentName: 'Nigora Rahimova',
    topicId: '1',
    topicName: 'React bilan tanishuv',
    score: 76,
    correctAnswers: 15,
    wrongAnswers: 5,
    totalQuestions: 20,
    timeUsed: '25:30',
    date: '2026-05-30',
    status: 'passed',
  },
  {
    id: '5',
    studentId: '5',
    studentName: 'Madina Yusupova',
    topicId: '2',
    topicName: 'JavaScript asoslari',
    score: 92,
    correctAnswers: 18,
    wrongAnswers: 2,
    totalQuestions: 20,
    timeUsed: '16:45',
    date: '2026-05-30',
    status: 'passed',
  },
];
