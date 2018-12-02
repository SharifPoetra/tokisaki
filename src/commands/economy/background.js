const Discord = require('discord.js');
const fs = require('fs');
let bg = require('../../database/background.json');
let bal = require('../../database/balance.json');

exports.run = async (client, message, args, color) => {

  if(!bg[message.author.id]){
    bg[message.author.id] = {
      background: 'http://bit.ly/2NS6CSb'
    };
  }
  if(!bal[message.author.id]){
    bal[message.author.id] = {
      balance: 0
    };
  }
  
  let amount = 250;
  
  if (bal[message.author.id].balance < amount) return message.channel.send(`**${message.author.username}**, You not have insufficient balance yet you need 💴 **${amount}** for changes background, Keep active and don't forget to take your daily everyday!`) 
  
  let newBg = message.attachments.first();
  if(!newBg) return args.missing(message, 'You need to upload the image to set new background', client.commands.get('background').help);
  bg[message.author.id].background = newBg.url;
  let curbal = bal[message.author.id].balance
  bal[message.author.id].balance = curbal - amount;
  let h = await message.channel.send('*Please Wait...*');
  fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
    if (err) console.log(err)
  });
  fs.writeFile('./src/database/background.json', JSON.stringify(bg, null, 2), (err) => {
  
    let bgEmbed = new Discord.RichEmbed() 
      .setColor(color)
      .setAuthor(`Your background image has been set`, message.author.displayAvatarURL)
      .setDescription(`💴 **${amount}** has been deducted from your balance for change the profile card background!`)
    message.channel.send(bgEmbed).then(()=>{ h.delete()});
  });
  

}

exports.conf = {
    aliases: ['bg'],
    cooldown: "10"
}

exports.help = {
    name: "background",
    description: "Set your profile card background (upload image)",
    usage: "background <attachments>"
}
