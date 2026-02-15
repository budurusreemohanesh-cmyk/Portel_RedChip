import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Tasks from './pages/Tasks';
import Submissions from './pages/Submissions';
import Leaderboard from './pages/Leaderboard';
import Problems from './pages/Problems';
import Resources from './pages/Resources';
import Networking from './pages/Networking';
import Profile from './pages/Profile';
import Mentors from './pages/Mentors';
import Certificates from './pages/Certificates';

// Layout component for authenticated pages
const AuthenticatedLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen relative">
       {/* Global Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]"></div>
      </div>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-primary/10 glass z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shadow-neon">
            <span className="material-icons text-white text-lg">code</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Inno<span className="text-primary">Hacks</span> 2.0
          </h1>
        </div>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <span className="material-icons text-2xl">menu</span>
        </button>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 min-w-0 pt-16 lg:pt-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Team />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Tasks />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submissions"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Submissions />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Leaderboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Problems />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Resources />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/networking"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Networking />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Profile />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentors"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Mentors />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Certificates />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </AnimatePresence>
  );
};

// Main App component
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
