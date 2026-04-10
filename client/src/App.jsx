import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SpotsProvider } from './contexts/SpotsContext'
import BrowsePage from './pages/BrowsePage'
import MapPage from './pages/MapPage'
import SpotDetailPage from './pages/SpotDetailPage'
import QuickReportPage from './pages/QuickReportPage'
import ReportConfirmPage from './pages/ReportConfirmPage'

export default function App() {
  return (
    <SpotsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BrowsePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/spots/:spotId" element={<SpotDetailPage />} />
          <Route path="/spots/:spotId/report" element={<QuickReportPage />} />
          <Route path="/spots/:spotId/report/confirm" element={<ReportConfirmPage />} />
        </Routes>
      </BrowserRouter>
    </SpotsProvider>
  )
}
