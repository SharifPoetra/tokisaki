const Discord = require('discord.js');
const PREFIX = require('../config.json').bot_prefix;
const { embed_color } = require('../config.json');
const fs = require("fs");
const db = require('quick.db');
let xp = require('../../src/database/xp.json');
let balance = require('../../src/database/balance.json');
const timeout = new Set();
const timeoutxp = new Set();

module.exports = async (client, message) => {
  
  // online stats Haruno Sakura server
  const guild = client.guilds.get('492345609928572948');
  guild.channels.get('498353806589820939').setName(`Online : ${guild.members.filter(o => o.presence.status === 'online' || o.presence.status === 'idle' || o.presence.status === 'dnd').size}`)
  
  // - - - - - - - - - - - 
  if (message.author.bot || !message.guild) return;
    db.add('messageRead', 1)
    let prefix = PREFIX.toLowerCase();
    let prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    prefixMention = prefix;
    let msg = message.content.toLowerCase();
    
    if (msg.startsWith(prefix) || msg.startsWith(`${client.user.toString()} `)) return require('../handle/command')(client, message);
  
    if (msg == `<@${client.user.id}>` || msg == `<@!${client.user.id}>`) {
        message.channel.send(`Hye ${message.author}, my prefix is \`${prefix}\``);
    }
    
    const args = message.content.slice(prefix).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
 
  let AFKdata = JSON.parse(fs.readFileSync('./src/database/afk.json', 'utf8'));

  if (message.author.id in AFKdata && command !== "afk") {
    delete AFKdata[message.author.id];
    fs.writeFile('./src/database/afk.json', JSON.stringify(AFKdata), (err) => {
      if (err) console.log(err);
    });
    
    message.channel.send(`⌨️ | Welcome back ${message.author.toString()} I've removed you from Afk.`);
  }

  var AFKcheck = user => {
    return user.id in AFKdata;
  }

  const AFKandMentioned = message.mentions.users.filter(AFKcheck);

  if (AFKandMentioned.size) {
    var reason = AFKandMentioned.map(user => {
      return AFKdata[user.id];
    });
    let embed = new Discord.RichEmbed()
    embed.setColor(embed_color);
    embed.setAuthor(`They are AFK at the moment, please try again later!`)
    embed.setDescription(`${reason}`) 
    message.channel.send(`${message.author.toString()}`, {embed});
  }
  

  // balance
  if (timeout.has(message.author.id)) return;
  let balanceAdd = Math.floor(Math.random() * 1) + 1;
  
  if(!balance[message.author.id]){
    balance[message.author.id] = {
      balance: 0
    };
  }

  let curbalance = balance[message.author.id].balance;
  balance[message.author.id].balance =  curbalance + balanceAdd;
  
  fs.writeFile("./src/database/balance.json", JSON.stringify(balance, null, 2), (err) => {
    if (err) console.log(err)
  });

timeout.add(message.author.id);
setTimeout(() => timeout.delete(message.author.id), 60000);
  
  //leveling
  let xpAdd = Math.floor(Math.random() * 1) + 1; 
   if (timeoutxp.has(message.author.id)) return;
  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 500;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    
     message.channel.send(`\🆙 | ${message.author} You've leveled up to **\`${curlvl + 1}\`**`).then(m => m.delete(7000));
  }
  
  fs.writeFile("./src/database/xp.json", JSON.stringify(xp, null, 2), (err) => {
    if (err) console.log(err)
  });
  timeoutxp.add(message.author.id);
setTimeout(() => timeoutxp.delete(message.author.id), 20000);
}