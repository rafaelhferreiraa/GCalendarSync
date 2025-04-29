const clientId = '446219431176-3p7rk7up40qf9hi67qjk142l6fcft3c7.apps.googleusercontent.com';
const redirectUri = 'https://g-calendar-sync-git-main-rafaels-projects-23e6cbba.vercel.app/'; // ou http://localhost:3000
const scope = 'https://www.googleapis.com/auth/calendar';
const trelloKey = 'ce1b2394b00c5cd9e05cb5b3aff0d1c0';

document.getElementById('google-login').onclick = () => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=consent`;
  window.location.href = authUrl;
};

document.getElementById('trello-login').onclick = () => {
  const trelloAuthUrl = `https://trello.com/1/authorize?expiration=never&name=TrelloSyncApp&scope=read,write&response_type=token&key=${trelloKey}`;
  window.location.href = trelloAuthUrl;
};

window.onload = () => {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));

  // Google Token
  const googleToken = hashParams.get('access_token');
  if (googleToken) {
    localStorage.setItem('google_token', googleToken);
    document.getElementById('status').innerText = '✅ Google Calendar conectado!';
  }

  // Trello Token
  const trelloToken = hashParams.get('token');
  if (trelloToken) {
    localStorage.setItem('trello_token', trelloToken);
    alert('✅ Trello conectado com sucesso!');
  }

  // Teste: criar evento se Google já está conectado
  const token = localStorage.getItem('google_token');
  if (token) {
    const now = new Date();
    const end = new Date(now.getTime() + 30 * 60000);

    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summary: 'Teste de evento sincronizado',
        start: { dateTime: now.toISOString() },
        end: { dateTime: end.toISOString() },
      }),
    })
      .then(res => res.json())
      .then(data => console.log('✅ Evento criado no Google Calendar:', data))
      .catch(err => console.error('Erro ao criar evento:', err));
  }
};
