import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://g-calendar-sync.vercel.app/api/oauth2callback'
);

export default async function handler(req, res) {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);

    const redirectUrl = new URL('https://g-calendar-sync.vercel.app/success.html');
    const encoded = Buffer.from(JSON.stringify(tokens)).toString('base64');
    redirectUrl.searchParams.set('tokens', encoded);

    res.redirect(redirectUrl.toString());
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro na autenticação.');
  }
}
