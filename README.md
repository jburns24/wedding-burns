# Wedding Single-Page App (Next.js + Express)

A whimsical single-page wedding website built with Next.js (static export) and a tiny Express backend for RSVP code validation.

## Features
- Single-page site with smooth-scrolling sections (Home, Our Day, RSVP, Links)
- Whimsical design using palette: `#A3B3B0`, `#B8BAB7`, `#AFB6AA`, `#F9B69F`, `#FBC4B1`, `#FCD3C1`
- Google Fonts: Great Vibes (titles) + Lora (content)
- Placeholder imagery you can replace later
- RSVP form posts to backend which validates a universal code via environment variable
  - Valid -> 302 redirect to a Google Form (URL from env)
  - Invalid -> 302 redirect to a configurable failure URL (from env)
- Dockerized frontend (nginx serving static export) and backend (Node/Express)

## Project Structure
```
frontend/   # Next.js static site (exported)
backend/    # Express RSVP validator
```

## Quick Start (Docker Compose)
1. Copy env file and edit values:
   ```bash
   cp .env.example .env
   # Edit .env to set RSVP_UNIVERSAL_CODE and redirect URLs
   ```
2. Build and run:
   ```bash
   docker compose up --build
   ```
3. Open the site:
   - Frontend: http://localhost:3001
   - Backend health: http://localhost:4000/healthz

Note: The frontend is a static export. The RSVP form’s `action` is baked in at build time using `NEXT_PUBLIC_BACKEND_URL`. For local Docker Compose it defaults to `http://localhost:4000`.

## Customization
- Colors: tweak in `frontend/app/globals.css` under `:root` CSS variables.
- Fonts: update the Google Fonts links in `frontend/app/layout.js`.
- Copy & content: edit sections in `frontend/app/page.js`.
- Links section: update placeholder buttons in the `Links` section of `page.js`.
- Images: replace the placeholder image URLs with your own; you can drop assets in `frontend/public` and reference them as `/your-file.jpg`.

## Backend Environment Variables
- `RSVP_UNIVERSAL_CODE` – The code to validate against (exact match, case-sensitive).
- `SUCCESS_REDIRECT_URL` – Where to redirect on success (e.g., your Google Form).
- `FAILURE_REDIRECT_URL` – Where to redirect on failure (e.g., an info page).
- `PORT` – Defaults to 4000.

## Deploying
You mentioned you’ll handle hosting; containers are ready:
- Frontend image serves static files via `nginx` on port 80.
- Backend image serves Express on port 4000.

For CI/CD, build the images with your registry tags, push, then deploy behind your preferred reverse proxy / platform.

## Local Development (optional)
If you prefer to run without Docker:
- Backend:
  ```bash
  cd backend && npm install && npm start
  ```
- Frontend:
  ```bash
  cd frontend && npm install
  # Ensure NEXT_PUBLIC_BACKEND_URL is set in your shell or in .env.local
  npm run dev
  ```

Enjoy and congratulations!
