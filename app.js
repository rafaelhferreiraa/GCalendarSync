window.TrelloPowerUp.initialize({
    'board-buttons': function (t, opts) {
      return [
        {
          icon: {
            dark: 'https://example.com/icon-dark.svg', // Substitua pelo ícone real
            light: 'https://example.com/icon-light.svg' // Substitua pelo ícone real
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
  