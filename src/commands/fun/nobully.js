const { RichEmbed } = require('discord.js');
const actions = require('../../assets/json/nobully.json');

exports.run = async (client, message, args, color) => {
  
  if (message.mentions.users.first() === client.user) return message.channel.send(`(✿´ ꒳ \` ) am not bulli!!`);
  const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        if (!recipient) {
            const embed = new RichEmbed()
                .setColor(color)
                .setImage(actions[Math.round(Math.random() * (actions.length - 1))]);
            return message.channel.send({ embed: embed });
        } else {
            const embed = new RichEmbed()
                .setColor(color)
                .setDescription(`**${recipient}**, pls no bulli!!`) 
                .setImage(actions[Math.round(Math.random() * (actions.length - 1))]);
            return message.channel.send({ embed: embed });
        }
}
exports.conf = {
    aliases: ['antibully'],
    cooldown: ""
}

exports.help = {
    name: "nobully",
    description: "Transform Anti bully Akari",
    usage: "nobully [@user]"
}
