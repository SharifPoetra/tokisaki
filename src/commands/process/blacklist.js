
const fs = require("fs");
const { owners_id } = require('../../config.json');
let blacklist = require("../../database/blacklist.json");

exports.run = async (client, message, args, color) => {  
  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;
    
  const bl = client.channels.get("503584630037807124");
  
    let pUser = message.mentions.users.first() || client.users.get(args[0]);
  
  if (!pUser) return args.missing(message, 'Baka!!! Mention the user or give me the ID to blacklisted.', client.commands.get('blacklist').help);
  
    blacklist[pUser.id] = {
    checker: 1
  };
  
  bl.send(`**${pUser.id}** has been excluded from using the bot.`)
  
  message.delete()
  message.channel.send(`**${pUser.id}** has been excluded from using the bot!`);
  
  fs.writeFile("./src/database/blacklist.json", JSON.stringify(blacklist, null, 2), (err) => {
    if(err) console.log(err)
  });
 });
}

exports.conf = {
    aliases: ["bl"]
}

exports.help = {
    name: 'blacklist',
    description: 'To blacklist user from using the bot',
    usage: 'blacklist <@Mention | ID>' 
}