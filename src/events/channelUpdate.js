const Discord = require('discord.js');
const fs = require('fs');
const { embed_color } = require('../config.json');

module.exports = (client, oldChannel, newChannel) => {
  var color = embed_color;
  
  var Changes = {
    unknown: 0,
    topic: 1,
    name: 2
  };
  var change = Changes.unknown;
  
  if(newChannel.name != oldChannel.name)
    change = Changes.name;
  
  if(newChannel.topic != oldChannel.topic)
    change = Changes.topic;
  
var log = JSON.parse(fs.readFileSync('./src/database/logging.json', 'utf8')) 
let logsetting = JSON.parse(fs.readFileSync('./src/database/logonoff.json', 'utf8'));

if(!logsetting[oldChannel.guild.id]){
  logsetting[oldChannel.guild.id] = {
    checker: 1
  };
}
  if(!log[oldChannel.guild.id]) return;
  let values = logsetting[oldChannel.guild.id].checker
  
  if(values === undefined) return;
  if(values === 0) return;
  if(values === 1) {
    var log = JSON.parse(fs.readFileSync('./src/database/logging.json', 'utf8')) 
    if(!log) return;
    let channel = oldChannel.guild.channels.get(`${log[oldChannel.guild.id].channel}`);
    if(!channel) return;
    
    if(channel != null) {
      switch (change) {
        case Changes.unknown:
          let embed = new Discord.RichEmbed() 
          .setColor(color) 
          .setDescription(`Channel Updated: ${newChannel.name}`)
          .setFooter(`ID: ${newChannel.id}`).setTimestamp() 
          //channel.send(embed)
          break;
        case Changes.topic:
          let embed1 = new Discord.RichEmbed() 
          .setColor(color)
          .setAuthor(`Channel Topic Updated`)
          .setDescription(`Channel: ${newChannel.name}`) 
          .addField('Before', `${oldChannel.topic}` || 'No topic')
          .addField('After', `${newChannel.topic}` || 'No topic') 
          .setFooter(`ID: ${newChannel.id}`).setTimestamp() 
          channel.send(embed1)
          break;
       case Changes.name:
          let embed2 = new Discord.RichEmbed() 
          .setColor(color)
          .setAuthor(`Channel Name Updated`)
          .setDescription(`Channel: ${newChannel}`) 
          .addField('Before', `${oldChannel.name}` || 'No name')
          .addField('After', `${newChannel.name}` || 'No name')
          .setFooter(`ID: ${newChannel.id}`).setTimestamp()
          channel.send(embed2)
          break;
     } 
    } 
    
  } 
};