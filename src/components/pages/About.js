import React from "react";
import "./About.css";

const services = [
  {
    icon: "🎨",
    title: "Brand Identity",
    desc: "Logos, palettes & typography that make your brand unforgettable.",
  },
  {
    icon: "🖥️",
    title: "UI / UX Design",
    desc: "Clean, intuitive interfaces built around real user needs.",
  },
  {
    icon: "📸",
    title: "Photography",
    desc: "Capturing moments and stories with a creative eye.",
  },
  {
    icon: "✏️",
    title: "Illustration",
    desc: "Custom illustrations that bring ideas to life.",
  },
  {
    icon: "🎬",
    title: "Motion & Video",
    desc: "Dynamic motion graphics and video editing for any medium.",
  },
  {
    icon: "📐",
    title: "Print Design",
    desc: "Posters, brochures and packaging with precision and style.",
  },
];

const skills = [
  { label: "Adobe Photoshop", pct: 92 },
  { label: "Adobe Illustrator", pct: 88 },
  { label: "Figma / UI Design", pct: 85 },
  { label: "Photography", pct: 80 },
  { label: "Motion Graphics", pct: 74 },
];

function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-text">
          <h1>
            Creative <span>Designer</span>
          </h1>
          <p>
            I'm Chris — a multidisciplinary designer based in Greece with a
            passion for beautiful visuals, thoughtful branding, and compelling
            storytelling. I collaborate with clients worldwide to craft work
            that resonates.
          </p>
        </div>
        <div className="about-avatar-placeholder">🎨</div>
      </section>

      {/* Services */}
      <section className="about-services">
        <h2>What I Do</h2>
        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="about-skills">
        <h2>Skills</h2>
        <div className="skills-list">
          {skills.map((sk) => (
            <div className="skill-item" key={sk.label}>
              <div className="skill-label">
                <span>{sk.label}</span>
                <span>{sk.pct}%</span>
              </div>
              <div className="skill-track">
                <div className="skill-fill" style={{ width: `${sk.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
