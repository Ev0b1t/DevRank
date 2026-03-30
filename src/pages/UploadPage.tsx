import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import { Upload, Code, User, FileText, ArrowLeft } from 'lucide-react';

export default function UploadPage() {
  const [name, setName] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [cvText, setCvText] = useState('');
  const [vacancyDescription, setVacancyDescription] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (githubUrl.trim()) {
        formData.append('github_url', githubUrl.trim());
      }
      if (vacancyDescription.trim()) {
        formData.append('vacancy_description', vacancyDescription.trim());
      }
      if (cvFile) {
        formData.append('cv_file', cvFile);
      } else {
        formData.append('cv_text', cvText);
      }

      await api.upload(formData);
      navigate('/candidates');
    } catch {
      alert('Error uploading candidate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page">
      <div className="app-container" style={{ maxWidth: 760 }}>
        <Link to="/" className="app-back">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <header className="mb-12">
          <h1 className="app-title">Analyze Candidate</h1>
          <p className="app-subtitle">Provide candidate details and CV to start the AI-driven ranking process.</p>
        </header>

        <form onSubmit={handleSubmit} className="app-card space-y-8 p-8">
          <div className="app-field">
            <label className="app-label">
              <User size={16} /> Full Name
            </label>
            <input
              type="text"
              required
              className="app-input"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="app-field">
            <label className="app-label">
              <Code size={16} /> GitHub URL
            </label>
            <input
              type="url"
              className="app-input"
              placeholder="https://github.com/username"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
            />
          </div>

          <div className="app-field">
            <label className="app-label">
              <FileText size={16} /> Vacancy Description (optional)
            </label>
            <textarea
              className="app-textarea h-28"
              placeholder="Paste target role description to improve vacancy match scoring..."
              value={vacancyDescription}
              onChange={(e) => setVacancyDescription(e.target.value)}
            />
          </div>

          <div className="app-field">
            <label className="app-label">
              <FileText size={16} /> CV Content
            </label>
            <div className="space-y-4">
              <textarea
                className="app-textarea h-40"
                placeholder="Paste CV text here..."
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                disabled={!!cvFile}
              />
              <div className="flex items-center gap-4">
                <span className="text-[var(--text-muted)] text-sm">OR</span>
                <label className="app-btn app-btn-secondary cursor-pointer inline-flex items-center gap-2">
                  <Upload size={16} /> {cvFile ? cvFile.name : 'Upload PDF'}
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  />
                </label>
                {cvFile && (
                  <button type="button" onClick={() => setCvFile(null)} className="text-sm text-[var(--danger)]">Remove</button>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="app-btn app-btn-primary w-full py-4 disabled:opacity-60"
          >
            {loading ? 'Processing...' : 'Run Analysis'}
          </button>
        </form>
      </div>
    </div>
  );
}
