const t = TrelloPowerUp.iframe();

document.addEventListener('DOMContentLoaded', async function () {
  const authSection = document.getElementById('auth-section');
  const syncSection = document.getElementById('sync-section');
  const tokens = await t.get('member', 'shared', 'googleTokens');

  if (!tokens || !tokens.access_token) {
    // Mostrar botão de autenticação
    authSection.style.display = 'block';
  } else {
    // Mostrar botão de sincronização
    syncSection.style.display = 'block';
  }

  document.getElementById('auth-btn').addEventListener('click', function () {
    window.open('https://g-calendar-sync.vercel.app/api/auth', '_blank');
    alert('Depois de autenticar, volte aqui e clique em "Sincronizar agora".');
  });

  document.getElementById('sync-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const tokens = await t.get('member', 'shared', 'googleTokens');
    if (!tokens || !tokens.access_token) {
      alert('Você precisa se autenticar com o Google primeiro.');
      return;
    }

    try {
      const res = await fetch('/api/createEvent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: tokens.access_token,
          title: 'Reunião do Trello',
          start: '2025-05-01T10:00:00-03:00',
          end: '2025-05-01T11:00:00-03:00'
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Evento criado com sucesso!');
      } else {
        alert('Erro ao criar evento: ' + (data.error || 'erro desconhecido.'));
      }
    } catch (err) {
      alert('Erro na comunicação com o servidor.');
      console.error(err);
    }

    t.closePopup();
  });
});
