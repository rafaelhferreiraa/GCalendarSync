window.TrelloPowerUp.initialize({
  'board-buttons': function(t, opts) {
    return [{
      icon: {
        dark: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg',
        light: 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg'
      },
      text: 'Sincronizar Quadro',
      callback: function(t) {
        // Vamos fazer apenas um log por enquanto
        console.log('Botão de sincronização clicado');
        alert('Sincronizando com o Google Calendar...');
        // Aqui você pode adicionar a lógica para sincronizar com o Google Calendar
      },
      condition: 'edit'
    }];
  }
});
