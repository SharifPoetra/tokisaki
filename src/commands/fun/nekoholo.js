const { get } = require('node-superfetch');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix) => {
  
  //if(!message.channel.nsfw) return message.channel.send(`**${message.author.username}**, You can't use this command here also i can't send it here because this channel not a **Nsfw** Channel!`)
  
  try {
  const { body } = await get('https://nekobot.xyz/api/image?type=holo') 
  
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
    aliases: ['nya-holo', 'holo'],
    cooldown: "3"
}

exports.help = {
    name: "nekoholo",
    description: "Search for neko holo image",
    usage: "nekoholo"
}
