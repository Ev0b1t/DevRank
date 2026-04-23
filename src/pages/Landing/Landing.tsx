import { HeroContent } from '../../widgets/HeroContent'
import './landing.css'

export default function Landing() {
  return (
    <main className="landing">
      <div className="landing__container">

        {/* ── HERO ── */}
        <HeroContent/>

        <div className="landing__body">

          {/* ── SCALE ── */}
          <section className="section scale">
            <h2>Scale with confidence</h2>
            <div className="scale__metrics">
              <article className="scale__item">
                <p className="scale__value">5,000+</p>
                <p className="scale__label">Profiles evaluated per month</p>
              </article>
              <article className="scale__item">
                <p className="scale__value">30+</p>
                <p className="scale__label">Enterprise team integrations</p>
              </article>
              <article className="scale__item">
                <p className="scale__value">99.8%</p>
                <p className="scale__label">Uptime for scoring pipeline</p>
              </article>
              <article className="scale__item">
                <p className="scale__value">20+</p>
                <p className="scale__label">Key hiring metrics tracked</p>
              </article>
            </div>
          </section>

          {/* ── TRUST ── */}
          <section className="section trust">
            <h2>Trusted by fast-growing teams</h2>
            <p>
              Used as a core decision layer in hiring workflows, DevRank helps teams
              reduce manual CV screening by 80% and speed up shortlisting significantly.
            </p>
            <div className="trust__logos">
              <span className="trust__logo">💼 FinTech</span>
              <span className="trust__logo">🛠️ DevOps</span>
              <span className="trust__logo">🌐 SaaS</span>
              <span className="trust__logo">🏥 HealthTech</span>
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section id="how" className="section split">
            <div>
              <h2>How DevRank works</h2>
              <p>
                HR uploads a CV, adds an optional GitHub URL, and starts analysis.
                The system runs CV + GitHub scoring in the background and returns
                ranked candidates with clear, auditable metrics.
              </p>
            </div>
            <div className="split__details">
              <p>
                MVP is LLM-agnostic: the provider is selected by config and protected
                with structured JSON parsing and fallback logic, so analysis never
                crashes when external AI services are unavailable.
              </p>
            </div>
          </section>

          {/* ── FEATURES ── */}
          <section className="section feature-grid">
            <article className="feature-card">
              <div className="feature-card__icon">🧠</div>
              <h3>Candidate profile intelligence</h3>
              <p>
                Summarizes strengths, risk signals, and confidence level in one card.
              </p>
            </article>
            <article className="feature-card">
              <div className="feature-card__icon">⚙️</div>
              <h3>Objective technical signal</h3>
              <p>
                Uses GitHub metadata and activity to validate real-world experience.
              </p>
            </article>
            <article className="feature-card">
              <div className="feature-card__icon">⚡</div>
              <h3>Faster hiring decisions</h3>
              <p>
                Compares candidates by score and opens details for quick shortlisting.
              </p>
            </article>
          </section>

          {/* ── CTA ── */}
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
      </div>
    </main>
  )
}