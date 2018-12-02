const Discord = require("discord.js");
const fs = require("fs");
const { owners_id } = require('../../config.json');
let blacklist = require("../../database/blacklist.json");

exports.run = async (client, message, args, color) => {  
  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;
    
  const bl = client.channels.get("503584630037807124");

  let pUser = message.mentions.users.first() || client.users.get(args[0]);
  
  if (!pUser) return args.missing(message, 'Baka!!! Mention the user or give me the ID to whitelisted.', client.commands.get('whitelist').help);
  
    blacklist[pUser.id] = {
    checker: 0
  };
  
  pUser.send(`You\'ve been **Whitelist** from using **${client.user.username}**, Please don\'t violating our rules again!`)
  bl.send(`**${pUser.id}** has been whitelisted.`)
  message.channel.send(`**${pUser.id}** has been whitelisted.`);
  
  fs.writeFile("./src/database/blacklist.json", JSON.stringify(blacklist, null, 2), (err) => {
    if(err) console.log(err)
  });
 });
}

exports.conf = {
    aliases: ["wl"]
}

exports.help = {
    name: 'whitelist',
    description: 'To whitelist someone from using Conan',
    usage: 'whitelist <@Mention | ID>'
   } 