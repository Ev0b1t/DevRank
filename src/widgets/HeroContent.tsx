import { Link } from "react-router-dom";

export const HeroContent = () => {
  return (
    <>
      <header className="hero">
        <div className="hero__content">
          <span className="hero__badge">
            <span className="hero__badge-dot" />
            SmartHire AI — MVP
          </span>

          <h1>
            Dev<span>Rank</span>
          </h1>

          <p className="hero__description">
            AI assistant for HR teams that analyzes CV&nbsp;+&nbsp;GitHub and
            ranks candidates by objective technical signals — trust, code
            quality, activity, and vacancy match.
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
        </div>

        <div className="hero__side">
          <div className="hero__signal">
            <p className="hero__signal-label">Trust Score</p>
            <div className="hero__signal-bar-track">
              <div className="hero__signal-bar" style={{ width: "82%" }} />
            </div>
            <div className="hero__signal-row">
              <span className="hero__signal-name">CV credibility</span>
              <span className="hero__signal-val">82</span>
            </div>
          </div>

          <div className="hero__signal">
            <p className="hero__signal-label">GitHub Score</p>
            <div className="hero__signal-bar-track">
              <div
                className="hero__signal-bar"
                style={{
                  width: "74%",
                  background: "linear-gradient(90deg, #7b4fd8, #a57bf8)",
                }}
              />
            </div>
            <div className="hero__signal-row">
              <span className="hero__signal-name">Code activity</span>
              <span className="hero__signal-val">74</span>
            </div>
          </div>

          <div className="hero__signal">
            <p className="hero__signal-label">Final Score</p>
            <div className="hero__signal-bar-track">
              <div
                className="hero__signal-bar"
                style={{
                  width: "91%",
                  background: "linear-gradient(90deg, #1d9e75, #5dcaa5)",
                }}
              />
            </div>
            <div className="hero__signal-row">
              <span className="hero__signal-name">Overall rank</span>
              <span className="hero__signal-val">91</span>
            </div>
          </div>
        </div>
      </header>

      <div className="stats">
        <article className="stats__item">
          <p className="stats__value">Trust Score</p>
          <p className="stats__label">
            Detects inflated CVs and missing technical evidence
          </p>
        </article>
        <article className="stats__item">
          <p className="stats__value">GitHub Score</p>
          <p className="stats__label">
            Repository quality, commit history, and real activity
          </p>
        </article>
        <article className="stats__item">
          <p className="stats__value">Final Score</p>
          <p className="stats__label">
            Confidence-aware ranking across all candidates
          </p>
        </article>
      </div>
    </>
  );
};
