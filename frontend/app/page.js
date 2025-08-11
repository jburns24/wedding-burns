"use client";
import { useState } from 'react';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <main>
      <nav className={`nav ${navOpen ? 'open' : ''}`}>
        <div className="container nav-inner">
          <a href="#home" className="brand title-font">J & C</a>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen(v => !v)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
          <div className="nav-links" role="menu">
            <a href="#home">Home</a>
            <a href="#story">Our Day</a>
            <a href="#rsvp">RSVP</a>
            <a href="#links">Links</a>
          </div>
        </div>
      </nav>

      <section id="home" className="section hero">
        <div className="container hero-inner">
          <h1 className="title-font hero-title">We're Getting Married!</h1>
          <p className="hero-subtitle">Join us as we celebrate our big day</p>
          <div className="hero-image">
            <img
              src="main.jpg"
              alt="Placeholder for wedding photo"
            />
          </div>
          <div className="details">
            <div>
              <span className="label">Date</span>
              <span className="value">May 31st, 2026</span>
            </div>
            <div>
              <span className="label">Location</span>
              <span className="value">545 Vallombrosa Ave, Chico CA</span>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="section alt">
        <div className="container">
          <h2 className="title-font section-title">We'd love to celebrate with you</h2>
          <p className="lead">
            Dear friends and family, we are overjoyed to invite you to share in
            the magic of our wedding day. Your love and support mean the world
            to us, and we can’t wait to make beautiful memories together.
          </p>
          <div className="photo-row">
            <img src="https://placehold.co/500x350/FBC4B1/ffffff?text=Photo+1" alt="Placeholder 1" />
            <img src="https://placehold.co/500x350/F9B69F/ffffff?text=Photo+2" alt="Placeholder 2" />
            <img src="https://placehold.co/500x350/AFB6AA/ffffff?text=Photo+3" alt="Placeholder 3" />
          </div>
        </div>
      </section>

      <section id="rsvp" className="section">
        <div className="container">
          <h2 className="title-font section-title">RSVP</h2>
          <p className="muted">Enter the RSVP code you received with your invitation.</p>
          <form className="rsvp-form" action={`${backendUrl}/rsvp`} method="POST">
            <input
              type="text"
              name="code"
              placeholder="Enter RSVP Code"
              aria-label="RSVP Code"
              required
            />
            <button type="submit" className="btn">Submit</button>
          </form>
          <p className="small muted">Submitting will redirect you to our RSVP form.</p>
        </div>
      </section>

      <section id="links" className="section alt">
        <div className="container">
          <h2 className="title-font section-title">Helpful Links</h2>
          <div className="links-grid">
            <a className="btn outline" href="#" target="_blank" rel="noreferrer">Registry (Coming Soon)</a>
            <a className="btn outline" href="https://www.honeyfund.com/site/burns-monti-05-31-2026?no_gdpr=1" target="_blank" rel="noreferrer">Honeymoon Fund</a>
            <a className="btn outline" href="#" target="_blank" rel="noreferrer">Hotel & Travel (Coming Soon)</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p className="title-font">With love, J & B</p>
          <p className="small muted">© {new Date().getFullYear()} Our Wedding</p>
        </div>
      </footer>
    </main>
  );
}
