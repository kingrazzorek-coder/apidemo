const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3002;
const MENU_SERVICE_URL = process.env.MENU_SERVICE_URL || 'http://localhost:3001';

const orders = [
  {
    id: 101,
    customerName: 'Anna Kowalska',
    menuItemId: 1,
    quantity: 2,
    totalPrice: 64,
    status: 'Preparing'
  }
];

let nextId = 102;

// Get all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

// Get order by id + fetch dish info from menu-service
app.get('/orders/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  try {
    const response = await fetch(`${MENU_SERVICE_URL}/menu/${order.menuItemId}`);
    const dish = response.ok ? await response.json() : null;

    res.json({
      id: order.id,
      customerName: order.customerName,
      quantity: order.quantity,
      totalPrice: order.totalPrice,
      status: order.status,
      dish: dish
    });
  } catch (error) {
    console.error('Error connecting to menu-service:', error.message);
    res.status(500).json({ error: 'Menu service is unavailable' });
  }
});

// Create a new order
app.post('/orders', async (req, res) => {
  const customerName = req.body.customerName;
  const menuItemId = req.body.menuItemId;
  const quantity = parseInt(req.body.quantity) || 1;

  if (!customerName || !menuItemId) {
    return res.status(400).json({ error: 'customerName and menuItemId are required' });
  }

  try {
    const response = await fetch(`${MENU_SERVICE_URL}/menu/${menuItemId}`);

    if (!response.ok) {
      return res.status(404).json({ error: 'Dish does not exist' });
    }

    const dish = await response.json();

    const newOrder = {
      id: nextId,
      customerName: customerName,
      menuItemId: dish.id,
      quantity: quantity,
      totalPrice: dish.price * quantity,
      status: 'Received'
    };

    nextId++;
    orders.push(newOrder);

    res.status(201).json({
      id: newOrder.id,
      customerName: newOrder.customerName,
      quantity: newOrder.quantity,
      totalPrice: newOrder.totalPrice,
      status: newOrder.status,
      dish: dish
    });
  } catch (error) {
    console.error('Error connecting to menu-service:', error.message);
    res.status(500).json({ error: 'Could not place order because menu service is down' });
  }
});

app.listen(PORT, () => {
  console.log(`Orders service listening on port ${PORT}`);
});