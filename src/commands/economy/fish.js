const fishes = require('../../assets/json/fishy');
let bal = require('../../database/balance.json');
let fishh = require('../../database/fish.json');
const fs = require('fs');
const Discord = require('discord.js');

exports.run = async (client, message, args, color) => {

  if(!args[0]){
  if(!bal[message.author.id]){
    bal[message.author.id] = {
      balance: 0
    };
  }
  if(!fishh[message.author.id]){
    fishh[message.author.id] = {
      fish: 0
    };
  }
  
  let curFish = fishh[message.author.id].fish;
  let curBal = bal[message.author.id].balance;
  
  const fishID = Math.floor(Math.random() * 10) + 1;
		let rarity;
		if (fishID < 5) rarity = 'junk';
		else if (fishID < 8) rarity = 'common';
		else if (fishID < 9) rarity = 'uncommon';
    else if (fishID < 10) rarity = 'rare';
		else rarity = 'legendary';
		const fish = fishes[rarity];
		const worth = client.util.randomRange(fish.min, fish.max);
    bal[message.author.id].balance = curBal + worth;
    fishh[message.author.id].fish = curFish + 1;
    fs.writeFile('./src/database/fish.json', JSON.stringify(fishh, null, 2), (err) => {
      if (err) console.log(err);
    });
    fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
		let embed = new Discord.RichEmbed() 
    .setColor(color) 
    .setDescription(`🎣 | **${message.author.username}**, You caught a ${fish.symbol}. I bet it'd sell for around 💴 **${worth}**.`)
      return message.channel.send(embed);
    });
  }
  if(args[0] === 'list' || args[0] === 'reward'){
    
    let lEmbed = new Discord.RichEmbed() 
    .setColor(color)
    .setAuthor(`List fish name and reward you can get!`)
    .setDescription(`
\`\`\`🔧Junk      :: max reward: 5, min reward: 1

🐟Common    :: max reward: 25, min reward: 10

🐠Uncommon  :: max reward: 50, min reward: 18

🦑Rare      :: max reward: 75, min reward: 30

🐋Legendary :: max reward: 100, min reward: 50\`\`\`
**All reward are random from max/min**
​
`)
    .setFooter(`Request by: ${message.author.tag} | ${client.user.username} v${client.version}`)
    message.channel.send(lEmbed);
  } 
  
	}

exports.conf = {
    aliases: ['fishy', 'fishing'],
    cooldown: "17"
}

exports.help = {
    name: "fish",
    description: "Go fishing.",
    usage: "fish [list]"
}
