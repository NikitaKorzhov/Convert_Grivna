var ax=require("axios")
const TelegramBot = require('node-telegram-bot-api');
const token = '1022158874:AAEwkAjA4FRwk89UMRLRhmTh2jx6EF_x7hA';
const bot = new TelegramBot(token, {polling: true});
const url="https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
 const getList=(object)=>"1 "+object.ccy+" - купівля: "+object.buy+" гривень; продаж: "+object.sale+" гривень;"+"\n\n";
bot.on("message",msg=>{
    console.log(msg.text)
    ax.get(url).then(y=>y.data).then(y=>console.log(y))
ax.get(url).then(r=>r.data).then(data=>data.reduce((sum,el)=>getList(el)+sum,'')).then(data=>bot.sendMessage(msg.chat.id, data))
})