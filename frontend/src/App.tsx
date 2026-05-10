import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import BooksPage from './pages/BooksPage';
import BookFormPage from './pages/BookFormPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
        
          <Route path="/login" element={<LoginPage />} />

       
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative selection:bg-indigo-500/30">
                  {/* Background Gradients */}
                  <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-100/50 via-purple-100/30 to-transparent dark:from-indigo-900/20 dark:via-purple-900/10 -z-10 pointer-events-none" />
                  <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute top-48 -right-24 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                  <Toaster position="bottom-right" />
                  <Navbar />

                  <main className="flex-1 w-full max-w-7xl mx-auto relative z-10">
                    <Routes>
                      <Route path="/" element={<BooksPage />} />
                      <Route path="/books/new" element={<BookFormPage />} />
                      <Route path="/books/edit/:id" element={<BookFormPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

