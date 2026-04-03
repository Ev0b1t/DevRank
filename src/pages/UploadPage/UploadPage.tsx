import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../api';
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
    <main className="min-h-screen flex items-start justify-center py-16 px-5 bg-linear-to-b from-blue-500/20 via-transparent to-transparent">
      <div className="w-full max-w-xl px-14 py-14 border border-slate-600/50 rounded-3xl bg-slate-900/50 shadow-2xl">

        <Link to="/" className="inline-flex items-center gap-2 mb-10 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-200 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <header className="mb-10">
          <span className="inline-block mb-3.5 text-sm font-bold uppercase tracking-wider text-slate-400">New Analysis</span>
          <h1 className="m-0 mb-2.5 text-3xl font-bold leading-tight tracking-tight text-blue-50">Analyze Candidate</h1>
          <p className="m-0 text-sm text-slate-400 leading-relaxed">
            Provide candidate details and CV to start the AI-driven ranking process.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-9 border border-slate-700/50 rounded-2xl bg-white/2">

          <div className="grid grid-cols-2 gap-5 md:grid-cols-1">
            <div className="flex flex-col gap-2.5">
              <label className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                <User size={13} /> Full Name
              </label>
              <input
                type="text"
                required
                className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm placeholder-slate-500 placeholder-opacity-50 outline-none focus:border-slate-600 transition-colors"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <label className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Code size={13} /> GitHub URL
              </label>
              <input
                type="url"
                className="w-full h-12 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm placeholder-slate-500 placeholder-opacity-50 outline-none focus:border-slate-600 transition-colors"
                placeholder="https://github.com/username"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              <FileText size={13} /> Vacancy Description
              <span className="text-xs font-normal tracking-widest text-slate-400 opacity-55 lowercase ml-1">optional</span>
            </label>
            <textarea
              className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm leading-7 resize-vertical placeholder-slate-500 placeholder-opacity-50 outline-none focus:border-slate-600 transition-colors"
              style={{ minHeight: 100 }}
              placeholder="Paste target role description to improve vacancy match scoring..."
              value={vacancyDescription}
              onChange={(e) => setVacancyDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <label className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              <FileText size={13} /> CV Content
            </label>
            <textarea
              className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm leading-7 resize-vertical placeholder-slate-500 placeholder-opacity-50 outline-none focus:border-slate-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ minHeight: 140 }}
              placeholder="Paste CV text here..."
              value={cvText}
              onChange={(e) => setCvText(e.target.value)}
              disabled={!!cvFile}
            />
            <div className="flex items-center gap-3 my-1">
              <span className="flex-1 h-px bg-slate-700/50" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 opacity-50">or</span>
              <span className="flex-1 h-px bg-slate-700/50" />
            </div>
            <div className="flex items-center gap-3.5">
              <label className="inline-flex items-center gap-2 h-11 px-5 rounded-full text-xs font-semibold cursor-pointer bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-750 transition-colors max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                <Upload size={14} />
                {cvFile ? cvFile.name : 'Upload PDF'}
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                />
              </label>
              {cvFile && (
                <button
                  type="button"
                  onClick={() => setCvFile(null)}
                  className="text-xs font-semibold text-red-400 bg-none border-none cursor-pointer p-0 hover:opacity-70 transition-opacity"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full min-h-13 rounded-full text-base font-bold tracking-wide cursor-pointer border-none bg-blue-600 text-blue-50 shadow-lg hover:shadow-xl hover:enabled:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-2"
          >
            {loading ? 'Processing…' : 'Run Analysis'}
          </button>

        </form>
      </div>
    </main>
  );
}