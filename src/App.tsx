import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './features/landing'
import TestForm from './features/landing/ui/TestForm'
import UploadPage from './pages/UploadPage'
import CandidatesPage from './pages/CandidatesPage'
import CandidateDetailsPage from './pages/CandidateDetailsPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/candidates" element={<CandidatesPage />} />
      <Route path="/candidates/:id" element={<CandidateDetailsPage />} />
      <Route path="/test" element={<TestForm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
