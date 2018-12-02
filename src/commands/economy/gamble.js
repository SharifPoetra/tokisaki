let fs = require('fs');
let bal = require('../../database/balance.json');
const { bot_prefix } = require('../../config.json');

function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}

exports.run = (client, message, args) => {
  
  //if(message.author.id !== '444454206800396309') return message.channel.send('Currently in development!');
  let prefix = bot_prefix;
    if(!bal[message.author.id]){
      bal[message.author.id] = {
        balance: 0
      };
    } 
    
    let money = args[0]
    
    if (!money) {
    	money = 10;
    	} 
    if (isNaN(money)) return message.channel.send(`**${message.author.username}**, Please enter valid number!`);
    if (money > 500) money = 500;
    if (bal[message.author.id].balance < money) return message.channel.send(`**${message.author.username}**, Sorry, you are betting more than you have!`);
  
    let random = Math.floor(Math.random() * 37);
    
    if (random == 0) { // Jackpot
        money *= 10
      let curBal1 = bal[message.author.id].balance
      bal[message.author.id].balance = curBal1 + money;
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`🎲 | **${message.author}**, 🎉🎉 **JACKPOT** You won 💴 **${money}** 🎉🎉 Wow Congrats 🎉`);
          if(err) console.log(err)
        });
    } else if (random == 5) { // win
        money = money * 2.50
      let curBal2 = bal[message.author.id].balance
      bal[message.author.id].balance = curBal2 + money
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 💴 **${money}** 🎉 and got keep what you had.`);
          if(err) console.log(err) 
        });
    } else if (random == 10) { // win
        money = money * 2.50
      let curBal2 = bal[message.author.id].balance
      bal[message.author.id].balance = curBal2 + money
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 💴 **${money}** 🎉 and got keep what you had.`);
          if(err) console.log(err) 
        });
    } else if (random == 15) { // Win
        money = money * 2.50
      let curBal3 = bal[message.author.id].balance
      bal[message.author.id].balance = curBal3 + money
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 💴 **${money}** 🎉 and got keep what you had.`);
          if(err) console.log(err) ;
        });
    } else if (random == 20) { // win
        money = money * 2.50
      let curBal4 = bal[message.author.id].balance
      bal[message.author.id].balance = curBal4 + money
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 💴 **${money}** 🎉 and got keep what you had.`);
          if(err) console.log(err) 
        });
} else if (random == 25) { // Win
        money = money * 2.50
      let curBal3 = bal[message.author.id].balance
      bal[message.author.id].balance = curBal3 + money
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 💴 **${money}** 🎉 and got keep what you had.`);
          if(err) console.log(err) ;
        });
    } else if (random == 30) { // Win
        money = money * 2.50
      let curBal3 = bal[message.author.id].balance
      bal[message.author.id].balance = curBal3 + money
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`🎲 | Congrats **${message.author.username}**, 🎉 You won 💴 **${money}** 🎉 and got keep what you had.`);
          if(err) console.log(err) ;
        });
    } else { // Lost
      let curBal5 = bal[message.author.id].balance
        bal[message.author.id].balance = curBal5 - money;
        fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
        message.channel.send(`🎲 | **${message.author.username}**, You sadly lost 💴 **${money}**, I hope you do better next time 😦`);
          if(err) console.log(err) 
        });
    }

};
exports.conf = {
    aliases: ['gambling'],
    cooldown: '10'
};
    
exports.help = {
    name: 'gamble',
    description: 'Allows you to spend your Balance on a game of Gamble.',
    usage: 'gamble <amount>'
};