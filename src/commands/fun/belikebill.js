
const { get } = require('node-superfetch');

exports.run = async (client, message, args, color, prefix) => {
  
  let user = message.mentions.users.first() || client.users.get(args[0]);
  
  if(!user) user = message.author;
  
  try {
    let { body } = await get('https://sharif-api-js.glitch.me/api/belikebill')
    const text = await body.response.replace(/{{name}}/gi, user.username)
    message.channel.send(`
This is ${user.username}.

${text}

${user.username} is smart.
Be like ${user.username}.
`) 
  } catch (e) {
    message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later!`) 
  } 
    

}

exports.conf = {
    aliases: ['blbl', 'belike'],
    cooldown: ""
}

exports.help = {
    name: "belikebill",
    description: "Sends a 'Be Like Bill' meme with the name of your choice.",
    usage: "belikebill [@user]"
}
