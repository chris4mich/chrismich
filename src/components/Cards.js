import React from "react";
import "./Cards.scss";

const workItems = [
  {
    role: "Frontend Engineer / Full Stack Engineer",
    company: "ERGOLOGIC S.A.",
    date: "Sep 2025 - Present",
    text: "Building scalable web applications with React and TypeScript, focusing on clean architecture, reusable component patterns, complex form-driven UIs, admin tools, API integrations, validation flows, and long-term maintainability.",
    tags: ["React", "TypeScript", "Forms", "Admin Tools", "API Integrations"],
  },
  {
    role: "Full Stack Developer",
    company: "Knowledge SA",
    date: "Mar 2023 - Aug 2025",
    text: "Developed and maintained business web applications using frontend and backend technologies. Worked across React, JavaScript, Node.js, Java, REST APIs, and database-driven systems, collaborating with cross-functional teams to deliver scalable and reliable solutions.",
    tags: ["React", "Node.js", "Java", "REST APIs", "Databases"],
  },
];

function Cards() {
  return (
    <section className="cards">
      <div className="cards__heading">
        <span>Work</span>
        <h2>Selected Work & Experience</h2>
        <p>
          My work focuses on building scalable web applications, complex
          form-driven interfaces, reusable UI systems, and reliable integrations
          between frontend and backend services. I enjoy turning business
          requirements into clean, maintainable, production-ready solutions.
        </p>
      </div>

      <div className="work-grid">
        {workItems.map((item, index) => (
          <article className="work-card" key={item.company}>
            <div className="work-card__index">0{index + 1}</div>
            <div className="work-card__body">
              <p className="work-card__date">{item.date}</p>
              <h3>{item.role}</h3>
              <p className="work-card__company">{item.company}</p>
              <p>{item.text}</p>
              <div className="work-card__tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Cards;
