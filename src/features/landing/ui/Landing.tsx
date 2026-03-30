import { Link } from 'react-router-dom'
import './landing.css'

export default function Landing() {
  return (
    <main className="landing">
      <div className="landing__container">
        <header className="hero">
          <span className="hero__eyebrow">SmartHire AI MVP</span>
          <h1>DevRank</h1>
          <p className="hero__description">
            AI assistant for HR teams that analyzes CV + GitHub and ranks
            candidates by objective technical signals: trust, code quality,
            activity, and vacancy match.
          </p>
          <div className="hero__actions">
            <a className="button button_primary" href="#contact">
              Request demo
            </a>
            <Link className="button button_secondary" to="/candidates">
              Dashboard
            </Link>
            <Link className="button button_outline" to="/upload">
              Analyze CV
            </Link>
          </div>
        </header>

        <section className="stats">
          <article className="stats__item">
            <p className="stats__value">Trust Score</p>
            <p className="stats__label">Detects inflated CV and lack of details</p>
          </article>
          <article className="stats__item">
            <p className="stats__value">GitHub Score</p>
            <p className="stats__label">Repository quality and activity evidence</p>
          </article>
          <article className="stats__item">
            <p className="stats__value">Final Score</p>
            <p className="stats__label">Confidence-aware candidate ranking</p>
          </article>
        </section>

        <section id="how" className="section split">
          <div>
            <h2>How DevRank works</h2>
            <p>
              HR uploads CV, adds optional GitHub URL, and starts analysis. The
              system runs CV + GitHub scoring in background and returns ranked
              candidates with clear metrics.
            </p>
          </div>
          <div className="split__details">
            <p>
              MVP is LLM-agnostic: provider is selected by config and protected
              with structured JSON parsing and fallback logic, so analysis does
              not crash when external AI services are unavailable.
            </p>
          </div>
        </section>

        <section className="section feature-grid">
          <article className="feature-card">
            <h3>Candidate profile intelligence</h3>
            <p>
              Summarizes strengths, risk signals, and confidence level in one card.
            </p>
          </article>
          <article className="feature-card">
            <h3>Objective technical signal</h3>
            <p>
              Uses GitHub metadata and activity to validate real-world experience.
            </p>
          </article>
          <article className="feature-card">
            <h3>Faster hiring decisions</h3>
            <p>
              Compares candidates by score and opens details for quick shortlist.
            </p>
          </article>
        </section>

        <footer id="contact" className="section section_cta">
          <div>
            <p className="section__label">DevRank</p>
            <h2>AI-assisted recruiting with transparent scoring.</h2>
          </div>
          <a className="button button_primary" href="mailto:team@devrank.ai">
            Get early access
          </a>
        </footer>
      </div>
    </main>
  )
}
