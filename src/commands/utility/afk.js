const fs = require('fs');

exports.run = async (client, message, args) => {
  let data = JSON.parse(fs.readFileSync('./src/database/afk.json', 'utf8')),
    reason = args.join(" ");
  if (!reason) reason = "";
  if (Object.keys(data).includes(message.author.id)) return message.reply("You are in AFK mode already!");
  data[message.author.id] = reason;
  message.channel.send(`⌨️ | ${message.author.toString()}, I\'ve set you to AFK mode.`);
  fs.writeFile('./src/database/afk.json', JSON.stringify(data), (err) => {
    if (err) console.log(err.stack);
  });
};

exports.conf = {
  aliases: [],
  cooldown: 1
};

exports.help = {
  name: "afk",
  description: "Run this so that I can tell them you're not around.",
  usage: "afk [why-you-afk]",
};