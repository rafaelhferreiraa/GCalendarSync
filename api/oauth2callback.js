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

    // Salvar os tokens no contexto do Power-Up do Trello
    const t = require('@trello/power-up');
    await t.set('member', 'shared', 'googleTokens', tokens);

    res.send('Autenticação concluída! Você pode fechar essa aba.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro na autenticação.');
  }
}
