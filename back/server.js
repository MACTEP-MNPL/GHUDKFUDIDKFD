const express = require('express');
const { Bot } = require('grammy');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Создаем инстанс бота
const bot = new Bot(process.env.BOT_TOKEN);

bot.command('start', (ctx) => {
    ctx.reply(JSON.stringify(ctx.chatId))
});

const corsOptions = {
    origin: ['http://localhost', 'https://localhost', 'http://127.0.0.1:7779', 'https://127.0.0.1:7779', 'http://flexis-invest.com', 'https://flexis-invest.com', 'http://flexis-invest.ru', 'https://flexis-invest.ru'],
}

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Роут для обработки формы
app.post('/submit-form', async (req, res) => {
    try {
        const { lastName, firstName, middleName, citizenship } = req.body;

        // Формируем сообщение
        const message = `
🔔 Новая заявка!

👤 ФИО: ${lastName} ${firstName} ${middleName || '-'}
🌍 Гражданство: ${citizenship}
📅 Дата: ${new Date().toLocaleString('ru-RU')}
        `;

        // Отправляем сообщение в Telegram
        await bot.api.sendMessage(process.env.CHAT_ID, message);

        res.status(200).json({ success: true, message: 'Заявка успешно отправлена' });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ success: false, message: 'Произошла ошибка при обработке заявки' });
    }
});

// Запускаем сервер
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

bot.start();