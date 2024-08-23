
const { Client } = require('node-whatsapp-web');

const client = new Client({
  auth: {
    clientID: 'YOUR_CLIENT_ID',
    clientToken: 'YOUR_CLIENT_TOKEN',
    businessID: 'YOUR_BUSINESS_ID',
  },
  phone: 'YOUR_PHONE_NUMBER',
});

client.on('message', (msg) => {
  if (msg.body.includes('http://') || msg.body.includes('https://')) {
    msg.delete();
    const sender = msg.from;
    client.removeParticipant(msg.chatId, sender);
  }
});

client.initialize();
