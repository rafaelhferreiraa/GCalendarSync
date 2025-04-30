window.TrelloPowerUp.initialize({
    'board-buttons': function (t, opts) {
      return [
        {
          icon: {
            dark: '/icon.svg', 
            light: '/icon.svg' 
          },
          text: 'Sincronizar Quadro',
          callback: function (t) {
            // Aqui você pode adicionar a lógica de sincronização, por exemplo, com o Google Calendar
            console.log('Botão de sincronização do quadro clicado');
            alert('Sincronizando com o Google Calendar...');
          },
          condition: 'edit'
        }
      ];
    }
  });
  