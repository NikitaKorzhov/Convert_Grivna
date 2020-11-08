var ax = require("axios")
const TelegramBot = require('node-telegram-bot-api');
const token = '1022158874:AAEwkAjA4FRwk89UMRLRhmTh2jx6EF_x7hA';
const bot = new TelegramBot(token, { polling: true });
const url = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
const getData = () => ax.get(url).then(d => d.data)
const getList = (object) => `1 ${object.ccy} - купівля: ${object.buy} гривень продаж: ${object.sale} гривень;\n\n`;

async function getDolar(id) {
    let data = await getData();
    let dolar = data.find(el => el.ccy == "USD")
    bot.sendMessage(id, getList(dolar))
}
async function getEUR(id) {
    let data = await getData();
    let dolar = data.find(el => el.ccy == "EUR")
    bot.sendMessage(id, getList(dolar))
}
async function getRUR(id) {
    let data = await getData();
    let dolar = data.find(el => el.ccy == "RUR")
    bot.sendMessage(id, getList(dolar))
}
async function getBTC(id) {
    let data = await getData();
    let dolar = data.find(el => el.ccy == "BTC")
    bot.sendMessage(id, getList(dolar))
}

bot.on("message", msg => {
    switch (msg.text) {
        case "$":
            getDolar(msg.chat.id);
            break;
        case "eur":
            getEUR(msg.chat.id);
            break;
        case "rur":
            getRUR(msg.chat.id);
            break;
        case "btc":
            getBTC(msg.chat.id);
            break;
        default:
            ax.get(url).then(r => r.data).then(data => data.reduce((sum, el) => getList(el) + sum, '')).then(data => bot.sendMessage(msg.chat.id, data))
    }
})