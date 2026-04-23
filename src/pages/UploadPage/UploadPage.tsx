import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../api';
import { Upload, Code, User, FileText, ArrowLeft, Sparkles } from 'lucide-react';

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
      if (cvFile) formData.append('cv_file', cvFile);
      else formData.append('cv_text', cvText);
      await api.upload(formData);
      navigate('/candidates');
    } catch {
      alert('Error uploading candidate');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'rgba(6,13,26,0.7)',
    border: '1px solid rgba(255,255,255,0.07)',
    color: '#e2ecff',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const inputFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.08)';
  };
  const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <main
      className="min-h-screen flex items-start justify-center py-16 px-5"
      style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.18) 0%, transparent 60%), #060d1a',
      }}
    >
      {/* Grid texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,179,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full max-w-xl">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 text-[11px] font-bold uppercase tracking-[0.2em] no-underline transition-colors"
          style={{ color: 'rgba(148,163,184,0.5)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#93c5fd')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(148,163,184,0.5)')}
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        {/* Card */}
        <div
          className="rounded-3xl overflow-hidden border"
          style={{
            background: 'rgba(255,255,255,0.025)',
            borderColor: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Card header strip */}
          <div
            className="px-10 pt-10 pb-8"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span
              className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.22em] uppercase border"
              style={{
                background: 'rgba(59,130,246,0.08)',
                borderColor: 'rgba(59,130,246,0.3)',
                color: '#93c5fd',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
              New Analysis
            </span>

            <h1
              className="text-[2rem] font-black leading-none tracking-[-0.05em] mb-2"
              style={{ color: '#f0f6ff' }}
            >
              Analyze Candidate
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.7)' }}>
              Provide candidate details and CV to start the AI-driven ranking process.
            </p>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-10 py-8">

            {/* Row: Name + GitHub */}
            <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <Field label="Full Name" icon={<User size={12} />}>
                <input
                  type="text"
                  required
                  className="w-full h-11 px-4 rounded-xl text-sm"
                  style={{ ...inputStyle, fontSize: '0.875rem' }}
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={inputFocusHandler}
                  onBlur={inputBlurHandler}
                />
              </Field>

              <Field label="GitHub URL" icon={<Code size={12} />}>
                <input
                  type="url"
                  className="w-full h-11 px-4 rounded-xl text-sm"
                  style={{ ...inputStyle, fontSize: '0.875rem' }}
                  placeholder="https://github.com/…"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  onFocus={inputFocusHandler}
                  onBlur={inputBlurHandler}
                />
              </Field>
            </div>

            {/* Vacancy */}
            <Field
              label="Vacancy Description"
              icon={<FileText size={12} />}
              optional
            >
              <textarea
                className="w-full px-4 py-3 rounded-xl text-sm leading-7 resize-vertical"
                style={{ ...inputStyle, minHeight: 96, fontSize: '0.875rem' }}
                placeholder="Paste target role description…"
                value={vacancyDescription}
                onChange={(e) => setVacancyDescription(e.target.value)}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
              />
            </Field>

            {/* CV */}
            <Field label="CV Content" icon={<FileText size={12} />}>
              <textarea
                className="w-full px-4 py-3 rounded-xl text-sm leading-7 resize-vertical"
                style={{
                  ...inputStyle,
                  minHeight: 128,
                  fontSize: '0.875rem',
                  opacity: cvFile ? 0.4 : 1,
                  cursor: cvFile ? 'not-allowed' : 'text',
                }}
                placeholder="Paste CV text here…"
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                disabled={!!cvFile}
                onFocus={inputFocusHandler}
                onBlur={inputBlurHandler}
              />

              {/* OR divider */}
              <div className="flex items-center gap-3 my-1">
                <span className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(148,163,184,0.35)' }}>or</span>
                <span className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>

              {/* File upload */}
              <div className="flex items-center gap-3">
                <label
                  className="inline-flex items-center gap-2 h-10 px-5 rounded-full text-xs font-semibold cursor-pointer transition-all border overflow-hidden"
                  style={{
                    background: 'rgba(59,130,246,0.08)',
                    borderColor: 'rgba(59,130,246,0.25)',
                    color: '#93c5fd',
                    maxWidth: '220px',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.08)')}
                >
                  <Upload size={13} />
                  <span className="truncate">{cvFile ? cvFile.name : 'Upload PDF'}</span>
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
                    className="text-xs font-semibold transition-opacity"
                    style={{ color: '#f87171' }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    Remove
                  </button>
                )}
              </div>
            </Field>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full h-12 rounded-full text-sm font-bold transition-all duration-200 mt-1"
              style={{
                background: loading ? 'rgba(59,130,246,0.4)' : '#3b82f6',
                color: '#fff',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 8px 24px rgba(59,130,246,0.3)',
                transform: 'translateY(0)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 28px rgba(59,130,246,0.45)';
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = loading ? 'none' : '0 8px 24px rgba(59,130,246,0.3)';
              }}
            >
              {loading ? (
                <>
                  <span
                    className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                    style={{ display: 'inline-block' }}
                  />
                  Processing…
                </>
              ) : (
                <>
                  <Sparkles size={15} />
                  Run Analysis
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}

/* ── Small helper ── */
function Field({
  label,
  icon,
  optional,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: 'rgba(148,163,184,0.55)' }}
      >
        {icon}
        {label}
        {optional && (
          <span className="ml-1 normal-case font-normal tracking-normal" style={{ opacity: 0.5 }}>
            optional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}