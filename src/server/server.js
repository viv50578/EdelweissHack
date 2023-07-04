import express from 'express';
import net from 'net';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
 const app = express();
const server = http.createServer(app);
 app.use(cors());
 const port = 5000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
 const ioServer = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
 ioServer.on('connection', (socket) => {
  console.log('A client connected');
   const client = new net.Socket();
  client.connect(9011, 'localhost', () => {
    console.log('Connected to TCP/IP server');
    const initialRequestPacket = Buffer.from([0x01]);
    client.write(initialRequestPacket);
  });
   client.on('data', (data) => {
    console.log('Received data from TCP/IP server:', data);
    const parsedPacket = parsePacket(data);
    socket.emit('data', parsedPacket);
  });
   client.on('close', () => {
    console.log('Connection closed');
  });
   client.on('error', (err) => {
    console.error('Connection error:', err);
  });
});
function parsePacket(data) {
  const packet = {};
  packet.packetLength = data.readInt32LE(0);
  packet.tradingSymbol = data.toString('utf8', 4, 34).replace(/\0/g, '');
  packet.sequenceNumber = data.readBigInt64LE(34).toString(); // Convert BigInt to string
  packet.timestamp = data.readBigInt64LE(42).toString(); // Convert BigInt to string
  packet.lastTradedPrice = data.readBigInt64LE(50).toString(); // Convert BigInt to string
  packet.lastTradedQuantity = data.readBigInt64LE(58).toString(); // Convert BigInt to string
  packet.volume = data.readBigInt64LE(66).toString(); // Convert BigInt to string
  packet.bidPrice = data.readBigInt64LE(74).toString(); // Convert BigInt to string
  packet.bidQuantity = data.readBigInt64LE(82).toString(); // Convert BigInt to string
  packet.askPrice = data.readBigInt64LE(90).toString(); // Convert BigInt to string
  packet.askQuantity = data.readBigInt64LE(98).toString(); // Convert BigInt to string
  packet.openInterest = data.readBigInt64LE(106).toString(); // Convert BigInt to string
  packet.previousClosePrice = data.readBigInt64LE(114).toString(); // Convert BigInt to string
  packet.previousOpenInterest = data.readBigInt64LE(122).toString(); // Convert BigInt to string
  return packet;
}