import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import BooksPage from './pages/BooksPage';
import AllBooksPage from './pages/AllBooksPage';
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
                <div className="min-h-screen bg-[#f8f9fb] dark:bg-[#0c0e14]">
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 3000,
                      style: {
                        background: '#fff',
                        color: '#1a1d26',
                        border: '1px solid #edeef1',
                        borderRadius: '12px',
                        fontSize: '13px',
                        padding: '12px 16px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        fontWeight: 500,
                      },
                    }}
                  />
                  <Sidebar />
                  <div className="main-content flex flex-col min-h-screen">
                    <TopBar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<BooksPage />} />
                        <Route path="/books" element={<AllBooksPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </main>
                  </div>
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
