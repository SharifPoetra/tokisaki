const Discord = require("discord.js");
const { Canvas } = require('canvas-constructor');
let xp = require("../../database/xp.json");

exports.run = async (client, message, args, color) => {
  if (message.channel.type == "dm") return;
  
var user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) user = message.author;
  if (user.bot) return message.channel.send(`**${message.author.username}, Bot don't have level!**`);
  //wajib biar ga undefined json
  if(!xp[user.id]){
   xp[user.id] = {
     xp: 0,
     level: 1
  };
}
  //buat read json
  let curxp = xp[user.id].xp;
  let curlvl = xp[user.id].level;
  let nxtLvlXp = curlvl * 500;
  let difference = curxp/nxtLvlXp *297;
  let difference2 = nxtLvlXp - curxp;
  
  try {
  async function createCanvas() {
  return new Canvas(300,50)
.setColor('lightgrey')
.addRect(0,0,300,200)
.setColor('#f44262')
.addRect(0,0,difference, 200)
.setTextFont('bold 15px Courier New') 
.setColor('#000000') 
.addText(`${curxp} / ${nxtLvlXp}`, 120,30)
.toBufferAsync() 
  } 
    let m = await message.channel.send('*Please Wait...*');
  const gumen = `
__**\`${user.username}\`'**s level information__

Current Level: **${curlvl}** - Total XP : **${curxp}**
Progress: ${getProgbar(curxp, nxtLvlXp, 10)}
Needed XP to reach level **${curlvl +1}** : **${difference2}**
`;
message.channel.send(gumen, {file: new Discord.Attachment(await createCanvas(), 'xp progress till level up.png')}).then(() => {m.delete()})
  } catch (e) {
    message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later.`);
  } 
}
 function getProgbar(current, max, length){
   const curBer = Math.floor((current/max)*length);
   let str = '';
   for(let i = 0; i < length; i++){
       str += i < curBer ? '✅' :'⬛'
   }
    return str;
}

global.progBar = getProgbar

exports.conf = {
    aliases: ["lvl"],
    cooldown: "4"
}

exports.help = {
    name: 'level',
    description: 'To check someone level',
    usage: 'level [@mention]'
}