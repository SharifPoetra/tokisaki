let fs = require('fs');
let bal = require('../../database/balance.json');
const { bot_prefix } = require('../../config.json');

function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}

exports.run = (client, message, args) => {
  let prefix = bot_prefix;
    if(!bal[message.author.id]){
      bal[message.author.id] = {
        balance: 0
      };
    } 
    
    let colour = args[0];
    let money = args[1];
    
    
    if (!money) return message.channel.send(`Usage: \`${prefix}roulette <black, red, green> <amount>\`\nPick any of the colours you want... but some are more likely than others...\n**Black is for Even numbers**... **and Red is for odd**... both of these will provide you with **1.5x your original amount**.\nTake a risk and pick **Green** and you can get **14x the amount of money**... however it's one in 37.`); //help
    if (isNaN(money)) return message.channel.send(`**${message.author.username}**, Please enter valid number!`);
    if (money > 500) money = 500;
    if (bal[message.author.id].balance < money) return message.channel.send(`**${message.author.username}**, Sorry, you are betting more than you have!`);
    if (!colour)  return message.channel.send(`**${message.author.username}**, You can only bet on Black (1.5x), Red (1.5x), or Green (14x).`);
    colour = colour.toLowerCase()
    
    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(`**${message.author.username}**, You can only bet on Black (1.5x), Red (1.5x), or Green (14x).`);
    
    let random = Math.floor(Math.random() * 37);
    
    if (random == 0 && colour == 2) { // Hijau
        money *= 14
      let curBal1 = bal[message.author.id].balance
      bal[message.author.id].balance = curBal1 + money;
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`**${message.author.username}**, 💚 **JACKPOT** You won 💴 **${money}** 💚 | The Number was **${random}**`);
          if(err) console.log(err)
        });
    } else if (isOdd(random) && colour == 1) { // Merah
        money = money * 1.5
      let curBal2 = bal[message.author.id].balance
      bal[message.author.id].balance = curBal2 + money
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`**${message.author.username}**, 🔴 You won 💴 **${money}** 🔴 | The Number was **${random}**`);
          if(err) console.log(err) 
        });
    } else if (!isOdd(random) && colour == 0) { // Hitam
        money = money * 1.5
      let curBal3 = bal[message.author.id].balance
      bal[message.author.id].balance = curBal3 + money
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`**${message.author.username}**, ⚫ You won 💴 **${money}** ⚫| The Number was **${random}**`);
          if(err) console.log(err) ;
        });
    } else { // Lost
      let curBal4 = bal[message.author.id].balance
        bal[message.author.id].balance = curBal4 - money;
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`**${message.author.username}**, You sadly lost 💴 **${money}** | The Number was **${random}**`);
          if(err) console.log(err) 
        });
    }

};
exports.conf = {
    aliases: ['rl'],
    cooldown: '10'
};
    
exports.help = {
    name: 'roulette',
    description: 'Allows you to spend your Balance on a game of Roulette.',
    usage: 'roulette <black/red/green> <amount>'
};