const Discord = require('discord.js');
const fs = require('fs');
let info = require('../../database/note.json');

exports.run = async (client, message, args, color) => {
  
  if(!info[message.author.id]){
    info[message.author.id] = {
      note: 'This user has\nNot set info yet.'
    } 
  }
  let newInfo = args.join(' ');
  let len = 115;
  if(!newInfo) return args.missing(message, 'You need to specify the message to set your info box', client.commands.get('setinfo').help);
  if(newInfo.length > len) return message.channel.send(`**${message.author.username}** *thats to length*, **Max \`115\` Characters Allowed.**`);
  let newsInfo = client.util.chunk(newInfo, 23).join('\n');
  info[message.author.id].note = newsInfo;
  let h = await message.channel.send('*Please Wait...*');
  fs.writeFile('./src/database/note.json', JSON.stringify(info, null, 2), (err) => {
    
    let notesEmbed = new Discord.RichEmbed() 
      .setColor(color)
      .setAuthor(`Your Info box has been set and will be look like this:`, message.author.displayAvatarURL)
      .setDescription(newsInfo)
    message.channel.send(notesEmbed).then(()=>{ h.delete()});
  });
  

}

exports.conf = {
    aliases: ['setbio'],
    cooldown: "10"
}

exports.help = {
    name: "setinfo",
    description: "Set your info then tell your friends about you",
    usage: "setinfo <text>"
}
