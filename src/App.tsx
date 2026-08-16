import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import BottomNav from './components/layout/BottomNav'
import Home from './pages/Home'
import CheckIn from './pages/CheckIn'
import Journal from './pages/Journal'
import JournalEntryPage from './pages/JournalEntry'
import Me from './pages/Me'
import Us from './pages/Us'
import Comfort from './pages/Comfort'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Patterns from './pages/Patterns'
import SafetySupport from './pages/SafetySupport'
import NotFound from './pages/NotFound'
import { useAuth } from './hooks/useAuth'

function AppRoutes() {
  const { user, loading } = useAuth()
  const location = useLocation()
  const authPages = ['/login', '/register', '/forgot-password']

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[#6E5E7A]">
        <p>Setting up your space...</p>
      </div>
    )
  }

  if (!user && !authPages.includes(location.pathname)) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fffaf5_0%,_#f7f1fa_42%,_#f4ecf9_100%)] text-[#4B3B5A] antialiased">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col bg-transparent shadow-[0_0_0_1px_rgba(139,111,179,0.05)]">
        <main className="flex-1 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:id" element={<JournalEntryPage />} />
            <Route path="/journal/new" element={<JournalEntryPage />} />
            <Route path="/me" element={<Me />} />
            <Route path="/me/patterns" element={<Patterns />} />
            <Route path="/us" element={<Us />} />
            <Route path="/comfort" element={<Comfort />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/safety-support" element={<SafetySupport />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>
        {user && <BottomNav />}
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
