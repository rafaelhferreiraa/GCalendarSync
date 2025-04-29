const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

// Serve os arquivos da pasta "public"
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota para receber o código de autorização do Trello e fazer o OAuth com o Google
app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    // Use o código de autorização para obter o token de acesso do Trello
    const response = await axios.post(`https://api.trello.com/1/authorize?token=${code}`);

    // Agora com o token do Trello, podemos pegar o token do Google para o calendar
    const googleAccessToken = response.data;

    // Salve esse token no seu banco de dados ou memória para usá-lo depois
    console.log("Token do Google Calendar:", googleAccessToken);

    res.send('Autenticação concluída com sucesso!');
  } catch (error) {
    console.error('Erro ao obter o token', error);
    res.status(500).send('Erro na autenticação');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
