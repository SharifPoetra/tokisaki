const { RichEmbed, version } = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args, color, prefix) => {
	
	let guildsEval = await client.shard.broadcastEval('this.guilds.size')
    let channelsEval = await client.shard.broadcastEval('this.channels.size')
    let usersEval = await client.shard.broadcastEval('this.users.size')
    let voiceEval = await client.shard.broadcastEval('this.voiceConnections.size')
    let botGuilds = guildsEval.reduce((prev, val) => prev + val)
    let botChannels = channelsEval.reduce((prev, val) => prev + val)
    let botUsers = usersEval.reduce((prev, val) => prev + val)
    let commandUsage = await db.fetch('commandUsage');
    let messageRead = await db.fetch('messageRead');
    
	const embed = new RichEmbed()
	.setColor(color)
	.setAuthor(`${client.user.username} statistics`, client.user.displayAvatarURL)
	.setThumbnail(client.user.displayAvatarURL) 
	.setDescription('\`\`\`A statistics monitoring module. Contains essential information regarding our service and bot information. Wrapped with beautiful Discord.js Interactive Library and RichEmbed amazing Constructor. Made with ❤️ by Lolization Support Team.\`\`\`')
	.addField('Owners', '\`\`\`• Sharif#9781\n• Riichi_Rusdiana#6815\n• MazureFinnson#5492\`\`\`')
	.addField('Special thanks', '\`\`\`• 12042#5754\`\`\`') 
    .addField('Server information', `\`\`\`• Operating System: Enterprise Linux 7\n• Kernel: 4.18.0-34-Enterprise\n• Processor: Intel(R) Xeon(R) Gold 6140 CPU @ 2.30GHz\n• Architecture: x86_x64\n• Node.js: ${process.version}\n• Discord.js: v${version}\n• Websocket: ${client.ping.toFixed(2)}ms\`\`\``) 
	.addField('General information', `\`\`\`• Guilds: ${botGuilds.toLocaleString()}\n• Channels: ${botChannels.toLocaleString()}\n• Users: ${botUsers.toLocaleString()}\n• Uptime: ${client.util.parseDur(client.uptime)}\`\`\``)
	.addField('Readed information', `\`\`\`• Message Read: ${messageRead.toLocaleString()}\n• Commands Ran: ${commandUsage.toLocaleString()}\`\`\``) 
	.addField('Usage information', `\`\`\`• Memory usage:\n${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap\n\n• CPU usage:\nNode: ${(process.cpuUsage().user / 1024 / 1024).toFixed(2)}%\nSystem: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\`\`\``)
	.setFooter(`Request by: ${message.author.tag} | ${client.user.username} v${client.version}`)
	
	message.channel.send(embed);

	} 
	exports.conf = {
		aliases: ['about', 'info', 'botstats'], 
		cooldown:' 5'
	} 
	exports.help = {
		name: 'stats', 
		description: 'show bot statistic and usage information', 
		usage: 'stats', 
		example: ['stats'] 
	} 