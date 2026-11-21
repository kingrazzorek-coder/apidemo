# apidemo
docker compose up -d --build

curl -i http://localhost:3000/

curl -i -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test"}'

curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName": "Jan Nowak", "menuItemId": 2, "quantity": 3}'

  curl -i -X PATCH http://localhost:3000/api/orders/101/status   -H "Content-Type: application/json"   -d '{"status":"Ready"}'