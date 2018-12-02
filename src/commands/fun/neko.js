const { get } = require('node-superfetch');
const { RichEmbed } = require('discord.js');

function showNeko (client, msg, args){
	try{
		return exports.getNeko(msg.channel);
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

exports.getNeko = async (channel, extend = '') => {
  
  try {
  const { body } = await get('https://nekobot.xyz/api/image?type=neko') 
  
  let ctx = new RichEmbed()
  ctx.setColor('RANDOM')
  ctx.setDescription(`**[Click here if image failed to load](${body.message})**`) 
  ctx.setImage(body.message) 
  return channel.send(extend, {embed: ctx});
  } catch (e) {
   channel.send(`Oh no an error occurred :( \`${e.message}\` try again later!`) 
  } 

}

exports.conf = {
    aliases: ['nya'],
    cooldown: "3"
}

exports.help = {
    name: "neko",
    description: "Search for neko image, if you want the bot send a neko every one hours please make a channel named `neko-present` or `bot-spam`.",
    usage: "neko"
}

this.run = showNeko;