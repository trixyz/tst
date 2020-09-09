var express = require('express');
var router = express.Router();
var TelegramPostSender = require('../modules/telegramPostSender');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/save', async function(req, res, next) {
  const token = process.env.BOT_TOKEN;
  const sender = new TelegramPostSender(token);
  try {
    await sender.sendMessage(req.body);
    res.send(200);
  } catch(e) {
    console.error(e.isAxiosError ? e.response.data.description : e);
    res.send(500);
  }
});

module.exports = router;
