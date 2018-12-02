const { owners_id } = require('../../../src/config');
const { loadImage } = require('canvas');
const { Canvas } = require('canvas-constructor');
const { get } = require('node-superfetch');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, color) => {
	let user = message.mentions.users.first() || client.users.get(args[1]);
	if(!user) user = message.author;
	if(!args[0]) return args.missing(message, 'You must select from bravery or balance.', client.commands.get('hypesquad').help);

  if (`${args[0]}` === `bravery`) {
	const { body: plate } = await get('https://cdn.discordapp.com/attachments/498790982083543070/498791065101533205/BraveryCadre.png');// link gambarnya, yg di storage aja tuu
	const { body: ava } = await get(user.displayAvatarURL.replace(/\.gif/g, '.png'));
	const { width, height } = await loadImage(ava); 
	const attachment = new Canvas(width, height)
	.addImage(ava, 0, 0, width, height)
	.addImage(plate, 0,0, width, height)
	.toBuffer();
	let embed = new RichEmbed() 
	.setColor(color) 
	.setAuthor(`${user.username}`, user.displayAvatarURL)
	.setTitle('bravery.png')
	.attachFile({attachment: attachment, name: 'bravery.png'})
	.setImage('attachment://bravery.png') 
	return message.channel.send(embed);
	} 
  
  if (`${args[0]}` === `balance`) {
	const { body: plate } = await get('https://cdn.discordapp.com/attachments/498790982083543070/498791065101533204/Image-2.jpeg');// link gambarnya, yg di storage aja tuu
	const { body: ava } = await get(user.displayAvatarURL.replace(/\.gif/g, '.png'));
	const { width, height } = await loadImage(ava); 
	const attachment = new Canvas(width, height)
  .addImage(ava, 0, 0, width, height)
	.addImage(plate, 0,0, width, height)
	.toBuffer();
	let embed2 = new RichEmbed() 
	.setColor(color) 
	.setAuthor(`${user.username}`, user.displayAvatarURL)
	.setTitle('balance.png')
	.attachFile({attachment: attachment, name: 'balance.png'})
	.setImage('attachment://balance.png') 
	return message.channel.send(embed2);
	} 
}

exports.conf = {
	aliases: ['hs'],
	cooldown: '5' 
}

exports.help = {
	name: 'hypesquad',
	description: 'draw your/user avatar hypesquad',
	usage: 'hypesquad <bravery | balance> [@user | id]'
}