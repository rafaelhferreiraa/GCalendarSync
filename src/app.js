const clientId = '446219431176-3p7rk7up40qf9hi67qjk142l6fcft3c7.apps.googleusercontent.com';
const redirectUri = 'https://g-calendar-sync-git-main-rafaels-projects-23e6cbba.vercel.app/';
const scope = 'https://www.googleapis.com/auth/calendar';
const trelloKey = 'ce1b2394b00c5cd9e05cb5b3aff0d1c0';
const listId = 'SEU_LIST_ID_AQUI'; // Substitua com o ID real da lista no Trello

document.getElementById('google-login').onclick = () => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=consent`;
  window.location.href = authUrl;
};

document.getElementById('trello-login').onclick = () => {
  const trelloAuthUrl = `https://trello.com/1/authorize?expiration=never&name=TrelloSyncApp&scope=read,write&response_type=token&key=${trelloKey}`;
  window.location.href = trelloAuthUrl;
};

document.getElementById('sync-button').onclick = async () => {
  const trelloToken = localStorage.getItem('trello_token');
  const googleToken = localStorage.getItem('google_token');
  const statusEl = document.getElementById('status');

  if (!trelloToken || !googleToken) {
    statusEl.textContent = '⚠️ Você precisa conectar Trello e Google primeiro.';
    return;
  }

  statusEl.textContent = '🔄 Sincronizando...';

  try {
    // Trello → Google Calendar
    const cards = await fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${trelloKey}&token=${trelloToken}`)
      .then(r => r.json());

    for (const card of cards) {
      if (!card.due) continue;

      await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${googleToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          summary: card.name,
          description: card.desc,
          start: { dateTime: new Date(card.due).toISOString() },
          end: { dateTime: new Date(new Date(card.due).getTime() + 30 * 60000).toISOString() }
        })
      });
    }

    // Google Calendar → Trello
    const now = new Date().toISOString();
    const events = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${now}`, {
      headers: { Authorization: `Bearer ${googleToken}` }
    }).then(r => r.json());

    for (const event of events.items) {
      if (!event.start?.dateTime) continue;

      await fetch(`https://api.trello.com/1/cards?key=${trelloKey}&token=${trelloToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: event.summary,
          desc: event.description || '',
          due: event.start.dateTime,
          idList: listId,
        }),
      });
    }

    statusEl.textContent = '✅ Sincronização concluída!';
  } catch (err) {
    console.error(err);
    statusEl.textContent = '❌ Erro na sincronização.';
  }
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
};

const t = TrelloPowerUp.iframe();

(async () => {
  const googleToken = localStorage.getItem('google_token');
  const trelloToken = localStorage.getItem('trello_token');
  const trelloKey = 'ce1b2394b00c5cd9e05cb5b3aff0d1c0';

  const card = await t.card('name', 'desc', 'due');

  if (!googleToken || !trelloToken) {
    alert('Você precisa conectar ao Google e ao Trello.');
    return;
  }

  await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${googleToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      summary: card.name,
      description: card.desc,
      start: { dateTime: card.due },
      end: { dateTime: new Date(new Date(card.due).getTime() + 3600000).toISOString() },
    }),
  });

  t.closePopup();
})();
