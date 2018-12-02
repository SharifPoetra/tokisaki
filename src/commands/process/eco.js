const fs = require('fs');
let bal = require('../../database/balance.json');
const fishh = require('../../database/fish.json');
const { owners_id } = require('../../config.json');

exports.run = async (client, message, args, color) => {
  
  owners_id.forEach(async function(owner){
    if(message.author.id !== owner) return;
  
  
  var user = message.mentions.users.first() || client.users.get(args[1]);
  if(!user) return message.channel.send(`**${message.author.username}**, Please mention the user or use the user id to set.`);

  if(!fishh[user.id]){
  	fishh[user.id] = {
    	fish: 0
 	}; 
  } 
  
  if(!bal[user.id]){
    bal[user.id] = {
      balance: 0
    };
  }
    
    var amount = parseInt(args[2]);
    
  if(!amount) return message.channel.send(`**${message.author.username}**, Please enter the amount to set.`);
  if(isNaN(amount)) return message.channel.send(`**${message.author.username}**, Please enter a valid number!`);
    
  if(args[0] === 'bal' || args[0] === 'balance'){
    let curBal = bal[user.id].balance;
    bal[user.id].balance = amount;
    fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2),(err) => {
      message.channel.send(`Balance for **${user.username}** has been set to 💴 **${amount}** \`😃\`!`);
      if(err) console.log(err);
    });
  }
  
  if(args[0] === 'fish'){
    let curFish = fishh[user.id].fish;
    fishh[user.id].fish = amount;
    fs.writeFile('./src/database/fish.json', JSON.stringify(fishh, null, 2),(err) => {
      message.channel.send(`Fish for **${user.username}** has been set to 🎣 **${amount}** \`😃\`!`);
      if(err) console.log(err);
    });
  }
 
  });
}

exports.conf = {
    aliases: ['seteco'],
    cooldown: ""
}

exports.help = {
    name: "eco",
    description: "Set the user economy",
    usage: "eco <key> <@user> <args>"
}
