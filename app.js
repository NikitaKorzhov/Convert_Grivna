var ax=require("axios")
const TelegramBot = require('node-telegram-bot-api');


const token = '1022158874:AAEwkAjA4FRwk89UMRLRhmTh2jx6EF_x7hA';

const bot = new TelegramBot(token, {polling: true});
bot.sendMessage("Bogdanka177","Привіт зая моя")
bot.on("message",msg=>{
    console.log(msg.text)
ax.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then(r=>r.data).then(data=>data.reduce((sum,el)=>"1 "+el.ccy+" - купівля: "+el.buy+" гривень; продаж: "+el.sale+" гривень;"+"\n\n"+sum,"")).then(data=>bot.sendMessage(msg.chat.id, data))
})