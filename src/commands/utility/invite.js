const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, color, prefix) => {
  
  let embed = new RichEmbed() 
  .setColor(color)
  .setDescription('**[Click Here](https://discordapp.com/oauth2/authorize?client_id=500547370245685249&scope=bot&permissions=1517419646)** To Invite Me to your server!')
  message.channel.send(embed);

}

exports.conf = {
    aliases: [],
    cooldown: "5"
}

exports.help = {
    name: "invite",
    description: "invite the bot to your server",
    usage: "invite"
}
