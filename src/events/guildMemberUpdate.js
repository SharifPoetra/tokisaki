const Discord = require('discord.js');
const fs = require('fs');
const { embed_color } = require('../config.json');

module.exports = (client, oldMember, newMember) => {
  var color = embed_color;
  
   //declare changes
    var Changes = {
        unknown: 0,
        addedRole: 1,
        removedRole: 2,
        username: 3,
        nickname: 4,
        avatar: 5
    };
  
  var change = Changes.unknown;
  
  //check if roles were removed
  let dif = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first()
  let diff = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first()
  if (oldMember.roles.size !== newMember.roles.size) {
    if (oldMember.roles.size > newMember.roles.size) {
       change = Changes.removedRole;
       var removedRole = diff.name;
    } else if (oldMember.roles.size < newMember.roles.size) {
       change = Changes.addedRole;
       var addedRole = dif.name;
    }
  }
  
    
    //check if username changed
    if(newMember.user.username != oldMember.user.username)
        change = Changes.username;

    //check if nickname changed
    if(newMember.nickname != oldMember.nickname)
        change = Changes.nickname;

    //check if avatar changed
    if(oldMember.user.avatar !== newMember.user.avatar){
        change = Changes.avatar
    } 

var log = JSON.parse(fs.readFileSync('./src/database/logging.json', 'utf8')) 
let logsetting = JSON.parse(fs.readFileSync('./src/database/logonoff.json', 'utf8'));

if(!logsetting[oldMember.guild.id]){
  logsetting[oldMember.guild.id] = {
    checker: 1
  };
}
  if(!log[oldMember.guild.id]) return;
  let values = logsetting[oldMember.guild.id].checker
  
  if(values === undefined) return;
  if(values === 0) return;
  if(values === 1) {
    var log = JSON.parse(fs.readFileSync('./src/database/logging.json', 'utf8')) 
    if(!log) return;
    let channel = oldMember.guild.channels.get(`${log[oldMember.guild.id].channel}`);
    if(!channel) return;
      
        if (channel != null) {
        switch(change) {
            case Changes.unknown:
            let embed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription('**User Update** ' + newMember)
                channel.send(embed);
                break;
            case Changes.addedRole:
            let embed2 = new Discord.RichEmbed() 
            .setColor(color)
            .setAuthor(`${newMember.user.tag} | Added Role`, newMember.user.displayAvatarURL) 
            .setDescription(`${newMember.user} **was given the \`${addedRole}\` role**`)
            .setFooter(`ID: ${newMember.user.id}`).setTimestamp() 
                channel.send(embed2)
                break;
            case Changes.removedRole:
            let embed3 = new Discord.RichEmbed() 
            .setColor(color)
            .setAuthor(`${newMember.user.tag} | Removed Role`,  newMember.user.displayAvatarURL) 
            .setDescription(`${newMember} **was removed from the \`${removedRole}\` role**`)
            .setFooter(`ID: ${newMember.user.id}`).setTimestamp() 
                channel.send(embed3)
                break;
            case Changes.username:
            let embed4 = new Discord.RichEmbed() 
            .setColor(color)
            .setAuthor(`${newMember.user.username} | Username Changed`, newMember.user.displayAvatarURL) 
            .setDescription('**Username changed from** ' +
                    oldMember.user.username + '#' + oldMember.user.discriminator + ' **to** ' +
                    newMember.user.username + '#' + newMember.user.discriminator)
            .setFooter(`ID: ${newMember.id}`).setTimestamp() 
                channel.send(embed4)
                break;
            case Changes.nickname:
            let embed5 = new Discord.RichEmbed() 
            .setColor(color)
            .setAuthor(`${newMember.user.tag} | Nickname Changed`, newMember.user.displayAvatarURL) 
            .addField('Before', oldMember.nickname != null ? `${oldMember.nickname}` : `${oldMember.user.tag}`) 
            .addField('After', newMember.nickname != null ? `${newMember.nickname}` : `${newMember.user.tag}`)
            .setFooter(`ID: ${newMember.user.id}`).setTimestamp() 
            channel.send(embed5)
                break;
            case Changes.avatar:
          let embed6 = new Discord.RichEmbed() 
          .setColor(color)
          .setAuthor(`${newMember.user.tag} | Avatar Changed`, newMember.user.displayAvatarURL)
          .setDescription(`**${newMember.user.tag} Changed their avatar**`);
                break;
    }

  }
  }
};