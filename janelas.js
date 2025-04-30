const t = TrelloPowerUp.iframe();

document.getElementById('sync-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // Aqui você integrará com o Google Calendar futuramente
  alert('Sincronizando com o Google Calendar...');
  t.closePopup();
});
