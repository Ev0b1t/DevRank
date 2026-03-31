import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../api';
import { Upload, Code, User, FileText, ArrowLeft } from 'lucide-react';
import './upload.css';

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
      if (githubUrl.trim()) formData.append('github_url', githubUrl.trim());
      if (vacancyDescription.trim()) formData.append('vacancy_description', vacancyDescription.trim());
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
    <main className="upload">
      <div className="upload__container">

        <Link to="/" className="upload__back">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <header className="upload__header">
          <span className="upload__eyebrow">New Analysis</span>
          <h1 className="upload__title">Analyze Candidate</h1>
          <p className="upload__subtitle">
            Provide candidate details and CV to start the AI-driven ranking process.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="upload__form">

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                <User size={13} /> Full Name
              </label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Code size={13} /> GitHub URL
              </label>
              <input
                type="url"
                className="form-input"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <FileText size={13} /> Vacancy Description
              <span className="form-label__opt">optional</span>
            </label>
            <textarea
              className="form-textarea"
              style={{ minHeight: 100 }}
              placeholder="Paste target role description to improve vacancy match scoring..."
              value={vacancyDescription}
              onChange={(e) => setVacancyDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <FileText size={13} /> CV Content
            </label>
            <textarea
              className="form-textarea"
              style={{ minHeight: 140 }}
              placeholder="Paste CV text here..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              disabled={!!cvFile}
            />
            <div className="upload__or">
              <span className="upload__or-line" />
              <span className="upload__or-text">or</span>
              <span className="upload__or-line" />
            </div>
            <div className="upload__file-row">
              <label className="button button_secondary upload__file-btn">
                <Upload size={14} />
                {cvFile ? cvFile.name : 'Upload PDF'}
                <input
                  type="file"
                  accept=".pdf"
                  className="upload__file-input"
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                />
              </label>
              {cvFile && (
                <button
                  type="button"
                  onClick={() => setCvFile(null)}
                  className="upload__remove"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="button button_primary upload__submit"
          >
            {loading ? 'Processing…' : 'Run Analysis'}
          </button>

        </form>
      </div>
    </main>
  );
}