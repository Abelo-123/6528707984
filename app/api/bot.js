import TelegramBot from 'node-telegram-bot-api';

// Replace with your bot token from BotFather
const TOKEN = '7990081216:AAHrDqwYVx7y4VHSSdAZotfhuLUBi3wVtCc';
const bot = new TelegramBot(TOKEN);

// Setup the webhook for Telegram updates
bot.setWebHook(`${process.env.VERCEL_URL}/api/bot`);

// When a user starts the bot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Send a welcome message
    bot.sendMessage(chatId, `🚀 Welcome to Paxyo!`);

    // Send an image with a caption and an inline keyboard
    bot.sendPhoto(
        chatId,
        `${__dirname}/bot.jpg`, // Path to the local image file
        {
            caption: `What does this bot do?\n\nNeed to grow your social media? This tool helps you get instant followers, views, likes, and many more on major platforms. Paxyo: It’s fast, affordable, and comes with reliable customer support to help you every step of the way.`,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: '⚡Launch App',
                            url: 'https://t.me/PaxyoMini_bot?startapp', // Replace with your mini app URL
                        },
                    ],
                ],
            },
        }
    ).catch((err) => {
        console.error('Error sending photo:', err);
    });
});

// This function processes incoming updates from Telegram
export default async (req, res) => {
    if (req.method === 'POST') {
        const update = req.body;

        try {
            // Pass the incoming update to Telegram Bot API
            await bot.processUpdate(update);
            return res.status(200).send('ok');
        } catch (error) {
            console.error('Error processing update:', error);
            return res.status(500).send('Internal Server Error');
        }
    } else {
        return res.status(405).send('Method Not Allowed');
    }
};
