import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './features/landing'
import TestForm from './features/landing/ui/TestForm'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/test" element={<TestForm />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
