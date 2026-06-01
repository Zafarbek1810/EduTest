import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes';

export default function App() {
  return (
    <div className="dark">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" theme="dark" richColors />
      </AuthProvider>
    </div>
  );
}