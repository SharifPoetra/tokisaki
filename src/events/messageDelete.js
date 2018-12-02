const Discord = require('discord.js');
const fs = require('fs');
const { embed_color } = require('../config.json');

module.exports = (client, message) => {
  
    if (message.author.bot) return;
    let editEmbed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag} | Deleted message`, message.author.displayAvatarURL)
    .setDescription(`
**Message sent by ${message.author} deleted in ${message.channel.toString()}**

**Message Content:**\n\n${message.content}
​
`)
    .setFooter(`ID: ${message.id}`) 
    .setColor(embed_color).setTimestamp()
  
var log = JSON.parse(fs.readFileSync('./src/database/logging.json', 'utf8')) 
let logsetting = JSON.parse(fs.readFileSync('./src/database/logonoff.json', 'utf8'));

if(!logsetting[message.guild.id]){
  logsetting[message.guild.id] = {
    checker: 1
  };
}
  if(!log[message.guild.id]) return;
  let values = logsetting[message.guild.id].checker
  
  if(values === undefined) return;
  if(values === 0) return;
  if(values === 1) {
    var log = JSON.parse(fs.readFileSync('./src/database/logging.json', 'utf8')) 
    if(!log) return;
    let channel = message.guild.channels.get(`${log[message.guild.id].channel}`);
    if(!channel) return;
    channel.send(editEmbed);
  } 
};