const { get } = require("node-superfetch");

exports.run = async (client, message, args, color, prefix) => {
  
  const shipped = message.mentions.members.size === 2 ? message.mentions.members.array()[1] : message.member;
    const shipper = message.mentions.members.size === 1 || message.mentions.members.size === 2 ? message.mentions.members.array()[0] : message.member;
    const first_length = Math.round(shipper.displayName.length / 2);
    const first_half = shipper.displayName.slice(0, first_length);
    const second_length = Math.round(shipped.displayName.length / 2);
    const second_half = shipped.displayName.slice(second_length);
    const final_name = first_half + second_half;
    const score = Math.random() * (0, 100);
    const prog_bar = Math.ceil(Math.round(score) / 100 * 10);
    const counter = "▰".repeat(prog_bar) + "▱".repeat(10 - prog_bar);
    const m = await message.channel.send('*Please Wait...*');
  message.channel.startTyping();
    const { body } = await get(`https://nekobot.xyz/api/imagegen?type=ship&user1=${shipper.user.displayAvatarURL}&user2=${shipped.user.displayAvatarURL}`);

    return message.channel.send({
      embed: {
        "title": `${shipper.displayName} ❤ ${shipped.displayName}`,
        "description": `**Love %**\n${counter}\n\n${final_name}`,
        "url": body.message,
        "color": 6192321,
        "image": {
          "url": body.message
        },
        "footer": {
          "icon_url": message.author.displayAvatarURL,
          "text": `Request by ${message.author.tag} | ${client.user.username} v${client.version}`
        }
      }
    }).then(() => {m.delete(); message.channel.stopTyping();});

}

exports.conf = {
    aliases: [],
    cooldown: ""
}

exports.help = {
    name: "ship",
    description: "Ship user1 and user2",
    usage: "ship [@user1] [@user2]"
}
