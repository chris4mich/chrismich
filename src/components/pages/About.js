import React from "react";
import "./About.css";

const skills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Java",
  "Spring Boot",
  ".NET",
  "REST APIs",
  "SQL Databases",
  "UI Architecture",
  "Component Systems",
  "Form-driven Applications",
  "API Integrations",
  "Refactoring",
  "Performance Optimization",
];

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-text">
          <span className="about-eyebrow">About Me</span>
          <h2>About Me</h2>
          <div className="about-copy">
            <p>
              I am Christos Michalopoulos, a Full Stack Engineer based in
              Patras, Greece. I build modern web applications with a strong
              focus on React, TypeScript, clean architecture, reusable
              components, and reliable API integrations.
            </p>
            <p>
              My experience combines frontend development, backend logic, REST
              APIs, database-driven systems, and a strong technical background
              in network infrastructure. This gives me a practical, end-to-end
              view of how real systems should be designed, built, connected,
              and maintained.
            </p>
            <p>
              I enjoy transforming complex business logic into simple, clear,
              and maintainable code. I care about user experience, developer
              experience, performance, structure, and writing software that can
              grow without becoming fragile.
            </p>
            <p>
              My goal is to build digital products that feel sharp, responsive,
              useful, and reliable - products where imagination becomes reality
              through solid engineering.
            </p>
          </div>
        </div>

        <div className="about-avatar-card">
          <img
            className="about-avatar-image"
            src="/images/profilep.png"
            alt="Christos Michalopoulos"
            loading="lazy"
            decoding="async"
          />
          <span className="about-avatar-grid" aria-hidden="true" />
          <span className="about-avatar-mark" aria-hidden="true">
            CM
          </span>
        </div>
      </section>

      <section className="about-skills">
        <h2>Skills</h2>
        <div className="skills-cloud">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
