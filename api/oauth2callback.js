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

    // Salva os tokens no localStorage
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Autenticação concluída</title>
        <script src="https://p.trellocdn.com/power-up.min.js"></script>
      </head>
      <body>
        <h2>Autenticando com Trello...</h2>
        <script>
          localStorage.setItem('googleTokens', JSON.stringify(${JSON.stringify(tokens)}));
          window.location.href = 'https://g-calendar-sync.vercel.app/success.html';
        </script>
      </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro na autenticação.');
  }
}
