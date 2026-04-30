import React from "react";
import {
  IDENTITY_MODE,
  KONAMI_MODE,
  PROJECT_MODE,
  TERMINAL_MODE,
} from "../hooks/useEasterEggs";
import "./EasterEggOverlay.css";

const TERMINAL_LINES = [
  "Initializing CM system...",
  "Loading React architecture...",
  "Syncing design layer...",
  "Engineering mode enabled.",
  "Where Design Meets Engineering.",
];

const KONAMI_CHIPS = [
  "React",
  "TypeScript",
  "APIs",
  "Clean Code",
  "UX",
  "Refactoring",
  "Systems",
];

function IdentityOverlay() {
  return (
    <div
      className="easter-overlay easter-overlay--identity"
      role="dialog"
      aria-modal="false"
      aria-label="CM Identity unlocked"
    >
      <section className="easter-identity-card">
        <span className="easter-identity-card__mark" aria-hidden="true">
          CM
        </span>
        <p className="easter-identity-card__eyebrow">CM Identity unlocked.</p>
        <h2>Christos Michalopoulos</h2>
        <p className="easter-identity-card__role">Full Stack Engineer</p>
        <p className="easter-identity-card__stack">
          React / TypeScript / APIs / Product Systems
        </p>
        <p className="easter-identity-card__location">Patras, Greece</p>
      </section>
    </div>
  );
}

function TerminalOverlay() {
  return (
    <div
      className="easter-overlay easter-overlay--terminal"
      role="dialog"
      aria-modal="false"
      aria-label="CM Terminal Mode"
    >
      <div className="easter-terminal">
        <div className="easter-terminal__bar" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="easter-terminal__body">
          {TERMINAL_LINES.map((line, index) => (
            <p key={line} style={{ "--line-index": index }}>
              <span className="easter-terminal__prompt">&gt;</span>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function KonamiOverlay() {
  return (
    <div
      className="easter-overlay easter-overlay--konami"
      role="status"
      aria-live="polite"
      aria-label="Developer mode unlocked"
    >
      <section className="easter-konami-card">
        <p>Legacy bugs defeated.</p>
        <h2>Developer mode unlocked.</h2>
        <div className="easter-konami-card__chips" aria-hidden="true">
          {KONAMI_CHIPS.map((chip, index) => (
            <span key={chip} style={{ "--chip-index": index }}>
              {chip}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

function EasterEggOverlay({ activeMode }) {
  if (!activeMode) {
    return null;
  }

  if (activeMode === PROJECT_MODE) {
    return (
      <div className="easter-toast" role="status" aria-live="polite">
        Good choice. Project mode initialized.
      </div>
    );
  }

  if (activeMode === IDENTITY_MODE) {
    return <IdentityOverlay />;
  }

  if (activeMode === TERMINAL_MODE) {
    return <TerminalOverlay />;
  }

  if (activeMode === KONAMI_MODE) {
    return <KonamiOverlay />;
  }

  return null;
}

export default EasterEggOverlay;
