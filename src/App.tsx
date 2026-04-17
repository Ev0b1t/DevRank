import { Routes, Route, Navigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage/UploadPage";
import CandidatesPage from "./pages/CandidatesPage/CandidatesPage";
import CandidateDetailsPage from "./pages/CandidateDetailPage/CandidateDetailsPage";
import "./App.css";
import { Landing } from "./pages/Landing/Landing";
import ProtectedRoute from "./shared/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/candidates/:id" element={<CandidateDetailsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
