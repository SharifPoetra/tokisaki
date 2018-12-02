const { RichEmbed } = require('discord.js');
const { get } = require('node-superfetch');

exports.run = async(client, message, args, color) => {
	
	var user = message.mentions.users.first() || client.users.get(args[0]);
	if (!user) return args.missing(message, 'You need to mention user you want to hug', client.commands.get('hug').help);
	
	const { body } = await get('https://nekos.life/api/v2/img/hug');
	
	var embed = new RichEmbed()
	if(user.id === message.author.id) {
		embed.setDescription(`**${message.author.username}**, Are you alone? Okay here some hug for you.`)
		embed.setImage(body.url).setColor(color) 
	    embed.setFooter(`Request by: ${message.author.tag} | ${client.user.username} v${client.version}`) 
	} else if(user.id === client.user) {
	embed.setDescription(`Oh thanks **${message.author.username}** for giving me your hugs, So cute.`)
	embed.setImage(body.url).setColor(color) 
	embed.setFooter(`Request by: ${message.author.tag} | ${client.user.username} v${client.version}`) 
	} else {
	embed.setDescription(`**${message.author.username}** hugs **${user.username}**`)
	embed.setImage(body.url)
	embed.setFooter(`Request by: ${message.author.tag} | ${client.user.username} v${client.version}`) 
	} 
	embed.setColor(color)
	return message.channel.send(embed);
	
	} 
	exports.conf = {
		aliases: [], 
		cooldown: '0'
	}
   exports.help = {
   	name: 'hug', 
       description: 'give someone a cute hug', 
       usage: 'hug <@user | id>' 
   } 