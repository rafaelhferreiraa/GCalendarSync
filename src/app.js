window.TrelloPowerUp.initialize({
  'board-buttons': function(t, opts) {
    return [{
      icon: {
        dark: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg',
        light: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg'
      },
      text: 'Sincronizar Quadro',
      callback: 'syncBoard',
      condition: 'edit'
    }];
  },

  'syncBoard': function(t) {
    console.log('Botão de sincronização clicado!');
    alert('🔁 Iniciando sincronização com Google Calendar...');
    return t.popup({
      title: 'Sincronizar',
      url: 'settings.html',
      height: 100
    });
  },

  'authorization-status': () => ({ authorized: true })
});
