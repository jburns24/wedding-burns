import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

const RSVP_UNIVERSAL_CODE = (process.env.RSVP_UNIVERSAL_CODE || '').toString();
const SUCCESS_REDIRECT_URL = process.env.SUCCESS_REDIRECT_URL || 'https://example.com/your-google-form';
const FAILURE_REDIRECT_URL = process.env.FAILURE_REDIRECT_URL || 'https://example.com/invalid-rsvp';

if (!RSVP_UNIVERSAL_CODE) {
  console.warn('[backend] Warning: RSVP_UNIVERSAL_CODE is not set. All codes will be treated as invalid.');
}

// Log environment variables on startup
console.log('[backend] Environment variables:');
console.log(`[backend] RSVP_UNIVERSAL_CODE: "${RSVP_UNIVERSAL_CODE}" (length: ${RSVP_UNIVERSAL_CODE.length})`);
console.log(`[backend] SUCCESS_REDIRECT_URL: ${SUCCESS_REDIRECT_URL}`);
console.log(`[backend] FAILURE_REDIRECT_URL: ${FAILURE_REDIRECT_URL}`);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

app.get('/', (req, res) => {
  res.type('text/plain').send('Wedding RSVP backend is running!');
});

app.post('/rsvp', (req, res) => {
  console.log('[backend] RSVP submission received');
  console.log('[backend] Request body:', req.body);
  console.log('[backend] Request headers:', req.headers);

  const input = (req.body?.code ?? '').toString().trim();

  console.log(`[backend] Input code: "${input}" (length: ${input.length})`);
  console.log(`[backend] Expected code: "${RSVP_UNIVERSAL_CODE}" (length: ${RSVP_UNIVERSAL_CODE.length})`);
  console.log(`[backend] Input bytes:`, Array.from(input).map(c => c.charCodeAt(0)));
  console.log(`[backend] Expected bytes:`, Array.from(RSVP_UNIVERSAL_CODE).map(c => c.charCodeAt(0)));
  console.log(`[backend] Strict equality: ${input === RSVP_UNIVERSAL_CODE}`);
  console.log(`[backend] Case-insensitive equality: ${input.toLowerCase() === RSVP_UNIVERSAL_CODE.toLowerCase()}`);

  if (!input) {
    console.log('[backend] No input provided, redirecting to failure URL');
    return res.redirect(302, FAILURE_REDIRECT_URL);
  }

  const isValid = RSVP_UNIVERSAL_CODE && input === RSVP_UNIVERSAL_CODE;
  console.log(`[backend] Is valid: ${isValid}`);
  console.log(`[backend] Redirecting to: ${isValid ? SUCCESS_REDIRECT_URL : FAILURE_REDIRECT_URL}`);

  return res.redirect(302, isValid ? SUCCESS_REDIRECT_URL : FAILURE_REDIRECT_URL);
});

app.listen(PORT, () => {
  console.log(`[backend] Listening on port ${PORT}`);
});
