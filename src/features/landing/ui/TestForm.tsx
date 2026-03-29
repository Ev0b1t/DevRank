import { Link } from 'react-router-dom'
import './landing.css'

export default function TestForm() {
  return (
    <main className="landing">
      <div className="landing__container">
        <header className="hero">
          <span className="hero__eyebrow">AI-driven ATS for GitHub</span>
          <h1>Devrank test form</h1>
          <p className="hero__description">
            Submit your GitHub profile and get a concise evaluation request in a
            dark, professional layout.
          </p>
        </header>

        <section className="section form-card">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="organization" className="form-label">
                Organization name
              </label>
              <input id="organization" className="form-input" type="text" placeholder="Acme Corp" />
            </div>
            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Role title
              </label>
              <input id="role" className="form-input" type="text" placeholder="Senior Backend Engineer" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="requirements" className="form-label">
              Requirements
            </label>
            <textarea id="requirements" className="form-textarea" rows={5} placeholder="List the key requirements for the role..."></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="experience" className="form-label">
              Required experience
            </label>
            <input id="experience" className="form-input" type="text" placeholder="5+ years in product development" />
          </div>

          <div className="form-footer">
            <button className="button button_primary" type="button">
              Submit request
            </button>
            <Link className="button button_secondary" to="/">
              Back to landing
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
