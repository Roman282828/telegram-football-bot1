const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Привет! Я футбольный бот. Напиши /match чтобы увидеть ближайший матч.');
});

bot.onText(/\/match/, async (msg) => {
  try {
    const res = await axios.get('https://api.football-data.org/v4/matches?status=SCHEDULED', {
      headers: { 'X-Auth-Token': FOOTBALL_API_KEY }
    });

    const match = res.data.matches[0];
    const home = match.homeTeam.name;
    const away = match.awayTeam.name;

    bot.sendMessage(msg.chat.id, `Следующий матч: ${home} vs ${away}`);
  } catch (err) {
    bot.sendMessage(msg.chat.id, 'Ошибка при получении данных.');
  }
});
