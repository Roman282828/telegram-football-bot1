const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const TELEGRAM_TOKEN = 7848484479:AAG5jwIpQ5d0frHrQRAeY5a7eLW8a5vutVU
const FOOTBALL_API_KEY = 17a412e8d73b406096980bd4742ff09e

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
