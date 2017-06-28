const WebSocket = require('ws');

// создаём новый websocket-сервер
const wss = new WebSocket.Server({
  port: 38456
});

//  отправляем клиентам, когда функция clientValidator возвращает true. this — это wss.
wss.broadcast = function(data, clientValidator = () => true) {
  this.clients.forEach(client => {
    if (clientValidator(client)) {
      client.send(data);
    }
  });
}

wss.on("connection", ws => {
  console.log(wss.clients.size);
  // событие будет вызвано, когда клиент отправит сообщение
  ws.on('message', message => {
    //  отправляем сообщение всем, кроме автора
    wss.broadcast(message, client => client !== ws);
  });
});