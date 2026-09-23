import { useState } from "react";
import SectionHeading from "../components/SectionHeading";
import Icon from "../components/Icon";

export default function ContactSection({ contact, onNotify }) {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      onNotify("Email address copied.");
    } catch {
      onNotify(`Email me at ${contact.email}`);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get("name")).trim();
    const email = String(values.get("email")).trim();
    const message = String(values.get("message")).trim();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          website: values.get("website"),
        }),
      });
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          "Messaging is unavailable in this preview. Please try the deployed website or email me directly.",
        );
      }
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Message delivery failed.");

      setStatus("sent");
      form.reset();
      onNotify("Message sent. Thank you, I’ll get back to you soon.");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message || "Message delivery failed. Please email me directly.",
      );
      onNotify(
        "The message was not sent. Your text is still here so you can try again.",
      );
    }
  };
  return (
    <section
      id="contact"
      className="section contact-section"
      data-section
      aria-labelledby="contact-title"
    >
      <div className="container">
        <SectionHeading
          number="07"
          subtitle="Make a connection"
          title={
            <span id="contact-title">
              Let's build
              <br />
              something <em>meaningful.</em>
            </span>
          }
        />
        <div className="contact-grid">
          <div className="contact-copy">
            <p className="large-copy">
              A good system starts
              <br />
              with a conversation.
            </p>
            <p>
              Open to Software Engineering and AI/ML opportunities where robust
              backend architecture, automation, and data-driven systems create
              measurable impact.
            </p>
            <div className="email-row">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <button
                className="icon-button"
                aria-label="Copy email address"
                onClick={copyEmail}
              >
                <Icon name={copied ? "check" : "copy"} size={17} />
              </button>
            </div>
            <div className="contact-socials">
              <a
                className="text-link"
                href={contact.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub <Icon name="external" size={17} />
              </a>
              <a
                className="text-link"
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <Icon name="external" size={17} />
              </a>
              <a
                className="text-link"
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
              >
                {contact.phone} <Icon name="external" size={17} />
              </a>
            </div>
            <p className="contact-location mono">
              <span className="tiny-dot" />
              {contact.location}
            </p>
            <div className="contact-circuit" aria-hidden="true">
              <span />
              <i />
              <span />
              <Icon name="mail" size={28} />
            </div>
          </div>
          <form
            className={`contact-form ${status === "sent" ? "draft-ready" : ""}`}
            onSubmit={onSubmit}
            onChange={() => {
              if (status !== "sending") setStatus("idle");
              setErrorMessage("");
            }}
          >
            <div className="form-title">
              <span className="mono">START A CONVERSATION</span>
              <Icon name="mail" size={20} />
            </div>
            <div className="form-row">
              <label htmlFor="contact-name">
                Your name
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  maxLength={120}
                  required
                />
              </label>
              <label htmlFor="contact-email">
                Your email
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="alex@company.com"
                  maxLength={254}
                  required
                />
              </label>
            </div>
            <label htmlFor="contact-message">
              What are you working on?
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="A role, a project, or an interesting problem..."
                maxLength={4000}
                required
              />
            </label>
            <label className="form-honeypot" aria-hidden="true">
              Website
              <input
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
            <p className="form-note">
              Your message is delivered securely to my email inbox.
            </p>
            <p
              className={`form-status form-status-${status}`}
              role="status"
              aria-live="polite"
            >
              {status === "sent" && "Message delivered successfully."}
              {status === "error" && errorMessage}
            </p>
            <button
              type="submit"
              className="button button-primary send-button"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                  ? "Send another message"
                  : "Send message"}
              <Icon name={status === "sent" ? "check" : "arrow"} size={18} />
              {status === "sent" && <span className="send-signal" />}
            </button>
            {status === "error" && (
              <a
                className="form-email-fallback"
                href={`mailto:${contact.email}`}
              >
                Or email me directly at {contact.email}
              </a>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
