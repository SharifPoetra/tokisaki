const { Canvas } = require('canvas-constructor');
const Discord = require('discord.js');
const { get } = require('node-superfetch');

let lepel = require('../../database/xp.json');
let coin = require('../../database/balance.json');
let reps = require('../../database/rep.json');
let info = require('../../database/note.json');
let bg = require('../../database/background.json');
let fishh = require('../../database/fish.json');
let works = require('../../database/works.json');

Canvas.registerFont(`${process.cwd()}/src/assets/font/NotoEmoji-Regular.ttf`, "NotoEmoji") 
Canvas.registerFont(`${process.cwd()}/src/assets/font/Roboto-Regular.ttf`, "RobotoRegular") 

exports.run = async (client, message, args, color) => {
	
  let user = message.mentions.users.first() || client.users.get(args[0]);
  if (!user) user = message.author;
  if (user.bot) return message.channel.send(`**${message.author.username}**, Bot not have a profile!`);
  
  /**
  * Define this all for fix undefined from JSON
  */
  if(!works[user.id]){
  	works[user.id] = {
  	 work: 0
  	};
 	}
 
  if(!fishh[user.id]){
    fishh[user.id] = {
      fish: 0
    };
  } 
  
  if(!bg[user.id]){
    bg[user.id] = {
      background: 'https://cdn.discordapp.com/attachments/492914262482878485/499770634172104715/Dreamy_Underwater_Bubbles_Sun_Light_iPhone_6_HD_Wallpaper-320x480.jpg' 
    };
  }
  
  if(!coin[user.id]){
    coin[user.id] = {
      balance: 0
    };
  }
  if(!lepel[user.id]){
    lepel[user.id] = {
      xp: 0,
      level: 1
    };
  }
  if(!reps[user.id]){
    reps[user.id] = {
      rep: 0
    };
  }
  if(!info[user.id]){
    info[user.id] = {
      note: 'No info set'
    } 
 } 
 
 /**
 * Takes all from JSON before call it
 */
  let xp = lepel[user.id].xp;
  let uLevel = lepel[user.id].level;
  let nxtLvlXp = uLevel * 500;
  let difference = xp/nxtLvlXp *345;
  let balance = coin[user.id].balance;
  let rep = reps[user.id].rep;
  let Info = info[user.id].note
  let background = bg[user.id].background;
  let fish = fishh[user.id].fish;
  let work = works[user.id].work;
  
  /**
  * Create Canvas function
  * Use try and catch for any error will caused
  */
    try {    
  async function createCanvas() {
    var imageUrlRegex = /\?size=2048$/g;
    var namam = user.username;
    var jadim = namam.length > 10 ? namam.substring(0, 12) + "..." : namam;
    var {body: avatar} = await get(user.displayAvatarURL.replace(imageUrlRegex, "?size128"));
    var {body: background1} = await get(background)
    var {body: background2} = await get('https://cdn.discordapp.com/attachments/492914262482878485/493210917488558111/1537660968355.png');
    var {body: dIcon} = await get('https://orig00.deviantart.net/2133/f/2016/200/f/a/discord_token_icon_dark_by_flexo013-daaj71i.png')
    var {body: FiSh} = await get('https://twemoji.maxcdn.com/2/72x72/1f3a3.png')
    var {body: cIcon} = await get('https://cdn.discordapp.com/attachments/492914262482878485/494027120557817866/chat-message-text-bubble-chatbubble-comment-speech-6-14759.png');
    var {body: wIcon} = await get('https://cdn.discordapp.com/attachments/501064603233681411/502354808750080002/1f4bc.png') 
    const lines = client.util.getWrapText(info, 17);

  return new Canvas(600, 600)
    .setColor('#000000')
    .addImage(background1, 0,0,600,600)
    .addBeveledImage(background2, 0,0,600,600)
    .addImage(dIcon, 190,250,55,55)
    .addImage(FiSh, 530,370,40,40)
    .addImage(wIcon, 530,480,30,30)
    .setTextFont('30px NotoEmoji, RobotoRegular') 
    .addText(`Name: ${jadim}`, 250, 285)
    .setTextFont('30px Impact') 
    .addText(`+Rep:`, 240,330)
    .addText(`${rep}`, 340,330) 
    .setTextFont('30px Impact')
    .addText('|', 280,380)
    .addText('|', 280,400)
    .addText('|', 280,420)
    .addText('|', 280,450)
    .addText('|', 280,470)
    .addText('|', 280,495)
    .addText('__   ___', 495,420) 
    .addText('_______', 495,460) 
    .addText('__   ___', 495,520) 
    .addText('_______', 495,560) 
    .addText('_______________________', 150,500)
    .setTextFont('bold 28px Courier New')
   // .addImage(cIcon, 300,355,40,40)
    .addText('💬 Info box', 290,385)
    .setTextFont('17px NotoEmoji')
    .addText(`${Info}`, 295, 413)
    .setTextFont('bold 30px Courier New')
    .addText('Level', 172,390)
    .setTextFont('17px RobotoRegular') 
    .addText('Total XP', 180, 530)
    .addText('Balance', 180, 560)
    .addText(`${client.util.crFormat(xp)}`, 370, 530)
    .addText(`¥${client.util.crFormat(balance)}`, 370, 560)
    .setTextAlign('center')
    .setTextFont('bold 20px Courier New')
    .addText(`${client.util.crFormat(fish)}`,543,455)
    .addText(`${client.util.crFormat(work)}`, 543,555) 
    .setTextFont('bold 40px Courier New')
    .addText(`${uLevel}`, 220,450)
    .setColor("#459466")
    .addRect(150, 570, difference, 34)
    .setTextFont("16px RobotoRegular")
    .setColor("#000000")
    .setTextAlign("center")
    .addText(`XP: ${xp} / ${nxtLvlXp}`, 330, 590)
    .addRoundImage(avatar, 10, 190, 168, 168, 168/2)
    .toBufferAsync();
  }
  
  let m = await message.channel.send('*Please Wait...*');
 
  const gumen = `
**User profile card for ${user.tag}**
`; message.channel.send(gumen, {file: new Discord.Attachment(await createCanvas(), 'profile.png')}).then(() => {m.delete()})

  } catch (e) {
    message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later.`);
  } 
  

}

exports.conf = {
    aliases: [],
    cooldown: "10"
}

exports.help = {
    name: "profile",
    description: "See your/someone profile",
    usage: "profile [@mention|userID]"
}