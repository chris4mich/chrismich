import React, { useState } from "react";
import "./contact.css";

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setError("");

    const formData = new FormData();
    formData.append("access_key", "bbaa1e19-3051-4608-bae1-91790d4286c4");
    formData.append("from_name", "CM Portfolio");
    formData.append("subject", `Portfolio contact: ${form.subject}`);
    formData.append("name", `${form.firstName} ${form.lastName}`);
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("topic", form.subject);
    formData.append("message", form.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Message could not be sent.");
      }

      setSubmitted(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError("Message could not be sent. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <span className="contact-eyebrow">Contact</span>
        <h2>Let's Build Something Sharp</h2>
        <p className="contact-subtitle">
          I am open to meaningful collaborations, challenging web projects, and
          opportunities where clean engineering, strong UI, and real product
          value matter.
        </p>

        <div className="contact-actions">
          <a className="contact-link contact-link--primary" href="mailto:chrs.mich@gmail.com">
            Contact Me
          </a>
          <a
            className="contact-link"
            href="https://www.linkedin.com/in/christos4michalopoulos/"
            target="_blank"
            rel="noreferrer"
          >
            View LinkedIn
          </a>
          <a
            className="contact-link"
            href="https://github.com/chris4mich"
            target="_blank"
            rel="noreferrer"
          >
            View GitHub
          </a>
        </div>

        <div className="contact-meta">
          <a href="mailto:chrs.mich@gmail.com">chrs.mich@gmail.com</a>
          <a
            href="https://www.linkedin.com/in/christos4michalopoulos/"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/christos4michalopoulos
          </a>
          <a
            href="https://github.com/chris4mich"
            target="_blank"
            rel="noreferrer"
          >
            github.com/chris4mich
          </a>
        </div>

        {submitted ? (
          <p className="form-success">
            Message sent! I'll get back to you soon.
          </p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            {error && <p className="form-error">{error}</p>}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a topic...</option>
                <option value="project">New Project</option>
                <option value="collaboration">Collaboration</option>
                <option value="general">General Enquiry</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
