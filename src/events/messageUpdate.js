const Discord = require('discord.js');
const fs = require('fs');
const { embed_color } = require('../config.json');

module.exports = (client, oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    let editEmbed = new Discord.RichEmbed()
    .setAuthor(`${newMessage.author.tag} | Edited message`, newMessage.author.displayAvatarURL)
    .setDescription(`**Message sent by ${newMessage.author} edited in ${oldMessage.channel.toString()}**`) 
    .addField("Before Edited:", `${oldMessage.content}` || "No content")
    .addField("Edited To:", `${newMessage.content}` || "No content")
   .addField("Link to message:", newMessage.url || newMessage.link || 'No URL') 
    .setFooter(`ID: ${newMessage.id}`) 
    .setColor(embed_color).setTimestamp()
  
var log = JSON.parse(fs.readFileSync('./src/database/logging.json', 'utf8')) 
let logsetting = JSON.parse(fs.readFileSync('./src/database/logonoff.json', 'utf8'));

if(!logsetting[oldMessage.guild.id]){
  logsetting[oldMessage.guild.id] = {
    checker: 1
  };
}
  if(!log[oldMessage.guild.id]) return;
  let values = logsetting[oldMessage.guild.id].checker
  
  if(values === undefined) return;
  if(values === 0) return;
  if(values === 1) {
    var log = JSON.parse(fs.readFileSync('./src/database/logging.json', 'utf8')) 
    if(!log) return;
    let channel = oldMessage.guild.channels.get(`${log[oldMessage.guild.id].channel}`);
    if(!channel) return;
    channel.send(editEmbed);
  } 
};