const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('(https://web.whatsapp.com)');

  // Wait for the QR code to be scanned
  await page.waitForSelector('#pane-side');

  // Listen for incoming messages
  page.on('websocket', (event) => {
    if (event.type === 'message') {
      const msg = event.data;
      if (msg.body.includes('http://') || msg.body.includes('https://')) {
        // Delete the message
        page.evaluate((msgId) => {
          window.Store.Msg.delete(msgId);
        }, (link unavailable));
      }
    }
  });
})();
