let balance = require("../../database/balance.json");

exports.run = async (client, message, args) => {
  if (message.channel.type == "dm") return;  
  
  let member = message.mentions.users.first() || client.users.get(args[0]);
  if (!member) member = message.author;
  if (member.bot) return message.channel.send(`**${message.author.username}**, Bot don't have a balance!`);
  //!coins
  //WAJIB biar ga undefined
    if(!balance[member.id]){
      balance[member.id] = {
      balance: 0
      };
    }
    //wajib biar ga undefined
    if(!balance[member.id]){
    balance[member.id] = {
      balance: 0
    };
    }
  //buat read json  
  let uBalance = balance[member.id].balance;
  if (uBalance == 0) {
    message.channel.send(`**${member.username} do not have a balance yet!**`);
  } else {
  message.channel.send(`**${member.username}** have a balance of 💴 **${uBalance}**`);
  }
}

exports.conf = {
    aliases: ["bal"],
    cooldown: "5"
}

exports.help = {
    name: 'balance',
    description: 'To show someone Balance Amount',
    usage: 'balance [@mention]'
}