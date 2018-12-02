/**
* Source: https://github.com/dragonfire535/xiao/blob/master/commands/games/blackjack.js
* Xiao [ Bot ]
* Thanks to: dragonfire535
*/

const fs = require('fs');
let bal = require('../../database/balance.json');
const suits = ['<:clubes:504575727597781002>', '♥', '♦', '<:spades:504575727560032272>'];
const faces = ['Jack', 'Queen', 'King'];

const { shuffle, verifyText } = require('../../handle/util');

const decks = new Map();

	exports.run = async (client, message, args) => {
		
  if(!bal[message.author.id]){
    bal[message.author.id] = {
      balance: 0
    };
  } 
  
  let amount = parseInt(args[0]);
  
    if (!amount) return args.missing(message, 'You need to specify amount to bet.', client.commands.get('blackjack').help)
    if (isNaN(amount)) return message.channel.send(`**${message.author.username}**, Please enter valid number!`);
    if (amount > 9999) return message.channel.send('Bet msx to 999 only');
    
    if(bal[message.author.id].balance < amount) return message.channel.send(`**${message.author.username}**, You\'re betting more than you have!`);
    
    let curBal = bal[message.author.id].balance;
    
		let deckCount = 4;
		
		if (decks.has(message.channel.id)) return message.reply('Only one game may be occurring per channel.');
		try {
			decks.set(message.channel.id, generateDeck(deckCount));
			const dealerHand = [];
			draw(message.channel, dealerHand);
			draw(message.channel, dealerHand);
			const playerHand = [];
			draw(message.channel, playerHand);
			draw(message.channel, playerHand);
			const dealerInitialTotal = calculate(dealerHand);
			const playerInitialTotal = calculate(playerHand);
			if (dealerInitialTotal === 21 && playerInitialTotal === 21) {
				decks.delete(message.channel.id);
				return message.channel.send('Well, both of you just hit blackjack. Right away. Rigged.');
			} else if (dealerInitialTotal === 21) {
				decks.delete(message.channel.id);
				//return;
				bal[message.author.id].balance = curBal - amount;
                fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
                 if(err) console.log(err);
				return message.channel.send(`Ouch, the dealer hit blackjack right away! You lost 💴 **${amount}**, I hope you do better next time!`);
				});
			} else if (playerInitialTotal === 21) {
				decks.delete(message.channel.id);
				//return;
				bal[message.author.id].balance = curBal + amount;
                fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
                 if(err) console.log(err);
				return message.channel.send(`Wow, you hit blackjack right away! Lucky and you won 💴 **${amount}**!`);
				});
			}
			let playerTurn = true;
			let win = false;
			let reason;
			while (!win) {
				if (playerTurn) {
					let m = await message.channel.send(`**First Dealer Card:** ${dealerHand[0].display}\n**You (${calculate(playerHand)}):**\n${playerHand.map(card => card.display).join('\n')}\n\n_Hit?_ *(yes/no)*`);
					const hit = await verifyText(message.channel, message.author);
					 m.delete();
					if (hit) {
						const card = draw(message.channel, playerHand);
						const total = calculate(playerHand);
						if (total > 21) {
							reason = `You drew ${card.display}, total of ${total}! Bust`;
							break;
						} else if (total === 21) {
							reason = `You drew ${card.display} and hit 21`;
							win = true;
						}
					} else {
						const dealerTotal = calculate(dealerHand);
						await message.channel.send(`Second dealer card is ${dealerHand[1].display}, total of ${dealerTotal}.`);
						playerTurn = false;
					}
				} else {
					const inital = calculate(dealerHand);
					let card;
					if (inital < 17) card = draw(message.channel, dealerHand);
					const total = calculate(dealerHand);
					if (total > 21) {
						reason = `Dealer drew ${card.display}, total of ${total}! Dealer bust`;
						win = true;
					} else if (total >= 17) {
						const playerTotal = calculate(playerHand);
						if (total === playerTotal) {
							reason = `${card ? `Dealer drew ${card.display}, making it ` : ''}${playerTotal}-${total}`;
							break;
						} else if (total > playerTotal) {
							reason = `${card ? `Dealer drew ${card.display}, making it ` : ''}${playerTotal}-**${total}**`;
							break;
						} else {
							reason = `${card ? `Dealer drew ${card.display}, making it ` : ''}**${playerTotal}**-${total}`;
							win = true;
						}
					} else {
						await message.channel.send(`Dealer drew ${card.display}, total of ${total}.`);
					}
				}
			}
			decks.delete(message.channel.id);
			if (win) {
			bal[message.author.id].balance = curBal + amount;
                fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
                 if(err) console.log(err);
                 return message.channel.send(`${reason}! You won 💴 **${amount}**!`);
			});
			} else {
			bal[message.author.id].balance = curBal - amount;
                fs.writeFile('./src/database/balance.json', JSON.stringify(bal, null, 2), (err) => {
                 if(err) console.log(err);
			     return message.channel.send(`${reason}! You lost 💴 **${amount}**.`);
			});
			} 
		} catch (err) {
			decks.delete(message.channel.id);
			throw err;
		}
	}

	function generateDeck(deckCount) {
		const deck = [];
		for (let i = 0; i < deckCount; i++) {
			for (const suit of suits) {
				deck.push({
					value: 11,
					display: `${suit} Ace`
				});
				for (let j = 2; j <= 10; j++) {
					deck.push({
						value: j,
						display: `${suit} ${j}`
					});
				}
				for (const face of faces) {
					deck.push({
						value: 10,
						display: `${suit} ${face}`
					});
				}
			}
		}
		return shuffle(deck);
	}

	function draw(channel, hand) {
		const deck = decks.get(channel.id);
		const card = deck[0];
		deck.shift();
		hand.push(card);
		return card;
	}

	function calculate(hand) {
		return hand.sort((a, b) => a.value - b.value).reduce((a, b) => {
			let { value } = b;
			if (value === 11 && a + value > 21) value = 1;
			return a + value;
		}, 0);
	}
	exports.conf = {
		aliases: ['bj', '21'], 
		cooldown: '7'
		} 
		exports.help = {
			name: 'blackjack', 
			description: 'Play a game of blackjack.', 
			usage: 'blackjack <bet>' 
			} 