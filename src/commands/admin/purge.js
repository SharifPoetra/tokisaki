exports.run = async (client, message, args, color) => {
  
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**${message.author.username}, Sorry but you need \`MANAGE_MESSAGES\` Permission to use this command.**`).then(m => m.delete(7000));
  
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**${message.author.username}, Uh i want do this but i need following permission to \`purge\` to work: \`MANAGE_MESSAGES\`**`).then(x => x.delete(7000));
  
  if (isNaN(args[0])) return message.channel.send(`**${message.author.username}, Please supply a valid amount of messages to purge**!`);
  
  if (args[0] > 100) return message.channel.send(`**${message.author.username}, Please supply a number less than 100**!`).then(u => u.delete(7000));
  
  message.channel.bulkDelete(args[0])
    .then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages.**`).then(msg => msg.delete({
      timeout: 5000
    })))
  
}

exports.conf = {
    aliases: ['prune', 'clear'],
    cooldown: "5"
}

exports.help = {
    name: "purge",
    description: "Removes last of messages from the channel (up to 99)",
    usage: "purge <number>"
}
