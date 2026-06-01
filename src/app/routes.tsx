import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/Login";
import { TeacherDashboard } from "./pages/teacher/Dashboard";
import { TeacherStudents } from "./pages/teacher/Students";
import { TeacherTopics } from "./pages/teacher/Topics";
import { TeacherCreateTest } from "./pages/teacher/CreateTest";
import { TeacherTestManagement } from "./pages/teacher/TestManagement";
import { TeacherResults } from "./pages/teacher/Results";
import { TeacherSettings } from "./pages/teacher/Settings";
import { StudentAvailableTests } from "./pages/student/AvailableTests";
import { StudentTakeTest } from "./pages/student/TakeTest";
import { StudentTestResult } from "./pages/student/TestResult";
import { StudentMyResults } from "./pages/student/MyResults";
import { StudentProfile } from "./pages/student/Profile";
import { TeacherLayout } from "./layouts/TeacherLayout";
import { StudentLayout } from "./layouts/StudentLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/teacher",
    Component: TeacherLayout,
    children: [
      { index: true, Component: TeacherDashboard },
      { path: "students", Component: TeacherStudents },
      { path: "topics", Component: TeacherTopics },
      { path: "create-test", Component: TeacherCreateTest },
      { path: "test-management", Component: TeacherTestManagement },
      { path: "results", Component: TeacherResults },
      { path: "settings", Component: TeacherSettings },
    ],
  },
  {
    path: "/student",
    Component: StudentLayout,
    children: [
      { index: true, Component: StudentAvailableTests },
      { path: "take-test/:topicId", Component: StudentTakeTest },
      { path: "test-result/:resultId", Component: StudentTestResult },
      { path: "my-results", Component: StudentMyResults },
      { path: "profile", Component: StudentProfile },
    ],
  },
]);
