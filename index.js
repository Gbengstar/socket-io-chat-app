const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { globalExportHandler } = require('./app/helper/globalErrorHandler');
const { AppRouter } = require('./app/router/AppRouter');
const { configDotenv } = require('dotenv');
const { sendMessageHandler } = require('./app/controller/messageController');
const {
  decodeToken,
  getToken,
} = require('./app/middleware/authenticationMiddleware');
configDotenv();
require('./app/database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:9000' },
  credentials: false,
});

const users = new Map();

io.on('connection', (socket) => {
  console.log('connected');
  let tokenDecoded;

  try {
    tokenDecoded = decodeToken(getToken(socket.request));
  } catch (error) {
    console.log(error);
    return;
  }

  users.set(tokenDecoded, socket.id);

  socket.on('sendMessage', async (data) => {
    const socketId = users.get(data.receiver);

    await sendMessageHandler(data);
    socket.to(socketId).emit('receiver', data);
  });
});

app.use('/', AppRouter);

app.use('*', globalExportHandler);

httpServer.listen(9000, (token) => {
  console.log('server running');
});
