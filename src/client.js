var Promise = TrelloPowerUp.Promise;

TrelloPowerUp.initialize({
  'board-buttons': function(t, opts) {
    return [{
      icon: {
        dark: "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg",
        light: "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg"
      },
      text: "Sincronizar Quadro",
      callback: function(t) {
        // Exemplo: Sincronizar todo o quadro com o Google Calendar
        const googleToken = localStorage.getItem('google_token');
        if (!googleToken) {
          alert('Você precisa estar conectado ao Google Calendar!');
          return;
        }

        t.board('id').then(board => {
          t.cards('id', 'name', 'due').then(cards => {
            cards.forEach(async card => {
              if (card.due) {
                const startDate = new Date(card.due);
                const endDate = new Date(startDate.getTime() + 3600000); // Adiciona 1 hora

                // Criar evento no Google Calendar
                await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${googleToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    summary: card.name,
                    description: card.desc,
                    start: { dateTime: startDate.toISOString() },
                    end: { dateTime: endDate.toISOString() },
                  }),
                }).then(res => res.json())
                  .then(data => console.log('Evento Criado no Google Calendar:', data))
                  .catch(err => console.error('Erro ao criar evento:', err));
              }
            });
            alert('Quadro sincronizado com sucesso!');
          });
        });
      }
    }, {
      icon: {
        dark: "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg",
        light: "https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg"
      },
      text: 'Configurações',
      condition: 'always',
      url: 'https://g-calendar-sync-git-main-rafaels-projects-23e6cbba.vercel.app/settings.html',
      target: '_blank'
    }];
  }
});
