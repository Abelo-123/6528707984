const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
// curl -F "url=https://paxyo-tg-mini.vercel.app/api/bot" https://api.telegram.org/bot7990081216:AAHrDqwYVx7y4VHSSdAZotfhuLUBi3wVtCc/setWebhook
//cloudflared tunnel --url http://localhost:3000
// curl -F "url=https://davis-proteins-attempt-super.trycloudflare.com/api/tg" https://api.telegram.org/bot7766724477:AAHp0r8SvGJIIO9l02VsY6FuZisWFX3YvAg/setWebhook
const app = express();
app.use(express.json());

// // Replace '<YOUR_BOT_TOKEN>' with your bot's token
const BOT_TOKEN = '7990081216:AAHrDqwYVx7y4VHSSdAZotfhuLUBi3wVtCc';
const bot = new TelegramBot(BOT_TOKEN);

// // Mini App URL
const miniAppUrl = 'https://paxyo-tg-mini.vercel.app/';

// // Webhook Endpoint
const WEBHOOK_URL = `https://paxyo-tg-mini.vercel.app/api/bot`;

// // Set the webhook for Telegram
bot.setWebHook(WEBHOOK_URL);

// // Handle incoming updates from Telegram
app.post('/api/bot', (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// // Listen for /start commands with parameters
bot.onText(/\/start (.+)/, (msg, match) => {
    const chatId = msg.chat.id; // Telegram chat ID
    const param = match[1]; // Extracted parameter from the deep link

    //     // Create a button to open the mini app with the parameter
    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Open Mini App',
                        web_app: { url: `${miniAppUrl}?data=${encodeURIComponent(param)}` },
                    },
                ],
            ],
        },
    };

    //     // Send a message with the button
    bot.sendMessage(chatId, 'Click the button below to open the Mini App:', keyboard);
});

// // Default endpoint for health checks
app.get('/', (req, res) => {
    res.send('Bot is running');
});

// // Export the app for Vercel
module.exports = app;

//----------------------------------------------------------------------

// const TelegramBot = require('node-telegram-bot-api');

// // Replace with your bot's token
// const bot = new TelegramBot('7990081216:AAHrDqwYVx7y4VHSSdAZotfhuLUBi3wVtCc', { polling: true });

// // Listen for the /start command
// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;

//     // Create a keyboard with a button to request contact
//     const options = {
//         reply_markup: {
//             keyboard: [
//                 [
//                     {
//                         text: 'Share Phone Number',
//                         request_contact: true, // This requests the user's phone number
//                     },
//                 ],
//             ],
//             one_time_keyboard: true, // The keyboard will disappear after a response
//         },
//     };

//     bot.sendMessage(chatId, 'Please share your phone number:', options);
// });

// // Listen for contact information
// bot.on('contact', (msg) => {
//     const chatId = msg.chat.id;
//     const phoneNumber = msg.contact.phone_number;

//     bot.sendMessage(chatId, `Thank you for sharing your phone number: ${phoneNumber}`);
// });


//------------------------------------------------------------------
// const TelegramBot = require('node-telegram-bot-api');

// // Replace with your bot's token
// const bot = new TelegramBot('7990081216:AAHrDqwYVx7y4VHSSdAZotfhuLUBi3wVtCc', { polling: true });

// // Listen for the /start command
// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;

//     // Create a keyboard with a button to request location
//     const options = {
//         reply_markup: {
//             keyboard: [
//                 [
//                     {
//                         text: 'Share Location',
//                         request_location: true, // This requests the user's location
//                     },
//                 ],
//             ],
//             one_time_keyboard: true, // The keyboard will disappear after a response
//         },
//     };

//     bot.sendMessage(chatId, 'Please share your location:', options);
// });

// // Listen for location information
// bot.on('location', (msg) => {
//     const chatId = msg.chat.id;
//     const location = msg.location;

//     bot.sendMessage(
//         chatId,
//         `Thank you for sharing your location: Latitude: ${location.latitude}, Longitude: ${location.longitude}`
//     );
// });
