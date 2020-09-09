const axios = require('axios');
const sanitize = require ('./htmlSanitizer');

const METHODS = {
    SEND_MESSAGE: 'sendMessage',
    GET_UPDATES: 'getUpdates'
}
const TELEGRAM_API_BOT_URL = 'https://api.telegram.org/bot';
const PARSE_MODES = {
    HTML: 'HTML'
}

module.exports = class TelegramPostSender {
    apiUrl;

    constructor(token) {
        this.apiUrl = `${TELEGRAM_API_BOT_URL}${token}`;
    }

    async sendMessage(message) {
        const sanitizedHtml = sanitize(message);
        const chatId = await this.getSomeChatId();

        const parameters = {
            chat_id: chatId,
            text: sanitizedHtml,
            parse_mode: PARSE_MODES.HTML,
        }
        return axios.post(`${this.apiUrl}/${METHODS.SEND_MESSAGE}`, parameters);
    }

    async getSomeChatId() {
        const updates = await axios.get(`${this.apiUrl}/${METHODS.GET_UPDATES}`);
        if(!updates.data.result || !updates.data.result.length) {
            throw Error('the bot havent been added to any chat yet');
        }
        return updates.data.result[0].message.chat.id;
    }
}