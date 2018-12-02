const Discord = require('discord.js');
const fs = require('fs');
let bal = require('../../database/balance.json');
let works = require('../../database/works.json');

exports.run = async (client, message, args, color) => {
  
  if(!bal[message.author.id]){
    bal[message.author.id] = {
      balance: 0
    };
  } 
  if(!works[message.author.id]) {
  	works[message.author.id] = {
  	 work: 0
  	};
  } 

  const Jwork = require('../../../src/work.json');
  const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];
  var random = Math.floor(Math.random() * 20) + 3;
  let curBal = bal[message.author.id].balance 
  bal[message.author.id].balance = curBal + random;
  let curWork = works[message.author.id].work
  works[message.author.id].work = curWork + 1;
  fs.writeFile('./src/database/works.json', JSON.stringify(works, null, 2), (err) => {
  	if (err) console.log(err)
  	})
  fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
    let embed = new Discord.RichEmbed() 
    .setColor(color) 
    .setDescription(`
    **\💼 | ${message.author.username}**, ${JworkR} 💴 **${random}**
    `) 
    message.channel.send(embed)
    if (err) console.log(err)
  });
}

exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "work",
    description: "Go work and get your reward don\'t be lazy",
    usage: "work"
}
