const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;
const MENU_SERVICE_URL = process.env.MENU_SERVICE_URL || 'http://localhost:3001';
const ORDERS_SERVICE_URL = process.env.ORDERS_SERVICE_URL || 'http://localhost:3002';

app.get('/', (req, res) => {
  res.send('Restaurant API Gateway is running');
});

// Forward menu requests
app.get('/api/menu', async (req, res) => {
  try {
    const response = await fetch(`${MENU_SERVICE_URL}/menu`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Menu service is down' });
  }
});

app.get('/api/menu/:id', async (req, res) => {
  try {
    const response = await fetch(`${MENU_SERVICE_URL}/menu/${req.params.id}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Menu service is down' });
  }
});

// Forward order requests
app.get('/api/orders', async (req, res) => {
  try {
    const response = await fetch(`${ORDERS_SERVICE_URL}/orders`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Orders service is down' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const response = await fetch(`${ORDERS_SERVICE_URL}/orders/${req.params.id}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Orders service is down' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const response = await fetch(`${ORDERS_SERVICE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Orders service is down' });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway listening on port ${PORT}`);
});