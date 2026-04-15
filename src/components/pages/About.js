import React from "react";
import "./About.css";

const services = [
  {
    icon: "⚛️",
    title: "Frontend Development",
    desc: "Modern React applications with clean architecture and reusable components.",
  },
  {
    icon: "🧠",
    title: "System Design",
    desc: "Scalable frontend structures and maintainable codebases for complex apps.",
  },
  {
    icon: "🔗",
    title: "API Integration",
    desc: "Connecting frontend systems with backend services efficiently.",
  },
  {
    icon: "⚡",
    title: "Performance Optimization",
    desc: "Improving speed, responsiveness, and user experience.",
  },
  {
    icon: "🧩",
    title: "Component Libraries",
    desc: "Building reusable UI systems and design consistency.",
  },
  {
    icon: "🚀",
    title: "Product Development",
    desc: "From idea to production-ready web applications.",
  },
];

const skills = [
  { label: "React / Frontend", pct: 90 },
  { label: "JavaScript / TypeScript", pct: 88 },
  { label: "UI Architecture", pct: 85 },
  { label: "API Integration", pct: 82 },
  { label: "Performance Optimization", pct: 78 },
];

function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-text">
          <h1>
            Full Stack <span>Engineer</span>
          </h1>
          <p>
            I'm Chris — a Full Stack Engineer based in Greece, specializing in
            modern web applications with React. I build scalable,
            high-performance interfaces and focus on clean architecture,
            reusable components, and intuitive user experiences.
            <br />
            <br />
            I’ve worked on complex business applications involving form
            builders, dynamic data flows, and enterprise-level frontend systems.
            My goal is to deliver products that are reliable, fast, and easy to
            use.
          </p>
        </div>

        <div className="about-avatar-placeholder">💻</div>
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
