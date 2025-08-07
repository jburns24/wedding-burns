import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

const RSVP_UNIVERSAL_CODE = (process.env.RSVP_UNIVERSAL_CODE || '').toString();
const SUCCESS_REDIRECT_URL = process.env.SUCCESS_REDIRECT_URL || 'https://example.com/your-google-form';
const FAILURE_REDIRECT_URL = process.env.FAILURE_REDIRECT_URL || 'https://example.com/invalid-rsvp';

if (!RSVP_UNIVERSAL_CODE) {
  console.warn('[backend] Warning: RSVP_UNIVERSAL_CODE is not set. All codes will be treated as invalid.');
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

app.get('/', (req, res) => {
  res.type('text/plain').send('Wedding RSVP backend is running');
});

app.post('/rsvp', (req, res) => {
  const input = (req.body?.code ?? '').toString().trim();

  if (!input) {
    return res.redirect(302, FAILURE_REDIRECT_URL);
  }

  const isValid = RSVP_UNIVERSAL_CODE && input === RSVP_UNIVERSAL_CODE;
  return res.redirect(302, isValid ? SUCCESS_REDIRECT_URL : FAILURE_REDIRECT_URL);
});

app.listen(PORT, () => {
  console.log(`[backend] Listening on port ${PORT}`);
});
