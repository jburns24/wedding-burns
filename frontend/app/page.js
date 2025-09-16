"use client";
import { useState, useEffect } from 'react';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

// Import dynamically generated carousel images
import carouselImages from '../lib/carousel-images.js';

function PhotoCarousel() {
  // Debug logging
  console.log('PhotoCarousel render - carouselImages:', carouselImages);
  console.log('carouselImages length:', carouselImages?.length);
  console.log('carouselImages type:', typeof carouselImages);

  // Don't initialize if we don't have images yet
  if (!carouselImages || carouselImages.length === 0) {
    console.log('No images available, showing loading...');
    return <div className="photo-row">Loading photos...</div>;
  }

  const [images, setImages] = useState([
    { index: 0, visible: true, key: Date.now() + 0 },
    { index: 1, visible: true, key: Date.now() + 1 },
    { index: 2, visible: true, key: Date.now() + 2 }
  ]);

  useEffect(() => {
    const scheduleImageChange = (position) => {
      const interval = Math.random() * 3000 + 7000;

      setTimeout(() => {
        // Fade out
        setImages(prev => prev.map((img, i) =>
          i === position ? { ...img, visible: false } : img
        ));

        // After fade out, change image and fade in
        setTimeout(() => {
          setImages(prev => {
            // Debug the carousel state
            console.log('Changing image at position:', position);
            console.log('carouselImages in setState:', carouselImages);
            console.log('carouselImages.length in setState:', carouselImages?.length);

            if (!carouselImages || carouselImages.length === 0) {
              console.error('No carouselImages available in setState!');
              return prev; // Don't change anything if no images
            }

            const newImages = [...prev];
            const usedIndices = newImages.map(img => img.index);
            let availableIndices = Array.from({ length: carouselImages.length }, (_, i) => i);
            availableIndices = availableIndices.filter(i => !usedIndices.includes(i));

            console.log('Used indices:', usedIndices);
            console.log('Available indices:', availableIndices);

            if (availableIndices.length > 0) {
              const randomIndex = Math.floor(Math.random() * availableIndices.length);
              const newImageIndex = availableIndices[randomIndex];
              console.log('Selected new image index:', newImageIndex);
              console.log('New image filename:', carouselImages[newImageIndex]);

              newImages[position] = {
                index: newImageIndex,
                visible: false,
                key: Date.now() + Math.random()
              };
            } else {
              console.warn('No available indices! Using random fallback.');
              const fallbackIndex = Math.floor(Math.random() * carouselImages.length);
              newImages[position] = {
                index: fallbackIndex,
                visible: false,
                key: Date.now() + Math.random()
              };
            }

            return newImages;
          });

          // Fade in new image
          setTimeout(() => {
            setImages(prev => prev.map((img, i) =>
              i === position ? { ...img, visible: true } : img
            ));

            // Schedule next change for this position
            scheduleImageChange(position);
          }, 100);
        }, 800);
      }, interval);
    };

    // Schedule initial changes with shorter, staggered start times (2-4s, 4-6s, 6-8s)
    setTimeout(() => scheduleImageChange(0), Math.random() * 2000 + 2000);
    setTimeout(() => scheduleImageChange(1), Math.random() * 2000 + 4000);
    setTimeout(() => scheduleImageChange(2), Math.random() * 2000 + 6000);
  }, []);

  return (
    <div className="photo-row">
      {images.map((img, i) => {
        const filename = carouselImages[img.index];

        // Skip rendering if filename is invalid
        if (!filename) {
          console.warn(`Invalid image index: ${img.index} for carousel with ${carouselImages.length} images`);
          return null;
        }

        return (
          <img
            key={img.key}
            className={`photo-carousel-img ${img.visible ? 'visible' : 'hidden'}`}
            src={`/carosel/${filename}`}
            alt={`Wedding photo ${i + 1}`}
          />
        );
      }).filter(Boolean)}
    </div>
  );
}

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
          <PhotoCarousel />
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
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p className="title-font">With love, J & C</p>
          <p className="small muted">© {new Date().getFullYear()} Our Wedding</p>
        </div>
      </footer>
    </main>
  );
}
