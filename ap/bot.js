const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const app = express();
app.use(express.json());

// Replace '<YOUR_BOT_TOKEN>' with your bot's token
const BOT_TOKEN = '7990081216:AAHDJ9rdWehJYM4iAakEub3O2082DsQla_M';
const bot = new TelegramBot(BOT_TOKEN);

// Mini App URL
const miniAppUrl = 'https://paxyo-tg-mini.vercel.app/';

// Webhook Endpoint
const WEBHOOK_URL = `https://paxyo-tg-mini.vercel.app/ap/bot`;

// Set the webhook for Telegram
bot.setWebHook(WEBHOOK_URL);

// Handle incoming updates from Telegram
app.post('/api/bot', (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Listen for /start commands with parameters
bot.onText(/\/start (.+)/, (msg, match) => {
    const chatId = msg.chat.id; // Telegram chat ID
    const param = match[1]; // Extracted parameter from the deep link

    // Create a button to open the mini app with the parameter
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

    // Send a message with the button
    bot.sendMessage(chatId, 'Click the button below to open the Mini App:', keyboard);
});

// Default endpoint for health checks
app.get('/', (req, res) => {
    res.send('Bot is running');
});

// Export the app for Vercel
module.exports = app;
