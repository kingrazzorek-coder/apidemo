const express = require('express');
const app = express();

const PORT = 3001;

const menu = [
  { id: 1, name: 'Pizza', price: 32, prepTime: '10 min' },
  { id: 2, name: 'Cheeseburger', price: 28, prepTime: '12 min' },
  { id: 3, name: 'Sałatka', price: 24, prepTime: '8 min' },
  { id: 4, name: 'Szarlotka', price: 10, prepTime: '5 min' }
];

app.get('/menu', (req, res) => {
  res.json(menu);
});

app.get('/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = menu.find(m => m.id === id);

  if (!item) {
    return res.status(404).json({ error: 'Brak takiego produktu' });
  }

  res.json(item);
});

app.listen(PORT, () => {
  console.log(`Menu service slucha ${PORT}`);
});