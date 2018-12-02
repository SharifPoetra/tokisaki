const Discord = require('discord.js');
const fs = require("fs");
const { owners_id } = require('../../config.json');

exports.run = async(client, message, args, color, prefix) => {
	owners_id.forEach(async function(owner) {
    if (message.author.id !== owner) return;
    
function getTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return hour + ":" + min + ":" + sec;
}
var time = getTime();

function getDateNow() {

    var date = new Date();

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;


    return month + "." + day + "." + year;
}
var date = getDateNow();

client.on('debug', (debug) => {
    let debugged = debug.replace(client.config.env.AKARI, '[RETACTED: Hidden To Prevent Leaking]')
    message.channel.send(`\`\`\`[Time: ${time}] [Date: ${date}]\r\n${debugged}\`\`\``)
    fs.appendFile("./logs/debug.txt", (`[Time: ${time}]\r\n[Date: ${date}]\r\n${debugged}\r\n`), (err) => {

     })
 })
})
} 

exports.conf = {
	aliases: ['debugger'], 
	cooldown: '0'
	} 

exports.help = {
	name: 'debug', 
	description: 'This command just for owner nvm', 
	usage: 'debug' 
	} 