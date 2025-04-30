window.TrelloPowerUp.initialize({
    'board-buttons': function (t, opts) {
      return [
        {
          icon: {
            dark: 'https://g-calendar-sync.vercel.app/icon.svg', 
            light: 'https://g-calendar-sync.vercel.app/icon.svg' 
          },
          text: 'Sincronizar Quadro',
          callback: function (t) {
            return t.popup({
              title: 'Sincronizar com Google Calendar',
              url: 'popup.html',
              height: 200,
            });
          },
          condition: 'edit'
        }
      ];
    }
  });
  