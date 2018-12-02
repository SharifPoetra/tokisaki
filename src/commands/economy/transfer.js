const fs = require('fs');
let bal = require('../../database/balance.json');
let ball = require('../../database/balance.json');

exports.run = async (client, message, args, color) => {
  
  let user = message.mentions.users.first() || client.users.get(args[0]);

    if(!user) return message.channel.send(`**${message.author.username}**, No user found! Please mention someone!`);
  if (user.id == message.author.id) return message.channel.send('You can\'t transfer to yourselft!');
  if(user.bot) return message.channel.send(`${message.author.username}, You can't transfer your balance to bot!`);
  if(!args[1]) return message.channel.send('Please provided the value to transfer');
	if(isNaN(args[1])) return message.channel.send('Type the valid value!');

  if(!bal[user.id]){
    bal[user.id] = {
      balance: 0
    };
  }
  if(!ball[message.author.id]){
    ball[message.author.id] = {
      balance: 0
    };
  }

   if(ball[message.author.id].balance < args[1]) return message.channel.send(`Check again **${message.author.username}**, You dont have \💴**${args[1]}**`);

  var curBal = bal[user.id].balance;
  let curBall = ball[message.author.id].balance;
 
  bal[user.id].balance = curBal + parseInt(args[1])
  fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
    user.send(`\🏧  | **Transfer Receipt**\`\`\`You have received 💴 ${args[1]} from user ${message.author.tag}\n(ID: ${message.author.id})\`\`\``);
    if(err) console.log(err);
  });
  ball[message.author.id].balance = curBall - parseInt(args[1])
  fs.writeFile('./src/database/balance.json', JSON.stringify(ball, null, 2), (err) => {
    message.channel.send(`Hey **${user.tag}**, You got \💴 **${args[1]}** from **${message.author.tag}**`);
    if(err) console.log(err);
  });

}

exports.conf = {
    aliases: ['tf'],
    cooldown: "5"
}

exports.help = {
    name: "transfer",
    description: "Transfer balance to other user",
    usage: "transfer <@user|id> <amount>"
}
