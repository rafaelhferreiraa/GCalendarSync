const t = TrelloPowerUp.iframe();

document.getElementById('sync-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  t.popup({
    title: 'Sincronizar Quadro',
    url: 'https://g-calendar-sync.vercel.app/janelas.html',
    height: 400
  });

  alert('Sincronizando com o Google Calendar...');
  t.closePopup();
});
