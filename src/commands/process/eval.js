const { RichEmbed } = require('discord.js');
const { owners_id } = require("../../config.json");
const snek = require('node-superfetch');
const path = require("path");
const db = require('quick.db');
const Economy = require("discordeco.js");
const choice = ['🚫'] 

exports.run = async (client, message, args, color) => {
  var bot = client;
  var msg = message;

  owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;

    const embed = new RichEmbed()
    .setColor(color)
    .addField('Input', '```js\n' + args.join(" ") + '```')

    try {
      const code = args.join(" ");
      if (!code) return args.missing(message, 'BAKA!! I cannot execute anything >:(', client.commands.get('eval').help);
      let evaled;
      if (code.includes(`token`)) {
        evaled = 'Thats bad... Too bad Onii-chan';
      } else {
        evaled = eval(code);
      }

      if (typeof evaled !== "string")
      evaled = require('util').inspect(evaled, { depth: 0});

      let output = clean(evaled);
      if (output.length > 1024) {
          const { body } = await snek.post('https://www.hastebin.com/documents').send(output);
          embed.addField('Output', `https://www.hastebin.com/${body.key}.js`);
      } else {
          embed.addField('Output', '```js\n' + output + '```');
      }
      message.channel.send(embed);
    } catch (e) {
      let error = clean(e);
      if (error.length > 1024) {
          const { body } = await snek.post('https://www.hastebin.com/documents').send(error);
          embed.addField('Error', `https://www.hastebin.com/${body.key}.js`);
      } else {
          embed.addField('Error', '```js\n' + error + '```');
      }
      message.channel.send(embed);
    }
  });
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

exports.clean = (text) => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

exports.conf = {
  aliases: ["ev", "e"],
  cooldowns: '0'
}

exports.help = {
  name: "eval",
  description: "evaluated",
  usage: "eval <some super javascript code>"
}