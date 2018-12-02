const fs = require('fs');
const Discord = require('discord.js');

exports.run = async(client, message, args, color, prefix) => {
  
var option = args.join(" ")
            if (!option) {
              var embed1 = new Discord.RichEmbed()
              .setAuthor(`${client.user.username} Logging`, client.user.displayAvatarURL)
              .setColor('RANDOM')
              .setDescription(`
**Proper Usage:**
• ${prefix}logging set \`#tagchannel\`
• ${prefix}logging on
• ${prefix}logging off

**Example:**
• ${prefix}logging set \`#mod-log\`

**After do that, do again:**
• ${prefix}logging on
`)
              .setFooter("Logging Announcement")
              .setTimestamp()
              message.channel.send(embed1);
            } else {
              if (option.match("set")) {
            var channel = JSON.parse(fs.readFileSync("./src/database/logging.json", "utf8"))
            if (!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== '475230849239875584') return message.reply(`**${message.author.username}**, Sorry, You need permission \`Manage Guild\` to use this command!`);
            var inputmessage = message.mentions.channels.first()
            if (args[0]) {
              channel[message.guild.id] = {
                channel: inputmessage.id
             };
              fs.writeFile("./src/database/logging.json", JSON.stringify(channel, null, 2), (err) => {
                if (err) console.log(err)
             });
              
              var embed2 = new Discord.RichEmbed()
              .setColor(color)
              .setDescription(`Logging channel set to: ${inputmessage}`)
              .setTimestamp().setFooter(`Logging channel`, client.user.displayAvatarURL)      
              message.channel.send(embed2);
            }
            }
            }
  
            if (option.match("on")) {
            var welcomesetting = JSON.parse(fs.readFileSync("./src/database/logonoff.json", "utf8"));
            welcomesetting[message.guild.id] = {
                checker: 1
                };
                  fs.writeFile("./src/database/logonoff.json", JSON.stringify(welcomesetting, null, 2), (err) => {
                    console.error(err)
                 })
                var embed3 = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setDescription(`Logging has been set **on**.`)
                .setTimestamp()
                .setFooter("Logging enable", client.user.displayAvatarURL)
                
                message.channel.send(embed3);
            }
            if (option.match("off")) {
            var welcomesetting = JSON.parse(fs.readFileSync("./src/database/logonoff.json", "utf8"));
            welcomesetting[message.guild.id] = {
                checker: 0
                };
                  fs.writeFile("./src/database/logonoff.json", JSON.stringify(welcomesetting, null, 2), (err) => {
                    console.error(err)
                 })
                var embed4 = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setDescription(`Logging has been set **off**.`)
                .setTimestamp()
                .setFooter("Logging disable", client.user.displayAvatarURL)
                
                message.channel.send(embed4);
            } 
} 

exports.conf = {
  aliases: ['log'], 
  cooldown: '5'
} 
exports.help = {
  name: 'logging', 
  description: 'Set the logging to the channel like \`Message Edited\`, \`Message Deleted\` and more!', 
  usage: 'logging'
} 