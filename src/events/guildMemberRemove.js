module.exports = (client, member) => {
	
  const guild = client.guilds.get('492345609928572948');
  guild.channels.get('498353708971720714').setName(`Total Member : ${guild.memberCount}`)
  
} 