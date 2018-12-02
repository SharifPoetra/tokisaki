const { get } = require('node-superfetch');

exports.run = async (client, message, args, color, prefix) => {
  
  let user = message.mentions.users.first() || client.users.get(args[0]);
  
  if(!user) user = message.author;
  
  try {
    let { body } = await get('https://sharif-api-js.glitch.me/api/roast') 
    message.channel.send(`**${user.username}**, ${body.response}`)
  } catch (e) {
    message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later!`) 
  } 
    

}

exports.conf = {
    aliases: ['insult'],
    cooldown: ""
}

exports.help = {
    name: "roast",
    description: "Roasts a user.",
    usage: "roast [@user]"
}
