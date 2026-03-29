import { Link } from 'react-router-dom'
import './landing.css'

export default function Landing() {
  return (
    <main className="landing">
      <div className="landing__container">
        <header className="hero">
          <span className="hero__eyebrow">AI-driven ATS for GitHub</span>
          <h1>Devrank</h1>
          <p className="hero__description">
            A single-page landing experience for an enterprise-grade platform
            that analyzes repositories, evaluates code quality, and translates
            GitHub activity into candidate intelligence.
          </p>
          <div className="hero__actions">
            <a className="button button_primary" href="#contact">
              Request demo
            </a>
            <Link className="button button_secondary" to="/test">
              Test
            </Link>
            <a className="button button_outline" href="#how">
              How it works
            </a>
          </div>
        </header>

        <section className="stats">
          <article className="stats__item">
            <p className="stats__value">GitHub</p>
            <p className="stats__label">Repository and activity scoring</p>
          </article>
          <article className="stats__item">
            <p className="stats__value">AI</p>
            <p className="stats__label">Architecture, tests and commit analysis</p>
          </article>
          <article className="stats__item">
            <p className="stats__value">ATS</p>
            <p className="stats__label">Automated candidate filtering</p>
          </article>
        </section>

        <section id="how" className="section split">
          <div>
            <h2>How Devrank works</h2>
            <p>
              The platform scans GitHub profiles and repositories, extracts key
              signals, and builds a complete developer profile. It is not just a
              resume — it is objective code intelligence.
            </p>
          </div>
          <div className="split__details">
            <p>
              Fast code quality assessment, commit history review, and technology
              risk detection. Designed for recruitment teams, technical hiring,
              and data-driven decision making.
            </p>
          </div>
        </section>

        <section className="section feature-grid">
          <article className="feature-card">
            <h3>Profile intelligence</h3>
            <p>
              Shows candidate strengths, growth opportunities, and coding style.
            </p>
          </article>
          <article className="feature-card">
            <h3>Technical signal</h3>
            <p>
              Evaluates languages, dependencies, test coverage, and CI pipelines.
            </p>
          </article>
          <article className="feature-card">
            <h3>Data-first decisions</h3>
            <p>
              Prioritizes talent based on actual repository evidence.
            </p>
          </article>
        </section>

        <footer id="contact" className="section section_cta">
          <div>
            <p className="section__label">Devrank</p>
            <h2>Serious ATS. Serious GitHub intelligence.</h2>
          </div>
          <a className="button button_primary" href="mailto:team@devrank.ai">
            Get early access
          </a>
        </footer>
      </div>
    </main>
  )
}
