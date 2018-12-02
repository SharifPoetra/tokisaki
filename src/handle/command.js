const { bot_prefix, embed_color } = require('../config.json');
const { Collection, RichEmbed } = require('discord.js');
const cooldowns = new Collection();
const cooldownAns = require('./cooldownAns.json');
const fs = require('fs');
const db = require('quick.db');

module.exports = async (client, message) => {
    let prefix = message.content.startsWith(bot_prefix) ? bot_prefix : `${client.user.toString()} `;
    let color = embed_color;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    args.missing = argsMissing;
    
   let blacklist = JSON.parse(fs.readFileSync("./src/database/blacklist.json", "utf8"));
  if (!blacklist[message.author.id]) {
    blacklist[message.author.id] = {
     values: 0
      };  
    }
  let values = blacklist[message.author.id].checker
    if (values === 1) {
      message.author.send(`Sorry, you\'ve been **BLACKLISTED** from using ${client.user.username} because violating **Our Rules**. Contact Sharif#9781 ( bot owner ) if you want to appeal.`);
    } else {

    // cooldowns command
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!commandFile) return;
    if (!cooldowns.has(commandFile.help.name)) {
        cooldowns.set(commandFile.help.name, new Collection());
    }
    const member = message.member;
    const now = Date.now();
    const timestamps = cooldowns.get(commandFile.help.name);
    const cooldownAmount = (commandFile.conf.cooldown || 5) * 1000;
    const opss = cooldownAns[Math.floor(Math.random() * cooldownAns.length)];

    if (!timestamps.has(member.id)) {
        timestamps.set(member.id, now);
    } else {
        const expirationTime = timestamps.get(member.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`⏱ | **${member.user.username}**, ${opss} (Ratelimited)\n**You'll be able to use this command again in** **${timeLeft.toFixed(1)} seconds.**`).then(msg=>msg.delete(10000));
        }

        timestamps.set(member.id, now);
        setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    }
  
    // command handler
  try {
  let commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  commands.run(client, message, args, color, prefix);
  if (!commands) return;
  } catch (e) {
      console.error(e)
  } finally {
  console.info(`${message.author.tag}[${message.author.id}] is using ${message.content.split(" ")[0].replace(prefix, '')} command on shard ﹙${client.shard.id}﹚ ${message.guild.name}[${message.guild.id}]`);
  db.add('commandUsage', 1);
  }
} 

function argsMissing(message, res, help){
  const embed = new RichEmbed()
	.setColor('#FF1000')
	.setTitle('⛔ | It\'s not how you use '+ help.name)
	.addField('❓ Reason', `\`\`\`${res}\`\`\``)
	.addField('<:usage:501551862017818636> Usage', `\`\`\`${help.usage}\`\`\``)
//	.addField('Example', help.example.map(x => `\`\`\`${x}\`\`\``));
	return message.channel.send(embed);
}
}