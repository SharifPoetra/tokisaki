exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send(`**${message.author.username}, Sorry, you need \`MUTE_MEMBERS\` Permission to use this commands**!`).then(msg=>msg.delete(7000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(`**${message.author.username}, Sorry, I need the following permission to \`mute\` command to work: \`MANAGE_ROLES\`**`).then(msg=>msg.delete(7000));

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) return message.channel.send(`**${message.author.username}, Sorry, I can't find the user you mean**!`);
    
    let muterole = message.guild.roles.find(x => x.name === 'Muted');
    if (!muterole) {
        try {
            muterole = await message.guild.createRole({
                name: 'Muted',
                color: '#000000',
                permission: [] 
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTION: false,
                    CONNECT: false
                });
            });
        } catch(e) {
            console.log(e.message);
        }
    };

    if (member.roles.has(muterole.id)) return message.channel.send(`**${member.user.username}** Has already muted.`)
    await (member.addRole(muterole.id));
    message.channel.send(`**${member.user.username}, Has been muted**.`);
}

exports.conf = {
    aliases: []
}

exports.help = {
    name: "mute",
    description: "Mute someone annoying",
    usage: "mute @mention"
}
