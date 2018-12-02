const { get } = require('node-superfetch');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix) => {
  
  try {
  const { body } = await get('https://nekobot.xyz/api/image?type=kemonomimi') 
  
  let embed = new RichEmbed() 
  .setColor(color)
  .setDescription(`**[Click here if image failed to load](${body.message})**`) 
  .setImage(body.message)
  .setFooter(`Request by: ${message.author.tag} | ${client.user.username} v${client.version}`) 
  message.channel.send(embed);
  } catch (e) {
    message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later!`) 
  } 

}

exports.conf = {
    aliases: ['knmm'],
    cooldown: "3"
}

exports.help = {
    name: "kemonomimi",
    description: "Search for kemonomimi image",
    usage: "kemonomimi"
}
