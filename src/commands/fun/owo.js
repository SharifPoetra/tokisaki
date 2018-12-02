const { get } = require('node-superfetch');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix) => {

  const { body } = await get("https://rra.ram.moe/i/r?type=owo");

  let embed = new RichEmbed() 
  .setColor(color) 
  .setDescription(`**[Click here if the image failed to load.](https://cdn.ram.moe/${body.path.replace("/i/", "")})**`) 
  .setImage(`https://cdn.ram.moe/${body.path.replace("/i/", "")}`)
  .setFooter(`Request by: ${message.author.tag} | Powered by Weeb.sh`, message.author.displayAvatarURL) 
  message.channel.send(embed);
  
}

exports.conf = {
    aliases: ['uwu', 'UwU', 'OwO'],
    cooldown: ""
}

exports.help = {
    name: "owo",
    description: "OwO, what's this?",
    usage: "owo"
}
