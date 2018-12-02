const { RichEmbed } = require('discord.js');
const { clean } = require('./eval.js');
const { owners_id } = require('../../config.json');

exports.run = async (client, msg, args) => {
	owners_id.forEach(async function(owner) {
    if (msg.author.id !== owner) return;
	
	if(args.length < 1) return args.missing(msg, 'No code provided', this.help);
	const tadi = Date.now();
	const input = client.util.codeblock(args.join(' '), 'js');
	if(input.length > 1024) input = await client.util.hastebin(args.join(' '));
	const embed = new RichEmbed()
	.addField('📥 INPUT', input);
	try{
		args = args.join(' ').trim().split('--');
		let link = await eval(`client.snek.${args[0]}`);
		if(args[1] !== undefined) link = eval(`link.${args[1]}`);
		link = require('util').inspect(link);
		link = clean(link);
		if(link.length > 1024) link = await client.util.hastebin(link);
		else link = client.util.codeblock(link, 'js');
		embed.addField('📤 OUTPUT', link);
		embed.setColor('#81FF00');
		embed.setFooter(`\`${Date.now()-tadi}ms\``);
		return msg.channel.send(embed);
	}catch(e){
		let err = clean(e.message);
		err = client.util.codeblock(e.message, 'ini');
		if(err.length > 1024) err = await client.util.hastebin(e.message);
		embed.addField('⛔ ERROR', err);
		embed.setColor('#FF0023');
		embed.setFooter(`\`${Date.now() - tadi}ms\``);
		return msg.channel.send(embed);
	}
	})
}

exports.conf = {
  aliases: ['snek'],
  cooldown: '0'
}

exports.help = {
  name: 'snekfetch',
  description: 'make http request using some code',
  usage: 'snekfetch <code>',
  example: ['snekfetch https://random.dog/woof.json --body']
}