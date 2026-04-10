import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SpotsProvider } from './contexts/SpotsContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import BrowsePage from './pages/BrowsePage'
import MapPage from './pages/MapPage'
import SpotDetailPage from './pages/SpotDetailPage'
import QuickReportPage from './pages/QuickReportPage'
import ReportConfirmPage from './pages/ReportConfirmPage'
import AuthPage from './pages/AuthPage'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/auth" replace />
  return children
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={user ? <Navigate to="/" replace /> : <AuthPage />}
        />
        <Route
          path="/"
          element={<ProtectedRoute><BrowsePage /></ProtectedRoute>}
        />
        <Route
          path="/map"
          element={<ProtectedRoute><MapPage /></ProtectedRoute>}
        />
        <Route
          path="/spots/:spotId"
          element={<ProtectedRoute><SpotDetailPage /></ProtectedRoute>}
        />
        <Route
          path="/spots/:spotId/report"
          element={<ProtectedRoute><QuickReportPage /></ProtectedRoute>}
        />
        <Route
          path="/spots/:spotId/report/confirm"
          element={<ProtectedRoute><ReportConfirmPage /></ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <SpotsProvider>
        <AppRoutes />
      </SpotsProvider>
    </AuthProvider>
  )
}
