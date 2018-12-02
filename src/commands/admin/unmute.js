exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`**${message.author.username}, Sorry, you need \`MANAGE_MESSAGES\` Permission to use this commands**!`).then(msg=>msg.delete(7000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author.username}, Sorry, I need the following permission to \`mute\` command to work: \`MANAGE_ROLES\`**!`).then(msg=>msg.delete(7000));

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(`**${message.author.username}, Sorry, I can't find the user you mean**!`).then(msg=>msg.delete(7000));
    
    let muterole = message.guild.roles.find(x => x.name === 'Muted');
    if (!member.roles.has(muterole.id)) return message.channel.send(`**${member.user.username} Not muted yet**.`).then(msg=>msg.delete(7000));
    await (member.removeRole(muterole.id));
    message.channel.send(`**${member.user.username} Has been unmuted**.`);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "unmute",
    description: "Unmute someone",
    usage: "unmute @mention"
}
