const { RichEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { get } = require('node-superfetch');

const playing = new Set();

exports.run = async(client, message, args, color, prefix) => {
		if (playing.has(message.channel.id)) return message.reply('Only one game may be occurring per channel.');
		playing.add(message.channel.id);
		try {
                        const { body } = await get('https://emilia-api.glitch.me/api/hangman')
                        .set('Authorization', `Bearer ${process.env.EMILIAKEY}`);

			const word = body.word;
			let points = 0;
			let displayText = null;
			let guessed = false;
			const confirmation = [];
			const incorrect = [];
			const display = new Array(word.length).fill('◯');
			while (word.length !== confirmation.length && points < 6) {
				const embed = new RichEmbed()
				.setColor(color)
				.setTitle('Hangman game')
				.setDescription(stripIndents`
					${displayText === null ? 'Here we go!' : displayText ? 'Good job!' : 'Nope!'}
					\`${display.join(' ')}\`. Which letter do you choose?
					Incorrect Tries: ${incorrect.join(', ') || 'None'}
					\`\`\`
				 . ┌─────┐
				 . ┃      ┋
				 . ┃      ${points > 0 ? 'O' : ''}
				 . ┃     ${points > 2 ? '/' : ' '}${points > 1 ? '|' : ''}${points > 3 ? '\\' : ''}
				 . ┃     ${points > 4 ? '/' : ''}${points > 5 ? '\\' : ''}
				  =============
					\`\`\`
				`);
				let m = await message.channel.send(embed);
				const filter = res => {
					const choice = res.content.toLowerCase();
					return res.author.id === message.author.id && !confirmation.includes(choice) && !incorrect.includes(choice);
				};
				const guess = await message.channel.awaitMessages(filter, {
					max: 1,
					time: 30000
				});
        //m.delete();
				if (!guess.size) {
					await message.reply('Sorry, time is up!');
					break;
				}
				const choice = guess.first().content.toLowerCase();
				if (choice === 'end') break;
				if (choice.length > 1 && choice === word) {
					guessed = true;
					break;
				} else if (word.includes(choice)) {
					displayText = true;
					for (let i = 0; i < word.length; i++) {
						if (word.charAt(i) !== choice) continue; // eslint-disable-line max-depth
						confirmation.push(word.charAt(i));
						display[i] = word.charAt(i);
					}
				} else {
					displayText = false;
					if (choice.length === 1) incorrect.push(choice);
					points++;
				}
			}
			playing.delete(message.channel.id);
			if (word.length === confirmation.length || guessed) return message.channel.send(`You won, it was ${word}!`);
			return message.channel.send(`Too bad... It was ${word}...`);
		} catch (err) {
			playing.delete(message.channel.id);
			return message.reply(`Oh no, an error occurred :( \`${err.message}\`. Try again later!`);
		}
	}
 exports.conf = {
 	aliases: ['hm'], 
     cooldown: '0'
 	} 
  exports.help = {
  	name: 'hangman', 
      description: 'Prevent a man from being hanged by guessing a word as fast as you can.', 
      usage: 'hangman' 
  	} 
