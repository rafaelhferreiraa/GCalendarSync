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
    oauth2Client.setCredentials(tokens);

    res.status(200).json({ tokens }); // Retorne os tokens como JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro na autenticação' }); // Retorne um erro em formato JSON
  }
}
