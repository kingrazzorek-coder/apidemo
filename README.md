# apidemo
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName": "Jan Nowak", "menuItemId": 2, "quantity": 3}'